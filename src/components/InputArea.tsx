import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  AlertCircle, 
  MessageSquare, 
  Heart, 
  Users,
  Loader2,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';
import { QuickAccessButton } from './QuickAccessButton';
import { AutocompleteDropdown } from './AutocompleteDropdown';
import { useVoice } from '../hooks/useVoice';
import { enhanceText } from '../utils/bedrock';
import { intentEngine, IntentSuggestion } from '../utils/intentRecognition';

const quickActions = [
  { id: '1', text: 'I need help', icon: AlertCircle, category: 'emergency' as const },
  { id: '2', text: 'Thank you', icon: Heart, category: 'social' as const },
  { id: '3', text: 'Call my caregiver', icon: Users, category: 'emergency' as const },
  { id: '4', text: "Where's the restroom?", icon: MessageSquare, category: 'daily' as const },
];

export function InputArea() {
  const [inputText, setInputText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<IntentSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const { isPlaying, speak, stop } = useVoice();

 
  const fetchSuggestions = useCallback((text: string) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const newSuggestions = intentEngine.getSuggestions(text, 6);
      setSuggestions(newSuggestions);
      setShowSuggestions(text.length > 0 && newSuggestions.length > 0);
      setIsTyping(false);
    }, 300);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);
    setIsTyping(true);
    fetchSuggestions(value);
  };

  const handleSuggestionSelect = (suggestion: IntentSuggestion) => {
    setInputText(suggestion.text);
    setShowSuggestions(false);
    intentEngine.learnFromSelection(suggestion);
    handleEnhance(suggestion.text);
  };

  const handleEnhance = async (text: string) => {
    if (!text.trim()) return;
    
    setIsEnhancing(true);
    try {
      
      const intentEnhanced = await intentEngine.getIntentBasedEnhancement(text);
      if (intentEnhanced !== text) {
        setEnhancedText(intentEnhanced);
      } else {
        
        const enhanced = await enhanceText(text);
        setEnhancedText(enhanced);
      }
    } catch (error) {
      console.error('Failed to enhance text:', error);
      setEnhancedText(text);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSpeak = () => {
    if (isPlaying) {
      stop();
    } else if (enhancedText) {
      speak(enhancedText);
    }
  };

  const handleQuickAction = async (text: string) => {
    setInputText(text);
    setShowSuggestions(false);
    await handleEnhance(text);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setShowSuggestions(false);
      handleEnhance(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (textareaRef.current && !textareaRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                   backdrop-blur-sm border border-blue-500/20 rounded-2xl"
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="h-6 w-6 text-blue-400" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Intent Recognition Active</h3>
            <p className="text-gray-400 text-sm">Smart suggestions powered by machine learning</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Online</span>
        </div>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <QuickAccessButton
                text={action.text}
                icon={action.icon}
                onClick={() => handleQuickAction(action.text)}
                category={action.category}
                isLoading={isEnhancing && inputText === action.text}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-200 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
          Smart Message Composer
        </h2>
        
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInputChange}
            onFocus={() => {
              if (inputText.length > 0) {
                setShowSuggestions(suggestions.length > 0);
              }
            }}
            placeholder="Start typing and watch AI suggestions appear..."
            className="w-full h-32 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                     rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none 
                     focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all
                     text-lg leading-relaxed pr-20"
            aria-label="Message input with smart suggestions"
          />
          
          
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-3 right-16 flex items-center space-x-1"
              >
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity, 
                        delay: i * 0.1 
                      }}
                      className="w-1 h-1 bg-blue-400 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-xs text-blue-400 ml-2">AI thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startListening}
              disabled={isListening}
              className={`p-2 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
              aria-label="Voice input"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEnhance(inputText)}
              disabled={!inputText.trim() || isEnhancing}
              className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                       hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 
                       disabled:cursor-not-allowed transition-all shadow-lg"
              aria-label="Enhance message with AI"
            >
              {isEnhancing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </motion.button>
          </div>

          
          <AutocompleteDropdown
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
            isVisible={showSuggestions}
            inputRef={textareaRef}
          />
        </div>
      </motion.div>

     
      <AnimatePresence>
        {enhancedText && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-gray-200 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-green-400" />
              AI Enhanced Message
            </h3>
            
            <div className="relative p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 
                          backdrop-blur-sm border border-green-500/20 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-2xl"></div>
              
              <div className="relative">
                <p className="text-white text-lg leading-relaxed font-medium mb-4">
                  {enhancedText}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Brain className="h-4 w-4" />
                    <span>Enhanced by AI • Ready to speak</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSpeak}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full 
                             bg-gradient-to-r from-green-500 to-blue-500 text-white
                             hover:from-green-600 hover:to-blue-600 transition-all
                             shadow-lg font-medium"
                    aria-label={isPlaying ? "Stop speaking" : "Speak message"}
                  >
                    {isPlaying ? (
                      <>
                        <VolumeX className="h-4 w-4" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4" />
                        <span>Speak</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}