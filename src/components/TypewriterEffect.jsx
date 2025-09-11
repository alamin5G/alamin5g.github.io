import { useEffect, useState } from 'react';

const TypewriterEffect = ({ text, typingSpeed = 70, pauseTime = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Array of phrases to rotate through
  const phrases = Array.isArray(text) ? text : [
    "Passionate Java Programmer & Aspiring ML Engineer",
    "Building scalable backend solutions with Spring Boot",
    "Exploring the world of Computer Vision & AI",
    "Full-stack developer with a focus on Java ecosystem",
    "Transforming ideas into efficient, elegant code"
  ];

  useEffect(() => {
    let timeout;
    const currentText = phrases[currentPhrase];
    
    if (!isDeleting && currentIndex < currentText.length) {
      // Still typing
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingSpeed);
      
    } else if (!isDeleting && currentIndex >= currentText.length) {
      // Finished typing, pause before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      
    } else if (isDeleting && currentIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(prevIndex => prevIndex - 1);
      }, typingSpeed / 2); // Delete faster than typing
      
    } else if (isDeleting && currentIndex === 0) {
      // Switch to next phrase
      setIsDeleting(false);
      setCurrentPhrase((prevPhrase) => (prevPhrase + 1) % phrases.length);
    }
    
    return () => clearTimeout(timeout);
  }, [currentIndex, currentPhrase, isDeleting, phrases, typingSpeed, pauseTime]);

  return (
    <span className="inline-block min-h-[1.5em]">
      <span>{displayText}</span>
      <span className="typing-cursor">|</span>
    </span>
  );
};

export default TypewriterEffect;