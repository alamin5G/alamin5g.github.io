import { Brain, Briefcase, Code, Database, GraduationCap, Lightbulb } from 'lucide-react';
import AIPortfolio from './components/AIPortfolio';
import AnimatedName from './components/AnimatedName';
import ButterflyEffect from './components/ButterflyEffect';
import CertificatesSection from './components/CertificatesSection';
import ContactFloatingElements from './components/ContactFloatingElements';
import ContactForm from './components/ContactForm';
import FloatingIcons from './components/FloatingIcons';
import Footer from './components/Footer';
import InteractiveSkill from './components/InteractiveSkill';
import MobileMenu from './components/MobileMenu';
import ProjectsSection from './components/ProjectSection'; // Add this import (note: your file is named ProjectSection.jsx)
import ScrollingBioSection from './components/ScrollingBioSection';
import SectionDebugger from './components/SectionDebugger';
import StrengthsSection from './components/StrengthsSection';
import ThemeToggle from './components/ThemeToggle';
import TiltImage from './components/TiltImage';
import TypewriterEffect from './components/TypewriterEffect';
import { useState } from 'react';



// Then replace your certificates section with:

// Add this import at the top of your App.js
import './styles/animations.css'; // Ensure this path is correct
import './styles/certificates.css';
import './styles/footer.css'; // Ensure this path is correct
import './styles/hobbies-animation.css';
import './styles/project-card.css'; // Ensure this path is correct
import './styles/strengths.css';


