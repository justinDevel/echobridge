import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { ComprehendClient, DetectDominantLanguageCommand } from "@aws-sdk/client-comprehend";

const client = new PollyClient({
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const comprehendClient = new ComprehendClient({
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});


const languageMap = {
  'en': { LanguageCode: 'en-US', VoiceId: 'Stephen' },
  'es': { LanguageCode: 'es-ES', VoiceId: 'Lucia' },
  'fr': { LanguageCode: 'fr-FR', VoiceId: 'Celine' },
  'de': { LanguageCode: 'de-DE', VoiceId: 'Marlene' },
  'it': { LanguageCode: 'it-IT', VoiceId: 'Carla' },
  'ar': { LanguageCode: 'ar-AE', VoiceId: 'Hala' },
  
};

export async function detectLanguage(text) {
  const command = new DetectDominantLanguageCommand({ Text: text });
  const response = await comprehendClient.send(command);
  const languages = response.Languages || [];
  if (languages.length === 0) return 'en';
  console.log('Detected languages:', languages);
  return languages[0].LanguageCode || 'en';
}

export async function synthesizeSpeech(text, voiceProfile = {}) {
  try {
    
    let language = voiceProfile.language;
    let voiceId = voiceProfile.voiceId;

    if (!language || !voiceId) {
      const detectedLang = await detectLanguage(text);
      const pollyLang = languageMap[detectedLang] || languageMap['en'];
      language = pollyLang.LanguageCode;
      voiceId = voiceId || pollyLang.VoiceId;

      console.log(`Detected language: ${language}, using voice: ${voiceId}`);
    }

    const command = new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: "mp3",
      VoiceId: voiceId,
      Engine: "neural",
      LanguageCode: language,
      SampleRate: "22050",
    });

    const response = await client.send(command);
    const { AudioStream } = response;

    
    let audioBuffer;
    if (AudioStream && typeof AudioStream.getReader === 'function') {
      const reader = AudioStream.getReader();
      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      
      const length = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const merged = new Uint8Array(length);
      let offset = 0;
      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.length;
      }
      audioBuffer = merged.buffer;
    } else if (AudioStream instanceof Uint8Array) {
      audioBuffer = AudioStream.buffer;
    } else {
      throw new Error('Polly AudioStream is not a valid ReadableStream or Uint8Array');
    }

    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const decodedData = await audioContext.decodeAudioData(audioBuffer.slice(0));
    const source = audioContext.createBufferSource();
    source.buffer = decodedData;
    source.connect(audioContext.destination);
    source.start();

    
    return new Promise((resolve) => {
      source.onended = () => {
        audioContext.close();
        resolve();
      };
    });
  } catch (error) {
    console.error('Error synthesizing speech with Polly:', error);
    throw error;
  }
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
}