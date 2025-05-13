const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const username = prompt('What is your name?')
appendMessage('You joined', 'system-message')
socket.emit('new-user', username)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, 'other-message')
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`, 'system-message')
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`, 'system-message')
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    if (message.trim() !== '') {
        appendMessage(`You: ${message}`, 'user-message')
        socket.emit('send-chat-message', message)
        messageInput.value = ''
    }
})

function appendMessage(message, messageClass) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add(messageClass)
    messageContainer.append(messageElement)
    // Auto-scroll to the latest message
    messageContainer.scrollTop = messageContainer.scrollHeight
}