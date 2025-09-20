import React, { useState, useContext, useRef, useEffect } from "react";
import { AnalysisContext } from '../context/AnalysisContext';

// Helper function to call the Groq API
const getGroqChatCompletion = async (userMessage, analysisData) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("Groq API key is not configured.");
    }

    // Create a summary of the resume analysis to send with the prompt
    const resumeSummary = analysisData
        ? `
        Here is the user's resume analysis summary:
        - Overall Score: ${analysisData.overallScore}
        - Suitable Roles: ${analysisData.careerRecommendations.suitableRoles.join(', ')}
        - Skills to Improve: ${analysisData.careerRecommendations.skillsToImprove.join(', ')}
        `
        : "The user has not provided a resume yet.";

    const prompt = `
        You are a helpful career assistant integrated into a website called "Elevate".
        Your goal is to provide supportive and insightful career guidance.
        ${resumeSummary}

        Based on this context, please answer the following user question: "${userMessage}"
    `;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama3-8b-8192', // Or another model you prefer
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch response from Groq API.");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Sorry, I couldn't get a response.";
};


const ChatBox = () => {
    const { analysisData } = useContext(AnalysisContext); // Get resume data from context
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you find your career path today?", sender: "assistant" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const assistantResponse = await getGroqChatCompletion(input, analysisData);
            setMessages(prev => [...prev, { text: assistantResponse, sender: "assistant" }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { text: "Sorry, something went wrong. Please try again.", sender: "assistant" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="font-mono bg-black/50 backdrop-blur-lg border border-green-500/30 text-green-400 shadow-2xl shadow-green-500/10 flex flex-col h-[70vh] rounded-2xl">
            <div className="flex justify-between items-center p-4 border-b border-green-500/30">
                <h3 className="font-bold text-lg" style={{ textShadow: '0 0 3px #39FF14' }}>
                    Chat Assistant
                </h3>
            </div>

            <div className="overflow-y-auto p-4 flex-1">
                <div className="flex flex-col gap-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm shadow-lg ${msg.sender === "user" ? "bg-green-700/60 text-green-100" : "bg-gray-800/60 text-green-300"}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                             <div className="max-w-[80%] rounded-xl px-4 py-2 text-sm bg-gray-800/60 text-green-300">
                                 <span className="animate-pulse">Thinking...</span>
                             </div>
                         </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="p-4 border-t border-green-500/30 flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={analysisData ? "Ask about your resume..." : "Ask a general career question..."}
                    className="flex-1 w-full px-3 py-3 border border-green-500/30 bg-gray-900/50 text-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    className="bg-green-600 cursor-pointer text-black font-bold px-5 py-2 rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;