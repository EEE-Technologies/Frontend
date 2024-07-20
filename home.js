// Functions to handle opening and closing posts function 
function toggleForm() {
    const overlay = document.getElementById('formOverlay');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

// Take a Json and create a post within that data
function createPostFromJSON(postData) {
    const { username, profile_picture, image, title, description } = postData;

    // Create new post element
    const post = document.createElement('div');
    post.className = 'post';

    // Construct post HTML content
    post.innerHTML = `
      <div class="post-header red-border">
          <div style="display: flex; align-items: center;">
              <img src="${profile_picture || 'images/default_profile.png'}" alt="Avatar" class="avatar">
              <div class="username">${username || 'Anonymous'}</div>
          </div>
          <div class="red-border">
              <h3>${title || 'No Title'}</h3>
          </div>
      </div>
      
      <div class="post-image red-border">
          <img src="${image || 'images/default_image.jpg'}" class="post-image" alt="Post Image">
      </div>
      <div class="post-actions red-border">
          <img src="images/like_icon.png" alt="Like" class="action-img" id="likeButton">
          <img src="images/comment_icon.png" alt="Comment" class="action-img" id="commentButton">
          <img src="images/share_icon.png" alt="Share" class="action-img" id="shareButton">
      </div>
      <div class="post-description red-border">
          <p>${description || 'No Description'}</p>
      </div>
    `;

    // Append post to posts container
    const bottomDiv = document.getElementById('posts-content-container');
    bottomDiv.appendChild(post);

    console.log('Post created:', postData); // Log to verify post data
}

// Open form and take input create json from it and send json to createPostFromJson
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const postData = {
        username: document.getElementById('username').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        profile_picture: document.getElementById('profilePicture').files[0] ? URL.createObjectURL(document.getElementById('profilePicture').files[0]) : '',
        image: document.getElementById('image').files[0] ? URL.createObjectURL(document.getElementById('image').files[0]) : ''
    };

    console.log('Form submitted:', postData); // Log to verify post data

    createPostFromJSON(postData);

    document.getElementById('postForm').reset();
    toggleForm(); // Close the form after submission
});
