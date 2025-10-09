/**
 * Simple AI Configuration (No Gateway Bloat!)
 * 
 * Just clean, straightforward OpenAI integration
 * 
 * Usage:
 * 
 * import { models } from './lib-ai-simple';
 * import { generateText } from 'ai';
 * 
 * const result = await generateText({
 *   model: models.gpt4oMini,
 *   prompt: 'Hello!',
 * });
 */

import 'dotenv/config';
import { openai } from '@ai-sdk/openai';

// Simple check
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in .env file');
}

/**
 * Pre-configured models - use these anywhere!
 */
export const models = {
  gpt4oMini: openai('gpt-4o-mini'),      // Fast & cheap - great for most tasks
  gpt4o: openai('gpt-4o'),               // Smarter, more expensive
  gpt4Turbo: openai('gpt-4-turbo'),      // Fast & smart balance
  gpt35Turbo: openai('gpt-3.5-turbo'),   // Legacy, cheapest
};

/**
 * That's it! No complexity, no bloat.
 * Just import and use. ✨
 */

