import React, { useState, useRef, useEffect } from 'react';

const INITIAL_OUTPUT = [
    { text: "╔══════════════════════════════════════════════════════════════╗", type: 'system' },
    { text: "║                Welcome to Alamin's AI Portfolio v2.0         ║", type: 'system' },
    { text: "║                   Powered by Gemini AI 🤖                   ║", type: 'system' },
    { text: "╚══════════════════════════════════════════════════════════════╝", type: 'system' },
    { text: '', type: 'empty' },
    { text: '🎯 About Me: Java Developer | ML Enthusiast | Tech Explorer', type: 'system' },
    { text: '📍 Location: Dhaka, Bangladesh', type: 'system' },
    { text: '🎓 Currently studying CSE at IUBAT University', type: 'system' },
    { text: '💼 Previous: Technical Support Engineer', type: 'system' },
    { text: '', type: 'empty' },
    { text: '💡 Try asking:', type: 'system' },
    { text: '  • "What projects have you built?"', type: 'system' },
    { text: '  • "Tell me about your technical skills"', type: 'system' },
    { text: '  • "What is your experience with AI/ML?"', type: 'system' },
    { text: '  • "How can I contact you?"', type: 'system' },
    { text: '', type: 'empty' },
    { text: '🔧 Special commands:', type: 'system' },
    { text: '  • "help" - Show all available commands', type: 'system' },
    { text: '  • "clear" - Clear terminal screen', type: 'system' },
    { text: '  • Use ↑/↓ arrows for command history', type: 'system' },
    { text: '', type: 'empty' },
    { text: "🚀 Ready to chat! Type your question below...", type: "prompt" }
];

