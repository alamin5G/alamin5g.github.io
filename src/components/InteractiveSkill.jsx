import { useState } from 'react';

const InteractiveSkill = ({ skill, level, icon: Icon, color = "indigo" }) => {
  const [isActive, setIsActive] = useState(false);
  const [hoverLevel, setHoverLevel] = useState(level);
  
  const colorClasses = {
    indigo: "bg-indigo-600 text-indigo-100",
    purple: "bg-purple-600 text-purple-100",
    blue: "bg-blue-600 text-blue-100",
    green: "bg-green-600 text-green-100",
    teal: "bg-teal-600 text-teal-100"
  };
  
  const handleMouseMove = (e) => {
    if (isActive) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.min(Math.max(Math.round((x / width) * 100), 10), 100);
      setHoverLevel(percentage);
    }
  };
  
  return (
    <div 
      className={`p-4 rounded-lg transition-all duration-300 ${isActive ? "shadow-lg scale-105" : "hover:shadow-md"}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {Icon && <Icon className={`w-5 h-5 mr-2 ${isActive ? "text-"+color+"-500" : "text-gray-500"}`} />}
          <span className={`font-medium ${isActive ? "text-"+color+"-700 dark:text-"+color+"-300" : "text-gray-700 dark:text-gray-300"}`}>
            {skill}
          </span>
        </div>
        <span className={`text-sm ${isActive ? "text-"+color+"-600 dark:text-"+color+"-400" : "text-gray-500 dark:text-gray-400"}`}>
          {hoverLevel}%
        </span>
      </div>
      
      <div 
        className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isActive || setHoverLevel(level)}
      >
        <div 
          className={`h-full transition-all duration-300 ${isActive ? colorClasses[color] : "bg-gray-400 dark:bg-gray-500"}`}
          style={{ width: `${hoverLevel}%` }}
        ></div>
      </div>
      
      {isActive && (
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          <p>Drag to adjust your estimate of my skill level!</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveSkill;