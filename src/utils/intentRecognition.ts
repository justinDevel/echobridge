import Fuse from 'fuse.js';
import { enhanceText as bedrockEnhanceText } from './bedrock';

export interface IntentSuggestion {
  id: string;
  text: string;
  enhanced: string;
  category: 'emergency' | 'daily' | 'social' | 'medical' | 'navigation' | 'food' | 'communication';
  confidence: number;
  icon: string;
}


const intentDatabase: IntentSuggestion[] = [

  { id: 'help-1', text: 'I need help', enhanced: 'Excuse me, could you please assist me with something urgent?', category: 'emergency', confidence: 1.0, icon: 'AlertCircle' },
  { id: 'help-2', text: 'Help me', enhanced: 'Could someone please help me? I need assistance.', category: 'emergency', confidence: 1.0, icon: 'AlertCircle' },
  { id: 'emergency-1', text: 'Call 911', enhanced: 'This is an emergency. Please call 911 immediately.', category: 'emergency', confidence: 1.0, icon: 'Phone' },
  { id: 'emergency-2', text: 'Emergency', enhanced: 'I have an emergency situation and need immediate help.', category: 'emergency', confidence: 1.0, icon: 'AlertTriangle' },
  { id: 'caregiver-1', text: 'Call my caregiver', enhanced: 'Could you please help me contact my caregiver? It\'s important.', category: 'emergency', confidence: 1.0, icon: 'Users' },
  { id: 'pain-1', text: 'I\'m in pain', enhanced: 'I\'m experiencing significant discomfort and may need medical attention.', category: 'medical', confidence: 1.0, icon: 'Heart' },

 
  { id: 'restroom-1', text: 'Where\'s the bathroom', enhanced: 'Excuse me, could you please direct me to the nearest restroom?', category: 'navigation', confidence: 1.0, icon: 'MapPin' },
  { id: 'restroom-2', text: 'Bathroom', enhanced: 'Could you please show me where the bathroom is located?', category: 'navigation', confidence: 1.0, icon: 'MapPin' },
  { id: 'restroom-3', text: 'Toilet', enhanced: 'I need to use the restroom. Could you point me in the right direction?', category: 'navigation', confidence: 1.0, icon: 'MapPin' },
  { id: 'water-1', text: 'I need water', enhanced: 'Could I please have some water? I\'m feeling quite thirsty.', category: 'daily', confidence: 1.0, icon: 'Droplets' },
  { id: 'tired-1', text: 'I\'m tired', enhanced: 'I\'m feeling quite tired and would like to rest for a moment.', category: 'daily', confidence: 1.0, icon: 'Moon' },
  { id: 'hungry-1', text: 'I\'m hungry', enhanced: 'I\'m feeling quite hungry. Could you help me find something to eat?', category: 'food', confidence: 1.0, icon: 'Utensils' },

  
  { id: 'thanks-1', text: 'Thank you', enhanced: 'Thank you so much for your help. I really appreciate your kindness.', category: 'social', confidence: 1.0, icon: 'Heart' },
  { id: 'thanks-2', text: 'Thanks', enhanced: 'Thank you very much for your assistance.', category: 'social', confidence: 1.0, icon: 'Heart' },
  { id: 'hello-1', text: 'Hello', enhanced: 'Hello there! It\'s wonderful to meet you.', category: 'social', confidence: 1.0, icon: 'Hand' },
  { id: 'goodbye-1', text: 'Goodbye', enhanced: 'Thank you for your time. Have a wonderful day!', category: 'social', confidence: 1.0, icon: 'Hand' },
  { id: 'sorry-1', text: 'Sorry', enhanced: 'I apologize for any inconvenience. Thank you for your understanding.', category: 'social', confidence: 1.0, icon: 'Heart' },

  
  { id: 'repeat-1', text: 'Can you repeat', enhanced: 'Could you please repeat that? I didn\'t quite catch what you said.', category: 'communication', confidence: 1.0, icon: 'RotateCcw' },
  { id: 'slower-1', text: 'Speak slower', enhanced: 'Could you please speak a bit more slowly? I\'d like to understand better.', category: 'communication', confidence: 1.0, icon: 'Clock' },
  { id: 'understand-1', text: 'I don\'t understand', enhanced: 'I\'m having trouble understanding. Could you please explain differently?', category: 'communication', confidence: 1.0, icon: 'HelpCircle' },

 
  { id: 'doctor-1', text: 'I need a doctor', enhanced: 'I need medical attention. Could you help me contact a doctor?', category: 'medical', confidence: 1.0, icon: 'Stethoscope' },
  { id: 'medicine-1', text: 'I need my medicine', enhanced: 'I need to take my medication. Could you help me with that?', category: 'medical', confidence: 1.0, icon: 'Pill' },
  { id: 'sick-1', text: 'I feel sick', enhanced: 'I\'m not feeling well and may need some assistance.', category: 'medical', confidence: 1.0, icon: 'Thermometer' },

  
  { id: 'exit-1', text: 'Where\'s the exit', enhanced: 'Could you please show me the way to the nearest exit?', category: 'navigation', confidence: 1.0, icon: 'DoorOpen' },
  { id: 'lost-1', text: 'I\'m lost', enhanced: 'I seem to have lost my way. Could you help me find where I need to go?', category: 'navigation', confidence: 1.0, icon: 'MapPin' },
  { id: 'directions-1', text: 'I need directions', enhanced: 'Could you please give me directions to where I need to go?', category: 'navigation', confidence: 1.0, icon: 'Navigation' },
];


