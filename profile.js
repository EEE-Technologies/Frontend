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
    const profileImage = document.querySelector('.profile-header .profile-photo');
    profileImage.src = headerImageSrc;

    const usernameSpan = document.querySelector('.profile-header .username');
    usernameSpan.textContent = newUsername;
}

// This code takes all the previous functions and gets the data and calls it into the these functions
fetchUserByName(searchName)
  .then(data => {
    console.log('User data:', data.user);

    if (data.success && data.user) {
        console.log(data.user.user)
      const { name, posts, profile_picture } = data.user.user; 

      createPostPreviews(posts);
      updateProfile(profile_picture, name);

    } else {
      console.error('Error:', data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


