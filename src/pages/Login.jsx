import React, { useEffect } from 'react';
import { SignIn, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const Login = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate(); // 2. Initialize useNavigate

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate('/dashboard'); // 3. Use navigate instead of window.location
    }
  }, [isSignedIn, isLoaded, navigate]);

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-green-400 text-2xl font-mono animate-pulse">Loading...</div>
      </div>
    );
  }

  // Don't render login if already signed in
  if (isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-green-400 text-xl font-mono">Redirecting to dashboard...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black font-mono">
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(57, 255, 20, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 255, 20, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Scanning lines */}
      <div className="absolute inset-0 -z-5">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-20"
          style={{
            animation: 'scan 10s linear infinite',
          }}
        />
      </div>

      {/* Main Login Container */}
      <div className="relative z-20 w-full max-w-md p-4">
        <div className="mb-8 text-center">
          <h1 
            className="text-4xl font-bold text-green-400 mb-2"
            style={{ textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14' }}
          >
            Welcome Back
          </h1>
          <p className="text-green-300/60 text-sm">
            Sign in to elevate your potential
          </p>
        </div>

        {/* Clerk SignIn Component with Custom Styling */}
        <div className="flex justify-center">
          <SignIn
            appearance={{
              variables: {
                colorPrimary: '#39FF14',
                colorBackground: 'rgba(0, 0, 0, 0.8)',
                colorText: '#39FF14',
                colorTextSecondary: 'rgba(57, 255, 20, 0.7)',
                colorInputBackground: 'rgba(0, 0, 0, 0.6)',
                colorInputText: '#39FF14',
                borderRadius: '12px',
                fontFamily: 'monospace',
              },
              elements: {
                // Main card styling
                card: {
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  borderRadius: '16px',
                  boxShadow: '0 0 30px rgba(57, 255, 20, 0.1)',
                },
                // Header styling
                headerTitle: {
                  color: '#39FF14',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  textShadow: '0 0 5px #39FF14',
                },
                headerSubtitle: {
                  color: 'rgba(57, 255, 20, 0.7)',
                },
                // Form elements
                formButtonPrimary: {
                  background: '#39FF14',
                  color: '#000000',
                  fontWeight: 'bold',
                  border: 'none',
                  boxShadow: '0 0 10px rgba(57, 255, 20, 0.3)',
                  '&:hover': {
                    background: '#2ECC40',
                    boxShadow: '0 0 15px rgba(57, 255, 20, 0.5)',
                  },
                },
                formFieldInput: {
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  color: '#39FF14',
                  '&:focus': {
                    borderColor: '#39FF14',
                    boxShadow: '0 0 0 2px rgba(57, 255, 20, 0.2)',
                  },
                  '&::placeholder': {
                    color: 'rgba(57, 255, 20, 0.5)',
                  },
                },
                formFieldLabel: {
                  color: '#39FF14',
                  fontWeight: '500',
                },
                // Social buttons
                socialButtonsBlockButton: {
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  color: '#39FF14',
                  '&:hover': {
                    background: 'rgba(57, 255, 20, 0.1)',
                    borderColor: '#39FF14',
                  },
                },
                // Links
                footerActionLink: {
                  color: '#39FF14',
                  '&:hover': {
                    color: '#2ECC40',
                  },
                },
                // Divider
                dividerLine: {
                  background: 'rgba(57, 255, 20, 0.3)',
                },
                dividerText: {
                  color: 'rgba(57, 255, 20, 0.7)',
                },
                // Other elements
                alertText: {
                  color: '#FF6B6B',
                },
                formResendCodeLink: {
                  color: '#39FF14',
                },
                otpCodeFieldInput: {
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  color: '#39FF14',
                },
              },
            }}
            redirectUrl="/GenAiPrototype/dashboard"
            signUpUrl="/GenAiPrototype/sign-up"
          />
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.href = '/GenAiPrototype/'}
            className="text-green-400/60 hover:text-green-400 transition-colors duration-200 text-sm font-mono underline"
          >
            ← Back to Homepage
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scan {
          0% { top: -2px; }
          100% { top: 100vh; }
        }
      `}</style>
    </div>
  );
};

export default Login;