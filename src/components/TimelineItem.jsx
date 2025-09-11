
const TimelineItem = ({ year, title, description, position = 'left' }) => {
  return (
    <div className="relative">
      {/* Circle in the middle of timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-900"></div>
      
      {/* Content */}
      <div className={`${position === 'left' ? 'md:pr-12 md:text-right md:mr-8' : 'md:pl-12 md:ml-8'} relative md:w-1/2 ${position === 'left' ? 'md:ml-auto' : ''}`}>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{year}</p>
          <h3 className="text-lg font-semibold mt-1">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;