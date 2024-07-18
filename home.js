function addPost() {
    const bottomDiv = document.getElementById('posts-content-container');

    const post = document.createElement('div');
    post.className = 'post';

    post.innerHTML = `
        <div class="post-header red-border">
            <img src="images/profile.png" alt="Avatar" class="avatar">
            <div class="username">John Doe</div>
        </div>
        <div class="post-content red-border">
            <p>This is the content of the social media post. It can include text, links, or other media.</p>
        </div>
        <div class="post-image red-border">
            <img src="images/sample_post_image.jpg" class="post-image" alt="Post Image">
        </div>
        <div class="post-actions red-border">
            <button class="action-btn">Like</button>
            <button class="action-btn">Comment</button>
            <button class="action-btn">Share</button>
        </div>
        <div class="description">
            <p class="truncate-text">
                Description text kjbnfalsdkjbcnv alsdkjfbawlekfjbalsdkjfba;skjclv awb lfabcn vawerbfajv ljbv la sdkj
            </p>
        </div>
    `;

    bottomDiv.appendChild(post);
}