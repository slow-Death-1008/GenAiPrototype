import React, { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you find your career path today?", sender: "assistant" }
  ]);
  const [input, setInput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulate assistant response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: "Analyzing your request... please wait.", sender: "assistant" },
      ]);
    }, 1000);
  };

  return (
    <div className={`font-mono bg-black/50 backdrop-blur-lg border border-green-500/30 text-green-400 shadow-2xl shadow-green-500/10 transition-all duration-300 ease-in-out flex flex-col ${
      isFullscreen 
        ? 'fixed top-0 left-0 w-full h-full z-50 rounded-none' 
        : 'w-full h-[60vh] sm:h-[70vh] rounded-2xl' 
    }`}>
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-green-500/30 flex-shrink-0">
        <h3 
            className="font-bold text-lg"
            style={{ textShadow: '0 0 3px #39FF14' }}
        >
            Chat Assistant
        </h3>
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 cursor-pointer hover:bg-green-900/40 rounded-full transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a2 2 0 012-2h2V3H7a4 4 0 00-4 4v2h2zm10 0V7a2 2 0 00-2-2h-2V3h2a4 4 0 014 4v2h-2zm-10 2v2a2 2 0 002 2h2v2H7a4 4 0 01-4-4v-2h2zm10 0v2a2 2 0 01-2 2h-2v2h2a4 4 0 004-4v-2h-2z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Message Area */}
      <div className="overflow-y-auto p-4 flex-1 min-h-0">
        <div className="flex flex-col gap-4">
            {messages.map((msg, i) => (
            <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
                <div
                className={`max-w-[80%] rounded-xl px-4 py-2 text-sm shadow-lg ${
                    msg.sender === "user"
                    ? "bg-green-700/60 text-green-100 rounded-br-none shadow-green-900/20"
                    : "bg-gray-800/60 text-green-300 rounded-bl-none border border-green-800/50 shadow-gray-900/20"
                }`}
                >
                {msg.text}
                </div>
            </div>
            ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-green-500/30 flex gap-2 flex-shrink-0">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 min-w-0 appearance-none w-full px-3 py-3 border border-green-500/30 bg-gray-900/50 text-green-300 placeholder-green-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button 
          onClick={handleSend} 
          className="bg-green-600 cursor-pointer text-black font-bold px-5 py-2 rounded-lg hover:bg-green-500 transition-colors flex-shrink-0"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
