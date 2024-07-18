document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Get file inputs
    const profilePictureFile = document.getElementById('profilePicture').files[0];
    const imageFile = document.getElementById('image').files[0];

    // Example: Displaying the entered values and uploaded files
    console.log('Username:', username);
    console.log('Title:', title);
    console.log('Description:', description);

    // Create new post element
    const post = document.createElement('div');
    post.className = 'post';

    // Create image URLs (you may need to handle uploading to a server in a real application)
    const profilePictureUrl = profilePictureFile ? URL.createObjectURL(profilePictureFile) : 'images/default_profile.png';
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : 'images/default_image.jpg';

    // Construct post HTML content
    post.innerHTML = `
        <div class="post-header red-border">
            <img src="${profilePictureUrl}" alt="Avatar" class="avatar">
            <div class="username">${username}</div>
        </div>
        <div class="post-content red-border">
            <p>${title}</p>
        </div>
        <div class="post-image red-border">
            <img src="${imageUrl}" class="post-image" alt="Post Image">
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
    // post.innerHTML = `
    //     <div class="post-header red-border">
    //         <img src="${profilePictureUrl}" alt="Avatar" class="avatar">
    //         <div class="username">${username}</div>
    //     </div>
    //     <div class="post-content red-border">
    //         <p>${title}</p>
    //     </div>
    //     <div class="post-image red-border">
    //         <img src="${imageUrl}" class="post-image" alt="Post Image">
    //     </div>
    //     <div class="post-actions red-border">
    //         <button class="action-btn">Like</button>
    //         <button class="action-btn">Comment</button>
    //         <button class="action-btn">Share</button>
    //     </div>
    //     <div class="description">
    //         <p class="truncate-text">${description}</p>
    //     </div>
    // `;

    // Append post to posts container
    const bottomDiv = document.getElementById('posts-content-container');
    bottomDiv.appendChild(post);

    // Clear form inputs (optional)
    document.getElementById('postForm').reset();
});
