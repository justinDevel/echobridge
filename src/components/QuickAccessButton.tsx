import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface QuickAccessButtonProps {
  text: string;
  icon: LucideIcon;
  onClick: () => void;
  category: 'emergency' | 'daily' | 'social' | 'custom';
  isLoading?: boolean;
}

const categoryColors = {
  emergency: 'from-red-500 to-orange-500',
  daily: 'from-blue-500 to-cyan-500',
  social: 'from-green-500 to-teal-500',
  custom: 'from-purple-500 to-pink-500',
};

const categoryGlows = {
  emergency: 'shadow-red-500/25',
  daily: 'shadow-blue-500/25',
  social: 'shadow-green-500/25',
  custom: 'shadow-purple-500/25',
};

export function QuickAccessButton({ 
  text, 
  icon: Icon, 
  onClick, 
  category, 
  isLoading = false 
}: QuickAccessButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative p-4 rounded-2xl bg-gradient-to-br ${categoryColors[category]}
        shadow-lg ${categoryGlows[category]} hover:shadow-xl transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        group overflow-hidden
      `}
      aria-label={`Quick access: ${text}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative flex items-center space-x-3">
        <div className="flex-shrink-0">
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <Icon className="h-5 w-5 text-white" />
          )}
        </div>
        <span className="text-white font-medium text-left text-sm lg:text-base">
          {text}
        </span>
      </div>
    </motion.button>
  );
}