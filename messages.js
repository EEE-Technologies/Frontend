document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const inputElement = document.getElementById('chat-input');
    const message = inputElement.value.trim();

    if (message) {
        addMessage(message, 'user-message');
        inputElement.value = '';

        // Simulate bot response
        setTimeout(() => {
            addMessage('This is a bot response.', 'incoming-message');
        }, 1000);
    }
}


function goToPage() {
    window.location.href = 'home.html'; // Replace with your actual URL
}
document.getElementById('triggerHomeImage').addEventListener('click', goToPage);


function addMessagesFromJson(messages) {
    messages.forEach(message => {
        const className = message.type === 'sent' ? 'user-message' : 'incoming-message';
        addMessage(message.text, className);
    });
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

const userDataString = localStorage.getItem('userData');
const userData = JSON.parse(userDataString);
console.log(userData)


const messagesJson = [
    { "type": "sent", "text": "Hey, are you free to chat?" },
    { "type": "received", "text": "Yeah, I am. What's up?" },
    { "type": "sent", "text": "Just wanted to catch up. How's your project going?" },
    { "type": "received", "text": "It's going well, a bit hectic though. Deadlines are tight." },
    { "type": "received", "text": "What about yours?" },
    { "type": "sent", "text": "Same here. Trying to wrap up a few things by next week." },
    { "type": "sent", "text": "Also, I started a new hobby recently." },
    { "type": "received", "text": "Oh, what is it?" },
    { "type": "sent", "text": "Photography! I've been exploring different techniques." },
    { "type": "received", "text": "That's awesome! I've always wanted to try that." },
    { "type": "sent", "text": "You should! It's really fun and rewarding." },
    { "type": "received", "text": "Maybe I will. Any tips for a beginner?" },
    { "type": "sent", "text": "Start with the basics and practice a lot. Natural light is your best friend." },
    { "type": "received", "text": "Great, thanks for the tips!" },
    { "type": "received", "text": "Let's catch up more over the weekend?" },
    { "type": "sent", "text": "Sounds good. Looking forward to it!" }
];


addMessagesFromJson(messagesJson);
