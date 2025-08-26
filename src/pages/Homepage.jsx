import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/Theme';

// Lazily import the Spline component for better performance
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const Homepage = () => {
  const navigate = useNavigate();
  const { themeMode } = useTheme();
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  // --- NEW RESPONSIVE FUNCTIONALITY ---
  // 1. Define the URLs for your desktop (landscape) and mobile (portrait) scenes
  const desktopScene = "https://prod.spline.design/eO6WnCutru1tWRjm/scene.splinecode";
  const mobileScene = "https://prod.spline.design/vgdVwJ8bmMH60PnN/scene.splinecode";

  // 2. Create state to hold the current scene URL
  const [currentScene, setCurrentScene] = useState(desktopScene);

  // 3. Use useEffect to detect window size and set the appropriate scene
  useEffect(() => {
    // This function checks the window dimensions and updates the scene
    const handleResize = () => {
      // If width is less than height, it's a portrait view (mobile)
      if (window.innerWidth < window.innerHeight) {
        setCurrentScene(mobileScene);
      } else {
        setCurrentScene(desktopScene);
      }
      // Reset the loaded state to allow the fade-in effect for the new scene
      setIsSplineLoaded(false);
    };

    // Run the check once on initial component load
    handleResize();

    // Add an event listener to run the check whenever the window is resized
    window.addEventListener('resize', handleResize);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      <Suspense fallback={<div className="absolute inset-0 w-full h-full bg-gray-950" />}>
        <div 
          className={`
            absolute inset-0 w-full h-full z-10 
            transition-opacity duration-1000 ease-in
            ${isSplineLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* 4. Use the state variable to set the scene dynamically */}
          <Spline
            // The key prop is crucial. It tells React to create a new instance
            // of the Spline component when the URL changes, forcing it to reload.
            key={currentScene}
            className="absolute inset-0 w-max h-max"
            scene={currentScene}
            onLoad={handleSplineLoad}
          />
        </div>
      </Suspense>

      <div className="flex items-center justify-center h-screen relative z-20 px-4"> 
        <div className="relative group">
          <button
            onClick={() => navigate('/login')}
            className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <span
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            ></span>
            
            <span className="relative z-10 block px-5 py-3 rounded-xl bg-gray-950 sm:px-6 sm:py-3">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1 text-sm sm:text-base">
                  Let's get started
                </span>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:translate-x-1"
                  data-slot="icon"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
