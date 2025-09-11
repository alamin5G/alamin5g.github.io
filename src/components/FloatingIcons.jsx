import { Brain, Code, Database, Server } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: Code, color: 'text-blue-400', delay: '0s', size: 'w-8 h-8' },
    { Icon: Database, color: 'text-green-400', delay: '1.7s', size: 'w-6 h-6' },
    { Icon: Brain, color: 'text-purple-400', delay: '3.2s', size: 'w-10 h-10' },
    { Icon: Server, color: 'text-yellow-400', delay: '2.1s', size: 'w-7 h-7' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => {
        const { Icon, color, delay, size } = item;
        const topPosition = `${Math.random() * 100}%`;
        const leftPosition = `${Math.random() * 100}%`;
        
        return (
          <div
            key={index}
            className={`absolute opacity-50 ${color} ${size}`}
            style={{
              top: topPosition,
              left: leftPosition,
              animation: `float 15s ease-in-out infinite`,
              animationDelay: delay
            }}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingIcons;