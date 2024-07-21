// Functions to handle opening and closing posts function 
function toggleForm() {
    const overlay = document.getElementById('formOverlay');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

// Take a Json and create a post within that data
function createPostFromJSON(postData) {
    const { username, profile_picture, image, title, description } = postData;

    const post = document.createElement('div');
    post.className = 'post';

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

    console.log('Form submitted:', postData); 

    createPostFromJSON(postData);

    document.getElementById('postForm').reset();
    toggleForm(); 
});

// Open and close dm 
document.addEventListener('DOMContentLoaded', function() {
    const triggerImage = document.getElementById('triggerImage');
    const dmDiv = document.getElementById('dmDiv');
    const closeButton = document.getElementById('closeButton');

    triggerImage.addEventListener('click', function() {
        dmDiv.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        dmDiv.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === dmDiv) {
            dmDiv.style.display = 'none';
        }
    });
});

// Takes a Json Object and turns it into a dm preview
function addMessage(messageData) {
    const maxMessages = 8;
    const messagesContainer = document.querySelector('.dm-messages-preview');
    const message = document.createElement('div');
    message.className = 'dm-message';

    message.innerHTML = `
        <div class="dm-avatar">
            <img src="${messageData.avatar}" alt="User Avatar">
        </div>
        <div class="dm-message-content">
            <h4>${messageData.username}</h4>
            <p>${messageData.preview}</p>
        </div>
    `;

    if (messagesContainer.children.length >= maxMessages) {
        messagesContainer.removeChild(messagesContainer.lastElementChild);
    }

    messagesContainer.insertBefore(message, messagesContainer.firstChild);
}

// Example usage with a JSON object
const messageDataList = [
    { avatar: 'images/profile.png', username: 'User 1', preview: 'This is a short preview of message 1' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2'},
    { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'Long texts can be incredibly beneficial in providing depth and detail to a topic. They allow for comprehensive exploration, enabling writers to delve into nuances and present various perspectives. This depth can enhance understanding, providing readers with a well-rounded view. For academic and professional contexts, long texts are often necessary to cover the complexity of a subject adequately. They can include thorough analyses, detailed evidence, and extensive background information that short texts simply cannot accommodate.' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2..dfasdfasdfasdfasdfasdfwdqsfouabsdflakjsdflkjbdasfkljbadfslkjbdafskjlbdfaskljb.' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2.sdfasdfasd..' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2.asdfasdfasdfa..' },
    { avatar: 'images/profile.png', username: 'User 2', preview: 'Long texts can be incredibly beneficial in providing depth and detail to a topic. They allow for comprehensive exploration, enabling writers to delve into nuances and present various perspectives. This depth can enhance understanding, providing readers with a well-rounded view. For academic and professional contexts, long texts are often necessary to cover the complexity of a subject adequately. They can include thorough analyses, detailed evidence, and extensive background information that short texts simply cannot accommodate.' }
];
// For each loop to use each json and apply it to the function
messageDataList.forEach(data => addMessage(data));
// Add a new message individaully
addMessage({ avatar: 'images/profile.png', username: 'New User', preview: 'Long texts can be incredibly beneficial in providing depth and detail to a topic. They allow for comprehensive exploration, enabling writers to delve into nuances and present various perspectives. This depth can enhance understanding, providing readers with a well-rounded view. For academic and professional contexts, long texts are often necessary to cover the complexity of a subject adequately. They can include thorough analyses, detailed evidence, and extensive background information that short texts simply cannot accommodate.' }); //Note only max 8 previews can be seen at a time, newest previes will be seen at the top and older previews are moved down
