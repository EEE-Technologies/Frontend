// Code to open popup to sign up
var popup = document.getElementById('popup');
var signupBtn = document.getElementById('signup-btn');
var closeBtn = document.getElementById('close-btn');

signupBtn.onclick = function() {
    popup.style.display = 'block';
}

closeBtn.onclick = function() {
    popup.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}

// Code to go to the next page after entering login credentials
document.querySelector('.login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                // Store the entire user document in localStorage
                localStorage.setItem('userData', JSON.stringify(result.userDocument));
                window.location.href = 'home.html';
            } else {
                alert(result.message);
            }
        } else {
            alert('Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Code to handle signup with profile picture
document.querySelector('.signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const age = event.target.age.value;
    const password = event.target.password.value;
    const confirmPassword = event.target['confirm-password'].value;

    const profilePictureInput = event.target['profile-picture'];
    let profilePictureBase64 = null;

    // Convert the image file to a Base64 string if a file is selected
    if (profilePictureInput.files.length > 0) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
            profilePictureBase64 = reader.result.split(',')[1]; // Get Base64 string from data URL
            submitForm(); // Call the function to submit the form data after conversion
        };
        reader.readAsDataURL(file); // Convert file to data URL
    } else {
        submitForm(); // Call the function to submit the form data if no file is selected
    }

    async function submitForm() {
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, phone, age, password, confirmPassword, profilePicture: profilePictureBase64 })
            });

            if (response.ok) {
                const result = await response.json(); // Parse the JSON response
                if (result.success) {
                    alert('Signup successful!');
                    // Close the popup if signup was successful
                    document.getElementById('popup').style.display = 'none';
                    // Optionally redirect to another page or clear the form
                } else {
                    alert(result.message);
                }
            } else {
                const errorResult = await response.text(); // Parse as text if not JSON
                alert('Signup failed: ' + errorResult);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }
});
