import { ExternalLink, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import '../styles/animations.css'; // Import the CSS file for styling
// If you plan to use useScrollAnimation, uncomment the line below
// import useScrollAnimation from '../hooks/useScrollAnimation';

const ContactForm = ({ profile, references }) => {
  // profile prop is expected to be an object like:
  // { email: '...', whatsapp: '...', linkedin: '...', github: '...' }

  const [hoveredRef, setHoveredRef] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copyError, setCopyError] = useState('');

  const copyToClipboard = async (text, type) => {
    console.log(`Attempting to copy ${type}: "${text}"`);
    setCopyError(''); // Clear previous errors

    if (!text || typeof text !== 'string' || text.trim() === '') {
      const errorMessage = `No valid text provided to copy for ${type}.`;
      console.error(errorMessage);
      setCopyError(errorMessage);
      if (type === 'email') setCopiedEmail(false);
      if (type === 'phone') setCopiedPhone(false);
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        console.log(`${type} copied to clipboard successfully using navigator.clipboard!`);
        if (type === 'email') {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2500);
        } else if (type === 'phone') {
          setCopiedPhone(true);
          setTimeout(() => setCopiedPhone(false), 2500);
        }
      } else {
        console.warn('navigator.clipboard.writeText not available. Attempting fallback.');
        fallbackCopyToClipboard(text, type);
      }
    } catch (err) {
      console.error(`Failed to copy ${type} using navigator.clipboard: `, err);
      setCopyError(`Could not copy ${type}. Error: ${err.message}. Trying fallback.`);
      fallbackCopyToClipboard(text, type); // Attempt fallback on error
    }
  };

  const fallbackCopyToClipboard = (text, type) => {
    console.log(`Using fallback to copy ${type}: "${text}"`);
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Keep off-screen
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    let success = false;
    try {
      success = document.execCommand('copy');
      if (success) {
        console.log(`${type} copied to clipboard using fallback execCommand!`);
        if (type === 'email') {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2500);
        } else if (type === 'phone') {
          setCopiedPhone(true);
          setTimeout(() => setCopiedPhone(false), 2500);
        }
      } else {
        const errorMessage = `Fallback execCommand('copy') failed for ${type}. The browser may not support this action or it was blocked.`;
        console.error(errorMessage);
        setCopyError(errorMessage);
      }
    } catch (err) {
      const errorMessage = `Error in fallback execCommand('copy') for ${type}: ${err.message}`;
      console.error(errorMessage, err);
      setCopyError(errorMessage);
    }
    document.body.removeChild(textArea);
  };

  // Helper to format WhatsApp links safely
  const formatWhatsAppLink = (number) => {
    if (!number || typeof number !== 'string') return '#';
    return `https://wa.me/${number.replace(/[\s\-()]/g, '')}`;
  };

  // Helper to format tel links safely
  const formatTelLink = (number) => {
    if (!number || typeof number !== 'string') return '#';
    return `tel:${number.replace(/[\s\-()]/g, '')}`;
  };

  // Safely access profile properties
  const emailToDisplay = profile?.email || 'N/A';
  const whatsappToDisplay = profile?.whatsapp || 'N/A';
  const linkedInUrl = profile?.linkedin || '#';
  const githubUrl = profile?.github || '#';

  // Example: If you want to use useScrollAnimation for the whole form
  // const formRef = useScrollAnimation({ once: true, threshold: 0.1 }); // Adjust threshold as needed

  return (
    // <div className="space-y-12" ref={formRef}> {/* Add ref here if using useScrollAnimation */}
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-bold text-center md:text-left mb-8 text-gradient-indigo-purple">
          Get in Touch
        </h2>
        {copyError && <p className="text-red-500 text-sm mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg shadow">{copyError}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Contact Methods */}
          <div className="space-y-6">
            {/* Email */}
            <div className="group contact-card bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="contact-icon-wrapper rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3 text-indigo-600 dark:text-indigo-400">
                  <Mail className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">Email Me</h3>
                  <a
                    href={profile?.email ? `mailto:${profile.email}` : '#'}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline break-all text-sm"
                  >
                    {emailToDisplay}
                  </a>
                  <div className="mt-3">
                    <button type="button"
                      onClick={() => {
                        console.log("Email copy button clicked.");
                        copyToClipboard(profile?.email, 'email');
                      }}
                      disabled={!profile?.email}
                      className={`btn-copy text-xs px-3 py-1.5 rounded-md font-medium ${
                        copiedEmail 
                          ? 'copied' 
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-indigo-900/30'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {copiedEmail ? 'Copied' : 'Copy Email'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="group contact-card bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="contact-icon-wrapper rounded-full bg-green-100 dark:bg-green-900/30 p-3 text-green-600 dark:text-green-400">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.04 2c-5.45 0-9.91 4.46-9.91 9.91 0 1.75.46 3.45 1.35 4.96l-1.4 5.16 5.29-1.38c1.45.79 3.08 1.21 4.67 1.21 5.46 0 9.92-4.46 9.92-9.91s-4.46-9.91-9.92-9.91zm.04 1.57c4.61 0 8.34 3.73 8.34 8.34 0 4.61-3.73 8.34-8.34 8.34-1.57 0-3.1-.44-4.43-1.25l-4.66 1.22 1.24-4.56c-.85-1.37-1.32-2.92-1.32-4.55 0-4.61 3.73-8.34 8.34-8.34z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">WhatsApp</h3>
                  <a
                    href={formatWhatsAppLink(profile?.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:underline flex items-center gap-1 text-sm"
                  >
                    {whatsappToDisplay}
                    {profile?.whatsapp && <ExternalLink className="w-3.5 h-3.5" />}
                  </a>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        console.log("WhatsApp copy button clicked.");
                        copyToClipboard(profile?.whatsapp, 'phone');
                      }}
                      disabled={!profile?.whatsapp}
                      className={`btn-copy text-xs px-3 py-1.5 rounded-md font-medium ${
                        copiedPhone 
                          ? 'copied' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-green-900/30'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {copiedPhone ? 'Copied' : 'Copy Number'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group contact-card bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg block ${linkedInUrl === '#' && 'opacity-50 cursor-not-allowed'}`}
              onClick={(e) => { if (linkedInUrl === '#') e.preventDefault(); }}
            >
              <div className="flex items-start space-x-4">
                <div className="contact-icon-wrapper rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 text-blue-600 dark:text-blue-400">
                  <Linkedin className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">LinkedIn</h3>
                  <p className="text-blue-600 dark:text-blue-400 flex items-center gap-1 text-sm">
                    View Profile
                    {linkedInUrl !== '#' && <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                  </p>
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group contact-card bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg block ${githubUrl === '#' && 'opacity-50 cursor-not-allowed'}`}
              onClick={(e) => { if (githubUrl === '#') e.preventDefault(); }}
            >
              <div className="flex items-start space-x-4">
                <div className="contact-icon-wrapper rounded-full bg-gray-200 dark:bg-gray-700 p-3 text-gray-800 dark:text-gray-300">
                  <Github className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">GitHub</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1 text-sm">
                    View Profile
                    {githubUrl !== '#' && <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Right Column - References */}
          {/* Right Column - References */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">References</h3>
            <div className="space-y-4">
              {references && references.length > 0 ? references.map((ref, idx) => (
                <div
                  key={idx}
                  className={`bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm transition-all duration-300 border-l-4 ${
                    hoveredRef === idx
                      ? 'border-indigo-600 dark:border-indigo-400 shadow-md translate-x-1'
                      : 'border-transparent'
                  }`}
                  onMouseEnter={() => setHoveredRef(idx)}
                  onMouseLeave={() => setHoveredRef(null)}
                >
                  <div className="font-bold text-indigo-700 dark:text-indigo-400">{ref.name || 'N/A'}</div>
                  <div className="text-gray-700 dark:text-gray-300">{ref.title || 'N/A'}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">{ref.institution || 'N/A'}</div>

                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    {ref.email && (
                      <a
                        href={`mailto:${ref.email}`}
                        className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:underline group"
                      >
                        <Mail className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
                        <span className="truncate">{ref.email}</span>
                      </a>
                    )}
                    {ref.phone && (
                      <a
                        href={formatTelLink(ref.phone)}
                        className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:underline group"
                      >
                        <Phone className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
                        <span>{ref.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              )) : <p className="text-gray-500 dark:text-gray-400">References not available or not provided.</p>}
            </div>
             {references && references.length > 0 && (
                <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg text-sm text-indigo-700 dark:text-indigo-300">
                <p>Further contact information for references available upon request.</p>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Me Now Button Section */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl mt-16">
        <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
          Ready to collaborate or have a question?
        </h3>
        <div className="flex items-center justify-center">
          <a
            href={profile?.email ? `mailto:${profile.email}` : '#'}
            className={`btn-email-now px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full text-lg flex items-center gap-2.5 ${!profile?.email && 'opacity-50 cursor-not-allowed'}`}
            onClick={(e) => { if (!profile?.email) e.preventDefault(); }}
          >
            <Mail className="w-6 h-6" />
            Email Me Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;