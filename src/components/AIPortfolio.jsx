import React, { useState, useRef, useEffect } from 'react';

const INITIAL_OUTPUT = [
    { text: "================================================================================", type: 'system' },
    { text: "                        ALAMIN'S INTERACTIVE AI ASSISTANT                      ", type: 'system' },
    { text: "                             Powered by Gemini AI                             ", type: 'system' },
    { text: "================================================================================", type: 'system' },
    { text: '', type: 'empty' },
    { text: 'About: Java Developer | ML Enthusiast | Full-Stack Engineer', type: 'system' },
    { text: 'Location: Dhaka, Bangladesh', type: 'system' },
    { text: 'Education: Computer Science & Engineering at IUBAT University', type: 'system' },
    { text: 'Experience: Technical Support Engineer | Software Developer', type: 'system' },
    { text: '', type: 'empty' },
    { text: 'Available Commands:', type: 'system' },
    { text: '  projects    - View my development projects and repositories', type: 'system' },
    { text: '  skills      - Technical skills and expertise areas', type: 'system' },
    { text: '  experience  - Professional work experience', type: 'system' },
    { text: '  education   - Academic background and achievements', type: 'system' },
    { text: '  contact     - Social media profiles and contact information', type: 'system' },
    { text: '  cv          - Download or view my curriculum vitae', type: 'system' },
    { text: '  help        - Show all available commands', type: 'system' },
    { text: '  clear       - Clear terminal screen', type: 'system' },
    { text: '', type: 'empty' },
    { text: "Type any command or ask me anything about Alamin's background...", type: "prompt" }
];

