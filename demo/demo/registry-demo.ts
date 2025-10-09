import { streamText } from 'ai';
import 'dotenv/config';

/**
 * Registry-based approach - simpler model selection
 * Uses string-based model identifiers like 'openai/gpt-4o-mini'
 * 
 * This automatically uses OPENAI_API_KEY from environment
 * BUT to use with AI Gateway, we need to configure the provider
 */

async function main() {
  try {
    console.log('🌊 Testing Registry-based Streaming...\n');

    const result = streamText({
      model: 'openai/gpt-4o-mini',
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


