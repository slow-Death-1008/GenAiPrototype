import { useState, Suspense, lazy } from "react"; // <-- Import Suspense and lazy
import { useNavigate } from "react-router-dom";
import React from "react";
import { useTheme } from "../contexts/Theme";
import { FcGoogle } from "react-icons/fc";

// Step 1: Dynamically import the Spline component using React.lazy
const Spline = lazy(() => import('@splinetool/react-spline'));

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { themeMode } = useTheme();
    
    // Step 2: Create a state to manage the loading status of the Spline scene
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            navigate("/dashboard");
        }
    };

    const handleGoogleLogin = () => {
        console.log("Attempting to sign in with Google...");
        navigate("/dashboard");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            {/* Optimized Spline background */}
            {/* The Suspense component shows a fallback (a simple bg color) while Spline loads */}
            <Suspense fallback={<div className="absolute inset-0 w-full h-full bg-gray-900" />}>
                <div 
                  className={`
                    absolute inset-0 w-full h-full z-10 
                    transition-opacity duration-1000 ease-in
                    ${isSplineLoaded ? 'opacity-100' : 'opacity-0'}
                  `}
                >
                    <Spline
                        scene="https://prod.spline.design/vgdVwJ8bmMH60PnN/scene.splinecode"
                        onLoad={() => setIsSplineLoaded(true)} // <-- Update state when loaded
                    />
                </div>
            </Suspense>

            {/* Glass Box (z-20) remains on top and is visible immediately */}
            <div className="relative z-20 max-w-md w-full space-y-8">
                <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-md border border-white/30 dark:border-gray-600/30 rounded-xl shadow-lg p-8">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>

                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email address"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm backdrop-blur-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm backdrop-blur-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="mt-6 flex items-center justify-center">
                        <div className="border-t border-gray-400 dark:border-gray-500 flex-grow"></div>
                        <span className="mx-4 text-sm text-gray-600 dark:text-gray-300">OR</span>
                        <div className="border-t border-gray-400 dark:border-gray-500 flex-grow"></div>
                    </div>

                    {/* Google Login Button */}
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex cursor-pointer items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/50 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            <FcGoogle className="h-5 w-5 mr-3" aria-hidden="true" />
                            Continue with Google
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;