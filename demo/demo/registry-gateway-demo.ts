import { streamText } from 'ai';
import { openai as openaiProvider } from '@ai-sdk/openai';
import { experimental_createProviderRegistry as createProviderRegistry } from 'ai';
import 'dotenv/config';

/**
 * Registry-based approach WITH AI Gateway
 * Combines the simplicity of string-based model selection
 * with the power of Vercel AI Gateway monitoring
 */

async function main() {
  try {
    if (!process.env.AI_GATEWAY_API_KEY || !process.env.OPENAI_API_KEY) {
      throw new Error('Required API keys not set in .env file');
    }

    console.log('🌊 Testing Registry + AI Gateway...\n');

    // Create a custom provider registry with Gateway configuration
    const registry = createProviderRegistry({
      openai: openaiProvider({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.vercel.com/v1/ai-gateway',
        headers: {
          'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
        },
      }),
    });

    const result = streamText({
      model: registry.languageModel('openai:gpt-4o-mini'),
      prompt: 'Invent a new holiday and describe its traditions.',
    });

    console.log('📝 Streaming response:\n');
    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }

    console.log('\n');
    console.log('📊 Token usage:', await result.usage);
    console.log('🏁 Finish reason:', await result.finishReason);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main().catch(console.error);

