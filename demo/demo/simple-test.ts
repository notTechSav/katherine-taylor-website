/**
 * Simple test following Vercel's documentation exactly
 * The AI SDK should route through gateway automatically
 */

import { streamText } from 'ai';
import 'dotenv/config';

async function main() {
  console.log('🧪 Testing Vercel AI SDK (no custom baseURL)\n');
  
  try {
    // According to Vercel docs, this should automatically use AI Gateway
    // when VERCEL_AI_GATEWAY_API_KEY or AI_GATEWAY_API_KEY is set
    const result = await streamText({
      model: 'openai/gpt-4o-mini',  // Provider registry format
      prompt: 'Say "Test successful!" and nothing else.',
    });

    console.log('📝 Response: ');
    for await (const text of result.textStream) {
      process.stdout.write(text);
    }
    
    console.log('\n\n✅ Request completed!');
    console.log('📊 Check Vercel dashboard at:');
    console.log('   https://vercel.com/dashboard → Observability → AI Gateway\n');
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Note: The Vercel AI Gateway might require:');
    console.log('   1. A deployed Vercel project');
    console.log('   2. Gateway enabled in project settings');
    console.log('   3. Or it might only work in production/deployed apps\n');
  }
}

main();

