// src/components/ChatComponent.js

import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Keeping styles in App.css

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Add user message to the chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Call the Lex API (assuming the API Gateway URL)
    try {
      const response = await axios.post('https://YOUR_API_GATEWAY_URL', {
        message: input
      });

      const lexResponse = response.data;
      // Add Lex's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: lexResponse.message || 'Something went wrong.' }
      ]);
    } catch (error) {
      console.error("Error calling Lex API: ", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error processing your request." }
      ]);
    }

    setInput("");  // Clear input after sending
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h1>Summarize a job posting URL</h1> {/* This heading is here */}
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user' ? 'user-message' : 'bot-message'}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          className="input-field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default ChatComponent;
