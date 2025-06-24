import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  HelpCircle, 
  Play, 
  Book, 
  MessageCircle, 
  Phone,
  ChevronRight,
  Search,
  Star,
  ExternalLink
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const helpSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Play,
    items: [
      'How to create your first message',
      'Understanding AI enhancement',
      'Setting up voice preferences',
      'Quick action buttons guide'
    ]
  },
  {
    id: 'features',
    title: 'Features Guide',
    icon: Book,
    items: [
      'Smart autocomplete system',
      'Voice recognition setup',
      'Emergency contact integration',
      'Multi-language support'
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    icon: HelpCircle,
    items: [
      'Screen reader compatibility',
      'Keyboard navigation',
      'High contrast mode',
      'Text size adjustments'
    ]
  },
  {
    id: 'support',
    title: 'Support',
    icon: MessageCircle,
    items: [
      'Contact support team',
      'Report a bug',
      'Feature requests',
      'Community forum'
    ]
  }
];

const tutorials = [
  {
    title: 'Your First Enhanced Message',
    duration: '2 min',
    description: 'Learn how to create and enhance your first message with AI',
    rating: 4.9
  },
  {
    title: 'Setting Up Emergency Contacts',
    duration: '3 min',
    description: 'Configure emergency contacts for quick access during urgent situations',
    rating: 4.8
  },
  {
    title: 'Voice Customization',
    duration: '4 min',
    description: 'Personalize voice settings for the best speech synthesis experience',
    rating: 4.7
  }
];

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 
                   rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
        >
         
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Help & Support</h2>
                <p className="text-gray-400 text-sm">Get help using EchoBridge effectively</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 
                           rounded-lg text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
              >
                <X className="h-5 w-5 text-gray-300" />
              </motion.button>
            </div>
          </div>

          <div className="flex h-[600px]">
         
            <div className="w-80 bg-gray-900/50 border-r border-gray-700/50 p-4">
              <div className="space-y-2 mb-6">
                {helpSections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-medium">{section.title}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </motion.button>
                ))}
              </div>

              
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 
                            border border-green-500/20 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Need Immediate Help?</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Our support team is available 24/7 for urgent assistance.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 w-full px-3 py-2 
                           bg-green-500 text-white rounded-lg font-medium
                           hover:bg-green-600 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Contact Support</span>
                </motion.button>
              </div>
            </div>

           
            <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeSection === 'getting-started' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Getting Started with EchoBridge</h3>
                      
                     
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Video Tutorials</h4>
                        <div className="grid gap-4">
                          {tutorials.map((tutorial, index) => (
                            <motion.div
                              key={tutorial.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-4 p-4 bg-gray-700/30 
                                       rounded-xl hover:bg-gray-700/50 transition-colors cursor-pointer"
                            >
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 
                                            rounded-lg flex items-center justify-center">
                                <Play className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h5 className="text-white font-medium">{tutorial.title}</h5>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className="text-gray-400 text-sm">{tutorial.duration}</span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-gray-400 text-sm">{tutorial.rating}</span>
                                  </div>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">{tutorial.description}</p>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                   
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Quick Start Guide</h4>
                        <div className="space-y-3">
                          {[
                            'Sign in to your account or create a new one',
                            'Type your message in the input area',
                            'Watch as AI suggests enhanced versions',
                            'Click the speak button to hear your message',
                            'Save frequently used messages as quick actions'
                          ].map((step, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full 
                                            flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <p className="text-gray-300">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'features' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Features Guide</h3>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-700/30 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Smart Autocomplete</h4>
                          <p className="text-gray-300 mb-4">
                            Our AI-powered autocomplete system learns from your communication patterns 
                            to provide intelligent suggestions as you type.
                          </p>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Contextual suggestions based on your input</li>
                            <li>• Intent recognition for common phrases</li>
                            <li>• Personalized recommendations that improve over time</li>
                            <li>• Category-based filtering for different situations</li>
                          </ul>
                        </div>

                        <div className="bg-gray-700/30 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Voice Recognition</h4>
                          <p className="text-gray-300 mb-4">
                            Use your voice to input messages quickly and naturally.
                          </p>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Click the microphone button to start listening</li>
                            <li>• Speak clearly and at a normal pace</li>
                            <li>• The system will automatically enhance your spoken words</li>
                            <li>• Works in multiple languages</li>
                          </ul>
                        </div>

                        <div className="bg-gray-700/30 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Emergency Features</h4>
                          <p className="text-gray-300 mb-4">
                            Quick access to emergency contacts and critical communication.
                          </p>
                          <ul className="space-y-2 text-gray-300">
                            <li>• One-tap emergency contact calling</li>
                            <li>• Pre-configured emergency messages</li>
                            <li>• Medical information sharing</li>
                            <li>• Location sharing capabilities</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'accessibility' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Accessibility Features</h3>
                      
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                                    border border-blue-500/20 rounded-xl p-6 mb-6">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          EchoBridge is designed with accessibility at its core
                        </h4>
                        <p className="text-gray-300">
                          We believe everyone deserves equal access to communication technology. 
                          Our app includes comprehensive accessibility features to ensure the best 
                          possible experience for all users.
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <div className="bg-gray-700/30 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Screen Reader Support</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Full ARIA label implementation</li>
                            <li>• Semantic HTML structure</li>
                            <li>• Descriptive alt text for all images</li>
                            <li>• Screen reader announcements for dynamic content</li>
                          </ul>
                        </div>

                        <div className="bg-gray-700/30 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Keyboard Navigation</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Tab through all interactive elements</li>
                            <li>• Arrow keys for dropdown navigation</li>
                            <li>• Enter/Space for button activation</li>
                            <li>• Escape key to close modals and dropdowns</li>
                          </ul>
                        </div>

                        <div className="bg-gray-700/30 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Visual Accessibility</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• High contrast color schemes</li>
                            <li>• Adjustable text sizes</li>
                            <li>• Reduced motion options</li>
                            <li>• Color-blind friendly design</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'support' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Support & Contact</h3>
                      
                      <div className="grid gap-6">
                        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 
                                      border border-green-500/20 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-3">24/7 Support</h4>
                          <p className="text-gray-300 mb-4">
                            Our dedicated support team is available around the clock to help you 
                            with any questions or issues you may have.
                          </p>
                          <div className="flex space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center space-x-2 px-4 py-2 
                                       bg-green-500 text-white rounded-lg font-medium
                                       hover:bg-green-600 transition-colors"
                            >
                              <Phone className="h-4 w-4" />
                              <span>Call Support</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center space-x-2 px-4 py-2 
                                       bg-blue-500 text-white rounded-lg font-medium
                                       hover:bg-blue-600 transition-colors"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>Live Chat</span>
                            </motion.button>
                          </div>
                        </div>

                        <div className="bg-gray-700/30 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Contact Information</h4>
                          <div className="space-y-3 text-gray-300">
                            <div>
                              <strong>Email:</strong> support@echobridge.ai
                            </div>
                            <div>
                              <strong>Phone:</strong> +1 (555) 123-4567
                            </div>
                            <div>
                              <strong>Hours:</strong> 24/7 Support Available
                            </div>
                            <div>
                              <strong>Response Time:</strong> Within 1 hour for urgent issues
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700/30 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Community</h4>
                          <p className="text-gray-300 mb-4">
                            Join our community of users to share experiences, tips, and get help 
                            from other EchoBridge users.
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-4 py-2 
                                     bg-purple-500 text-white rounded-lg font-medium
                                     hover:bg-purple-600 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Join Community Forum</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}