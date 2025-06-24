import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Twitter, Mail } from 'lucide-react';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Team', href: '#team' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Privacy Policy', href: '#privacy' },
  { name: 'Terms of Service', href: '#terms' },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#github' },
  { name: 'Twitter', icon: Twitter, href: '#twitter' },
  { name: 'Email', icon: Mail, href: 'mailto:support@echobridge.ai' },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-gray-900/50 backdrop-blur-lg border-t border-gray-800/50 mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">EchoBridge</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering communication through AI-powered voice assistance. 
              Built with accessibility, privacy, and human dignity at our core.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-4 w-4 text-gray-400" />
                </motion.a>
              ))}
            </div>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors text-sm
                             flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>24/7 Customer Support</p>
              <p>support@echobridge.ai</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                          border border-blue-500/20 rounded-lg p-3">
              <p className="text-xs text-blue-300">
                🚀 Deployed on AWS Edge for global low-latency access
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">
              © 2024 EchoBridge. All rights reserved. Built with ❤️ for accessibility.
            </p>
            <p className="text-xs text-gray-500 mt-2 sm:mt-0">
              Powered by AWS Bedrock & Polly
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}