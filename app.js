function showPage(pageId) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // If not logged in and trying to access any page other than login
    if (!isLoggedIn && pageId !== 'login') {
      alert('Please login first');
      pageId = 'login';
    }
  
    // Hide all content sections
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
      content.classList.remove('active');
    });
  
    // Show the selected content section
    const selectedContent = document.getElementById(pageId);
    if (selectedContent) {
      selectedContent.classList.add('active');
    }
  }
  
  // Show home page by default
  window.onload = function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      showLoggedInContent();
      // Load recent posts
      const recentPosts = JSON.parse(localStorage.getItem('recentPosts') || '[]');
      displayRecentPosts(recentPosts);
    } else {
      // Hide all navigation elements except login
      document.getElementById('loginButton').style.display = 'block';
      document.getElementById('accountDropdown').style.display = 'none';
      showPage('login');
    }
  
    // ... other window.onload code here
  }
  
  // Define a function to handle login
  function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Allow the user to log in with any email and password
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ email, password }));
      showPage('home');
    } else {
      alert('Please enter both email and password');
    }
  }
  
  // Define a function to handle logout
  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    showPage('login');
  }
  
  // Define a function to check if the user is logged in
  function checkLoginBeforeAction() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('Please login first');
      showPage('login');
      return false;
    }
    return true;
  }
  
  // Define a function to show the logged in content
  function showLoggedInContent() {
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('accountDropdown').style.display = 'block';
  }
  
  function previewImage(event) {
    const preview = document.getElementById('preview');
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function() {
      preview.src = reader.result;
      preview.style.display = 'block';
    }
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const postType = document.querySelector('input[name="postType"]:checked').value;
    const itemName = document.getElementById('itemName').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const image = document.getElementById('image').files[0];
  
    // Here you would typically send this data to your server
    console.log({
      postType,
      itemName,
      category,
      description,
      location,
      date,
      image
    });
  
    // Show success message
    alert('Post created successfully!');
    
    // Reset form
    event.target.reset();
    document.getElementById('preview').style.display = 'none';
    
    // Redirect to home page
    showPage('home');
  }  
  
  function saveEditProfile() {
    const fullName = document.getElementById("edit-full-name").value;
    const username = document.getElementById("edit-username").value;
    const email = document.getElementById("edit-email").value;
    const phone = document.getElementById("edit-phone").value;
    const password = document.getElementById("edit-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Here you would typically send this data to your server
    alert(`
      Profile Updated Successfully!
      Full Name: ${fullName}
      Username: ${username}
      Email: ${email}
      Phone: ${phone}
    `);
  
    // Redirect back to profile page
    showPage('profile');
  }
  
  // Add to your existing script section
  function saveProfile() {
    const fullName = document.getElementById("full-name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const privacy = document.getElementById("privacy").checked;
    const notifications = document.getElementById("notifications").checked;
  
    alert(`
      Profile Saved!
      Full Name: ${fullName}
      Username: ${username}
      Email: ${email}
      Phone: ${phone}
      Privacy: ${privacy ? "Enabled" : "Disabled"}
      Notifications: ${notifications ? "Enabled" : "Disabled"}
    `);
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
      profileContainer.classList.toggle("dark-mode");
    }
  }
  
  // Add profile picture preview functionality
  document.getElementById('profile-pic-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('profile-picture').style.backgroundImage = 'url(' + e.target.result + ')';
        document.getElementById('profile-picture').style.backgroundSize = 'cover';
        document.getElementById('profile-picture').style.backgroundPosition = 'center';
      };
      reader.readAsDataURL(file);
    }
  }); 
  
  function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
      // Here you would typically handle logout logic
      alert('You have been logged out successfully');
      // Redirect to home page or login page
      showPage('home');
    }
  }
  
  // Function to create and display recent posts
  function displayRecentPosts(posts) {
    const postsGrid = document.getElementById('recentPostsGrid');
    postsGrid.innerHTML = ''; // Clear existing content
  
    if (!posts || posts.length === 0) {
      postsGrid.innerHTML = `
        <div class="no-posts-message">
          <p>No recent posts available.</p>
          <p>Be the first to post a lost or found item!</p>
        </div>
      `;
      return;
    }
  
    posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'post-card';
      postCard.innerHTML = `
        <div class="post-image">
          <img src="${post.image || 'default-placeholder.jpg'}" alt="${post.itemName}">
          <span class="post-tag ${post.type}">${post.type}</span>
        </div>
        <div class="post-content">
          <h4>${post.itemName}</h4>
          <p>${post.location}</p>
          <span class="post-date">${formatTimeAgo(post.date)}</span>
        </div>
      `;
      postsGrid.appendChild(postCard);
    });
  }
  
  // Helper function to format time ago
  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }
  
  // Example of how to use it when a new post is created
  function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const newPost = {
      type: document.querySelector('input[name="postType"]:checked').value,
      itemName: document.getElementById('itemName').value,
      category: document.getElementById('category').value,
      description: document.getElementById('description').value,
      location: document.getElementById('location').value,
      date: document.getElementById('date').value,
      image: document.getElementById('image').files[0] 
        ? URL.createObjectURL(document.getElementById('image').files[0]) 
        : null
    };
  
    // Add the new post to your storage/database
    // This is where you'd typically make an API call
    
    // Update the recent posts display
    const recentPosts = JSON.parse(localStorage.getItem('recentPosts') || '[]');
    recentPosts.unshift(newPost);
    localStorage.setItem('recentPosts', JSON.stringify(recentPosts.slice(0, 6))); // Keep only 6 most recent posts
    
    // Display the updated posts
    displayRecentPosts(recentPosts);
  
    // Rest of your existing handleSubmit code...
  }
  
  // Load recent posts when the page loads
  // window.onload = function() {
  //   showPage('home');
  //   const recentPosts = JSON.parse(localStorage.getItem('recentPosts') || '[]');
  //   displayRecentPosts(recentPosts);
  // }
  
  // Define a function to display posts
