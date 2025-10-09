/**
 * Simple Gateway Test
 * Quick way to verify your Vercel AI Gateway is working!
 */

import 'dotenv/config';
import { generateText } from 'ai';
import { models } from './lib-ai';

async function testGateway() {
  console.log('🔍 Vercel AI Gateway Test\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Check environment variables
    console.log('✓ Checking configuration...');
    if (!process.env.AI_GATEWAY_API_KEY) {
      throw new Error('❌ AI_GATEWAY_API_KEY not found in .env');
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('❌ OPENAI_API_KEY not found in .env');
    }
    console.log('  ✓ AI_GATEWAY_API_KEY configured');
    console.log('  ✓ OPENAI_API_KEY configured\n');

    // Test the gateway
    console.log('🚀 Sending test request through AI Gateway...\n');
    
    const result = await generateText({
      model: models.gpt4oMini(),
      prompt: 'Say "Gateway is working!" and nothing else.',
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ SUCCESS!\n');
    console.log('📝 Response:', result.text);
    console.log('\n📊 Token Usage:');
    console.log('   • Prompt tokens:', result.usage.promptTokens);
    console.log('   • Completion tokens:', result.usage.completionTokens);
    console.log('   • Total tokens:', result.usage.totalTokens);
    console.log('\n🎯 Finish reason:', result.finishReason);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✨ Your Vercel AI Gateway is working perfectly!');
    console.log('📈 Check your Vercel dashboard for analytics:');
    console.log('   https://vercel.com/dashboard → AI Gateway\n');

  } catch (error: any) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('\n❌ Error:', error.message || error);
    
    if (error.message?.includes('API_KEY')) {
      console.log('\n💡 Tip: Add your missing API key to the .env file:');
      console.log('   echo "OPENAI_API_KEY=sk-your-key-here" >> .env\n');
    }
  }
}

testGateway();

