import { useState } from 'react';

const MobileMenu = ({ sections, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleMenuClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button 
        className="text-gray-600 hover:text-indigo-700"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-16 right-0 left-0 bg-white shadow-md z-50">
          <ul className="py-2">
            {sections.map(section => (
              <li key={section.id}>
                <button
                  onClick={() => handleMenuClick(section.id)}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;