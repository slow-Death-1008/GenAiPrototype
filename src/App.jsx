import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Homepage from "./pages/Homepage";
import CareerPaths from "./pages/CareerPaths";
import SkillsAssessment from "./pages/SkillsAssessment";
import './App.css';
import { ThemeProvider } from "./contexts/Theme";
import ThemeBtn from "./components/ThemeBtn";
import Dashboard from "./pages/Dashboard";

const ThemeButtonWrapper = () => {
  const location = useLocation();
  const showThemeButton = location.pathname.includes('/dashboard');
  
  return showThemeButton ? (
    <div className="absolute mr-4 bottom-4 right-4 ">
      <ThemeBtn />
    </div>
  ) : null;
};

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-white dark:bg-gray-900  transition-colors duration-200">
        <Router basename="GenAiPrototype">
          <ThemeButtonWrapper />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="career-paths" element={<CareerPaths />} />
              <Route path="skills-assessment" element={<SkillsAssessment />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