const AIPortfolio = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState(INITIAL_OUTPUT);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const terminalBodyRef = useRef(null);

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

        // Echo command into chat (remove trailing prompt first)
        const newOutput = [...output.slice(0, -1), { text: command, type: 'user' }];
        setOutput(newOutput);
        setInput('');

        const normalized = command.toLowerCase();

        // Local commands (no API call)
        if (normalized === 'help') {
            setOutput(prev => [
                ...prev,
                { text: 'Available Commands:', type: 'system' },
                { text: '• about - Learn about Alamin\'s background', type: 'system' },
                { text: '• projects - View development projects and repositories', type: 'system' },
                { text: '• skills - Technical skills and expertise areas', type: 'system' },
                { text: '• experience - Professional work experience', type: 'system' },
                { text: '• education - Academic background and achievements', type: 'system' },
                { text: '• contact - Social media profiles and contact info', type: 'system' },
                { text: '• cv - Download curriculum vitae', type: 'system' },
                { text: '• clear - Clear terminal screen', type: 'system' },
                { text: '', type: 'empty' },
                { text: "You can also ask any question about Alamin's background...", type: 'prompt' }
            ]);
            return;
        }
        if (normalized === 'clear' || normalized === 'cls') {
            setOutput(INITIAL_OUTPUT);
            return;
        }

        // CV download command
        if (normalized === 'cv' || normalized === 'resume') {
            setOutput(prev => [
                ...prev,
                { text: 'CV Download Available:', type: 'system' },
                { text: 'Direct Link: https://alamin5g.com/resume/cv_Md_Alamin.pdf', type: 'system' },
                { text: '', type: 'empty' },
                { text: 'This comprehensive CV includes:', type: 'system' },
                { text: '• Complete work experience and achievements', type: 'system' },
                { text: '• Educational background with academic records', type: 'system' },
                { text: '• Technical skills and certifications', type: 'system' },
                { text: '• Major projects with implementation details', type: 'system' },
                { text: '• Contact information and references', type: 'system' },
                { text: '', type: 'empty' },
                { text: 'Click the link above to download or ask any other questions...', type: 'prompt' }
            ]);
            return;
        }

        setIsLoading(true);

        // --- Gemini API Call ---
        const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY || ''}`;

        const systemPrompt = `You are an AI assistant representing Md. Alamin, a Java developer and ML enthusiast. You have access to his complete professional information and should answer questions in a clean, user-friendly format without markdown styling.

    **Professional Information:**
    • Name: Md. Alamin
    • Location: Dhaka, Bangladesh
    • Current Role: Computer Science & Engineering Student at IUBAT University
    • Previous Experience: Technical Support Engineer at Supreme Court of Bangladesh
    • Languages: Bengali (Native), English (Professional)
    • Portfolio Website: alamin5g.com
    • GitHub: github.com/alamin5g
    • LinkedIn: linkedin.com/in/alamin5g
    • Email: alamin50ah@gmail.com
    • Phone: +8801537321309

    **Technical Expertise:**
    • Programming Languages: Java (Expert), Python (Advanced), C#, JavaScript
    • Backend Frameworks: Spring Boot (Expert), Spring Security, Spring Data JPA, FastAPI
    • Frontend Technologies: React.js, Next.js, Thymeleaf, HTML5, CSS3, Bootstrap, Tailwind CSS
    • Databases: MySQL (Expert), PostgreSQL, Database Design
    • AI/ML: PyTorch, TensorFlow, Keras, Computer Vision, Supervised Learning
    • DevOps & Tools: Docker, Git, GitHub, Maven, RESTful APIs
    • Cloud & Deployment: GitHub Pages, Docker containerization

    **Major Projects:**
    1. Sortify - AI-Powered Waste Classification System
       - Built with React.js frontend and FastAPI backend
       - Uses deep learning for real-time waste detection and classification
       - Deployed with Docker and includes comprehensive documentation
       - GitHub: github.com/alamin5g/Sortify

    2. Spring Boot E-commerce Platform
       - Full-featured online shopping platform
       - Implemented Spring Security, JPA, and MySQL integration
       - Features include user authentication, product management, shopping cart

    3. Professional Portfolio Website
       - Interactive React.js portfolio with AI chat integration
       - Responsive design with modern UI/UX
       - Integrated with Gemini AI for dynamic interactions

    **Education:**
    • B.Sc. in Computer Science & Engineering at IUBAT University (2023-Present)
    • Diploma in Computer Science & Technology at Munshiganj Polytechnic Institute (2018-2022)
    • Academic Excellence: CGPA > 3.7 in both degrees

    **Certifications & Achievements:**
    • Core Java Specialization - Coursera/Learn Quest (January 2025)
    • Machine Learning for All - Coursera/University of London (February 2025)
    • Consistent academic excellence and practical project implementation

    **CV/Resume Information:**
    When users ask for CV or resume, provide this EXACT response:
    "You can download Alamin's CV directly from: https://alamin5g.com/resume/cv_Md_Alamin.pdf
    
    This comprehensive CV includes:
    - Complete work experience and achievements
    - Educational background with academic records
    - Technical skills and certifications
    - Major projects with implementation details
    - Contact information and references
    
    The CV is regularly updated and formatted professionally for job applications."

    **Social Media Profiles:**
    • GitHub: github.com/alamin5g (All public repositories and contributions)
    • LinkedIn: linkedin.com/in/alamin5g (Professional networking and updates)
    • Portfolio: alamin5g.com (Complete portfolio showcase)
    • Email: alamin50ah@gmail.com (Direct contact)

    **GitHub Repository Highlights:**
    • Sortify: AI waste classification system
    • E-commerce platform with Spring Boot
    • React.js portfolio projects
    • Machine learning experiments and implementations
    • Various full-stack development projects

    **Response Guidelines:**
    - Always respond in clean, readable text format - NO MARKDOWN FORMATTING
    - Do not use asterisks, hashtags, or any markdown symbols
    - Use simple bullet points with dashes or dots
    - For CV requests, provide the direct download link clearly
    - Be professional and informative in all responses
    - Provide specific details when discussing projects or skills
    - Include relevant contact information when appropriate
    - For topics outside this information, politely redirect to Alamin's professional background
    - Available commands: about, projects, skills, experience, education, contact, cv, help, clear
    - Always encourage further questions and professional engagement`;

        if (!GEMINI_API_KEY) {
            setOutput(prev => [
                ...prev,
                { text: 'Error: API key is not configured. Set REACT_APP_GEMINI_API_KEY in .env.local or use a server proxy.', type: 'error' },
                { text: "Type any command or ask me anything about Alamin's background...", type: 'prompt' }
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
                { text: botResponse, type: 'ai' },
                { text: "Type any command or ask me anything about Alamin's background...", type: 'prompt' }
            ]);
        } catch (error) {
            console.error('Gemini API call failed:', error);
            setOutput(prev => [
                ...prev,
                { text: `Error: ${error.message}`, type: 'error' },
                { text: "Type any command or ask me anything about Alamin's background...", type: 'prompt' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
            {/* Dynamic animated background */}
            <div className="fixed inset-0 opacity-20">
                {/* Floating particles */}
                <div className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ left: '10%', top: '20%', animationDelay: '0s' }}></div>
                <div className="absolute w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ left: '80%', top: '30%', animationDelay: '1s' }}></div>
                <div className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ left: '60%', top: '70%', animationDelay: '2s' }}></div>
                <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ left: '30%', top: '80%', animationDelay: '3s' }}></div>
                <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ left: '90%', top: '60%', animationDelay: '4s' }}></div>
                <div className="absolute w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ left: '20%', top: '40%', animationDelay: '5s' }}></div>

                {/* Geometric shapes */}
                <div className="absolute w-20 h-20 border border-cyan-400/30 rotate-45 animate-spin-slow" style={{ left: '70%', top: '10%' }}></div>
                <div className="absolute w-16 h-16 border border-pink-400/30 rounded-full animate-pulse" style={{ left: '10%', top: '60%' }}></div>
                <div className="absolute w-12 h-12 border-2 border-yellow-400/30 rotate-12 animate-ping" style={{ left: '85%', top: '80%' }}></div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        AI Portfolio Assistant
                    </h1>
                    <p className="text-slate-300 text-lg">Advanced AI • Real-time Information • Interactive Experience</p>
                </div>

                <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden">
                    {/* Modern header */}
                    <div className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
                                <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                <span className="text-white font-semibold ml-4">Alamin's AI Assistant</span>
                            </div>
                            <div className="text-white/90 text-sm font-mono bg-white/10 px-3 py-1 rounded-full">
                                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    </div>

                    {/* Chat area */}
                    <div className="p-6 h-96 overflow-y-auto bg-gradient-to-b from-black/20 to-purple-950/20" ref={terminalBodyRef}>
                        {output.map((line, index) => (
                            <div key={index} className="mb-3">
                                {line.type === 'user' && (
                                    <div className="flex items-start space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                            U
                                        </div>
                                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-xl px-4 py-3 max-w-md shadow-lg">
                                            <span className="text-cyan-100">{line.text}</span>
                                        </div>
                                    </div>
                                )}
                                {(line.type === 'response' || line.type === 'ai') && (
                                    <div className="flex items-start space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">
                                            AI
                                        </div>
                                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl px-4 py-3 max-w-2xl shadow-lg">
                                            <span className="text-white whitespace-pre-wrap leading-relaxed">{line.text}</span>
                                        </div>
                                    </div>
                                )}
                                {(line.type === 'system' || line.type === 'prompt') && (
                                    <div className={`text-center py-1 ${line.type === 'system' ? 'text-purple-200' : 'text-cyan-200'
                                        }`}>
                                        {line.text}
                                    </div>
                                )}
                                {line.type === 'error' && (
                                    <div className="text-red-300 bg-red-900/30 border border-red-500/40 rounded-xl px-4 py-3 shadow-lg">
                                        {line.text}
                                    </div>
                                )}
                                {line.type === 'empty' && <div className="h-2"></div>}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-start space-x-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">
                                    AI
                                </div>
                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl px-4 py-3 shadow-lg">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-white">Processing</span>
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input area */}
                    <div className="border-t border-purple-500/30 p-4 bg-gradient-to-r from-black/30 to-purple-950/30">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                U
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-white/10 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-200 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 shadow-lg"
                                placeholder="Ask me anything about Alamin's professional background..."
                                disabled={isLoading}
                                autoFocus
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !input.trim()}
                                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg transform hover:scale-105"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>


                <div className="mt-6 text-center text-purple-200 text-sm">
                    <p>© 2024 Md. Alamin • AI-Powered Portfolio Assistant • Press ESC to return to main portfolio</p>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default AIPortfolio;
