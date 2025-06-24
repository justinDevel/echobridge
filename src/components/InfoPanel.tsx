import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  Heart,
  TrendingUp,
  Award,
  MessageCircle
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Enhancement',
    description: 'Advanced AI transforms simple phrases into clear, contextual communication'
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Communicate effectively in over 40 languages with native-quality speech'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing happens securely with enterprise-grade encryption'
  },
  {
    icon: Zap,
    title: 'Real-Time Processing',
    description: 'Instant text enhancement and speech synthesis for natural conversations'
  }
];

const stats = [
  { label: 'Active Users', value: '50K+', icon: Users },
  { label: 'Messages Enhanced', value: '2M+', icon: MessageCircle },
  { label: 'Languages Supported', value: '40+', icon: Globe },
  { label: 'Satisfaction Rate', value: '98%', icon: Heart }
];

export function InfoPanel() {
  return (
    <div className="space-y-8">
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm 
                 border border-blue-500/20 rounded-2xl p-6"
      >
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Our Mission</h2>
        </div>
        <p className="text-gray-300 leading-relaxed">
          EchoBridge empowers individuals with speech impairments to communicate confidently 
          and effectively using cutting-edge AI technology. We believe everyone deserves to 
          have their voice heard clearly and with dignity.
        </p>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Award className="h-5 w-5 mr-2 text-yellow-400" />
          Key Features
        </h3>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 
                       rounded-xl p-4 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                              rounded-lg">
                  <feature.icon className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">{feature.title}</h4>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-white flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
          Impact Statistics
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm 
                       border border-gray-700/50 rounded-xl p-4 text-center"
            >
              <div className="flex justify-center mb-2">
                <stat.icon className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-sm 
                 border border-green-500/20 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-green-400" />
          Sample Enhancement
        </h3>
        <div className="space-y-3">
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Original:</div>
            <div className="text-gray-300">"I need help"</div>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-3">
            <div className="text-xs text-green-400 mb-1">AI Enhanced:</div>
            <div className="text-white font-medium">
              "Excuse me, could you please assist me with something?"
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}