const fuseOptions = {
  keys: ['text', 'enhanced'],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

const fuse = new Fuse(intentDatabase, fuseOptions);


const bedrockCache = new Map<string, string>();

export class IntentRecognitionEngine {
  private static instance: IntentRecognitionEngine;
  private userHistory: string[] = [];
  private contextualPatterns: Map<string, number> = new Map();

  static getInstance(): IntentRecognitionEngine {
    if (!IntentRecognitionEngine.instance) {
      IntentRecognitionEngine.instance = new IntentRecognitionEngine();
    }
    return IntentRecognitionEngine.instance;
  }

  
  getSuggestions(input: string, limit: number = 5): IntentSuggestion[] {
    if (!input || input.length < 1) {
      return this.getPopularSuggestions(limit);
    }

    
    const results = fuse.search(input);
    
    
    const scoredResults = results.map(result => {
      const suggestion = result.item;
      const baseScore = 1 - (result.score || 0);
      const contextScore = this.getContextualScore(suggestion);
      const finalScore = (baseScore * 0.7) + (contextScore * 0.3);
      
      return {
        ...suggestion,
        confidence: Math.min(finalScore, 1.0)
      };
    });

   
    return scoredResults
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, limit);
  }

  
  private getPopularSuggestions(limit: number): IntentSuggestion[] {
    const popular = [
      'help-1', 'thanks-1', 'restroom-1', 'hello-1', 
      'water-1', 'caregiver-1', 'hungry-1', 'tired-1'
    ];
    
    return popular
      .map(id => intentDatabase.find(item => item.id === id))
      .filter(Boolean)
      .slice(0, limit) as IntentSuggestion[];
  }

 
  private getContextualScore(suggestion: IntentSuggestion): number {
    const categoryFrequency = this.contextualPatterns.get(suggestion.category) || 0;
    const textFrequency = this.contextualPatterns.get(suggestion.text) || 0;
    
    return Math.min((categoryFrequency + textFrequency) / 10, 0.5);
  }

  
  learnFromSelection(suggestion: IntentSuggestion): void {
    this.userHistory.push(suggestion.text);
    
    
    const categoryCount = this.contextualPatterns.get(suggestion.category) || 0;
    const textCount = this.contextualPatterns.get(suggestion.text) || 0;
    
    this.contextualPatterns.set(suggestion.category, categoryCount + 1);
    this.contextualPatterns.set(suggestion.text, textCount + 1);
    
    
    if (this.userHistory.length > 100) {
      this.userHistory = this.userHistory.slice(-50);
    }
  }

  
  async getIntentBasedEnhancement(text: string): Promise<string> {
    const suggestions = this.getSuggestions(text, 1);
    if (suggestions.length > 0 && suggestions[0].confidence > 0.7) {
      return suggestions[0].enhanced;
    }

    
    if (this.shouldUseBedrock(text)) {
      console.log('Using Bedrock for enhancement:', text);
      if (bedrockCache.has(text)) {
        console.log('Cache hit for Bedrock:', text);
        return bedrockCache.get(text)!;
      }
      try {
        const enhanced = await bedrockEnhanceText(text);
        console.log('Enhanced with Bedrock:', enhanced);
        bedrockCache.set(text, enhanced);
        console.log('Cached Bedrock enhancement:', text);
        return enhanced;
      } catch {
        
        console.error('Bedrock enhancement failed, falling back to basic enhancement');
        return this.basicEnhancement(text);
      }
    }
    console.log('No intent matched, using basic enhancement:', text);
    
    return this.basicEnhancement(text);
  }

 
  private shouldUseBedrock(text: string): boolean {
    return !!text && text.trim().length > 0;
  }

  
  private basicEnhancement(text: string): string {
    if (!text.trim()) return text;
    
    let enhanced = text.trim();
    
    
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
    
    
    if (!enhanced.toLowerCase().includes('please') && 
        !enhanced.toLowerCase().includes('thank') &&
        enhanced.length > 10) {
      enhanced = `Could you please help me with this: ${enhanced}`;
    }
    
    
    if (!enhanced.endsWith('.') && !enhanced.endsWith('?') && !enhanced.endsWith('!')) {
      enhanced += enhanced.includes('?') || enhanced.toLowerCase().includes('where') || 
                 enhanced.toLowerCase().includes('how') || enhanced.toLowerCase().includes('what') 
                 ? '?' : '.';
    }
    
    return enhanced;
  }

  
  getSuggestionsByCategory(category: string, limit: number = 3): IntentSuggestion[] {
    return intentDatabase
      .filter(item => item.category === category)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, limit);
  }

  
  getEmergencySuggestions(): IntentSuggestion[] {
    return this.getSuggestionsByCategory('emergency', 4);
  }
}

export const intentEngine = IntentRecognitionEngine.getInstance();