import { ExternalLink, Github, Linkedin, Twitter as X } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = ({ profile }) => {
  const currentYear = new Date().getFullYear();
  const [quote, setQuote] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const codeQuotes = [
    "Clean code always looks like it was written by someone who cares.",
    "First, solve the problem. Then, write the code.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Programming isn't about what you know; it's about what you can figure out.",
    "The best error message is the one that never shows up.",
    "Java is to JavaScript what car is to carpet.",
    "It's not a bug – it's an undocumented feature.",
    "Deleted code is debugged code.",
    "Simplicity is the soul of efficiency.",
    "Talk is cheap. Show me the code.",
    "In order to be irreplaceable, one must always be different.",
    "Code is poetry.",
    "Good code is its own best documentation.",
    "The function of good software is to make the complex appear simple.",
    "Programming is not about typing, it's about thinking.",];

  // Change quote every 8 seconds
  useEffect(() => {
    setQuote(codeQuotes[Math.floor(Math.random() * codeQuotes.length)]);
    setIsVisible(true);
    
    const quoteInterval = setInterval(() => {
      setIsVisible(false);
      
      // Wait for fade out transition before changing quote
      setTimeout(() => {
        setQuote(codeQuotes[Math.floor(Math.random() * codeQuotes.length)]);
        setIsVisible(true);
      }, 500);
    }, 8000);
    
    return () => clearInterval(quoteInterval);
  }, []);
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Interactive Quote Section */}
        <div className="flex justify-center mb-6">
          <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm max-w-2xl w-full">
            <p 
              className={`text-sm text-center italic text-gray-600 dark:text-gray-300 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              "{quote}"
            </p>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="flex flex-col items-center">
          {/* Animated Social Links */}
          <div className="flex space-x-5 mb-2">
            <a 
              href={profile?.github || "https://github.com/alamin5g"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform hover:scale-110 hover:rotate-6 transition-all duration-300"
              aria-label="GitHub"
            >
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-md">
                <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
            </a>
            <a 
              href={profile?.linkedin || "https://linkedin.com/in/alamin5g"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform hover:scale-110 hover:rotate-6 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-md">
                <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
            </a>
            <a 
              href="https://x.com/alamin5g" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform hover:scale-110 hover:rotate-6 transition-all duration-300"
              aria-label="X (formerly Twitter)"
            >
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-md">
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
            </a>
            <a 
              href="#"  
              rel="noopener noreferrer"
              className="transform hover:scale-110 hover:rotate-6 transition-all duration-300"
              aria-label="Personal Website"
            >
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-md">
                <ExternalLink className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
            </a>
          </div>
          
                {/* Interactive wave animation */}
        <div className="w-80 h-6 my-2 relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 wave-animation"></div>
        </div>

          
          {/* Copyright */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            &copy; {currentYear} Md. Alamin • Crafted with Love and Code
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;