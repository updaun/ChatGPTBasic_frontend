const chatBox = document.querySelector('.chat-box');
let userMessages = [];
let assistantMessages = [];

    const sendMessage = async () => {
        const chatInput = document.querySelector('.chat-input input');

        // if the input is empty, return
        if (!chatInput.value.trim()) return;

        const chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message', 'user');
        chatMessage.innerHTML = `<p>${chatInput.value}</p>`;
        chatBox.appendChild(chatMessage);

        //userMessages 메세지 추가
        userMessages.push(chatInput.value);

        const message = chatInput.value;
        chatInput.value = '';

        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMessages: userMessages,
                assistantMessages: assistantMessages,
            })
        });

        const data = await response.json();

        //assistantMessages 메세지 추가
        assistantMessages.push(data.assistant);

        const astrologerMessage = document.createElement('div');
        astrologerMessage.classList.add('chat-message', 'bot');
        astrologerMessage.innerHTML = `<p class='assistant'>${data.assistant}</p>`;
        chatBox.appendChild(astrologerMessage);
    };

    document.querySelector('.chat-input button').addEventListener('click', sendMessage);
    
    // Add event listener for 'Enter' key
    document.querySelector('.chat-input input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });