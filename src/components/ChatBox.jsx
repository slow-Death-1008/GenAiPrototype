import React from "react";
import { useState } from "react";
import { useTheme } from "../contexts/Theme";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  const { themeMode } = useTheme();

  return (
    // Main container with positioning and base styles
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out flex flex-col ${
      isFullscreen 
        ? 'fixed top-0 left-0 w-full h-full z-50 rounded-none' 
        : 'w-full h-80' // Set a default height for non-fullscreen mode
    }`}>
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2 flex-shrink-0">
        <h3 className="font-bold dark:text-white">Chat Assistant</h3>
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a2 2 0 012-2h2V3H7a4 4 0 00-4 4v2h2zm10 0V7a2 2 0 00-2-2h-2V3h2a4 4 0 014 4v2h-2zm-10 2v2a2 2 0 002 2h2v2H7a4 4 0 01-4-4v-2h2zm10 0v2a2 2 0 01-2 2h-2v2h2a4 4 0 004-4v-2h-2z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Messages Area - This will grow to fill available space */}
      <div className="overflow-y-auto border dark:border-gray-700 p-2 rounded-md mb-2 flex-1 min-h-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-700 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex gap-2 flex-shrink-0">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          // FIX: Added min-w-0 to allow the input to shrink
          className="border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-2 flex-1 min-w-0"
        />
        <button 
          onClick={handleSend} 
          // FIX: Added flex-shrink-0 to prevent the button from shrinking
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md flex-shrink-0"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
