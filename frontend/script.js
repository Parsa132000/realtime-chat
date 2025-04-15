let socket;

function connectWebSocket() {
    const room = document.getElementById("room").value.trim();
    const token = document.getElementById("token").value.trim();
  
    if (!token) {
      appendMessage("⚠️ Please enter a token.");
      return;
    }
  
    const backendUrl = "https://realtime-chat-kjm8.onrender.com";
    const socketUrl = backendUrl.replace(/^http/, "ws") + `/ws/${room}?token=${token}`;
  
    console.log("Connecting to:", socketUrl); // ✅ Debug log
  
    socket = new WebSocket(socketUrl);
  
    socket.onopen = () => appendMessage("✅ Connected to chat");
    socket.onmessage = (event) => appendMessage(event.data);
    socket.onclose = () => appendMessage("❌ Disconnected");
    socket.onerror = (error) => appendMessage("⚠️ Connection error");
  }
  

function appendMessage(msg) {
  const chat = document.getElementById("chat");
  chat.innerHTML += `<p>${msg}</p>`;
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const msg = document.getElementById("message").value.trim();
  if (!msg) return;

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(msg);
    document.getElementById("message").value = "";
  } else {
    appendMessage("⚠️ Not connected to chat.");
  }
}

window.onload = connectWebSocket;
