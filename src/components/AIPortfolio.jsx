import React, { useState, useRef, useEffect } from 'react';

const INITIAL_OUTPUT = [
    { text: "Welcome to Alamin's Portfolio Terminal v1.0.0", type: 'system' },
    { text: 'Type your questions about Alamin to get started.', type: 'system' },
    { text: '', type: 'empty' },
    { text: 'Try asking:', type: 'system' },
    { text: '• "Tell me about Alamin"', type: 'system' },
    { text: '• "What projects has Alamin worked on?"', type: 'system' },
    { text: "• \"What are Alamin's skills?\"", type: 'system' },
    { text: '', type: 'empty' },
    { text: 'Special commands:', type: 'system' },
    { text: '• Type "help" for a list of commands', type: 'system' },
    { text: '• Use ↑/↓ arrows for command history', type: 'system' },
    { text: '', type: 'empty' },
    { text: "Type your question below...", type: "prompt" }
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

        const systemPrompt = `You are an AI assistant for the portfolio of Md. Alamin. Your task is to answer questions about him based on the following information. Be friendly, concise, and professional.

    ---
    **Name:** Md. Alamin
    **Summary:** A passionate Java programmer with expertise in Spring Boot, SQL, and a foundational understanding of System Design. He is actively exploring Machine Learning (ML) and Computer Vision to build intelligent systems. He has experience in competitive programming and technical support, focusing on delivering high-quality, scalable backend applications.
    **Contact:** alaminvai5g@gmail.com, LinkedIn: https://www.linkedin.com/in/alamin5g, GitHub: https://github.com/alamin5g
    **Education:**
    - BSc in Computer Science & Engineering from IUBAT (CGPA 3.77/4.00)
    - Diploma in Engineering (Computer Technology) from Gazipur Engineering Institute (CGPA 3.83/4.00)
    **Work Experience:**
    - Technical Support Engineer at Crystal Bright Technology (10/2023 - 09/2024)
    **Projects:**
    - Gold Lab Management System: A course project for a real client using Java Spring Boot and MySQL.
    - Sortifi.org: A current project he is working on.
    - Android Apps: Including 'Amar Bornomala', available on the Play Store.
    **Technical Skills:**
    - Programming: Java, Python, C#, JavaScript
    - Backend: Spring Boot, RESTful APIs
    - Frontend: React, Next.js, Thymeleaf, HTML, CSS, Bootstrap
    - Databases: MySQL, PostgreSQL, Docker
    - AI/ML: PyTorch, Supervised Learning, Image Recognition
    - Tools: Git, GitHub
    ---
    
    If the user asks "help", list the main topics you can discuss (e.g., 'about alamin', 'projects', 'skills', 'contact'). Do not invent information. If a question is outside the scope of this information, politely state that you can only answer questions about Md. Alamin's professional background.`;

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
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center font-mono p-4">
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-green-400 text-center mb-2">Alamin's Portfolio</h1>
                <p className="text-lg md:text-xl text-gray-400 text-center mb-8">Interactive Terminal Interface</p>
                <p className="text-md text-gray-500 text-center mb-8">Ask me anything about Alamin's background, projects, and skills</p>

                <div className="bg-black border-2 border-green-500 rounded-lg shadow-lg shadow-green-500/20 w-full h-[60vh] flex flex-col">
                    <div ref={terminalBodyRef} className="flex-grow p-4 overflow-y-auto">
                        {output.map((line, index) => (
                            <div key={index} className={`whitespace-pre-wrap ${line.type === 'user' ? 'text-green-400' :
                                    line.type === 'response' ? 'text-white' :
                                        line.type === 'system' ? 'text-gray-400' :
                                            line.type === 'error' ? 'text-red-500' :
                                                line.type === 'prompt' ? 'text-gray-500' :
                                                    'h-4'
                                }`}>
                                {line.text}
                            </div>
                        ))}
                        {isLoading && <div className="text-gray-400">AI is thinking...</div>}
                    </div>

                    <div className="p-4 border-t-2 border-green-500 flex items-center">
                        <span className="text-green-400">user@terminal:~$</span>
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
                <div className="text-center text-gray-600 mt-6">
                    Powered by React & Gemini AI | Built with ❤️ by Alamin
                </div>
            </div>
        </div>
    );
};

export default AIPortfolio;
