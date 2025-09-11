import { Brain, ChevronDown, ChevronUp, Clock, MessageCircle, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const StrengthsSection = ({ strengths }) => {
    const strengthsRef = useRef(null);
    const [expandedStrength, setExpandedStrength] = useState(null);
    const [hoveredStrength, setHoveredStrength] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Set loaded after initial render for animations
        setIsLoaded(true);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const strengthItems = entry.target.querySelectorAll('.strength-item');
                        strengthItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate-in');
                            }, index * 150);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (strengthsRef.current) {
            observer.observe(strengthsRef.current);
        }

        return () => {
            if (strengthsRef.current) {
                observer.unobserve(strengthsRef.current);
            }
        };
    }, []);

    // Map icons to strengths based on keywords
    const getIcon = (strength) => {
        if (strength.toLowerCase().includes('team') || strength.toLowerCase().includes('collaboration')) {
            return <Users className="w-7 h-7" />;
        } else if (strength.toLowerCase().includes('problem') || strength.toLowerCase().includes('solving')) {
            return <Brain className="w-7 h-7" />;
        } else if (strength.toLowerCase().includes('communication') || strength.toLowerCase().includes('skill')) {
            return <MessageCircle className="w-7 h-7" />;
        } else if (strength.toLowerCase().includes('quality') || strength.toLowerCase().includes('deadline')) {
            return <Clock className="w-7 h-7" />;
        } else {
            return <Users className="w-7 h-7" />;
        }
    };

    // Get appropriate gradient based on index
    const getGradient = (index) => {
        const gradients = [
            'from-indigo-500 to-purple-600',
            'from-blue-500 to-cyan-600',
            'from-emerald-500 to-green-600',
            'from-amber-500 to-orange-600'
        ];

        return gradients[index % gradients.length];
    };

    // Get title color based on index
    const getTitleColor = (index) => {
        const colors = [
            'text-indigo-600 dark:text-indigo-400 border-indigo-400',
            'text-blue-600 dark:text-blue-400 border-blue-400',
            'text-emerald-600 dark:text-emerald-400 border-emerald-400',
            'text-amber-600 dark:text-amber-400 border-amber-400'
        ];

        return colors[index % colors.length];
    };

    // Get background color based on index
    const getTitleBgColor = (index) => {
        const colors = [
            'bg-indigo-100 dark:bg-indigo-900/30',
            'bg-blue-100 dark:bg-blue-900/30',
            'bg-emerald-100 dark:bg-emerald-900/30',
            'bg-amber-100 dark:bg-amber-900/30'
        ];

        return colors[index % colors.length];
    };

    const toggleExpand = (index) => {
        setExpandedStrength(expandedStrength === index ? null : index);
    };

    // Helper function to generate detailed descriptions for strengths
    const getStrengthDetailedDescription = (strength) => {
        const descriptions = {
            "Team Collaboration": [
                "Active participation in agile development environments",
                "Experience with pair programming and code reviews",
                "Ability to synthesize ideas from diverse team members",
                "History of successful cross-functional collaboration"
            ],
            "Problem-Solving": [
                "Analytical approach to debugging and troubleshooting",
                "Experience with complex algorithmic challenges",
                "Ability to break down large problems into manageable pieces",
                "Data-driven decision making when evaluating solutions"
            ],
            "Communication Skill": [
                "Clear documentation of code and processes",
                "Effective presentation of technical concepts to non-technical stakeholders",
                "Active listening to understand requirements fully",
                "Regular and concise progress updates"
            ],
            "Commitment to Quality within Deadline": [
                "Consistent delivery of well-tested code",
                "Balanced approach to perfectionism and pragmatism",
                "Proficiency with CI/CD and automated testing",
                "Careful prioritization to meet critical deadlines"
            ]
        };

        return descriptions[strength] || [
            "Proven track record of applying this strength in professional settings",
            "Continual development through practice and learning",
            "Adaptable application across different project contexts",
            "Recognition from peers and mentors in this area"
        ];
    };

    return (
        <div ref={strengthsRef} className="container mx-auto max-w-4xl">
            <div className="relative mb-16">
                <h2 className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-400">
                    My Strengths
                </h2>

                {/* Decorative elements */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>

            {/* Fixed grid layout - ensure it's displayed as grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {strengths.map((strength, index) => (
                    <div 
                        key={index} 
                        className={`strength-item transition-all duration-700 ease-out
                        bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl overflow-hidden
                        gradient-border-${index % 4} relative
                        ${expandedStrength === index ? 'ring ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900' : ''}
                        ${hoveredStrength === index && expandedStrength !== index ? 'transform-gpu hover:-translate-y-2' : ''}`}
                        onMouseEnter={() => setHoveredStrength(index)}
                        onMouseLeave={() => setHoveredStrength(null)}
                    >
                        {/* Animated gradient border overlay */}
                        <div className={`absolute inset-0 rounded-xl z-0 gradient-border-glow-${index % 4} opacity-0
                        ${hoveredStrength === index ? 'opacity-100' : ''}`}></div>
                        
                        <div 
                        onClick={() => toggleExpand(index)}
                        className="cursor-pointer flex items-start p-6 relative z-10"
                        >
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${getGradient(index)} text-white transition-all duration-300
                            ${hoveredStrength === index ? 'scale-110 rotate-3' : ''}`}>
                            {getIcon(strength)}
                        </div>
                        
                        <div className="ml-4 flex-1">
                            <div className="flex justify-between items-center">
                            <h3 className={`text-xl font-semibold mb-2 transition-all duration-300 px-3 py-1 rounded-md border
                                ${getTitleColor(index)} ${getTitleBgColor(index)}
                                ${hoveredStrength === index ? 'scale-105' : ''}`}>
                                {strength}
                            </h3>
                            {expandedStrength === index ? 
                                <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                                <ChevronDown className="w-5 h-5 text-gray-500" />}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                            {getStrengthDescription(strength)}
                            </p>
                        </div>
                        </div>

                        {/* Expandable content */}
                        <div
                            className={`px-6 pb-6 pt-0 transition-all duration-500 ease-in-out overflow-hidden
                ${expandedStrength === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                                <ul className="space-y-2">
                                    {getStrengthDetailedDescription(strength).map((detail, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className={`inline-block w-2 h-2 mt-1.5 mr-2 rounded-full bg-gradient-to-r ${getGradient(index)}`}></span>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">{detail}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Show less button */}
                                
                                <div className={`mt-4 pt-3 text-center transition-all duration-300 delay-200
                                  ${expandedStrength === index ? 'opacity-100' : 'opacity-0'}`}>
                                  <button 
                                    className={`px-4 py-1 text-xs font-medium rounded-full text-white transform transition-transform hover:scale-105 show-less-${index % 4}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleExpand(index);
                                    }}
                                  >
                                    Show Less
                                  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Interactive quotation */}
            <div className="mt-16 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl shadow-inner relative overflow-hidden">
                {/* Animated particle effect */}
                {/* Animated particle effect - more particles with better animation distribution */}
                <div className={`strength-particles ${isLoaded ? 'is-loaded' : ''}`}>
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                '--delay': `${i * 0.3}s`, // Faster sequence of appearances
                                '--size': `${Math.random() * 8 + 4}px`, // Slightly smaller particles
                                '--duration': `${Math.random() * 5 + 7}s`, // More consistent duration
                                '--x-end': `${Math.random() * 100}%`,
                                '--x-start': `${Math.random() * 100}%`,
                                '--opacity': `${Math.random() * 0.4 + 0.2}` // Higher minimum opacity
                            }}
                        ></div>
                    ))}
                </div>

                <p className="text-center text-xl text-gray-700 dark:text-gray-300 italic relative z-10 font-light">
                    "The strengths that make me an <span className="text-indigo-600 dark:text-indigo-400 font-medium">effective developer</span> are the same ones that make me a <span className="text-purple-600 dark:text-purple-400 font-medium">valuable team member</span>."
                </p>
            </div>
        </div>
    );
};

// Helper function to generate descriptions for strengths
const getStrengthDescription = (strength) => {
    const descriptions = {
        "Team Collaboration": "I thrive in collaborative environments and believe the best solutions come from diverse perspectives working together.",
        "Problem-Solving": "I approach challenges methodically, breaking complex problems into manageable components to find efficient solutions.",
        "Communication Skill": "I communicate technical concepts clearly to both technical and non-technical stakeholders, ensuring everyone stays informed.",
        "Commitment to Quality within Deadline": "I deliver high-quality work on time by maintaining strong attention to detail while efficiently managing priorities."
    };

    return descriptions[strength] || "A core capability that helps me deliver exceptional results consistently.";
};

export default StrengthsSection;