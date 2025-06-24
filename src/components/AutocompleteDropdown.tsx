import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  Heart, 
  Users, 
  MapPin, 
  Droplets, 
  Moon, 
  Utensils, 
  Hand, 
  RotateCcw, 
  Clock, 
  HelpCircle, 
  Phone, 
  AlertTriangle,
  DoorOpen,
  Navigation,
  Stethoscope,
  Pill,
  Thermometer
} from 'lucide-react';
import { IntentSuggestion } from '../utils/intentRecognition';

interface AutocompleteDropdownProps {
  suggestions: IntentSuggestion[];
  onSelect: (suggestion: IntentSuggestion) => void;
  isVisible: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const iconMap = {
  AlertCircle,
  Heart,
  Users,
  MapPin,
  Droplets,
  Moon,
  Utensils,
  Hand,
  RotateCcw,
  Clock,
  HelpCircle,
  Phone,
  AlertTriangle,
  DoorOpen,
  Navigation,
  Stethoscope,
  Pill,
  Thermometer,
};

const categoryColors = {
  emergency: 'from-red-500 to-orange-500',
  daily: 'from-blue-500 to-cyan-500',
  social: 'from-green-500 to-teal-500',
  medical: 'from-purple-500 to-pink-500',
  navigation: 'from-yellow-500 to-orange-500',
  food: 'from-emerald-500 to-green-500',
  communication: 'from-indigo-500 to-blue-500',
};

const categoryBorders = {
  emergency: 'border-red-500/30',
  daily: 'border-blue-500/30',
  social: 'border-green-500/30',
  medical: 'border-purple-500/30',
  navigation: 'border-yellow-500/30',
  food: 'border-emerald-500/30',
  communication: 'border-indigo-500/30',
};

export function AutocompleteDropdown({ 
  suggestions, 
  onSelect, 
  isVisible, 
  inputRef 
}: AutocompleteDropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || suggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % suggestions.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? suggestions.length - 1 : prev - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (suggestions[selectedIndex]) {
            onSelect(suggestions[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          inputRef.current?.focus();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, suggestions, selectedIndex, onSelect, inputRef]);

  if (!isVisible || suggestions.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl 
                   border border-gray-700/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
      >
        <div className="p-2 border-b border-gray-700/30">
          <div className="flex items-center space-x-2 px-3 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400 font-medium">
              Smart Suggestions • {suggestions.length} found
            </span>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {suggestions.map((suggestion, index) => {
            const IconComponent = iconMap[suggestion.icon as keyof typeof iconMap] || AlertCircle;
            const isSelected = index === selectedIndex;
            
            return (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(suggestion)}
                className={`
                  relative p-4 cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? `bg-gradient-to-r ${categoryColors[suggestion.category]}/20 border-l-4 ${categoryBorders[suggestion.category]}` 
                    : 'hover:bg-gray-700/30'
                  }
                  ${index !== suggestions.length - 1 ? 'border-b border-gray-700/20' : ''}
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${categoryColors[suggestion.category]}/20
                    ${isSelected ? 'scale-110' : ''}
                    transition-transform duration-200
                  `}>
                    <IconComponent className={`h-4 w-4 text-white`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-medium text-sm truncate">
                        {suggestion.text}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`
                          px-2 py-1 text-xs rounded-full font-medium
                          ${categoryColors[suggestion.category]} bg-gradient-to-r text-white
                        `}>
                          {suggestion.category}
                        </span>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full mx-0.5 ${
                                i < Math.floor(suggestion.confidence * 5)
                                  ? 'bg-green-400'
                                  : 'bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {suggestion.enhanced}
                    </p>
                    
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 pt-2 border-t border-gray-600/30"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">
                            Confidence: {Math.round(suggestion.confidence * 100)}%
                          </span>
                          <span className="text-gray-500">
                            Press Enter to select
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {isSelected && (
                  <motion.div
                    layoutId="selectedIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                             rounded-lg pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="p-3 bg-gray-900/50 border-t border-gray-700/30">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Use ↑↓ to navigate, Enter to select</span>
            <span>Powered by AI Intent Recognition</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}