import { useEffect, useRef, useState } from 'react';

const ScrollingBioSection = ({ bio, stats, skills, timeline }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate stat bars when visible
          const statBars = document.querySelectorAll('.stat-bar-progress');
          statBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.width;
            }, 300 * index);
          });
        }
      },
      { threshold: 0.2 }
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
    <section
      id="about"
      ref={sectionRef}
      className={`py-16 md:py-24 bg-white dark:bg-gray-900 p-4 relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/20 rounded-full filter blur-xl opacity-70"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-100 dark:bg-blue-900/20 rounded-full filter blur-xl opacity-60"></div>

      <div className="container mx-auto max-w-4xl relative">
        <h2 className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-12 reveal-text">
          About Me
        </h2>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Stats */}
          <div className="md:col-span-1 space-y-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md hover-card transition-all duration-500 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center">
                  {stat.icon}
                  {stat.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{stat.value}</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 mt-2">
                  <div
                    className="bg-indigo-600 h-1 rounded stat-bar-progress transition-all duration-1000 ease-out"
                    style={{ width: '0%' }}
                    data-width={stat.progress}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bio and skills */}
          <div
            className={`md:col-span-2 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-700 border-l-4 border-indigo-500 ${
              isVisible ? 'translate-x-0 opacity-100 shadow-xl' : 'translate-x-[50px] opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6 first-letter:text-3xl first-letter:font-bold first-letter:text-indigo-600 dark:first-letter:text-indigo-400 first-letter:float-left first-letter:mr-2">
              {bio.intro}
            </p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Address:</span> {bio.address}
                </span>
              </div>
              <a
                href="/resume/cv_Md_Alamin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                <span className="relative z-10">Download Resume</span>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`${skill.bgColor} ${skill.textColor} text-sm px-3 py-1 rounded-full transform transition-all duration-500 hover:scale-110 hover:shadow-md`}
                  style={{ transitionDelay: `${idx * 100}ms`, opacity: isVisible ? 1 : 0 }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-indigo-200 dark:bg-indigo-900/50"></div>
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className={`relative timeline-item transition-all duration-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${(idx + 3) * 200}ms` }}
              >
                {/* Circle in the middle of timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                {/* Content */}
                <div className={`${item.position === 'left' ? 'md:pr-12 md:text-right md:mr-8' : 'md:pl-12 md:ml-8'} relative md:w-1/2 ${item.position === 'left' ? 'md:ml-auto' : ''}`}>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover-card">
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{item.year}</p>
                    <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingBioSection;