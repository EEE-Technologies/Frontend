
/**
         * Function to send a message from sender to receiver
         * @param {string} sender - The username of the sender
         * @param {string} receiver - The username of the receiver
         * @param {string} message - The message text
         * @returns {Promise<void>}
         */
async function sendMessage(sender, receiver, message) {
    try {
        const response = await fetch('http://localhost:3000/api/add-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: sender,
                receiver: receiver,
                message: {
                    text: message
                }
            })
        });

        const data = await response.json();

        if (data.success) {
            console.log('Message sent successfully:', data.message);
        } else {
            console.error('Failed to send message:', data.message);
        }
    } catch (error) {
        console.error('Error sending message:', error.message);
    }
}

// Event listener for button click
document.getElementById('send-button').addEventListener('click', () => {
    const localJsonString = localStorage.getItem('userData');
    const localUserName = JSON.parse(localJsonString).user.name;
    const localTargetUser = localStorage.getItem('targetUserChat');

    console.log(localUserName, localTargetUser)
    
    // const sender = document.getElementById('sender-input').value.trim();
    // const receiver = document.getElementById('receiver-input').value.trim();
    const message = document.getElementById('message-input').value.trim();

    if (localUserName && localTargetUser && message) {
        sendMessage(localUserName, localTargetUser, message);
    } else {
        console.error('Please fill in all fields');
    }
});
  


// Funtion to go to the home page
function goToPage() {
    window.location.href = 'home.html'; // Replace with your actual URL
}
document.getElementById('triggerHomeImage').addEventListener('click', goToPage);


// Function to add all of the messages from mongodb to populate the messages page
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

const jsonString = localStorage.getItem('userData');
const userData = JSON.parse(jsonString);
userChatLogs = userData.user.messageDataList
const targetUser = localStorage.getItem('targetUserChat');

console.log(userData, targetUser)

for (const item of userChatLogs){
    if(item.username === targetUser){
        console.log(item.messagesJson)
        messagesJson = item.messagesJson
    }
} 
if (messagesJson){
    addMessagesFromJson(messagesJson);
}
else{
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

}
