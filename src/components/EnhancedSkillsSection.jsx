import React, { useState } from 'react';
import { Brain, Code, Database, Lightbulb } from 'lucide-react';

const EnhancedSkillsSection = ({ skillLevels }) => {
    const [activeCategory, setActiveCategory] = useState('programming');
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const categories = {
        programming: {
            title: 'Programming Skills',
            icon: Code,
            color: 'indigo',
            gradient: 'from-indigo-500 to-purple-600'
        },
        frameworks: {
            title: 'Frameworks Skills',
            icon: Lightbulb,
            color: 'purple',
            gradient: 'from-purple-500 to-pink-600'
        },
        databases: {
            title: 'Database Skills',
            icon: Database,
            color: 'blue',
            gradient: 'from-blue-500 to-teal-600'
        },
        ai_ml: {
            title: 'AI/ML Skills',
            icon: Brain,
            color: 'teal',
            gradient: 'from-teal-500 to-green-600'
        }
    };

    const SkillBar = ({ skill, level, index, color }) => {

        return (
            <div
                className="group relative"
                onMouseEnter={() => setHoveredSkill(`${activeCategory}-${skill}`)}
                onMouseLeave={() => setHoveredSkill(null)}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {skill}
                    </span>
                    <span className={`text-xs font-bold text-${color}-600 dark:text-${color}-400 group-hover:scale-110 transition-transform`}>
                        {level}%
                    </span>
                </div>

                <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                            className={`h-full bg-gradient-to-r ${categories[activeCategory].gradient} rounded-full relative overflow-hidden transition-all duration-1000 group-hover:shadow-lg`}
                            style={{ width: `${level}%` }}
                        >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:animate-pulse"></div>

                            {/* Skill level indicator */}
                            {hoveredSkill === `${activeCategory}-${skill}` && (
                                <div className="absolute right-1 top-0 bottom-0 flex items-center">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hover tooltip */}
                    {hoveredSkill === `${activeCategory}-${skill}` && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded shadow-lg z-10 animate-fade-in">
                            {level}% Proficiency
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200/20 dark:bg-indigo-800/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/20 rounded-full translate-x-1/3 translate-y-1/3 animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto max-w-6xl px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Interactive showcase of my technical expertise across different domains
                    </p>
                </div>

                {/* Category Selector */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {Object.entries(categories).map(([key, category]) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === key
                                        ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg shadow-${category.color}-500/30`
                                        : `bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-md`
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {category.title}
                            </button>
                        );
                    })}
                </div>

                {/* Skills Display */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-8">
                            {React.createElement(categories[activeCategory].icon, {
                                className: `w-8 h-8 text-${categories[activeCategory].color}-600 dark:text-${categories[activeCategory].color}-400`
                            })}
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {categories[activeCategory].title}
                            </h3>
                        </div>

                        <div className="grid gap-6">
                            {Object.entries(skillLevels[activeCategory]).map(([skill, level], index) => (
                                <SkillBar
                                    key={skill}
                                    skill={skill}
                                    level={level}
                                    index={index}
                                    color={categories[activeCategory].color}
                                />
                            ))}
                        </div>

                        {/* Stats Summary */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                    <div className="text-lg font-bold text-gray-800 dark:text-white">
                                        {Object.keys(skillLevels[activeCategory]).length}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Skills</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                    <div className="text-lg font-bold text-gray-800 dark:text-white">
                                        {Math.round(Object.values(skillLevels[activeCategory]).reduce((a, b) => a + b, 0) / Object.values(skillLevels[activeCategory]).length)}%
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Level</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                    <div className="text-lg font-bold text-gray-800 dark:text-white">
                                        {Math.max(...Object.values(skillLevels[activeCategory]))}%
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Highest</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                    <div className="text-lg font-bold text-gray-800 dark:text-white">
                                        {Object.values(skillLevels[activeCategory]).filter(level => level >= 80).length}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Expert (80%+)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
        </section>
    );
};

export default EnhancedSkillsSection;
