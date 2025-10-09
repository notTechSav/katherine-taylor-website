import 'dotenv/config';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

async function streamingDemo() {
  try {
    if (!process.env.AI_GATEWAY_API_KEY || !process.env.OPENAI_API_KEY) {
      throw new Error('Required API keys not set in .env file');
    }

    console.log('🌊 Testing Streaming with Vercel AI Gateway...\n');

    const { textStream } = await streamText({
      model: openai('gpt-4o-mini', {
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.vercel.com/v1/ai-gateway',
        headers: {
          'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
        },
      }),
      prompt: 'Write a haiku about AI gateways',
    });

    console.log('📝 Streaming response:\n');
    for await (const textPart of textStream) {
      process.stdout.write(textPart);
    }
    console.log('\n\n✅ Streaming complete!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

streamingDemo();

