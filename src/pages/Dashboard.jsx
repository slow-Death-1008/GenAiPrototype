import React from 'react';

// --- Placeholder ChatBox Component ---
// Styled to match the neon green theme.
const ChatBox = () => {
  const messages = [
    { from: 'ai', text: 'Hello! How can I help you navigate your career path today?' },
    { from: 'user', text: 'I\'m interested in jobs for a biology major.' },
    { from: 'ai', text: 'Great! With a biology degree, you could explore roles in research, healthcare, conservation, or even biotech sales. Do any of those areas spark your interest?' },
  ];

  return (
    <div className="flex flex-col h-[60vh] max-h-[700px] w-full bg-black/50 backdrop-blur-lg border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/10 overflow-hidden">
      {/* Message Display Area */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl ${msg.from === 'user' ? 'bg-green-500/20 text-green-300' : 'bg-gray-800/60 text-gray-300'}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/70 border-t border-green-500/30">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Tell me what's on your mind..."
            className="flex-1 p-3 bg-gray-900/50 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-white"
          />
          <button className="px-5 py-3 bg-green-600 text-black font-bold rounded-lg hover:bg-green-500 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Dashboard Component ---
const Dashboard = () => {
  const guidelines = [
    {
      icon: '💬',
      title: 'Start the Conversation',
      description: 'Tell me what\'s on your mind. Try "I\'m feeling lost in my career" or "Suggest jobs for a biology major."',
    },
    {
      icon: '🎯',
      title: 'Define Your Goals',
      description: 'I\'ll ask questions to understand your skills and ambitions to provide tailored suggestions.',
    },
    {
      icon: '🚀',
      title: 'Launch Your Plan',
      description: 'Receive a clear action plan—from recommended careers and courses to interview tips.',
    },
  ];

  return (
    <main className="relative min-h-screen w-full font-mono text-green-400 bg-black">
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8 p-4 sm:p-6 lg:p-8">
        <div className="w-full bg-black/50 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6 sm:p-8 text-center shadow-2xl shadow-green-500/10">
          <h2 
            className="text-3xl sm:text-4xl font-bold mb-2 text-green-400"
            style={{ textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14' }}
          >
            Your Future, Powered by AI.
          </h2>
          <p className="text-lg text-green-300/80 mb-8">
            Get instant, personalized career guidance. Here's how:
          </p>

          <ul className="space-y-6 text-left">
            {guidelines.map((item, index) => (
              <li key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-green-900/20 transition-colors">
                <div className="text-3xl pt-1">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-green-300">
                    {item.title}
                  </h3>
                  <p className="text-green-400/70 mt-1">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="w-full">
          <ChatBox />
        </div>
        
      </div>
    </main>
  );
};

export default Dashboard;
