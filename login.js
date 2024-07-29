document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    // Perform any validation or processing here

    // Redirect to a new page
    window.location.href = 'home.html'; // Replace with your target URL
});


// Get the popup element
var popup = document.getElementById('popup');

// Get the button that opens the popup
var signupBtn = document.getElementById('signup-btn');

// Get the <span> element that closes the popup
var closeBtn = document.getElementById('close-btn');

// When the user clicks the button, open the popup 
signupBtn.onclick = function() {
    popup.style.display = 'block';
}

// When the user clicks on <span> (x), close the popup
closeBtn.onclick = function() {
    popup.style.display = 'none';
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}
