const chatBox = document.querySelector('.chat-box');
let userMessages = [];
let assistantMessages = [];
let myDateTime = '';

    function updateScroll() {
        var chatBox = document.querySelector('.chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function spinner() {
        document.getElementById('loader').style.display = 'block';
        updateScroll();
    }

    function start() {
        const date = document.getElementById('date').value;
        const hour = document.getElementById('hour').value;
        if (date === "") {
            alert("생년월일을 입력해주세요.");
            return;
        }
        myDateTime = date + hour;
        document.getElementById('intro').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
    }

    const sendMessage = async () => {
        const chatInput = document.querySelector('.chat-input input');

        // if the input is empty, return
        if (!chatInput.value.trim()) return;

        chatInput.disabled = true;

        const chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message', 'user');
        chatMessage.innerHTML = `<p>${chatInput.value}</p>`;
        chatBox.appendChild(chatMessage);

        //userMessages 메세지 추가
        userMessages.push(chatInput.value);

        const astrologerMessage = document.createElement('div');
        astrologerMessage.classList.add('chat-message', 'bot');
        astrologerMessage.innerHTML = `
            <div class="loader" id="loader" style="display: block; vertical-align: middle; line-height: px" >
                <i class="fa fa-spinner fa-spin" style="display: inline-block; vertical-align: middle"></i>
                <p style="display: inline-block; vertical-align: middle">답변을 작성중입니다.</p>
            </div>
        `;
        chatBox.appendChild(astrologerMessage);

        const message = chatInput.value;
        chatInput.value = '답변 중에는 입력할 수 없습니다. 잠시만 기다려주세요.';

        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                myDateTime: myDateTime,
                userMessages: userMessages,
                assistantMessages: assistantMessages,
            })
        });

        const data = await response.json();
        document.getElementById('loader').style.display = 'none';

        //assistantMessages 메세지 추가
        assistantMessages.push(data.assistant);
        astrologerMessage.innerHTML = `<p class='assistant'>${data.assistant}</p>`;
        chatBox.appendChild(astrologerMessage);
        chatInput.disabled = false;
        chatInput.value = '';
        chatInput.focus();
    };

    document.querySelector('.chat-input button').addEventListener('click', sendMessage);
    
    // Add event listener for 'Enter' key
    document.querySelector('.chat-input input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
            spinner();
            
        }
    });