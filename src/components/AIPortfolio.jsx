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
                { text: 'CV/Resume Information:', type: 'system' },
                { text: '• Download Link: /resume/cv_Md_Alamin.pdf', type: 'system' },
                { text: '• Contains: Work experience, education, projects, skills', type: 'system' },
                { text: '• Format: Professional PDF suitable for applications', type: 'system' },
                { text: '• Last Updated: January 2025', type: 'system' },
                { text: '', type: 'empty' },
                { text: 'Click the link above to download or ask any other questions...', type: 'prompt' }
            ]);
            return;
        }

        setIsLoading(true);

        // --- Gemini API Call ---
        const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY || ''}`;

        const systemPrompt = `You are an AI assistant representing Md. Alamin, a Java developer and ML enthusiast. You have access to his complete professional information and should answer questions naturally and professionally about his background.

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
    When users ask for CV or resume, provide this information:
    - CV is available for download at: /resume/cv_Md_Alamin.pdf
    - Contains detailed work experience, education, projects, and skills
    - Updated regularly with latest achievements and certifications
    - Professional format suitable for job applications

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
    - Be professional and informative in all responses
    - Provide specific details when discussing projects or skills
    - For CV requests, mention the download link and key highlights
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 p-4">
            {/* Subtle background pattern */}
            <div className="fixed inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Interactive AI Assistant</h1>
                    <p className="text-slate-400">Powered by Advanced AI • Real-time Portfolio Information</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    {/* Modern header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                                <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                                <span className="text-white font-semibold ml-4">AI Portfolio Assistant</span>
                            </div>
                            <div className="text-white/80 text-sm font-mono">
                                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    </div>

                    {/* Chat area */}
                    <div className="p-6 h-96 overflow-y-auto bg-white/5" ref={terminalBodyRef}>
                        {output.map((line, index) => (
                            <div key={index} className="mb-3">
                                {line.type === 'user' && (
                                    <div className="flex items-start space-x-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                            U
                                        </div>
                                        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-4 py-2 max-w-md">
                                            <span className="text-blue-200">{line.text}</span>
                                        </div>
                                    </div>
                                )}
                                {(line.type === 'response' || line.type === 'ai') && (
                                    <div className="flex items-start space-x-3 mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                            AI
                                        </div>
                                        <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 max-w-2xl">
                                            <span className="text-white whitespace-pre-wrap">{line.text}</span>
                                        </div>
                                    </div>
                                )}
                                {(line.type === 'system' || line.type === 'prompt') && (
                                    <div className={`text-center py-1 ${line.type === 'system' ? 'text-slate-300' : 'text-blue-300'
                                        }`}>
                                        {line.text}
                                    </div>
                                )}
                                {line.type === 'error' && (
                                    <div className="text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-2">
                                        {line.text}
                                    </div>
                                )}
                                {line.type === 'empty' && <div className="h-2"></div>}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-start space-x-3 mb-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    AI
                                </div>
                                <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-white">Thinking</span>
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input area */}
                    <div className="border-t border-white/20 p-4 bg-white/5">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                U
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                                placeholder="Ask me anything about Alamin's portfolio..."
                                disabled={isLoading}
                                autoFocus
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !input.trim()}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-slate-400 text-sm">
                    <p>© 2024 Md. Alamin • AI-Powered Portfolio Assistant • Press ESC to return to main portfolio</p>
                </div>
            </div>
        </div>
    );
};

export default AIPortfolio;
