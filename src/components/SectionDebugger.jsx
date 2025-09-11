import { useEffect, useState } from 'react';

const SectionDebugger = ({ sections }) => {
  const [missingIds, setMissingIds] = useState([]);

  useEffect(() => {
    // Check if all section IDs exist in the document
    const missing = sections
      .filter(section => !document.getElementById(section.id))
      .map(section => section.id);
    
    setMissingIds(missing);
  }, [sections]);

  if (missingIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 bg-red-600 text-white p-4 z-50 rounded-tl-md text-sm">
      <h3 className="font-bold mb-1">Missing Section IDs:</h3>
      <ul>
        {missingIds.map(id => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
  );
};

export default SectionDebugger;