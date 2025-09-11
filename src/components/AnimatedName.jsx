import { useState } from 'react';

const AnimatedName = ({ name }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const letters = name.split('');
  
  return (
    <span className="inline-block">
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ${
            hoveredIndex === index ? 'text-indigo-300 transform translate-y-[-10px] scale-125' : ''
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
};

export default AnimatedName;