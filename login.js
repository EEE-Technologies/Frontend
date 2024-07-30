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
        const response = await fetch('http://localhost:3000/login', { // Ensure URL and port are correct
            method: 'POST', // Ensure the method is POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
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
