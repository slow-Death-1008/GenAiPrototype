import React from 'react';
import { useTheme } from '../contexts/Theme';
import bgVideo from '../assets/bganime3.mp4';

const CareerPaths = () => {
  const { themeMode } = useTheme();

  const careers = [
    {
      title: 'Software Development',
      description: 'Design and develop software applications',
      skills: ['Programming', 'Problem Solving', 'Software Design'],
      icon: '💻'
    },
    {
      title: 'Data Science',
      description: 'Analyze and interpret complex data sets',
      skills: ['Statistics', 'Machine Learning', 'Python'],
      icon: '📊'
    },
    {
      title: 'UI/UX Design',
      description: 'Create user-friendly digital experiences',
      skills: ['Design Thinking', 'User Research', 'Prototyping'],
      icon: '🎨'
    },
    {
      title: 'Cybersecurity',
      description: 'Protect systems and networks from threats',
      skills: ['Network Security', 'Ethical Hacking', 'Risk Management'],
      icon: '🔒'
    },
    {
      title: 'Digital Marketing',
      description: 'Promote brands and products online to reach customers',
      skills: ['SEO', 'Content Marketing', 'Social Media'],
      icon: '📈'
    },
    {
      title: 'Cloud Computing',
      description: 'Manage and maintain cloud infrastructure and services',
      skills: ['AWS/Azure/GCP', 'Virtualization', 'Networking'],
      icon: '☁️'
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden w-full font-sans text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Foreground Content */}
      <div className="relative z-10 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Career Paths</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career, index) => (
            <div 
              key={index} 
              className="bg-black/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow text-white"
            >
              <div className="text-4xl mb-4">{career.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
              <p className="text-gray-300 mb-4">{career.description}</p>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="bg-blue-100/20 text-blue-200 text-sm px-3 py-1 rounded-full border border-blue-400/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CareerPaths;
