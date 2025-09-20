import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // If Clerk has loaded and the user is NOT signed in, redirect to homepage.
    if (isLoaded && !isSignedIn) {
      navigate('/');
    }
  }, [isLoaded, isSignedIn, navigate]);

  // While Clerk is loading, don't show anything yet.
  if (!isLoaded) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-green-400 text-2xl font-mono animate-pulse">Loading Session...</div>
        </div>
    );
  }

  // If the user is signed in, render the protected content (the DashboardLayout).
  return isSignedIn ? children : null;
};

export default ProtectedRoute;