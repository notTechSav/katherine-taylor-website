/**
 * Debug script to verify AI Gateway configuration
 * Shows exactly where requests are being sent
 */

import 'dotenv/config';

console.log('🔍 Vercel AI Gateway Configuration Debug\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Check environment variables
console.log('📋 Environment Variables:');
console.log('  AI_GATEWAY_API_KEY:', process.env.AI_GATEWAY_API_KEY ? '✅ Set (starting with: ' + process.env.AI_GATEWAY_API_KEY.substring(0, 10) + '...)' : '❌ Not set');
console.log('  OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Set (starting with: ' + process.env.OPENAI_API_KEY.substring(0, 10) + '...)' : '❌ Not set');
console.log('');

// Show the configuration
console.log('🔧 Gateway Configuration:');
console.log('  Base URL: https://api.vercel.com/v1/ai-gateway');
console.log('  Expected Header: X-Vercel-AI-Gateway-API-Key');
console.log('  Your Gateway Key starts with:', process.env.AI_GATEWAY_API_KEY?.substring(0, 15) + '...');
console.log('');

// Test a manual fetch to see the actual request
console.log('🌐 Testing Direct API Call...\n');

async function testDirectCall() {
  try {
    const response = await fetch('https://api.vercel.com/v1/ai-gateway/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: 'Say "Direct gateway test successful!"' }
        ],
        max_tokens: 50,
      }),
    });

    console.log('📡 Response Status:', response.status, response.statusText);
    console.log('📋 Response Headers:');
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });
    console.log('');

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Error Response:', errorText);
      console.log('');
      console.log('💡 Common Issues:');
      console.log('  1. Gateway not set up in Vercel dashboard');
      console.log('  2. Invalid AI_GATEWAY_API_KEY');
      console.log('  3. Gateway key not associated with a project');
      console.log('');
      console.log('🔗 Setup Instructions:');
      console.log('  1. Go to: https://vercel.com/dashboard');
      console.log('  2. Select your project (or create one)');
      console.log('  3. Go to Settings → AI Gateway');
      console.log('  4. Create or verify your gateway configuration');
      return;
    }

    const data = await response.json();
    console.log('✅ SUCCESS! Response from Gateway:');
    console.log('  Message:', data.choices[0].message.content);
    console.log('  Model:', data.model);
    console.log('  Usage:', data.usage);
    console.log('');
    console.log('📊 Where to find analytics:');
    console.log('  1. Go to: https://vercel.com/dashboard');
    console.log('  2. Select your project');
    console.log('  3. Navigate to: Analytics → AI Gateway');
    console.log('  or');
    console.log('  3. Navigate to: Settings → AI Gateway → View Analytics');
    console.log('');
    console.log('⏱️  Note: Analytics may take a few minutes to appear!');
    
  } catch (error: any) {
    console.log('❌ Request Failed:', error.message);
    console.log('');
    console.log('🔍 This might mean:');
    console.log('  • Network issue');
    console.log('  • Invalid API keys');
    console.log('  • Gateway not properly configured');
  }
}

testDirectCall();

