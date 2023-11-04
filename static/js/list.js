// list.js

let chatHistory = []; // 채팅 내용을 저장할 배열

function addChatToHistory(nickname, content) {
    // 전송된 채팅을 배열에 추가
    chatHistory.push({ nickname, content });
    // 저장된 채팅 내용을 로컬 스토리지에 업데이트
    updateChatHistoryInLocalStorage();
}

function loadChatHistoryFromLocalStorage() {
    // 로컬 스토리지에서 채팅 내용을 불러오기
    const storedChatHistory = localStorage.getItem('chatHistory');
    if (storedChatHistory) {
        chatHistory = JSON.parse(storedChatHistory);
    }
}

function updateChatHistoryInLocalStorage() {
    // 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function displayChatHistory() {
    // 저장된 채팅 내용을 화면에 표시
    const postSection = document.getElementById('post-section');
    postSection.innerHTML = '';
    chatHistory.forEach(chat => {
        const article = document.createElement('article');
        article.innerHTML = `<h2>${chat.nickname}</h2><p>${chat.content}</p>`;
        postSection.appendChild(article);
    });
}

// 페이지 로드 시 실행되는 함수
document.addEventListener('DOMContentLoaded', function () {
    loadChatHistoryFromLocalStorage();
    displayChatHistory();
});

// 전송 버튼 클릭 시 실행되는 함수
function addChat() {
    const nickname = document.getElementById('nickname-input').value;
    const content = document.getElementById('chat-content').value;

    // 채팅 내용을 배열에 추가하고 로컬 스토리지에 업데이트
    addChatToHistory(nickname, content);
    // 화면에 채팅 내용 표시
    displayChatHistory();

    // 입력 필드 초기화
    document.getElementById('chat-content').value = '';
}
const roomName = JSON.parse(document.getElementById('room-name').textContent);
const chatSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/chat/' + roomName + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    document.querySelector('#chat-log').value += (data.message + '\n');
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus