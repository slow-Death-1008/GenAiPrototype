import React from 'react';
import ChatBox from '../components/ChatBox';



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
    <main className="relative min-h-screen w-full font-mono text-green-400 bg-transparent">

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8 p-4 sm:p-6 lg:p-8">
        <div className="w-full bg-transparent/50 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6 sm:p-8 text-center shadow-2xl shadow-green-500/10">
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
