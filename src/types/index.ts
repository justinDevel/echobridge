export interface VoiceProfile {
  id: string;
  name: string;
  language: string;
  pitch: number;
  speed: number;
  volume: number;
}

export interface Message {
  id: string;
  original: string;
  enhanced: string;
  timestamp: Date;
  language: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

export interface UsageStats {
  totalMessages: number;
  dailyUsage: number;
  favoriteQuickActions: string[];
  languagesUsed: string[];
}

export interface QuickAction {
  id: string;
  text: string;
  enhanced: string;
  icon: string;
  category: 'emergency' | 'daily' | 'social' | 'custom';
}