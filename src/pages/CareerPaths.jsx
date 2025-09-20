import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnalysisContext } from '../context/AnalysisContext';

const CareerPaths = () => {
  const { analysisData } = useContext(AnalysisContext);

  // This is a "guard clause". If there's no data, it returns this UI and stops.
  if (!analysisData || !analysisData.careerRecommendations) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center font-mono text-green-400 bg-black">
        <div className="text-center p-8 bg-black/50 border border-green-500/30 rounded-2xl">
          <h2 className="text-2xl font-bold text-green-300 mb-4">
            Unlock Your Personalized Career Path
          </h2>
          <p className="text-green-400/80 mb-6">
            Complete the skills assessment to generate career recommendations based on your resume.
          </p>
          <Link
            to="/dashboard/skills-assessment"
            className="bg-green-600 text-black font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors"
          >
            Start Assessment
          </Link>
        </div>
      </main>
    );
  }

  // If the code reaches this point, it means analysisData EXISTS.
  // We can now safely access its properties.
  const { suitableRoles, skillsToImprove } = analysisData.careerRecommendations;

  return (
    <main className="relative min-h-screen w-full font-mono text-green-400 bg-black">
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-8 text-center"
          style={{ textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14' }}
        >
          Your Personalized Career Paths
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suitableRoles.map((role, index) => (
            <div
              key={index}
              className="bg-black/50 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-green-300">{role}</h3>
              <p className="text-green-400/70 mb-4">
                A role suggested based on your skills profile. Focus on improving the recommended skills to excel.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-black/50 border border-green-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">Recommended Skills to Improve</h2>
          <div className="flex flex-wrap gap-2">
            {skillsToImprove.map((skill, idx) => (
              <span
                key={idx}
                className="bg-green-500/10 text-green-300 text-sm px-3 py-1 rounded-full border border-green-500/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CareerPaths;