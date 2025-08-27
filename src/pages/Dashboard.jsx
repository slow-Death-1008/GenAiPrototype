
import ChatBox from "../components/ChatBox";
import bgVideo from '../assets/bganime3.mp4';


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
    <main className="relative min-h-screen overflow-hidden w-full font-sans text-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8 p-4 sm:p-6 lg:p-8">
        <div className="w-full bg-black/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-teal-300 text-transparent bg-clip-text">
            Your Future, Powered by AI.
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Get instant, personalized career guidance. Here's how:
          </p>

          <ul className="space-y-6 text-left">
            {guidelines.map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="text-2xl pt-1">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

       
        <div className="w-full h-xl">
          <ChatBox />
        </div>
        
      </div>
    </main>
  );
};

export default Dashboard;
