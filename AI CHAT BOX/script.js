const chatBody = document.getElementById("chatBody");
const chatForm = document.getElementById("chatForm");
const msgInput = document.getElementById("msgInput");

let messages = JSON.parse(localStorage.getItem("messages")) || [];

// Render messages from localStorage on load
messages.forEach((msg) => addMessage(msg.text, msg.sender));

// Send message on submit
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMsg = msgInput.value.trim();
  if (!userMsg) return;

  addMessage(userMsg, "user");
  saveToLocalStorage(userMsg, "user");

  msgInput.value = "";

  
  const loadingMsg = addMessage("Typing...", "bot");

  try {
    const botResponse = await getAIResponse(userMsg);
    chatBody.removeChild(loadingMsg);
    addMessage(botResponse, "bot");
    saveToLocalStorage(botResponse, "bot");
  } catch (err) {
    chatBody.removeChild(loadingMsg);
    addMessage("Sorry, something went wrong.", "bot");
  }
});


function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg ${sender}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = text;
  msgDiv.appendChild(bubble);
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  return msgDiv;
}

// Save to localStorage
function saveToLocalStorage(text, sender) {
  messages.push({ text, sender });
  localStorage.setItem("messages", JSON.stringify(messages));
}


async function getAIResponse(prompt) {
  
  const fakeReplies = [
    "That's interesting!",
    "Can you explain more?",
    "I'm here to help you!",
    "Let's talk about something fun.",
    "Why do you think that is?",
    "I am Fine , How are You"
  ];
  await new Promise((res) => setTimeout(res, 1000)); // Simulate delay
  return fakeReplies[Math.floor(Math.random() * fakeReplies.length)];

  

  
}


