import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import RightSidebar from "../components/RightSidebar"
import Sidebar from "../components/Sidebar";
import ProfileModal from "../components/ProfileModal";

const FaBars = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
);

const FaCog = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>
);

// Animated Background Component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Floating particles
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // Circuit-like connections
    const connectionNodes = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      pulse: 0,
      pulseSpeed: Math.random() * 0.03 + 0.01,
    }));

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Draw grid background
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.globalAlpha = 0.3 + 0.1 * Math.sin(time + x * 0.01);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.globalAlpha = 0.3 + 0.1 * Math.sin(time + y * 0.01);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw floating particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulsePhase += particle.pulseSpeed;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= dx * force * 0.005;
          particle.y -= dy * force * 0.005;
        }

        // Draw particle with pulsing effect
        const pulseOpacity = particle.opacity + 0.2 * Math.sin(particle.pulsePhase);
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, pulseOpacity);
        ctx.fillStyle = '#39FF14';
        ctx.shadowColor = '#39FF14';
        ctx.shadowBlur = 8 + 4 * Math.sin(particle.pulsePhase);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Update and draw connection nodes
      connectionNodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Keep nodes in bounds
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Draw pulsing node
        ctx.save();
        ctx.globalAlpha = 0.4 + 0.3 * Math.sin(node.pulse);
        ctx.fillStyle = '#39FF14';
        ctx.shadowColor = '#39FF14';
        ctx.shadowBlur = 15 + 5 * Math.sin(node.pulse);
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3 + Math.sin(node.pulse), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections between nearby nodes
        connectionNodes.forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200 && distance > 0) {
            const opacity = (200 - distance) / 200 * 0.2;
            const pulseIntensity = 0.1 + 0.05 * Math.sin(time + distance * 0.01);
            
            ctx.save();
            ctx.globalAlpha = opacity + pulseIntensity;
            ctx.strokeStyle = '#39FF14';
            ctx.lineWidth = 0.5 + 0.3 * Math.sin(time + distance * 0.02);
            ctx.shadowColor = '#39FF14';
            ctx.shadowBlur = 3;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      // Scanning beam effect
      const beamY = (Math.sin(time * 0.3) * 0.5 + 0.5) * canvas.height;
      ctx.save();
      ctx.globalAlpha = 0.1 + 0.05 * Math.sin(time * 2);
      ctx.fillStyle = 'rgba(57, 255, 20, 0.1)';
      ctx.shadowColor = '#39FF14';
      ctx.shadowBlur = 20;
      ctx.fillRect(0, beamY - 2, canvas.width, 4);
      ctx.restore();

      // Energy pulses along edges
      const pulseProgress = (time * 0.5) % 1;
      const edgePositions = [
        { x: pulseProgress * canvas.width, y: 20 },
        { x: canvas.width - 20, y: pulseProgress * canvas.height },
        { x: (1 - pulseProgress) * canvas.width, y: canvas.height - 20 },
        { x: 20, y: (1 - pulseProgress) * canvas.height },
      ];

      edgePositions.forEach((pos, index) => {
        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = '#39FF14';
        ctx.shadowColor = '#39FF14';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      resizeCanvas();
      // Redistribute particles and nodes
      particles.forEach((particle) => {
        if (particle.x > canvas.width) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = canvas.height;
      });
      connectionNodes.forEach((node) => {
        if (node.x > canvas.width) node.x = canvas.width;
        if (node.y > canvas.height) node.y = canvas.height;
      });
    };

    animate();
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -5 }}
    />
  );
};

// --- Main Dashboard Layout Component ---
const DashboardLayout = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Using a simple state instead of localStorage for this example
    const [profile, setProfile] = useState({ name: "Neon User", image: "" });

    const handleProfileSave = (newProfile) => {
        setProfile(newProfile);
    };

    return (
        <div className="relative flex h-screen font-mono text-green-400 bg-black">
            {/* Animated Background */}
            <AnimatedBackground />
            
            {/* Original background overlay */}
            <div className="absolute inset-0 bg-black/60 -z-10"></div>

            {/* Additional animated elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -8 }}>
                {/* Floating orbs */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-10 animate-pulse"
                        style={{
                            width: `${Math.random() * 150 + 80}px`,
                            height: `${Math.random() * 150 + 80}px`,
                            background: `radial-gradient(circle, rgba(57, 255, 20, ${0.2 + Math.random() * 0.3}) 0%, transparent 70%)`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${4 + Math.random() * 6}s`,
                            filter: 'blur(1px)',
                        }}
                    />
                ))}
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-32 h-32">
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-green-400/40 animate-pulse"></div>
                    <div className="absolute top-8 left-8 w-2 h-2 bg-green-400/60 rounded-full animate-ping"></div>
                </div>
                
                <div className="absolute top-0 right-0 w-32 h-32">
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-green-400/40 animate-pulse"></div>
                    <div className="absolute top-8 right-8 w-2 h-2 bg-green-400/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-32 h-32">
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-green-400/40 animate-pulse"></div>
                    <div className="absolute bottom-8 left-8 w-2 h-2 bg-green-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
                
                <div className="absolute bottom-0 right-0 w-32 h-32">
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-green-400/40 animate-pulse"></div>
                    <div className="absolute bottom-8 right-8 w-2 h-2 bg-green-400/60 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                </div>
            </div>

            <Sidebar 
                isOpen={isMobileSidebarOpen} 
                onClose={() => setIsMobileSidebarOpen(false)}
                onSettingsClick={() => setIsRightSidebarOpen(true)} 
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="md:hidden p-4 flex justify-between items-center bg-black/50 border-b border-green-500/30 backdrop-blur-sm">
                    <button onClick={() => setIsMobileSidebarOpen(true)} className="text-green-400 cursor-pointer hover:text-white transition-colors text-2xl">
                        <FaBars />
                    </button>
                    <h1 className="text-lg font-bold">Dashboard</h1>
                    <button onClick={() => setIsRightSidebarOpen(true)} className="text-green-400 cursor-pointer hover:text-white transition-colors text-2xl">
                        <FaCog />
                    </button>
                </header>
                
                <main className="flex-1 overflow-y-auto">
                    {/* This is the key change: Outlet renders the nested routes */}
                    <Outlet />
                </main>
            </div>

            <RightSidebar
                isOpen={isRightSidebarOpen}
                onClose={() => setIsRightSidebarOpen(false)}
                profile={profile}
                onProfileClick={() => setIsProfileModalOpen(true)}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                currentName={profile.name}
                currentImage={profile.image}
                onSave={handleProfileSave}
            />
        </div>
    );
};

export default DashboardLayout;