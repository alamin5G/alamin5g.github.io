import React from 'react';
import { X, Bot, User, Sparkles } from 'lucide-react';

const AIPortfolioModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-500 to-blue-600 rounded-t-2xl p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">AI Portfolio Experience</h3>
          </div>
          
          <p className="text-green-100 text-sm">
            Discover an interactive way to explore my portfolio
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Feature highlights */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    Interactive Terminal Experience
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Chat with AI about my background, skills, and projects
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    Personalized Responses
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Get detailed answers about my experience and expertise
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                  <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    Smart AI Assistant
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Powered by Gemini AI for intelligent conversations
                  </p>
                </div>
              </div>
            </div>

            {/* Sample questions */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">
                Try asking:
              </h4>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>• "Tell me about Alamin's projects"</li>
                <li>• "What are his technical skills?"</li>
                <li>• "How can I contact him?"</li>
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              Maybe Later
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium"
            >
              Let's Try It! 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPortfolioModal;
