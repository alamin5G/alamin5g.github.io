import { useEffect, useRef, useState } from 'react';

const TiltImage = ({ src, alt }) => {
  const imageRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hoverMessage, setHoverMessage] = useState('');
  
  // Array of interesting hover messages
  const hoverMessages = [
    "Explore my interactive project demos!", // More direct call to action
    "Java + Spring Boot expertise inside.",  // Highlights key skills from CV
    "Currently diving into Machine Learning & CV.", // Reflects current focus from CV
    "Check out my GitHub for code & contributions.", // Encourages exploration
    "Scalable backend solutions are my specialty.", // Emphasizes a strength from CV
    "Let's build something amazing with Next.js!", // Mentions a modern tech
    "MySQL & PostgreSQL? I've got the queries.", // Shows database skills
    "Dockerizing apps for fun and profit.", // Adds a modern DevOps skill
    "Clean code & efficient algorithms are my jam.", // General good practice
    "Leveling up my AI game with PyTorch.", // Specific ML framework
    "Looking for full-stack opportunities!", // Career-oriented message
    "Got a coding challenge? Bring it on!", // Shows confidence
    "Always learning, always coding. ✨", // Positive and dynamic
    "From Java to JavaScript and beyond...", // Shows versatility
    "Building the future, one line of code at a time.", // Inspirational
    "Your next tech partner in innovation.", // Professional tone
    "Crafting user-friendly interfaces with React.", // Frontend focus
    "Optimizing performance, one query at a time.", // Backend focus
    "Passionate about open source contributions.", // Community involvement
    "Transforming ideas into scalable solutions.", // Problem-solving mindset
    "Let's connect and create something extraordinary!", // Call to action
    "Hire me for your next project!", // Direct call to action
    "Ready to tackle your toughest coding challenges!", // Shows readiness
    "Exploring the world of AI and machine learning.", // Reflects current interests
];
  
  // Set a random message when hovering
  useEffect(() => {
    if (isHovering) {
      const randomIndex = Math.floor(Math.random() * hoverMessages.length);
      setHoverMessage(hoverMessages[randomIndex]);
    }
  }, [isHovering]);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`,
      boxShadow: `
        ${tiltY / 2}px ${tiltX / 2}px 10px rgba(0, 0, 0, 0.2),
        0 10px 20px rgba(79, 70, 229, 0.3)
      `
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)'
    });
    setIsHovering(false);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      ref={imageRef}
      className="relative transition-all duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          className="w-40 h-40 rounded-full border-4 border-white object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="w-40 h-40 rounded-full border-4 border-white bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-3xl font-bold">
          {alt.split(' ').map(name => name[0]).join('')}
        </div>
      )}
      
      {isHovering && (
        <div className="absolute inset-0 bg-indigo-600 bg-opacity-40 rounded-full flex items-center justify-center backdrop-blur-sm">
          <div className="text-white text-sm font-medium px-4 py-2 bg-black bg-opacity-30 rounded-lg max-w-[90%] text-center">
            {hoverMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default TiltImage;