function displayPosts() {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  const postsGrid = document.getElementById('postsGrid');
  postsGrid.innerHTML = '';
  
  posts.forEach((post) => {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
      <h2>${post.itemName}</h2>
      <p>Type: ${post.type}</p>
      <p>Category: ${post.category}</p>
      <p>Description: ${post.description}</p>
      <p>Location: ${post.location}</p>
      <p>Date: ${post.date}</p>
    `;
    postsGrid.appendChild(postCard);
  });
}

// Define a function to display found items
function displayFoundItems() {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  const foundItemsGrid = document.getElementById('foundItemsGrid');
  foundItemsGrid.innerHTML = '';
  
  posts.forEach((post) => {
    if (post.type === 'found') {
      const postCard = document.createElement('div');
      postCard.className = 'post-card';
      postCard.innerHTML = `
        <h2>${post.itemName}</h2>
        <p>Type: ${post.type}</p>
        <p>Category: ${post.category}</p>
        <p>Description: ${post.description}</p>
        <p>Location: ${post.location}</p>
        <p>Date: ${post.date}</p>
      `;
      foundItemsGrid.appendChild(postCard);
    }
  });
}

// Define a function to display lost items
function displayLostItems() {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  const lostItemsGrid = document.getElementById('lostItemsGrid');
  lostItemsGrid.innerHTML = '';
  
  posts.forEach((post) => {
    if (post.type === 'lost') {
      const postCard = document.createElement('div');
      postCard.className = 'post-card';
      postCard.innerHTML = `
        <h2>${post.itemName}</h2>
        <p>Type: ${post.type}</p>
        <p>Category: ${post.category}</p>
        <p>Description: ${post.description}</p>
        <p>Location: ${post.location}</p>
        <p>Date: ${post.date}</p>
      `;
      lostItemsGrid.appendChild(postCard);
    }
  });
}

// Call the displayPosts function when the page loads
// window.onload = function() {
//   displayPosts();
//   displayFoundItems();
//   displayLostItems();
// }