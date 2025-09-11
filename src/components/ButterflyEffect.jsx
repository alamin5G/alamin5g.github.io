import { useEffect, useState } from 'react';

const ButterflyEffect = () => {
  const [butterflies, setButterflies] = useState([]);
  const [glowDots, setGlowDots] = useState([]);
  
  useEffect(() => {
    // Create initial glow dots
    const initialGlowDots = [];
    for (let i = 0; i < 15; i++) {
      initialGlowDots.push({
        id: `glow-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 8 + 4}px`,
        animationDuration: `${Math.random() * 4 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
        opacity: Math.random() * 0.5 + 0.3 // Slightly higher minimum opacity
      });
    }
    setGlowDots(initialGlowDots);
    
    // Add some initial butterflies
    const initialButterflies = [];
    for (let i = 0; i < 5; i++) {
      initialButterflies.push(createButterfly(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      ));
    }
    setButterflies(initialButterflies);
    
    // Handle mouse movement to create butterflies
    const handleMouseMove = (e) => {
      if (Math.random() > 0.9) { // Only create butterfly sometimes for performance
        const butterfly = createButterfly(e.clientX, e.clientY);
        setButterflies(prev => [...prev, butterfly]);
      }
    };
    
    // Function to create a butterfly with given position
    function createButterfly(x, y) {
      const butterfly = {
        id: Date.now() + Math.random(),
        left: x,
        top: y,
        hue: Math.floor(Math.random() * 360),
        animationDuration: `${Math.random() * 3 + 2}s`,
        size: Math.random() * 5 + 10, // Bigger butterflies (10px to 15px)
        opacity: Math.random() * 0.4 + 0.6 // Higher opacity (0.6 to 1.0)
      };
      
      // Remove butterfly after animation
      setTimeout(() => {
        setButterflies(prev => prev.filter(b => b.id !== butterfly.id));
      }, 5000);
      
      return butterfly;
    }

    window.addEventListener('mousemove', handleMouseMove);
    
    // Create random butterflies occasionally
    const randomButterflyInterval = setInterval(() => {
      const butterfly = createButterfly(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      setButterflies(prev => [...prev, butterfly]);
    }, 3000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(randomButterflyInterval);
    };
  }, []);

  return (
    <>
      {butterflies.map(butterfly => (
        <div
          key={butterfly.id}
          className="butterfly z-10" // Added z-10 to bring butterflies above other elements
          style={{
            left: `${butterfly.left}px`,
            top: `${butterfly.top}px`,
            animation: `flutter ${butterfly.animationDuration} ease-out forwards`,
            background: `hsla(${butterfly.hue}, 100%, 75%, ${butterfly.opacity})`,
            width: `${butterfly.size}px`,
            height: `${butterfly.size}px`,
            filter: "blur(0px)", // Remove blur for better visibility
          }}
        />
      ))}
      
      {glowDots.map(dot => (
        <div
          key={dot.id}
          className="glow-dot"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            animationDuration: dot.animationDuration,
            animationDelay: dot.animationDelay,
            opacity: dot.opacity
          }}
        />
      ))}
    </>
  );
};

export default ButterflyEffect;