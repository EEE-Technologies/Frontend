function createPostFromJSON(postData) {
    const { username, profile_picture, image, title, description} = postData;


    // Create new post element
    const post = document.createElement('div');
    post.className = 'post';

    // Construct post HTML content
    post.innerHTML = `
        <div class="post-header red-border">
            <img src="${profile_picture || 'images/default_profile.png'}" alt="Avatar" class="avatar">
            <div class="username">${username}</div>
        </div>
        <div class="post-content red-border">
            <p>${title}</p>
        </div>
        <div class="post-image red-border">
            <img src="${image || 'images/default_image.jpg'}" class="post-image" alt="Post Image">
        </div>
        <div class="post-actions red-border">
            <img src="images/like_icon.png" alt="Like" class="action-img" id="likeButton">
            <img src="images/comment_icon.png" alt="Comment" class="action-img" id="commentButton">
            <img src="images/share_icon.png" alt="Share" class="action-img" id="shareButton">
        </div>
        <div class="description">
            <p class="truncate-text">${description}</p>
        </div>
    `;
    
    // Append post to posts container
    const bottomDiv = document.getElementById('posts-content-container');
    bottomDiv.appendChild(post);
}

// This function opens up the form for creating a post
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const postData = {
        username: document.getElementById('username').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        profile_picture: document.getElementById('profilePicture').files[0] ? URL.createObjectURL(document.getElementById('profilePicture').files[0]) : '',
        image: document.getElementById('image').files[0] ? URL.createObjectURL(document.getElementById('image').files[0]) : ''
    };
    const postDataJSON = JSON.stringify(postData);


    createPostFromJSON(postData);

    document.getElementById('postForm').reset();
});


function toggleForm() {
    const overlay = document.getElementById('formOverlay');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    toggleForm();
});