import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { detectLanguage } from '../utils/polly';

const client = new BedrockRuntimeClient({
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export async function enhanceText(inputText, language = 'en') {
  try {
    
    const systemPrompt = `you are an AI assistant helping people with speech impairments communicate more effectively.
    Please enhance the following text to be more clear, polite, and contextually appropriate while maintaining the original intent:
    
    Original text: "${inputText}"
    Language: ${language}
    enhanced the text only without any additional commentary or explanation. Do not change the meaning of the original text , Do not answer the original text.
    `;

    const command = new InvokeModelCommand({
      modelId: import.meta.env.VITE_BEDROCK_MODEL_ID || "mistral.mistral-small-2402-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: inputText }
        ],
        max_tokens: 256,
        temperature: 0.7
      })
    });


    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
   
   
    const enhanced = (responseBody.choices?.[0]?.message?.content || inputText).trim().replace(/^"|"$/g, '');
    //  const languages = await detectLanguage(inputText);
    //  console.log('detected languages:', languages);
    console.log('Enhanced text:', enhanced);
    return enhanced;
  } catch (error) {
    console.error('Error enhancing text with Bedrock:', error);
    return inputText; 
  }
}