const App = () => {
  const [showAIPortfolio, setShowAIPortfolio] = useState(false);

  // Toggle function for switching between portfolios
  const togglePortfolio = () => {
    setShowAIPortfolio(!showAIPortfolio);
  };


  const profile = {
    name: "Md. Alamin",
    image: "/images/alamin-profile.png", // Ensure this path is correct
    intro: "A passionate Java programmer and aspiring Machine Learning engineer with a strong foundation in software development. I am enthusiastic about creating efficient and scalable backend solutions while exploring the fascinating world of AI and Computer Vision.",
    address: "Dhaka, Bangladesh",
    contact: {
      email: "alaminvai5g@gmail.com",
      phone: "+880 1822 679 672",
      whatsapp: "+880 1822 679 672",
      linkedin: "https://linkedin.com/in/alamin5g",
      github: "https://github.com/alamin5g"
    }
  };

  // Bio data
  const bioData = {
    intro: profile.intro,
    address: profile.address
  };

  const statData = [
    {
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      title: "Education",
      value: "BCSE from IUBAT University",
      progress: "75%"
    },
    {
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Experience",
      value: "1 year as Technical Support Engineer",
      progress: "25%"
    },
    {
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ),
      title: "Projects",
      value: "2+ full-stack applications built",
      progress: "60%"
    }
  ];

  const skillsData = [
    { name: "Spring Boot", bgColor: "bg-indigo-100 dark:bg-indigo-900/50", textColor: "text-indigo-800 dark:text-indigo-200" },
    { name: "MySQL", bgColor: "bg-blue-100 dark:bg-blue-900/50", textColor: "text-blue-800 dark:text-blue-200" },
    { name: "Python", bgColor: "bg-green-100 dark:bg-green-900/50", textColor: "text-green-800 dark:text-green-200" },
    { name: "Machine Learning", bgColor: "bg-purple-100 dark:bg-purple-900/50", textColor: "text-purple-800 dark:text-purple-200" },
    { name: "Computer Vision", bgColor: "bg-yellow-100 dark:bg-yellow-900/50", textColor: "text-yellow-800 dark:text-yellow-200" }
  ];

  const timelineData = [
    {
      year: "2021-Present",
      title: "Pursuing BCSE",
      description: "Studying Computer Science & Engineering at IUBAT University",
      position: "left"
    },
    {
      year: "2023-2024",
      title: "Technical Support Engineer",
      description: "Working at Crystal Bright Technology providing technical solutions",
      position: "right"
    },
    {
      year: "2025-Present",
      title: "Machine Learning Exploration",
      description: "Self-learning Computer Vision and Machine Learning techniques",
      position: "left"
    }
  ];

  const roleTitles = [
    "Passionate Java Programmer & Aspiring ML Engineer",
    "Java + Spring Boot expertise inside",
    "Currently diving into Machine Learning & CV",
    "Scalable backend solutions are my specialty",
    "Let's build something amazing with Next.js!",
    "MySQL & PostgreSQL? I've got the queries",
    "Dockerizing apps for fun and profit",
    "Clean code & efficient algorithms are my jam",
    "Leveling up my AI game with PyTorch",
    "Looking for full-stack opportunities!",
    "From Java to JavaScript and beyond...",
    "Building the future, one line of code at a time",
    "Optimizing performance, one query at a time",
    "Passionate about open source contributions",
    "Transforming ideas into scalable solutions"
  ];



  const skillLevels = {
    programming: {
      "Java": 90,
      "Python": 75,
      "C#": 70,
      "JavaScript": 80
    },
    frameworks: {
      "Spring Boot": 85,
      "Thymeleaf": 80,
      "NextJs": 65,
      "Restful API": 75
    },
    databases: {
      "MySQL": 85,
      "PostgreSQL": 70,
      "Git & GitHub": 80,
      "Docker": 65
    },
    ai_ml: {
      "Pytorch": 70,
      "Supervised Learning": 75,
      "Image Recognition": 65,
      "Algorithm Design": 80
    }
  };

  const experience = [
    {
      title: "Technical Support Engineer",
      company: "Crystal Bright Technology",
      duration: "10/2023 - 09/2024",
      location: "Dhaka, Bangladesh",
      description: [
        "Provided technical support and communication in spoken English to resolve customer issues.",
        "Demonstrated sales skills in a collaborative environment while ensuring service delivery.",
        "Travelled more than 10 districts to ensure on-demand customer service."
      ]
    }
  ];

  const projects = [
    {
      name: "Gold Lab Management System",
      organization: "International University of Business Agriculture and Technology",
      duration: "10/2024 - 12/2024",
      location: "Dhaka, Bangladesh",
      description: [
        "Spearheaded the development of the Gold Lab Management System utilizing Java Spring Boot and MySQL database.",
        "Employed Spring Web MVC, Spring Data JPA, Thymeleaf, Bootstrap, and JavaScript in the system.",
        "Oversaw the management of Hallmarking, Gold Test vouchers, lab expenses, reports, and client data.",
        "Implemented the system as a course project with a real-world client focus.",
        "Tailored software to meet specific client requirements for the previous organization."
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "Spring Web MVC", "Spring Data JPA", "Thymeleaf", "Bootstrap", "JavaScript"],
      githubUrl: "https://github.com/alamin5G/CbtGoldLab",
      liveUrl: "https://github.com/alamin5G/CbtGoldLab", // Optional - remove if you don't have a live demo
      image: "/images/home_page.png" // Optional - add if you have an image
    },
    {
      name: "Electronic Store E-Commerce Application",
      organization: "Personal Project",
      duration: "03/2025 - 05/2025",
      technologies: [
        "Java 17+", "Spring Boot 3+", "Spring MVC", "Spring Data JPA", "Spring Security",
        "Thymeleaf", "Bootstrap 5", "MySQL", "Lombok", "ModelMapper", "Maven"
      ],
      description: [
        "An advanced Spring Boot e-commerce platform for electronics retail, featuring a complete shopping experience for customers and a robust admin management system.",
        "Customer Features: Secure authentication, product browsing, shopping cart, multi-step checkout, order management, user profile.",
        "Admin Features: Dashboard, product/category/brand management, order management, user management, contact message management.",
        "Tech Stack: Java 17+, Spring Boot 3+, Spring MVC, Spring Data JPA, Spring Security, Jakarta Validation, Thymeleaf, Bootstrap 5, MySQL, Lombok, ModelMapper, Maven."
      ],
      stack: [
        "Backend: Java 17+, Spring Boot 3+, Spring MVC, Spring Data JPA, Spring Security, Jakarta Validation",
        "Frontend: Thymeleaf, Bootstrap 5, HTML5, CSS3, JavaScript",
        "Database: MySQL",
        "Tools: Lombok, ModelMapper, Maven"
      ],
      githubUrl: "https://github.com/alamin5g/ElectronicStore",
      liveUrl: "https://github.com/alamin5g/ElectronicStore"
    },
    {
      name: "Equal Bangladesh",
      organization: "Personal Project for Social Impact",
      duration: "07/2024 - 09/2024",
      location: "Dhaka, Bangladesh",
      description: [
        "Developed a Spring Boot platform to collect, document, and preserve information about victims of state-led violence during the 2024 Movement in Bangladesh.",
        "Implemented JWT-based authentication system with role-based access control for enhanced security.",
        "Created three specialized forms for reporting victims (Death, Missing, Injured) with email OTP verification.",
        "Built a comprehensive admin dashboard with case management, statistical reporting, and data export features.",
        "Incorporated audit logging to track all system activities and database backup/restoration tools."
      ],
      technologies: [
        "Java 17+", "Spring Boot", "Spring Security", "JWT Authentication",
        "Thymeleaf", "MySQL", "JFreeChart", "Maven", "Docker"
      ],
      features: [
        "User Authentication with JWT",
        "Email OTP Verification",
        "Multi-form Case Submission",
        "Admin Dashboard & Case Management",
        "Statistical Reporting & Data Export",
        "Database Backup & Restoration",
        "Audit Logging System"
      ],
      impact: "Created a digital record of historical events, preserving crucial information and helping citizens share stories of those affected by oppression.",
      githubUrl: "https://github.com/alamin5G/EqualBangla",
      liveUrl: "https://github.com/alamin5G/EqualBangla" // Add if deployed
    }
  ];



  const education = [
    {
      degree: "Computer Science & Engineering | BCSE",
      institution: "IUBAT- International University of Business Agriculture and Technology",
      duration: "09/2021 - Present",
      location: "Dhaka, Bangladesh",
      gpa: "3.77 out of 4.00",
      highlights: [
        "Achieved a CGPA of 3.77 out of 4.00 in Computer Science & Engineering program.",
        "Demonstrated skills in coding, programming, and problem-solving.",
        "Completed coursework focused on software development, algorithms, and data structures.",
        "Collaborated with peers on various projects to enhance team dynamics and project outcomes."
      ]
    },
    {
      degree: "Diploma in Engineering | Diploma in Computer Technology",
      institution: "Gazipur Engineering Institute",
      duration: "07/2016 - 08/2021",
      location: "Gazipur, Bangladesh",
      gpa: "3.83 out of 4.00",
      highlights: [
        "Achieved a CGPA of 3.83 out of 4.00 in a 4-year Diploma in Engineering program.",
        "Demonstrated proficiency in technical skills and knowledge related to engineering principles."
      ]
    }
  ];


  const certificates = [
    {
      name: "Core Java Specialization",
      issuer: "Coursera | Learn Quest",
      date: "01/2025",
      link: "https://www.coursera.org/account/accomplishments/specialization/1NOUKO7KW6QL",
      skills: ["Java SE", "OOP", "Collections", "Concurrency"]
    },
    {
      name: "Machine Learning for All",
      issuer: "Coursera | University of London",
      date: "02/2025",
      link: "https://www.coursera.org/account/accomplishments/verify/98V8W7YWFXGD",
      skills: ["ML Basics", "Python", "Data Analysis"]
    }
    // You can easily add more certificates here in the future
  ];

  const strengths = [
    "Team Collaboration", "Problem-Solving", "Communication Skill", "Commitment to Quality within Deadline"
  ];

  // Update your hobbies array with more detailed information:


  const hobbies = [
    {
      name: "Exploring distant communities",
      description: "Traveling to remote areas to connect with different cultures and understand diverse perspectives.",
      extendedDescription: "I enjoy traveling to less-explored regions of Bangladesh to learn about local cultures, traditions, and ways of life. These experiences help me understand the diversity of human experiences and bring fresh insights to my work as a developer.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7h-9m9 0H3"></path>
          <path d="M13 15l2 6h1l2-6M8 15l2 6h1l2-6"></path>
          <path d="M2 12h20"></path>
        </svg>
      )
    },
    {
      name: "Getting lost in books",
      description: "Reading novels and non-fiction books that expand my knowledge and fuel my imagination.",
      extendedDescription: "From technical books on programming to novels that transport me to different worlds, reading is my way of continuous learning. I especially enjoy books on technology trends, AI advancements, and software architecture that help me grow professionally.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      name: "Capturing nature",
      description: "Photography that showcases the beauty of landscapes and everyday moments around Bangladesh.",
      extendedDescription: "I find joy in capturing the natural beauty and daily life in Bangladesh through my camera. From the vibrant colors of rural landscapes to the bustling city streets, photography lets me document moments that might otherwise go unnoticed.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
      )
    },
    {
      name: "Personal mentoring",
      description: "Helping individuals develop their technical skills through one-on-one guidance and support.",
      extendedDescription: "Rather than formal volunteering, I prefer to directly mentor and support individuals who are starting their journey in programming. I enjoy sharing knowledge, reviewing code, and providing guidance that helps others grow in their technical careers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    }
  ];

  const references = [
    {
      name: "Dr. Md. Hasibur Rashid Chayon",
      title: "Associate Professor",
      institution: "International University of Business Agriculture and Technology",
      email: "contactme@foremail.com",
      phone: "+880 123 456 789"

    },
    {
      name: "Rubayea Ferdows",
      title: "Associate Professor",
      institution: "International University of Business Agriculture and Technology",
      email: "contactme@foremail.com",
      phone: "+880 123 456 789"
    }
  ];

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'education', name: 'Education' },
    { id: 'certificates', name: 'Certificates' },
    { id: 'strengths', name: 'Strengths' },
    { id: 'hobbies', name: 'Hobbies' },
    { id: 'contact', name: 'Contact' },
  ];

  // Smooth scrolling
  // Update your scrollToSection function with this improved version
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // THIS IS THE IMPORTANT LINE TO CHECK FOR IN YOUR CONSOLE
      console.warn(`Element with ID "${id}" not found in the document.`);
    }
  };


  return (
    <div className="font-inter bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen relative">

      {/* Portfolio Toggle Button */}
      <button
        onClick={togglePortfolio}
        className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${showAIPortfolio
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-green-600 hover:bg-green-700'
          }`}
        style={{ zIndex: 9999 }}
      >
        {showAIPortfolio ? '🏠 Static Portfolio' : '🤖 AI Portfolio'}
      </button>

      {/* Conditional rendering based on portfolio mode */}
      {showAIPortfolio ? (
        <AIPortfolio />
      ) : (
        <>
          {/* Navigation Header */}
          <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 z-50 p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Md. Alamin</div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <ul className="hidden md:flex space-x-6">
                  {sections.map(section => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300 font-medium px-3 py-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 fancy-underline"
                      >
                        {section.name}
                      </button>
                    </li>
                  ))}
                </ul>
                {/* Mobile Menu */}
                <MobileMenu sections={sections} scrollToSection={scrollToSection} />
              </div>
            </nav>
          </header>

          <main className="pt-20"> {/* Padding for fixed header */}
            {/* Home Section */}
            <section id="home" className="relative h-screen flex items-center justify-center text-center bg-gradient-animated text-white p-4">
              <ButterflyEffect />

              <FloatingIcons />
              <div className="container mx-auto max-w-4xl">
                <div className="mb-6">
                  <TiltImage
                    src={profile.image}
                    alt={profile.name}
                  />
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                  Hi, I'm <AnimatedName name={profile.name} />
                </h1>
                <p className="text-2xl md:text-3xl font-light mb-8">
                  <TypewriterEffect
                    text={roleTitles}
                    typingSpeed={70}
                    pauseTime={2000}
                  />
                </p>

                <div className="mt-10 space-y-4">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg mx-2"
                  >
                    View My Work
                  </button>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:-translate-y-1 mx-2"
                  >
                    Contact Me
                  </button>
                </div>

                <div className="flex justify-center space-x-6 mt-8">
                  {/* Your social links (same as before) */}
                </div>
              </div>

              <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white opacity-75 hover:opacity-100 transition-opacity"
                  aria-label="Scroll down"
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </section>


            {/* About Section */}

            <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-900 p-4 relative overflow-hidden">
              <ScrollingBioSection
                bio={bioData}
                stats={statData}
                skills={skillsData}
                timeline={timelineData}
              />
            </section>



            {/* Update the Skills section to use Interactive Skills */}


            {/* --- My Skills Section (Interactive Only) --- */}
            <section id="skills" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800 p-4 relative z-10">
              <div className="container mx-auto max-w-4xl relative">
                <div className="bubble absolute -top-10 -left-10 w-20 h-20 bg-indigo-500/10 rounded-full"></div>
                <div className="bubble absolute top-1/2 -right-10 w-32 h-32 bg-purple-500/10 rounded-full" style={{ animationDelay: "2s" }}></div>

                <h2 className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-12">My Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Programming Skills */}
                  <div className="bg-white dark:bg-gray-850 p-6 rounded-lg shadow-lg hover-lift transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4 capitalize flex items-center">
                      <Code className="w-6 h-6 mr-2" />
                      Programming Skills
                    </h3>
                    <div className="space-y-4">
                      {skillLevels.programming && Object.entries(skillLevels.programming).map(([skill, level], idx) => (
                        <InteractiveSkill key={idx} skill={skill} level={level} icon={Code} color="indigo" />
                      ))}
                    </div>
                  </div>
                  {/* Frameworks Skills */}
                  <div className="bg-white dark:bg-gray-850 p-6 rounded-lg shadow-lg hover-lift transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4 capitalize flex items-center">
                      <Lightbulb className="w-6 h-6 mr-2" />
                      Frameworks Skills
                    </h3>
                    <div className="space-y-4">
                      {skillLevels.frameworks && Object.entries(skillLevels.frameworks).map(([skill, level], idx) => (
                        <InteractiveSkill key={idx} skill={skill} level={level} icon={Lightbulb} color="purple" />
                      ))}
                    </div>
                  </div>
                  {/* Databases Skills */}
                  <div className="bg-white dark:bg-gray-850 p-6 rounded-lg shadow-lg hover-lift transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4 capitalize flex items-center">
                      <Database className="w-6 h-6 mr-2" />
                      Database Skills
                    </h3>
                    <div className="space-y-4">
                      {skillLevels.databases && Object.entries(skillLevels.databases).map(([skill, level], idx) => (
                        <InteractiveSkill key={idx} skill={skill} level={level} icon={Database} color="blue" />
                      ))}
                    </div>
                  </div>
                  {/* AI/ML Skills */}
                  <div className="bg-white dark:bg-gray-850 p-6 rounded-lg shadow-lg hover-lift transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4 capitalize flex items-center">
                      <Brain className="w-6 h-6 mr-2" />
                      AI/ML Skills
                    </h3>
                    <div className="space-y-4">
                      {skillLevels.ai_ml && Object.entries(skillLevels.ai_ml).map(([skill, level], idx) => (
                        <InteractiveSkill key={idx} skill={skill} level={level} icon={Brain} color="teal" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-16 md:py-24 bg-white p-4">
              <div className="container mx-auto max-w-4xl">
                <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">Work Experience</h2>
                <div className="space-y-8">
                  {experience.map((job, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-indigo-500">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
                        <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
                        {job.title} at {job.company}
                      </h3>
                      <p className="text-gray-600 mb-3">{job.duration} | {job.location}</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {job.description.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>


            <section id="projects">
              <ProjectsSection projects={projects} />
            </section>

            {/* Education Section */}
            <section id="education" className="py-16 md:py-24 bg-white p-4">
              <div className="container mx-auto max-w-4xl">
                <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">Education</h2>
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
                        <GraduationCap className="w-6 h-6 mr-2 text-green-600" />
                        {edu.degree}
                      </h3>
                      <p className="text-gray-600 mb-1">{edu.institution}</p>
                      <p className="text-gray-600 mb-3">{edu.duration} | {edu.location}</p>
                      <p className="text-gray-700 font-medium mb-3">CGPA: {edu.gpa}</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {edu.highlights.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>


            {/* Certificates Section */}
            <section id="certificates" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800 p-4">
              <CertificatesSection certificates={certificates} />
            </section>

            {/* Strengths Section */}
            <section id="strengths" className="py-16 md:py-24 bg-white dark:bg-gray-900 p-4">
              <StrengthsSection strengths={strengths} />
            </section>

            {/* Hobbies Section */}


            <section id="hobbies" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800 p-4 relative overflow-hidden">
              {/* Interactive background shapes */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-300/10 dark:bg-indigo-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              <div className="absolute top-1/4 right-1/5 w-24 h-24 bg-purple-300/10 dark:bg-purple-500/20 rounded-full translate-y-1/4 animate-float" style={{ animationDelay: "1.5s" }}></div>
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/10 dark:bg-pink-500/20 rounded-full translate-x-1/4 translate-y-1/4 animate-pulse" style={{ animationDelay: "2s" }}></div>

              <div className="container mx-auto max-w-5xl relative z-10">
                <h2 className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-6">
                  My <AnimatedName name="Hobbies" />
                </h2>
                <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-16 max-w-xl mx-auto">
                  <TypewriterEffect
                    text={[
                      "When I'm not coding, you'll find me enjoying these activities that help me stay creative.",
                      "These hobbies keep me balanced and bring fresh perspectives to my work.",
                      "Exploring different interests helps me think outside the box and solve problems creatively.",
                      "Finding time for these activities keeps me inspired and energized.",
                    ]}
                    typingSpeed={70}
                    pauseTime={3000}
                  />
                </p>

                {/* Staggered card layout to prevent overlap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-6">
                  {hobbies.map((hobby, index) => (
                    <div key={index} className="perspective-500 hobby-card-wrapper relative"
                      style={{ marginTop: index % 2 === 1 ? '2rem' : '0' }}>
                      <div className="card-inner relative w-full h-full transition-transform duration-1000"
                        id={`card-inner-${index}`}>

                        {/* Front of card */}
                        <div className="card-front absolute w-full h-full backface-hidden">
                          <div className="hobby-card bg-white dark:bg-gray-800 rounded-xl h-full
           group transition-all duration-500 transform hover:-translate-y-2">{/* Header with gradient remains the same */}
                            <div className={`h-28 flex items-center justify-center bg-gradient-to-r 
                          ${index % 4 === 0 ? 'from-indigo-500 to-purple-600' : ''}
                          ${index % 4 === 1 ? 'from-green-500 to-teal-600' : ''}
                          ${index % 4 === 2 ? 'from-rose-500 to-pink-600' : ''}
                          ${index % 4 === 3 ? 'from-amber-500 to-orange-600' : ''}
                          overflow-hidden relative`}>

                              {/* Animated decorative elements */}
                              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-white/30 transform scale-0 group-hover:scale-100 transition-transform duration-700 delay-100"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-8 h-8 rounded-full bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-700 delay-200"></div>
                              </div>

                              {/* Updated icons */}
                              <div className="text-white transform group-hover:scale-125 group-hover:rotate-3 transition-all duration-500">
                                {hobby.icon}
                              </div>
                            </div>

                            {/* Card body with animated content reveal */}
                            <div className="p-6 text-center flex flex-col h-[calc(100%-7rem)] bg-white dark:bg-gray-800">

                              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                                {hobby.name}
                              </h3>
                              <div className="flex-grow overflow-hidden mb-4">
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {hobby.description}
                                </p>
                              </div>

                              {/* Interactive button that appears on hover */}
                              <div className="mt-auto opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <button
                                  onClick={() => {
                                    document.getElementById(`card-inner-${index}`).style.transform = 'rotateY(180deg)';
                                  }}
                                  className={`text-xs font-medium py-1 px-4 rounded-full
                              ${index % 4 === 0 ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : ''}
                              ${index % 4 === 1 ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}
                              ${index % 4 === 2 ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : ''}
                              ${index % 4 === 3 ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : ''}
                            `}
                                >
                                  Learn more
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Back of card */}
                        <div className="card-back absolute w-full h-full backface-hidden rotate-y-180">
                          <div className="hobby-card bg-white dark:bg-gray-750 rounded-xl h-full
           flex flex-col p-6">

                            <h3 className={`text-xl font-semibold mb-4 ${index % 4 === 0 ? 'text-indigo-700 dark:text-indigo-400' :
                              index % 4 === 1 ? 'text-green-700 dark:text-green-400' :
                                index % 4 === 2 ? 'text-rose-700 dark:text-rose-400' :
                                  'text-amber-700 dark:text-amber-400'
                              }`}>
                              About {hobby.name}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm flex-grow overflow-y-auto">
                              {hobby.extendedDescription || `${hobby.description} This is something I truly enjoy in my spare time and helps me maintain balance in life.`}
                            </p>
                            <button
                              onClick={() => {
                                const card = document.getElementById(`card-inner-${index}`);
                                if (card) card.style.transform = 'rotateY(0deg)';
                              }}
                              className={`mt-4 text-xs font-medium py-1 px-4 rounded-full self-center
      ${index % 4 === 0 ? 'bg-indigo-200 text-indigo-800 hover:bg-indigo-300' : ''}
      ${index % 4 === 1 ? 'bg-green-200 text-green-800 hover:bg-green-300' : ''}
      ${index % 4 === 2 ? 'bg-rose-200 text-rose-800 hover:bg-rose-300' : ''}
      ${index % 4 === 3 ? 'bg-amber-200 text-amber-800 hover:bg-amber-300' : ''}
    `}
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Decorative shape behind card only visible on hover */}
                      <div className={`absolute -z-10 inset-0 -m-3 rounded-xl transform scale-90 opacity-0 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500
                  ${index % 4 === 0 ? 'bg-indigo-200/30 dark:bg-indigo-900/30' : ''}
                  ${index % 4 === 1 ? 'bg-green-200/30 dark:bg-green-900/30' : ''}
                  ${index % 4 === 2 ? 'bg-rose-200/30 dark:bg-rose-900/30' : ''}
                  ${index % 4 === 3 ? 'bg-amber-200/30 dark:bg-amber-900/30' : ''}
                `}></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>


            {/* Contact Section */}
            <section id="contact" className="relative py-16 md:py-24 bg-gradient-animated text-white p-4 min-h-[80vh] flex items-center">
              <ButterflyEffect />
              <ContactFloatingElements />

              <div className="container mx-auto max-w-4xl relative z-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
                  Let's <AnimatedName name="Connect" />
                </h1>
                <p className="text-xl md:text-2xl font-light mb-10 text-center">
                  <TypewriterEffect
                    text={[
                      "Have a project in mind? Let's discuss it!",
                      "Looking for a skilled developer for your team?",
                      "Need help with your Java or Spring Boot project?",
                      "Want to know more about my experience?",
                      "Ready to collaborate on something awesome?"
                    ]}
                    typingSpeed={60}
                    pauseTime={2000}
                  />
                </p>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 hover:scale-[1.01]">
                  <ContactForm
                    profile={profile.contact}
                    references={references}
                  />
                </div>


              </div>
              <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-white opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="Scroll to top"
                >
                  <svg className="w-10 h-10 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </section>
          </main>

          {/* Footer */}
          <Footer profile={profile.contact} />

          <SectionDebugger sections={sections} />
        </>
      )}
    </div>
  );
};

export default App;