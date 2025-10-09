/**
 * Production-ready AI configuration with Vercel AI Gateway
 * 
 * This file demonstrates the RECOMMENDED pattern:
 * - Configure the gateway ONCE
 * - Export reusable helper functions
 * - Import and use cleanly throughout your app
 * 
 * Usage:
 * 
 * import { models } from './lib-ai';
 * import { generateText } from 'ai';
 * 
 * const result = await generateText({
 *   model: models.gpt4oMini(),
 *   prompt: 'Hello!',
 * });
 */

import 'dotenv/config';
import { openai } from '@ai-sdk/openai';

// Validate environment variables
if (!process.env.AI_GATEWAY_API_KEY) {
  throw new Error('AI_GATEWAY_API_KEY is not set in environment variables');
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

/**
 * Gateway configuration options
 */
const gatewayConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.vercel.com/v1/ai-gateway',
  headers: {
    'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY,
  },
};

/**
 * Helper function to get a language model with Gateway configuration
 * All AI requests will be:
 * - Routed through Vercel AI Gateway
 * - Monitored and logged
 * - Cached when appropriate
 * - Rate limited and secured
 * 
 * @param modelId - Model identifier (e.g., 'gpt-4o-mini')
 * @returns Configured language model
 */
export function getModel(modelId: string) {
  return openai(modelId, gatewayConfig);
}

/**
 * Common model shortcuts for convenience
 */
export const models = {
  // OpenAI models
  gpt4oMini: () => getModel('gpt-4o-mini'),
  gpt4o: () => getModel('gpt-4o'),
  gpt4Turbo: () => getModel('gpt-4-turbo'),
  gpt35Turbo: () => getModel('gpt-3.5-turbo'),
  
  // Add more shortcuts as needed
} as const;

