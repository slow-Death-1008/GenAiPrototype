import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Homepage from "./pages/Homepage";
import './App.css';
import { ThemeProvider } from "./contexts/Theme";
import ThemeBtn from "./components/ThemeBtn";

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="absolute bottom-4 right-4 z-50">
          <ThemeBtn />
        </div>
        <Router basename="GenAiPrototype">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

