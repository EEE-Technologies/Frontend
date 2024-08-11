// Replace 'selectedDivId' with the key of the item you want to retrieve
const accountProfileName = localStorage.getItem('accountProfileName');

if (accountProfileName !== null) {
    console.log('Retrieved item from localStorage:', accountProfileName);
} else {
    console.log('Item not found in localStorage.');
}

//code to get account profile data 
const searchName = accountProfileName.replace("-search-result-item", "");
/**
 * Fetch user data by username from the server.
 * @param {searchName} username - The username to search for.
 * @returns {Promise<object>} - The user data in JSON format.
 */
async function fetchUserByName(username) {
  const url = `http://localhost:3000/api/get-user-by-name/${encodeURIComponent(username)}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { success: false, message: error.message };
  }
}

// Function to populate all the posts previews with images
function createPostPreviews(posts) {
    posts.forEach(post => {
        const postPreviewImage = post.post_image; 
        const postPreview = document.createElement('div');
        postPreview.className = 'post-preview';
        const imageUrl = postPreviewImage ? `url('${postPreviewImage}')` : 'url(\'images/default_image.jpg\')';
        postPreview.style.backgroundImage = imageUrl;

        document.querySelector('.posts-container').appendChild(postPreview);
    });
}

// Function to update profile with the account username and profile picture
function updateProfile(headerImageSrc, newUsername) {
    if (typeof someVariable !== 'undefined') {
        const profileImage = document.querySelector('.profile-header .profile-photo');
        profileImage.src = headerImageSrc;    
    }
    else{
        const profileImage = document.querySelector('.profile-header .profile-photo');
        profileImage.src = 'images/default_user.png';    
    }

    const usernameSpan = document.querySelector('.profile-header .username');
    usernameSpan.textContent = newUsername;
}

// This code takes all the previous functions and gets the data and calls it into the these functions
fetchUserByName(searchName)
  .then(data => {
    console.log('User data:', data.user);

    if (data.success && data.user) {
        const userProfileData = data.user.user;
        localStorage.setItem('userProfileData', JSON.stringify(userProfileData));

        console.log(data.user.user)
      const { name, posts, profile_picture } = data.user.user; 
      profileAccountSearchData = [name, profile_picture]  
      createPostPreviews(posts);
      updateProfile(profile_picture, name);

    } else {
      console.error('Error:', data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


  //Funciton to update messagedatalist with the correct usernmae and photo
async function addMessageToUser(username, messageData) {
    const url = 'http://localhost:3000/api/add-message-to-user';
    const body = {
      username: username,
      messageData: messageData
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Message data added successfully:', data);
      } else {
        console.error('Failed to add message data:', data);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  }
   // Function to handle button click
  function addMessageDataList(functionAvatar, functionUsername) {
    console.log('pressed the button')
    const userDataObject = localStorage.getItem('userData');
    if (userDataObject) {
        const userData = JSON.parse(userDataObject);
        userName = userData.user.name;
    
        const messageData = {
            avatar: functionAvatar,
            username: functionUsername,
            preview: ' ',
            messagesJson: []
          };
          
          addMessageToUser(userName, messageData);
    }
  }
  
//   This code is used to send the correct json to the messageDataList
  let savedUserDataName = null
  let savedUserDataProfilePicture = null

  const savedUserData = localStorage.getItem('userProfileData');
  if (savedUserData) {
    const user = JSON.parse(savedUserData);
    const { name, profile_picture } = user;
    savedUserDataName = name
    savedUserDataProfilePicture = profile_picture
  } else {
    console.log('No user data found in localStorage.');
  }
  document.getElementById('messageButton').addEventListener('click', () => {
    addMessageDataList(savedUserDataProfilePicture, savedUserDataName);
  });


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
                resultItem.id = `${user.name}-search-result-item`;
                
                // Assign the onclick function with user information
                resultItem.onclick = function() {
                    goToProfilePage(this.id); // Pass user id to function
                };

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

    function goToProfilePage(divId) {
        // Store the div's id in localStorage
        localStorage.setItem('accountProfileName', divId);
        
        // Replace with the appropriate URL for the profile page
        window.location.href = `profile.html`;
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

// Code to add user to account following list
document.getElementById('followButton').addEventListener('click', () => {
    const userDataObject = localStorage.getItem('userData');
    if (userDataObject) {
        const userData = JSON.parse(userDataObject);
        userName = userData.user.name;
      
        // Data to send in the POST request
        const data = {
            username: userName,
            newFollowing: searchName
        };

        // Send POST request using fetch
        fetch('http://localhost:3000/api/add-following', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) // Parse the JSON from the response
        .then(result => {
            console.log('Success:', result);
            // Handle the result here (e.g., update the UI, show a message, etc.)
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle any errors here
        });
    }
});

  