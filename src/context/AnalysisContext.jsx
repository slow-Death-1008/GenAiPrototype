import React, { createContext, useState } from 'react';

// Create the context
export const AnalysisContext = createContext();

// Create a provider component
export const AnalysisProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <AnalysisContext.Provider value={{ analysisData, setAnalysisData }}>
      {children}
    </AnalysisContext.Provider>
  );
};