// Replace 'selectedDivId' with the key of the item you want to retrieve
const accountProfileName = localStorage.getItem('accountProfileName');

if (accountProfileName !== null) {
    console.log('Retrieved item from localStorage:', accountProfileName);
} else {
    console.log('Item not found in localStorage.');
}


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

// Example usage
fetchUserByName(searchName).then(data => {
  console.log('User data:', data);
}).catch(error => {
  console.error('Error:', error);
});