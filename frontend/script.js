let socket;

function connectWebSocket() {
  const room = document.getElementById("room").value;
  const token = document.getElementById("token").value;

  // Replace this with your actual deployed FastAPI WebSocket URL
  const socketUrl = `wss://realtime-chat-kjm8.onrender.com/ws/${room}?token=${token}`;
  socket = new WebSocket(socketUrl);

  socket.onopen = () => appendMessage("✅ Connected to chat");
  socket.onmessage = (event) => appendMessage(event.data);
  socket.onclose = () => appendMessage("❌ Disconnected");
}

function appendMessage(msg) {
  const chat = document.getElementById("chat");
  chat.innerHTML += `<p>${msg}</p>`;
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const msg = document.getElementById("message").value;
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(msg);
    document.getElementById("message").value = "";
  } else {
    appendMessage("⚠️ Not connected to chat.");
  }
}

window.onload = connectWebSocket;
