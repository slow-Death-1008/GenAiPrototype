import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 600);

      return () => clearTimeout(timeoutId);
    }
  }, [index, text]);

  return (
    <div className="text-4xl sm:text-6xl md:text-7xl font-bold mask-linear-from-neutral-300 bg-clip-text bg-gradient-to-r from-teal-400 text-blue-50 via-blue-500 to-purple-500 mb-8 sm:mb-50">
      {displayedText}
      <span className="inline-block w-2 h-10 ml-1 sm:w-3 sm:h-12 bg-white animate-blink"></span>
    </div>
  );
};

export default Typewriter;