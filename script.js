const chatBox = document.querySelector('.chat-box');

    const sendMessage = async () => {
        const chatInput = document.querySelector('.chat-input input');

        // if the input is empty, return
        if (!chatInput.value.trim()) return;

        const chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message', 'user');
        chatMessage.innerHTML = `<p>${chatInput.value}</p>`;
        chatBox.appendChild(chatMessage);

        const message = chatInput.value;
        chatInput.value = '';

        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: chatInput.value
            })
        });

        const data = await response.json();

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