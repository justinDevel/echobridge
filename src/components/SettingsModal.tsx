import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Volume2, 
  Mic, 
  Globe, 
  Palette, 
  Shield, 
  Bell,
  Save,
  RotateCcw,
  Sliders
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {

  const [activeTab, setActiveTab] = useState('voice');
  const [settings, setSettings] = useState({
    voice: {
      speed: 1,
      pitch: 1,
      volume: 0.8,
      language: 'en-US',
      voiceId: 'default'
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: true
    },
    privacy: {
      saveHistory: true,
      analytics: true,
      personalizedSuggestions: true
    },
    notifications: {
      soundEffects: true,
      voiceConfirmation: true,
      errorAlerts: true
    }
  });

  const tabs = [
    { id: 'voice', label: 'Voice & Speech', icon: Volume2 },
    { id: 'accessibility', label: 'Accessibility', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const resetToDefaults = () => {
    setSettings({
      voice: {
        speed: 1,
        pitch: 1,
        volume: 0.8,
        language: 'en-US',
        voiceId: 'default'
      },
      accessibility: {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        screenReader: true
      },
      privacy: {
        saveHistory: true,
        analytics: true,
        personalizedSuggestions: true
      },
      notifications: {
        soundEffects: true,
        voiceConfirmation: true,
        errorAlerts: true
      }
    });
  };

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
                   rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
         
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Sliders className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <p className="text-gray-400 text-sm">Customize your EchoBridge experience</p>
              </div>
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

          <div className="flex h-[600px]">
           
            <div className="w-64 bg-gray-900/50 border-r border-gray-700/50 p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            
            <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'voice' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Voice & Speech Settings</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Speech Speed: {settings.voice.speed}x
                          </label>
                          <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={settings.voice.speed}
                            onChange={(e) => handleSettingChange('voice', 'speed', parseFloat(e.target.value))}
                            className="custom-range w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Voice Pitch: {settings.voice.pitch}x
                          </label>
                          <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={settings.voice.pitch}
                            onChange={(e) => handleSettingChange('voice', 'pitch', parseFloat(e.target.value))}
                            className="custom-range w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Volume: {Math.round(settings.voice.volume * 100)}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={settings.voice.volume}
                            onChange={(e) => handleSettingChange('voice', 'volume', parseFloat(e.target.value))}
                            className="custom-range w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Language
                          </label>
                          <select
                            value={settings.voice.language}
                            onChange={(e) => handleSettingChange('voice', 'language', e.target.value)}
                            className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white"
                          >
                            <option value="en-US">English (US)</option>
                            <option value="en-GB">English (UK)</option>
                            <option value="es-ES">Spanish</option>
                            <option value="fr-FR">French</option>
                            <option value="de-DE">German</option>
                            <option value="it-IT">Italian</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'accessibility' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Accessibility Options</h3>
                      
                      <div className="space-y-4">
                        {Object.entries(settings.accessibility).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                            <div>
                              <h4 className="text-white font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {key === 'highContrast' && 'Increase color contrast for better visibility'}
                                {key === 'largeText' && 'Use larger text sizes throughout the app'}
                                {key === 'reducedMotion' && 'Reduce animations and transitions'}
                                {key === 'screenReader' && 'Optimize for screen reader compatibility'}
                              </p>
                            </div>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSettingChange('accessibility', key, !value)}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                value ? 'bg-blue-500' : 'bg-gray-600'
                              }`}
                            >
                              <motion.div
                                animate={{ x: value ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                              />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'privacy' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Privacy & Data</h3>
                      
                      <div className="space-y-4">
                        {Object.entries(settings.privacy).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                            <div>
                              <h4 className="text-white font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {key === 'saveHistory' && 'Save your message history for future reference'}
                                {key === 'analytics' && 'Help improve the app with anonymous usage data'}
                                {key === 'personalizedSuggestions' && 'Use your data to provide better suggestions'}
                              </p>
                            </div>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSettingChange('privacy', key, !value)}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                value ? 'bg-blue-500' : 'bg-gray-600'
                              }`}
                            >
                              <motion.div
                                animate={{ x: value ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                              />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Notifications & Alerts</h3>
                      
                      <div className="space-y-4">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                            <div>
                              <h4 className="text-white font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {key === 'soundEffects' && 'Play sound effects for interactions'}
                                {key === 'voiceConfirmation' && 'Provide voice confirmation for actions'}
                                {key === 'errorAlerts' && 'Alert you when errors occur'}
                              </p>
                            </div>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSettingChange('notifications', key, !value)}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                value ? 'bg-blue-500' : 'bg-gray-600'
                              }`}
                            >
                              <motion.div
                                animate={{ x: value ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                              />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          
          <div className="flex items-center justify-between p-6 border-t border-gray-700/50">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetToDefaults}
              className="flex items-center space-x-2 px-4 py-2 text-gray-400 
                       hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset to Defaults</span>
            </motion.button>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r 
                         from-blue-500 to-purple-500 text-white rounded-lg font-medium
                         hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}