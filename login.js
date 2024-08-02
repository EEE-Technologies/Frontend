// code to open popup to sign up
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

        // Debugging: Log the response status and headers

        if (response.ok) {
            const result = await response.json();

            if (result.success) {
                // Store the entire user document in localStorage
                localStorage.setItem('userData', JSON.stringify(result.user));
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


document.querySelector('.signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const age = event.target.age.value;
    const password = event.target.password.value;
    const confirmPassword = event.target['confirm-password'].value;

    try {
        const response = await fetch('http://localhost:3000/signup', { // Ensure URL is correct
            method: 'POST', // Ensure the method is POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, phone, age, password, confirmPassword })
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
});


