import ProjectCard from './ProjectCard';

const ProjectsSection = ({ projects = [] }) => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Modern, attractive title design for Projects */}
      <div className="relative mb-16">
        <div className="text-center mb-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 inline-block">
            My Projects
          </h1>
          {/* Underline elements */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"></div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-pulse opacity-75 blur-md"></div>
        </div>
        
        {/* Optional subtitle for Projects */}
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          A collection of my technical endeavors, showcasing practical skills and creative solutions.
        </p>
        
        {/* Decorative elements for Projects */}
        <div className="absolute -top-10 left-1/5 w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 animate-ping opacity-60 hidden md:block"></div>
        <div className="absolute top-0 right-1/5 w-7 h-7 rounded-full bg-red-500/10 dark:bg-red-500/20 animate-ping animation-delay-500 opacity-60 hidden md:block"></div>
      </div>
      
      {/* Grid for Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;