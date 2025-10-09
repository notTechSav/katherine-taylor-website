/**
 * Super Simple AI Example
 * No gateway, no complexity, just works!
 */

import { generateText, streamText } from 'ai';
import { models } from './lib-ai-simple';

async function main() {
  console.log('✨ Simple AI Demo (No Gateway Bloat!)\n');

  // Example 1: Basic text generation
  console.log('1️⃣  Generating text...');
  const result1 = await generateText({
    model: models.gpt4oMini,
    prompt: 'Say hello in 3 words',
  });
  console.log('   Response:', result1.text);
  console.log('   Tokens used:', result1.usage.totalTokens, '\n');

  // Example 2: Streaming (real-time)
  console.log('2️⃣  Streaming response...');
  const { textStream } = await streamText({
    model: models.gpt4oMini,
    prompt: 'Write a short haiku about simplicity',
  });
  
  console.log('   ');
  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }
  console.log('\n');

  // Example 3: Chat conversation
  console.log('3️⃣  Chat example...');
  const result3 = await generateText({
    model: models.gpt4oMini,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'What is 2+2?' },
    ],
  });
  console.log('   Response:', result3.text);
  console.log('   Cost: ~$' + (result3.usage.totalTokens * 0.00001).toFixed(6), '\n');

  console.log('✅ Done! Check your OpenAI usage at:');
  console.log('   https://platform.openai.com/usage\n');
}

main().catch(console.error);

