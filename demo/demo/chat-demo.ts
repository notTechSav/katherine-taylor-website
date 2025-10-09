import 'dotenv/config';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

async function chatDemo() {
  try {
    if (!process.env.AI_GATEWAY_API_KEY || !process.env.OPENAI_API_KEY) {
      throw new Error('Required API keys not set in .env file');
    }

    console.log('💬 Testing Chat with Vercel AI Gateway...\n');

    const result = await generateText({
      model: openai('gpt-4o-mini', {
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.vercel.com/v1/ai-gateway',
        headers: {
          'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
        },
      }),
      messages: [
        { role: 'system', content: 'You are a helpful assistant that explains technical concepts concisely.' },
        { role: 'user', content: 'What are the benefits of using an AI gateway?' },
      ],
    });

    console.log('🤖 Assistant:', result.text);
    console.log('\n📊 Token Usage:');
    console.log('  - Prompt tokens:', result.usage.promptTokens);
    console.log('  - Completion tokens:', result.usage.completionTokens);
    console.log('  - Total tokens:', result.usage.totalTokens);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

chatDemo();


