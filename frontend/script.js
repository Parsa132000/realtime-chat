let socket;

function connectWebSocket() {
    const room = document.getElementById("room").value.trim();
    const token = document.getElementById("token").value.trim();
  
    if (!token) {
      appendMessage("⚠️ Please enter a token.");
      return;
    }
  
    // Close existing connection if any
    if (socket) {
        socket.close();
    }
  
    // Use WSS for HTTPS connections
    const backendUrl = "https://realtime-chat-kjm8.onrender.com";
    const socketUrl = backendUrl.replace(/^https?/, "wss") + `/ws/${room}?token=${token}`;
  
    appendMessage(`Attempting to connect to room: ${room}...`);
    console.log("Connecting to:", socketUrl);
  
    socket = new WebSocket(socketUrl);
  
    socket.onopen = () => {
        appendMessage("✅ Connected to chat");
        console.log("WebSocket connection established");
    };
    socket.onmessage = (event) => appendMessage(event.data);
    socket.onclose = (event) => {
        appendMessage(`❌ Disconnected (code: ${event.code}, reason: ${event.reason || "none"})`);
        console.log("WebSocket closed:", event);
    };
    socket.onerror = (error) => {
        appendMessage("⚠️ Connection error. Check console for details.");
        console.error("WebSocket error:", error);
    };
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
    appendMessage("⚠️ Not connected to chat. Please connect first.");
  }
}

// Remove auto-connect to require explicit connect button click
// window.onload = connectWebSocket;





















// let socket;

// function connectWebSocket() {
//     const room = document.getElementById("room").value.trim();
//     const token = document.getElementById("token").value.trim();
  
//     if (!token) {
//       appendMessage("⚠️ Please enter a token. Get one from the /login endpoint first.");
//       return;
//     }
  
//     // Close existing connection if any
//     if (socket) {
//         socket.close();
//     }
  
//     // Use the same origin for WebSocket connection or configure this properly
//     const backendUrl = "https://realtime-chat-kjm8.onrender.com"; // Update this to your actual backend
//     const socketUrl = backendUrl.replace(/^http/, "ws") + `/ws/${room}?token=${token}`;
  
//     appendMessage(`Connecting to room: ${room}...`);
//     console.log("Connecting to:", socketUrl);
  
//     socket = new WebSocket(socketUrl);
  
//     socket.onopen = () => appendMessage("✅ Connected to chat");
//     socket.onmessage = (event) => appendMessage(event.data);
//     socket.onclose = () => appendMessage("❌ Disconnected");
//     socket.onerror = (error) => {
//         appendMessage("⚠️ Connection error. Make sure your backend is running and accessible.");
//         console.error("WebSocket error:", error);
//     };
// }

// function appendMessage(msg) {
//   const chat = document.getElementById("chat");
//   chat.innerHTML += `<p>${msg}</p>`;
//   chat.scrollTop = chat.scrollHeight;
// }

// function sendMessage() {
//   const msg = document.getElementById("message").value.trim();
//   if (!msg) return;

//   if (socket && socket.readyState === WebSocket.OPEN) {
//     socket.send(msg);
//     document.getElementById("message").value = "";
//   } else {
//     appendMessage("⚠️ Not connected to chat. Please connect first.");
//   }
// }

// Don't connect automatically
// window.onload = connectWebSocket;



















// let socket;

// function connectWebSocket() {
//   const room = document.getElementById("room").value;
//   const token = document.getElementById("token").value;

//   // Replace this with your actual deployed FastAPI WebSocket URL
//   const socketUrl = `wss://realtime-chat-kjm8.onrender.com/ws/${room}?token=${token}`;
//   socket = new WebSocket(socketUrl);

//   socket.onopen = () => appendMessage("✅ Connected to chat");
//   socket.onmessage = (event) => appendMessage(event.data);
//   socket.onclose = () => appendMessage("❌ Disconnected");
// }

// function appendMessage(msg) {
//   const chat = document.getElementById("chat");
//   chat.innerHTML += `<p>${msg}</p>`;
//   chat.scrollTop = chat.scrollHeight;
// }

// function sendMessage() {
//   const msg = document.getElementById("message").value;
//   if (socket && socket.readyState === WebSocket.OPEN) {
//     socket.send(msg);
//     document.getElementById("message").value = "";
//   } else {
//     appendMessage("⚠️ Not connected to chat.");
//   }
// }

// window.onload = connectWebSocket;
