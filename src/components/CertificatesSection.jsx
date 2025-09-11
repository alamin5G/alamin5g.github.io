import { Award, Calendar, ChevronDown, ChevronUp, ExternalLink, Eye } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CertificateCard = ({ certificate, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const expandRef = useRef(null);
  
  // Get certificate color theme based on index - UPDATED COLOR SCHEMES
  const getThemeColors = (idx) => {
    const themes = [
      { 
        primary: 'from-indigo-600 to-blue-500',
        border: 'border-indigo-400 dark:border-indigo-500',
        light: 'bg-indigo-50 dark:bg-indigo-900/20', 
        icon: 'text-indigo-600 dark:text-indigo-400'
      },
      { 
        primary: 'from-rose-500 to-pink-600',
        border: 'border-rose-400 dark:border-rose-500',
        light: 'bg-rose-50 dark:bg-rose-900/20', 
        icon: 'text-rose-600 dark:text-rose-400'
      },
      { 
        primary: 'from-teal-500 to-emerald-600',
        border: 'border-teal-400 dark:border-teal-500',
        light: 'bg-teal-50 dark:bg-teal-900/20', 
        icon: 'text-teal-600 dark:text-teal-400'
      },
      { 
        primary: 'from-amber-500 to-orange-600',
        border: 'border-amber-400 dark:border-amber-500',
        light: 'bg-amber-50 dark:bg-amber-900/20', 
        icon: 'text-amber-600 dark:text-amber-400'
      }
    ];
    
    return themes[idx % themes.length];
  };
  
  const theme = getThemeColors(index);

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  useEffect(() => {
    if (expandRef.current) {
      expandRef.current.style.maxHeight = isExpanded ? `${expandRef.current.scrollHeight}px` : '0';
    }
  }, [isExpanded]);

  return (
    <div 
      className="certificate-card-container h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`certificate-card bg-white dark:bg-gray-800 rounded-xl border ${theme.border} certificate-gradient-border
        overflow-hidden ${isHovered ? 'shadow-lg' : 'shadow-md'} transition-all duration-300 h-full`}
        data-color={theme.primary.split(' ')[0].replace('from-', '')}
      >
        <div className={`h-1 bg-gradient-to-r ${theme.primary}`}></div>
        
        <div className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`cert-icon p-1.5 rounded-full ${theme.light} ${theme.icon} transition-all duration-300`}>
                <Award className="w-3.5 h-3.5" />
              </div>
              <div className="ml-2">
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">
                  {certificate.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {certificate.issuer}
                </p>
              </div>
            </div>
            
            <span className={`text-xs px-1.5 py-0.5 rounded-full flex items-center
              ${isHovered ? `bg-gradient-to-r ${theme.primary} text-white` : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'} 
              transition-all duration-300`}>
              <Calendar className="w-2.5 h-2.5 mr-0.5" />
              {certificate.date}
            </span>
          </div>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-1 mt-2">
            {certificate.skills && certificate.skills.map((skill, idx) => (
              <span 
                key={idx}
                className="skill-tag text-xs px-1.5 py-0.5 rounded-full border border-transparent transition-all duration-300"
                style={{ 
                  animationDelay: `${idx * 0.1}s`,
                  background: `linear-gradient(${isHovered ? '140deg' : '120deg'}, var(--cert-bg-start), var(--cert-bg-end))`,
                  color: 'white',
                  boxShadow: isHovered ? '0 1px 2px var(--cert-shadow)' : 'none'
                }}
                data-color={theme.primary.split(' ')[0].replace('from-', '')}
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Actions */}
          <div className="mt-2.5 flex justify-between items-center">
            <button 
              onClick={toggleExpanded}
              className={`certificate-expand-btn flex items-center text-xs py-0.5 px-2 rounded-full
                ${isExpanded ? 'bg-gradient-to-r ' + theme.primary + ' text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} 
                transition-all duration-300`}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-0.5" />
                  Hide
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-0.5" />
                  Details
                </>
              )}
            </button>
            
            <a 
              href={certificate.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`certificate-view-btn flex items-center text-xs py-0.5 px-2 rounded-full
                ${isHovered ? 'bg-gradient-to-r ' + theme.primary + ' text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} 
                transition-all duration-300`}
            >
              <Eye className="w-3 h-3 mr-0.5" />
              View Certificate
              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </a>
          </div>
          
          {/* Expandable content */}
          <div 
            ref={expandRef} 
            className="overflow-hidden transition-all duration-300 max-h-0"
          >
            <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-xs font-medium mb-1">What I learned:</h4>
              <ul className="text-xs list-disc pl-4 space-y-0.5 text-gray-700 dark:text-gray-300">
                {certificate.achievements ? certificate.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                )) : certificate.skills.map((skill, i) => (
                  <li key={i}>Learnt {skill} fundamentals</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Corner decoration */}
        <div className="certificate-corner"></div>
      </div>
      
      {/* Interactive pulse circles */}
      <div className="certificate-pulse-container">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="certificate-pulse"
            style={{ 
              animationDelay: `${i * 0.8}s`,
              '--pulse-color': `var(--${theme.primary.split('-')[1]}-pulse-color)`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

// Rest of the code remains the same

const PlaceholderCard = () => {
  return (
    <div className="relative h-full">
      <div className="certificate-placeholder border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-3 
        flex flex-col items-center justify-center text-center h-full
        transition-all duration-500 hover:border-indigo-400 dark:hover:border-indigo-500 group">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 
            dark:from-indigo-500/10 dark:to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>
        
        <div className="p-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 
          mb-2 transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 relative z-10">
          <Award className="w-3.5 h-3.5" />
        </div>
        
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5 relative z-10">
          More achievements coming soon
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 relative z-10">
          Always learning and expanding my skill set
        </p>
        
        {/* Animated particles */}
        <div className="certificate-placeholder-particles">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--delay': `${i * 0.7}s`,
                '--size': `${Math.random() * 6 + 3}px`,
                '--opacity': '0.3'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Only updating the title section - rest of component remains unchanged

const CertificatesSection = ({ certificates = [] }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Modern, attractive title design */}
      <div className="relative mb-14">
        <div className="certificate-title-container text-center mb-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 inline-block">
            My Certificates
          </h1>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse opacity-75 blur-sm"></div>
        </div>
        
        {/* Optional subtitle */}
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm">
          Professional certifications and achievements that showcase my expertise and continuous learning
        </p>
        
        {/* Decorative elements */}
        <div className="absolute -top-8 left-1/4 w-8 h-8 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 animate-ping opacity-75 hidden md:block"></div>
        <div className="absolute top-4 right-1/4 w-5 h-5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 animate-ping animation-delay-700 opacity-75 hidden md:block"></div>
      </div>
      
      {/* Rest of the component stays the same */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((certificate, index) => (
          <div 
            key={index} 
            className="opacity-0 transform translate-y-4"
            style={{ 
              animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.2}s forwards` : 'none' 
            }}
          >
            <CertificateCard certificate={certificate} index={index} />
          </div>
        ))}
        
        {certificates.length % 3 !== 0 && (
          <div 
            className="opacity-0 transform translate-y-4"
            style={{ 
              animation: isVisible ? `fadeInUp 0.6s ease-out ${certificates.length * 0.2}s forwards` : 'none' 
            }}
          >
            <PlaceholderCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesSection;