import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Settings, User, HelpCircle } from 'lucide-react';

interface NavigationProps {
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onOpenHelp: () => void;
}

export function Navigation({ onOpenSettings, onOpenHelp }: NavigationProps) {


  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-full">
                <Mic className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                EchoBridge
              </h1>
              <p className="text-xs text-gray-400 -mt-1">AI Voice Assistant</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenHelp}
              className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
              aria-label="Help and tutorials"
            >
              <HelpCircle className="h-5 w-5 text-gray-300" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5 text-gray-300" />
            </motion.button>
          
          </div>
        </div>
      </div>
    </motion.nav>
  );
}