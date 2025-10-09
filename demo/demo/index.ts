import 'dotenv/config';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

async function main() {
  try {
    // Verify environment variables
    if (!process.env.AI_GATEWAY_API_KEY) {
      throw new Error('AI_GATEWAY_API_KEY is not set in .env file');
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in .env file. Please add it to continue.');
    }

    console.log('🚀 Testing Vercel AI Gateway...\n');

    const result = await generateText({
      model: openai('gpt-4o-mini', {
        // The AI Gateway proxies requests to OpenAI
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.vercel.com/v1/ai-gateway',
        headers: {
          'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
        },
      }),
      prompt: 'Say hello and confirm the AI Gateway is working!',
    });

    console.log('✅ Success! Response from AI Gateway:\n');
    console.log(result.text);
    console.log('\n📊 Usage:', result.usage);
    console.log('🏁 Finish reason:', result.finishReason);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();

