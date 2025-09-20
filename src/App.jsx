import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Homepage from "./pages/Homepage";
import CareerPaths from "./pages/CareerPaths";
import SkillsAssessment from "./pages/SkillsAssessment";
import { AnalysisProvider } from './context/AnalysisContext';
import './App.css';

import { ClerkProvider } from '@clerk/clerk-react'
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <ClerkProvider publishableKey="pk_test_ZW5qb3llZC1tb25rZmlzaC0wLmNsZXJrLmFjY291bnRzLmRldiQ">
      <AnalysisProvider>
      <div className="relative min-h-screen bg-white dark:bg-gray-900  transition-colors duration-200">
        <Router basename="GenAiPrototype">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="career-paths" element={<CareerPaths />} />
              <Route path="skills-assessment" element={<SkillsAssessment />} />
            </Route>
          </Routes>
        </Router>
      </div>
      </AnalysisProvider>
      </ClerkProvider>
  );
}

export default App;