const AIPortfolio = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState(INITIAL_OUTPUT);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorTrail, setCursorTrail] = useState([]);
    const inputRef = useRef(null);
    const terminalBodyRef = useRef(null);

    // Mouse tracking for interactive effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            
            // Add trail effect
            setCursorTrail(prev => {
                const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
                return newTrail.slice(-15); // Keep last 15 positions
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Remove old trail points
    useEffect(() => {
        const interval = setInterval(() => {
            setCursorTrail(prev => prev.slice(1));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [output, isLoading]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (history.length > 0 && historyIndex > -1) {
                const newIndex = Math.min(history.length, historyIndex + 1);
                if (newIndex >= history.length) {
                    setInput('');
                    setHistoryIndex(-1);
                } else {
                    setHistoryIndex(newIndex);
                    setInput(history[newIndex]);
                }
            }
        } else if (e.key === 'Enter' && input.trim() !== '' && !isLoading) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        const command = input.trim();
        if (command === '') return;

        // Push into history (avoid duplicate consecutive entries)
        setHistory(prev => {
            const newHistory = [...prev];
            if (newHistory[newHistory.length - 1] !== command) {
                newHistory.push(command);
            }
            return newHistory;
        });
        setHistoryIndex(-1);

        // Echo command into terminal (remove trailing prompt first)
        const newOutput = [...output.slice(0, -1), { text: `alamin@terminal:~$ ${command}`, type: 'user' }];
        setOutput(newOutput);
        setInput('');

        const normalized = command.toLowerCase();

        // Local commands (no API call)
        if (normalized === 'help') {
            setOutput(prev => [
                ...prev,
                { text: 'Main topics you can ask about:', type: 'system' },
                { text: '• about alamin', type: 'system' },
                { text: '• projects', type: 'system' },
                { text: '• skills', type: 'system' },
                { text: '• contact', type: 'system' },
                { text: '', type: 'empty' },
                { text: "Type your question or 'help' for commands...", type: 'prompt' }
            ]);
            return;
        }
        if (normalized === 'clear' || normalized === 'cls') {
            setOutput(INITIAL_OUTPUT);
            return;
        }

        setIsLoading(true);

        // --- Gemini API Call ---
        const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY || ''}`;

        const systemPrompt = `You are an AI assistant for the portfolio of Md. Alamin. Your task is to answer questions about him based on the following comprehensive information. Be friendly, engaging, and professional. Use emojis when appropriate to make conversations more lively.

    ---
    **Personal Information:**
    • Name: Md. Alamin
    • Location: Dhaka, Bangladesh  
    • Age: 22 years old
    • Passionate about technology and continuous learning

    **Professional Summary:** 
    A dedicated Java programmer and aspiring Machine Learning engineer with strong expertise in backend development. Currently exploring the fascinating intersection of traditional software engineering and AI/Computer Vision technologies. Known for delivering scalable, efficient solutions and having a keen interest in emerging technologies.

    **Contact Information:**
    • Email: alaminvai5g@gmail.com
    • LinkedIn: https://www.linkedin.com/in/alamin5g
    • GitHub: https://github.com/alamin5g
    • Website: https://alamin5g.com

    **Education:**
    • BSc in Computer Science & Engineering from IUBAT - International University of Business Agriculture and Technology (2021-Present, CGPA: 3.77/4.00)
    • Diploma in Engineering (Computer Technology) from Gazipur Engineering Institute (2016-2021, CGPA: 3.83/4.00)

    **Professional Experience:**
    • Technical Support Engineer at Crystal Bright Technology (October 2023 - September 2024)
      - Provided technical support in English communication
      - Demonstrated sales skills in collaborative environments
      - Traveled to 10+ districts for on-demand customer service
      - Gained valuable customer-facing experience

    **Featured Projects:**
    1. **Sortify - AI Waste Classification System** (https://sortify.top/)
       - AI-powered waste sorting application using Computer Vision
       - Built with Python, TensorFlow, Keras, FastAPI, and React.js
       - Real-time image classification for environmental impact
       - Currently live and helping users classify waste correctly

    2. **Gold Lab Management System**
       - Real-world client project for IUBAT University
       - Java Spring Boot application with MySQL database
       - Features: Hallmarking, test vouchers, lab expenses, reports
       - Demonstrates enterprise-level development skills

    3. **Electronic Store E-Commerce Platform**
       - Full-stack Spring Boot application
       - Complete shopping experience with admin management
       - Security features, payment integration, order management

    4. **Equal Bangladesh** 
       - Social impact platform for documenting state violence
       - JWT authentication, OTP verification, audit logging
       - Statistical reporting and data export capabilities

    **Technical Expertise:**
    • Programming Languages: Java (Expert), Python (Advanced), C#, JavaScript
    • Backend Frameworks: Spring Boot (Expert), Spring Security, Spring Data JPA, FastAPI
    • Frontend Technologies: React.js, Next.js, Thymeleaf, HTML5, CSS3, Bootstrap, Tailwind CSS
    • Databases: MySQL (Expert), PostgreSQL, Database Design
    • AI/ML: PyTorch, TensorFlow, Keras, Computer Vision, Supervised Learning
    • DevOps & Tools: Docker, Git, GitHub, Maven, RESTful APIs
    • Cloud & Deployment: GitHub Pages, Docker containerization

    **Achievements & Certifications:**
    • Core Java Specialization - Coursera/Learn Quest (January 2025)
    • Machine Learning for All - Coursera/University of London (February 2025)
    • Consistent academic excellence (CGPA > 3.7 in both degrees)

    **Personal Interests:**
    • Exploring remote communities and different cultures in Bangladesh
    • Reading technical books and novels for continuous learning
    • Photography - capturing nature and daily life moments
    • Personal mentoring - helping aspiring developers grow their skills
    • Contributing to open-source projects

    **Current Goals:**
    • Advancing expertise in Machine Learning and Computer Vision
    • Building more AI-powered applications for real-world problems
    • Seeking full-stack development opportunities
    • Contributing to meaningful projects that create positive impact

    **Fun Facts:**
    • Has traveled to 10+ districts across Bangladesh for work
    • Enjoys blending traditional programming with modern AI technologies
    • Believes in learning by building practical, impactful projects
    • Passionate about mentoring and knowledge sharing
    ---
    
    **Response Guidelines:**
    - Be conversational and engaging
    - Use relevant emojis to make responses more friendly
    - Provide specific details when discussing projects or skills
    - If asked about topics outside this information, politely redirect to Alamin's professional background
    - For "help" commands, list main topics: about, projects, skills, experience, education, contact, achievements
    - Always encourage further questions and engagement`;

        if (!GEMINI_API_KEY) {
            setOutput(prev => [
                ...prev,
                { text: 'Error: API key is not configured. Set REACT_APP_GEMINI_API_KEY in .env.local or use a server proxy.', type: 'error' },
                { text: "Type your question or 'help' for commands...", type: 'prompt' }
            ]);
            setIsLoading(false);
            return;
        }

        const payload = {
            contents: [{ parts: [{ text: command }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            }
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                const msg = errorBody?.error?.message || `${response.status} ${response.statusText}`;
                throw new Error(`API Error: ${msg}`);
            }

            const data = await response.json();
            const botResponse = (data?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim() || 'No response.';
            setOutput(prev => [
                ...prev,
                { text: botResponse, type: 'response' },
                { text: "Type your question or 'help' for commands...", type: 'prompt' }
            ]);
        } catch (error) {
            console.error('Gemini API call failed:', error);
            setOutput(prev => [
                ...prev,
                { text: `Error: ${error.message}`, type: 'error' },
                { text: "Type your question or 'help' for commands...", type: 'prompt' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center font-mono p-4 relative overflow-hidden">
            {/* Interactive Cursor Effects */}
            {cursorTrail.map((point, index) => (
                <div
                    key={point.id}
                    className="fixed w-2 h-2 bg-green-400 rounded-full pointer-events-none z-10"
                    style={{
                        left: point.x - 4,
                        top: point.y - 4,
                        opacity: (index + 1) / cursorTrail.length * 0.5,
                        transform: `scale(${(index + 1) / cursorTrail.length})`,
                    }}
                />
            ))}

            {/* Matrix-like background effect */}
            <div className="fixed inset-0 opacity-5 pointer-events-none">
                <div className="absolute text-green-500 text-xs animate-pulse" style={{ left: '10%', top: '10%' }}>01001010</div>
                <div className="absolute text-green-500 text-xs animate-pulse" style={{ left: '80%', top: '20%', animationDelay: '1s' }}>11010100</div>
                <div className="absolute text-green-500 text-xs animate-pulse" style={{ left: '30%', top: '70%', animationDelay: '2s' }}>10110011</div>
                <div className="absolute text-green-500 text-xs animate-pulse" style={{ left: '70%', top: '80%', animationDelay: '1.5s' }}>01110110</div>
                <div className="absolute text-green-500 text-xs animate-pulse" style={{ left: '50%', top: '40%', animationDelay: '0.5s' }}>11001001</div>
            </div>

            <div className="w-full max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-2 hover:text-green-300 transition-colors cursor-default">
                        🤖 Alamin's AI Portfolio
                    </h1>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                        <p className="text-lg md:text-xl text-gray-400">Interactive Terminal Interface</p>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                    </div>
                    <p className="text-md text-gray-500 mb-2">Powered by Gemini AI • Real-time Responses</p>
                    <div className="text-sm text-gray-600">
                        Move your mouse around for interactive effects! ✨
                    </div>
                </div>

                <div className="bg-black border-2 border-green-500 rounded-lg shadow-lg shadow-green-500/20 w-full h-[60vh] flex flex-col hover:shadow-green-500/30 transition-all duration-300">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-green-500">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-sm text-gray-400">alamin-ai-terminal.sh</div>
                        <div className="text-xs text-gray-500">🟢 Online</div>
                    </div>
                    <div ref={terminalBodyRef} className="flex-grow p-4 overflow-y-auto">
                        {output.map((line, index) => (
                            <div key={index} className={`whitespace-pre-wrap transition-all duration-200 hover:bg-gray-800/30 px-1 rounded ${
                                line.type === 'user' ? 'text-green-400 font-semibold' :
                                line.type === 'response' ? 'text-white leading-relaxed' :
                                line.type === 'system' ? 'text-cyan-400' :
                                line.type === 'error' ? 'text-red-400' :
                                line.type === 'prompt' ? 'text-yellow-400 font-medium' :
                                'h-4'
                            }`}>
                                {line.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center gap-2 text-gray-400">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                                </div>
                                AI is analyzing your question...
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t-2 border-green-500 flex items-center bg-gray-900/50">
                        <span className="text-green-400 font-bold">alamin@ai-terminal:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent text-white ml-2 focus:outline-none"
                            placeholder={isLoading ? "Please wait..." : "Type your question here..."}
                            autoFocus
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="bg-green-500 text-black font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:bg-gray-500"
                        >
                            {isLoading ? "..." : "Send"}
                        </button>
                    </div>
                </div>
                <div className="text-center text-gray-600 mt-6 flex items-center justify-center gap-2">
                    <span>Powered by React & Gemini AI</span>
                    <span className="text-red-500">❤️</span>
                    <span>Built by Alamin</span>
                </div>
            </div>

            {/* Custom Styles for Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
                
                .animation-delay-500 {
                    animation-delay: 0.5s;
                }
            `}</style>
        </div>
    );
};

export default AIPortfolio;
