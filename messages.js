document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const inputElement = document.getElementById('chat-input');
    const message = inputElement.value.trim();

    if (message) {
        addMessage(message, 'user-message');
        inputElement.value = '';

        // Simulate bot response
        setTimeout(() => {
            addMessage('This is a bot response.', 'bot-message');
        }, 1000);
    }
}

function addMessage(text, className) {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;

    const messageText = document.createElement('p');
    messageText.textContent = text;

    messageDiv.appendChild(messageText);
    chatWindow.appendChild(messageDiv);

    // Scroll to the bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function goToPage() {
    window.location.href = 'home.html'; // Replace with your actual URL
}
