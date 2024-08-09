const userDataObject = localStorage.getItem('userData');
    if (userDataObject) {
        const userData = JSON.parse(userDataObject);
        userName = userData.following;
        console.log(userName)
    }

// Functions to handle opening and closing posts function 
function toggleForm() {
    const overlay = document.getElementById('formOverlay');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

// Take a Json and create a post within that data
function createPostFromJSON(postData) {
    const { username, profile_picture, post_image, title, description } = postData;

    // Define default images
    const defaultProfilePicture = 'images/default_user.png';
    const defaultPostImage = 'images/default_image.jpg';

    // Determine image sources
    const profilePictureSrc = profile_picture && profile_picture.startsWith('data:image/') 
        ? profile_picture 
        : defaultProfilePicture;
    const postImageSrc = post_image ? post_image : defaultPostImage;

    // Create post element
    const post = document.createElement('div');
    post.className = 'post';

    post.innerHTML = `
      <div class="post-header red-border">
          <div style="display: flex; align-items: center;">
              <img src="${profilePictureSrc}" alt="Avatar" class="avatar">
              <div class="username">${username || 'Anonymous'}</div>
          </div>
          <div class="red-border">
              <h3>${title || 'No Title'}</h3>
          </div>
      </div>
      
      <div class="post-image red-border">
          <img src="${postImageSrc}" class="post-image" alt="Post Image">
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
    bottomDiv.insertBefore(post, bottomDiv.firstChild);

    console.log('Post created:', postData); // Log to verify post data
}

// Send request for a list of json to create posts
async function fetchUsers(usernames) {
    if (usernames.length === 0) {
        console.warn('Usernames list is empty. Skipping fetch request.');
        return []; // Return an empty array or whatever structure makes sense in your application
    }

    try {
        const response = await fetch('http://localhost:3000/get-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usernames }), // Send the list of usernames
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null; // Return null or handle the error as needed
    }
}

//Convert response list into posts 
const userDataString = localStorage.getItem('userData');
if (userDataString) {
    const userData = JSON.parse(userDataString);
    const following = userData.user.following;

    // Check if the following list is empty
    if (following.length === 0) {
        console.log('Following list is empty. No users to fetch.');
    } else {
        // Use an async IIFE (Immediately Invoked Function Expression) to handle the async call
        (async () => {
            const fetchedUsers = await fetchUsers(following);

            if (fetchedUsers && fetchedUsers.posts) {
                const userPosts = fetchedUsers.posts;
                userPosts.forEach(createPostFromJSON);
                console.log(userPosts);
            } else {
                console.log('No posts found or failed to fetch users.');
            }
        })();
    }
} else {
    console.log('No user data found in localStorage.');
}


// This code is used to send data to db to later be used to get json for creating posts
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    let userName;
    const formData = new FormData(event.target);
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        userName = userData.user.name;
        userProfilePicture = userData.user.profile_picture
    }
    else{
        userName = formData.get('username')
    }

    // Helper function to convert a file to a Base64 string
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Function to handle form submission
    async function handleFormSubmit() {
        let postImageBase64 = 'images/sandbox/default_image.jpg'; // Default placeholder
        let profilePicture = 'images/sandbox/default_user.png'; // Default profile picture


        const postData = {
            username: userName,
            profile_picture: userProfilePicture, 
            title: formData.get('title'),
            post_image: postImageBase64,
            description: formData.get('description')
        };

        // Retrieve profile_picture from local storage if available
        const profileDataString = localStorage.getItem('profileData');
        if (profileDataString) {
            const profileData = JSON.parse(profileDataString);
            profilePicture = profileData.user.profile_picture || profilePicture;
            postData.profile_picture = profilePicture;
        }

        // Check if an image file is provided
        const imageFile = formData.get('image');
        if (imageFile) {
            try {
                postImageBase64 = await fileToBase64(imageFile);
                postData.post_image = postImageBase64;
            } catch (error) {
                console.error('Error converting image to Base64:', error);
            }
        }

        fetch('http://localhost:3000/uploadPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // or response.json() if the response is JSON
        })
        .then(data => {
            console.log('Success:', postData);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Log the form data to the console
        console.log('Form submission data:', postData);
        toggleForm(); 
    }

    handleFormSubmit();
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

// Add data to dm preview
function addMessage(messageData) {
    const maxMessages = 8;
    const messagesContainer = document.querySelector('.dm-messages-preview');
    
    // Ensure there's a <ul> for the messages
    let messageList = messagesContainer.querySelector('ul');
    if (!messageList) {
        messageList = document.createElement('ul');
        messagesContainer.appendChild(messageList);
    }

    const messageItem = document.createElement('li');
    messageItem.className = 'dm-message';
    messageItem.id = messageData.username; 

    messageItem.innerHTML = `
        <div class="dm-avatar">
            <img src="${messageData.avatar}" alt="User Avatar">
        </div>
        <div class="dm-message-content">
            <h4>${messageData.username}</h4>
            <p>${messageData.preview}</p>
        </div>
    `;

    if (messageList.children.length >= maxMessages) {
        messageList.removeChild(messageList.lastElementChild);
    }

    messageList.insertBefore(messageItem, messageList.firstChild);
}

// code to populate the dm preview from mongo db, if no data than resort to default values
const jsonString = localStorage.getItem('userData');
if (jsonString) {
    const userDocument = JSON.parse(jsonString);
    const messageDataList = userDocument.user.messageDataList;
    if (messageDataList){       
         messageDataList.forEach(data => addMessage(data));
    }
    else{
        console.log('JSON not found');
        const messageDataList = [
            { avatar: 'images/profile.png', username: 'User 1', preview: 'This is a short preview of message 1' },
            { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2'},
            { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
            { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
            { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
            { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
            { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
            { avatar: 'images/profile.png', username: 'User 2', preview: 'Long texts can be incredibly beneficial in providing depth and detail to a topic. They allow for comprehensive exploration, enabling writers to delve into nuances and present various perspectives. This depth can enhance understanding, providing readers with a well-rounded view. For academic and professional contexts, long texts are often necessary to cover the complexity of a subject adequately. They can include thorough analyses, detailed evidence, and extensive background information that short texts simply cannot accommodate.' },
        ];
        // For each loop to use each json and apply it to the function
        messageDataList.forEach(data => addMessage(data));
    }

  } else {
    console.log('JSON not found');
    const messageDataList = [
        { avatar: 'images/profile.png', username: 'User 1', preview: 'This is a short preview of message 1' },
        { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2'},
        { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
        { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
        { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
        { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
        { avatar: 'images/profile.png', username: 'User 2', preview: 'This is a short preview of message 2' },
        { avatar: 'images/profile.png', username: 'User 2', preview: 'Long texts can be incredibly beneficial in providing depth and detail to a topic. They allow for comprehensive exploration, enabling writers to delve into nuances and present various perspectives. This depth can enhance understanding, providing readers with a well-rounded view. For academic and professional contexts, long texts are often necessary to cover the complexity of a subject adequately. They can include thorough analyses, detailed evidence, and extensive background information that short texts simply cannot accommodate.' },
    ];
    // For each loop to use each json and apply it to the function
    messageDataList.forEach(data => addMessage(data));
}

// Add a new message individaully
// addMessage({ avatar: 'images/profile.png', username: 'New User', preview: 'Long texts can be incredibly beneficial in providing depth and detail to a topic. They allow for comprehensive exploration, enabling writers to delve into nuances and present various perspectives. This depth can enhance understanding, providing readers with a well-rounded view. For academic and professional contexts, long texts are often necessary to cover the complexity of a subject adequately. They can include thorough analyses, detailed evidence, and extensive background information that short texts simply cannot accommodate.' }); //Note only max 8 previews can be seen at a time, newest previes will be seen at the top and older previews are moved down

// code to save target dm user to local storage to populate messages page when going to next page
document.querySelectorAll('.dm-message').forEach(div => {
    div.addEventListener('click', () => {
        console.log(div.id);
        const jsonDataUpload = localStorage.getItem('userData');
        const userData = JSON.parse(jsonDataUpload);
        const userChatLogs = userData.user.messageDataList
        for (const item of userChatLogs){
            if(item.username === div.id){
                localStorage.setItem('targetUserChat', div.id);
                window.location.href = 'messages.html'; 
            }
        }
    });
});


// This function takes a json and parses and puts the data into the recommended accounts to follow
function addRecommendationsFromJson( jsonData) {
    const data = JSON.parse(jsonData);
    const parent = document.querySelector('.account-recommendation-div');
    const limit = Math.min(data.length, 3);

    for (let i = 0; i < limit; i++) {
        const { img, username, title } = data[i];
        const recommendation = document.createElement('div');
        recommendation.className = 'account-recommendation';

        recommendation.innerHTML = `
            <img src="${img}" alt="${username}" class="account-recommendation-img">
            <div class="account-recommendation-info">
                <p class="username">${username}</p>
                <p class="title">${title}</p>
            </div>
            <button class="account-recommendation-follow-btn">Follow</button>
        `;

        parent.appendChild(recommendation);
    }
}
const jsonData = `
[
    {"img": "images/profile.png", "username": "John Doe Cousin", "title": "Title1"},
    {"img": "images/profile.png", "username": "John Doe Friend", "title": "Title2"},
    {"img": "images/profile.png", "username": "John Doe Coworker", "title": "Title3"},
    {"img": "images/profile.png", "username": "John Doe Neighbor", "title": "Title4"}
]`;

addRecommendationsFromJson(jsonData);

// Function to populate the trending topics allows and replaces up to 7 items in div
function updateTrendingTopics(jsonItem) {
    const container = document.querySelector('.trending-topics-div');
    const currentTopics = Array.from(container.querySelectorAll('.trending-topic'));

    const topicDiv = document.createElement('div');
    topicDiv.classList.add('trending-topic');

    const iconImg = document.createElement('img');
    iconImg.src = jsonItem.icon;
    iconImg.alt = 'icon';
    iconImg.classList.add('trending-icon');

    topicDiv.appendChild(iconImg);
    topicDiv.appendChild(document.createTextNode(jsonItem.topic));

    container.insertBefore(topicDiv, container.children[1]);

    if (currentTopics.length >= 7) {
        currentTopics[currentTopics.length - 1].remove();
    }
}

// Update trending topics with a new item
// updateTrendingTopics(newTopic);
const trendingData = [
    { icon: 'images/trend.png', topic: 'AI Advancements in Healthcare' },
    { icon: 'images/trend.png', topic: 'Global Climate Summit 2024' },
    { icon: 'images/trend.png', topic: 'Breakthrough in Quantum Computing' },
    { icon: 'images/trend.png', topic: 'Renewable Energy Innovations' },
    { icon: 'images/trend.png', topic: 'SpaceX Mars Mission Update' },
    { icon: 'images/trend.png', topic: 'Cryptocurrency Market Trends' },
    { icon: 'images/trend.png', topic: 'New Electric Vehicle Releases' },
    { icon: 'images/trend.png', topic: 'Advances in Cancer Research' },
    { icon: 'images/trend.png', topic: 'Global Economic Outlook 2024' }
];

// Run the function on each item
trendingData.forEach(updateTrendingTopics);












// This code is used to open the search reuslts when typing in it
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    async function fetchUserNamesAndPictures(query) {
        try {
            const response = await fetch('http://localhost:3000/api/get-search-results-username');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const users = data.users || [];
            searchResults.innerHTML = ''; // Clear previous results

            // Filter users based on the query and create result items
            const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));

            filteredUsers.forEach(user => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';

                const img = document.createElement('img');
                img.src = user.profile_picture || 'images/default_user.png';
                img.className = 'result-item-image';
                img.alt = 'Result Image';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'result-item-info';

                const title = document.createElement('h4');
                title.className = 'result-item-title';
                title.textContent = user.name;

                infoDiv.appendChild(title);
                resultItem.appendChild(img);
                resultItem.appendChild(infoDiv);

                searchResults.appendChild(resultItem);
            });

        } catch (error) {
            console.error('Error fetching user names and pictures:', error);
        }
    }

    function toggleSearchResults() {
        const query = searchInput.value.trim();

        if (query.length > 0) {
            searchResults.style.display = 'flex'; 
            fetchUserNamesAndPictures(query); 
        } else {
            searchResults.style.display = 'none'; 
        }
    }

    searchInput.addEventListener('input', toggleSearchResults);
});


  

