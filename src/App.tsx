import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { InputArea } from './components/InputArea';
import { InfoPanel } from './components/InfoPanel';
import { Footer } from './components/Footer';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Navigation 
          onOpenSettings={() => setShowSettings(true)}
          onOpenHelp={() => setShowHelp(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
           
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 space-y-6"
            >
              <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 
                            rounded-3xl p-6 lg:p-8 shadow-2xl">
                <div className="mb-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    AI Voice Assistant
                  </h1>
                  <p className="text-gray-400">
                    Transform your words with intelligent enhancement and natural speech synthesis
                  </p>
                  
                 
                </div>
                <InputArea />
              </div>
            </motion.div>

           
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 
                            rounded-3xl p-6 shadow-2xl sticky top-24">
                <InfoPanel />
              </div>
            </motion.div>
          </div>

         
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Why Choose EchoBridge?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Built specifically for the speech-impaired community with cutting-edge AI 
                and accessibility-first design principles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Intelligent Autocomplete",
                  description: "Amazon-style intent recognition with contextual suggestions that learn from your patterns",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Emergency Integration",
                  description: "One-tap access to emergency contacts and critical communication with location sharing",
                  color: "from-red-500 to-orange-500"
                },
                {
                  title: "Offline Capability",
                  description: "Core features work without internet for reliable communication anywhere",
                  color: "from-green-500 to-teal-500"
                },
                {
                  title: "Voice Learning AI",
                  description: "Advanced machine learning adapts to your communication style for personalized enhancement",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "Multi-Platform Sync",
                  description: "Seamless synchronization across all devices with cloud backup and restore",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  title: "Privacy Focused",
                  description: "End-to-end encryption with local processing options for maximum privacy",
                  color: "from-indigo-500 to-purple-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 
                           rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300
                           group cursor-pointer"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl 
                                 flex items-center justify-center mb-4 group-hover:scale-110 
                                 transition-transform duration-300`}>
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>

     
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
}

export default App;