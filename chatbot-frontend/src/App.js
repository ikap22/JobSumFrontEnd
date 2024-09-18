// src/App.js
import React from 'react';
import ChatComponent from './components/ChatComponent'; // Using ChatComponent now
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Removed duplicate header */}
      <ChatComponent />
    </div>
  );
}

export default App;
