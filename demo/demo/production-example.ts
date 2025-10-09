/**
 * Production-ready example using the centralized AI configuration
 * This is the RECOMMENDED pattern for real applications
 */

import { generateText, streamText } from 'ai';
import { models, getModel } from './lib-ai';

async function main() {
  console.log('🚀 Production Pattern Demo\n');

  // Example 1: Using getModel() directly
  console.log('1️⃣ Using getModel() function...');
  const result1 = await generateText({
    model: getModel('gpt-4o-mini'),
    prompt: 'Say hello in 3 words',
  });
  console.log('Response:', result1.text);
  console.log('');

  // Example 2: Using the model shortcuts (recommended!)
  console.log('2️⃣ Using models.gpt4oMini() shortcut...');
  const result2 = await generateText({
    model: models.gpt4oMini(),
    prompt: 'Count from 1 to 5',
  });
  console.log('Response:', result2.text);
  console.log('');

  // Example 3: Streaming with the production pattern
  console.log('3️⃣ Streaming response...');
  const { textStream } = await streamText({
    model: models.gpt4oMini(),
    prompt: 'Write a haiku about code',
  });

  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }
  console.log('\n');

  // Example 4: Chat conversation
  console.log('4️⃣ Multi-turn conversation...');
  const result4 = await generateText({
    model: models.gpt4oMini(),
    messages: [
      { role: 'system', content: 'You are a helpful coding assistant.' },
      { role: 'user', content: 'What is TypeScript?' },
    ],
  });
  console.log('Response:', result4.text);
  console.log('\n📊 Usage:', result4.usage);

  console.log('\n✅ All examples completed!');
  console.log('💡 All requests were routed through Vercel AI Gateway');
  console.log('📈 Check your Vercel dashboard for analytics!');
}

main().catch(console.error);

