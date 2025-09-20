import React, { useState, useEffect, useRef } from 'react';
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
// An advanced Typewriter component with a neon glitch effect and randomized speed.
const NeonGlitchedTypewriter = ({ text, phrases }) => {
  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeoutId;

    if (!isDeleting && charIndex < currentPhrase.length) {
      // Typing logic
      const speed = Math.random() * 100 + 50; // Randomized typing speed
      timeoutId = setTimeout(() => {
        setCurrentText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
    } else if (isDeleting && charIndex > 0) {
      // Deleting logic
      const speed = Math.random() * 50 + 30; // Faster deleting speed
      timeoutId = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, speed);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of a phrase
      timeoutId = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      // Move to the next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return (
    <div className="text-center font-mono">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-cyan-400 to-green-300 mb-8 relative">
            {text}{' '}
            <span className="text-green-400" style={{ textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14' }}>
            {currentText.split('').map((char, index) => (
                <span key={index} className="glitch-char-container relative inline-block">
                {char}
                </span>
            ))}
            <span 
                className="inline-block w-1.5 h-16 ml-2 bg-green-400 animate-pulse"
                style={{ boxShadow: '0 0 8px #39FF14' }}
            ></span>
            </span>
        </h1>
    </div>
  );
};

// Interactive background component with floating particles and grid
const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // Draw grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.1)';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      drawGrid();

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= dx * force * 0.01;
          particle.y -= dy * force * 0.01;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#39FF14';
        ctx.shadowColor = '#39FF14';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.save();
              ctx.globalAlpha = (100 - distance) / 100 * 0.3;
              ctx.strokeStyle = '#39FF14';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize
    initParticles();
    animate();

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ background: 'radial-gradient(ellipse at center, rgba(0, 20, 0, 0.8) 0%, rgba(0, 0, 0, 1) 70%)' }}
    />
  );
};

// Custom Clerk Sign In Button with Neon Styling
const CustomSignInButton = ({ isSignedIn, userName }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  };

  if (isSignedIn) {
    return (
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-lime-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <button
          onClick={handleNavigate}
          className="relative inline-block p-px font-semibold leading-6 text-white bg-black rounded-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 block px-6 py-3 rounded-xl bg-black/90 sm:px-8 sm:py-4">
            <div className="relative z-10 flex items-center space-x-2 text-green-400 group-hover:text-white transition-colors duration-300">
              <span className="transition-all duration-500 text-sm sm:text-base">
                Welcome back, {userName}! Enter Dashboard
              </span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:translate-x-1"
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
    );
  }

  return (
    <SignInButton
      mode="modal"
      appearance={{
        variables: {
          colorPrimary: '#39FF14',
          colorText: '#39FF14',
          colorBackground: '#000000',
          colorInputBackground: 'rgba(0, 0, 0, 0.5)',
          colorInputText: '#39FF14',
          borderRadius: '12px',
        },
        elements: {
          formButtonPrimary: 'bg-green-500 hover:bg-green-400 text-black font-bold',
          card: 'bg-black/90 backdrop-blur-lg border border-green-500/30',
        }
      }}
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-lime-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <button className="relative inline-block p-px font-semibold leading-6 text-white bg-black rounded-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
          <span className="relative z-10 block px-6 py-3 rounded-xl bg-black/90 sm:px-8 sm:py-4">
            <div className="relative z-10 flex items-center space-x-2 text-green-400 group-hover:text-white transition-colors duration-300">
              <span className="transition-all duration-500 text-sm sm:text-base">
                Let's get started
              </span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:translate-x-1"
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
    </SignInButton>
  );
};

// The main Homepage component with Clerk integration
const Homepage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const phrases = [
    "Your  Skills.",
    "Your  Career.",
    "Your  Future.",
    "Your  Potential.",
  ];

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return (
      <div className="relative h-screen w-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-green-400 text-2xl font-mono animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Interactive background */}
      <InteractiveBackground />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              background: 'radial-gradient(circle, rgba(57, 255, 20, 0.3) 0%, transparent 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Scanning lines */}
        <div className="absolute inset-0">
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30"
            style={{
              animation: 'scan 8s linear infinite',
              animationDelay: '0s',
            }}
          />
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-20"
            style={{
              animation: 'scan 12s linear infinite',
              animationDelay: '2s',
            }}
          />
        </div>
      </div>

      {/* Main content container, centered over the background */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center gap-10">
          {/* The advanced typewriter effect title */}
          <NeonGlitchedTypewriter text="Elevate" phrases={phrases} />

          {/* Clerk-integrated button */}
          <CustomSignInButton 
            isSignedIn={isSignedIn} 
            userName={user?.firstName || user?.username || 'User'} 
          />

          {/* User status indicator */}
          {isSignedIn && (
            <div className="text-green-400/60 text-sm font-mono">
              Signed in as {user?.emailAddresses?.[0]?.emailAddress}
            </div>
          )}
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes scan {
          0% { top: -2px; }
          100% { top: 100vh; }
        }
        
        @keyframes blink {
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
        
        @keyframes tilt {
          0%, 50%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;