# AI Gateway Implementation Approaches

This demo shows **two different approaches** for using the Vercel AI SDK with the AI Gateway.

## Approach 1: Direct Provider Configuration (Our Initial Setup)

**Files**: `index.ts`, `streaming-demo.ts`, `chat-demo.ts`, `server-demo.ts`

```typescript
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const result = await generateText({
  model: openai('gpt-4o-mini', {
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.vercel.com/v1/ai-gateway',
    headers: {
      'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
    },
  }),
  prompt: 'Hello!',
});
```

### ✅ Pros
- Explicit configuration
- Full control over provider settings
- Works well for multiple custom configurations
- Good for production apps with complex needs

### ❌ Cons
- More verbose
- Repetitive if you use the same config everywhere

---

## Approach 2: Registry-Based (Vercel's Simpler Example)

**File**: `registry-demo.ts` (without Gateway)

```typescript
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-4o-mini',  // Simple string identifier
  prompt: 'Hello!',
});
```

### ✅ Pros
- Very clean and simple
- Minimal boilerplate
- Automatic environment variable handling

### ❌ Cons
- **Cannot use AI Gateway directly** with this approach
- Less control over configuration

---

## Approach 3: Registry + Gateway (Best of Both!)

**File**: `registry-gateway-demo.ts`

```typescript
import { streamText } from 'ai';
import { openai as openaiProvider } from '@ai-sdk/openai';
import { experimental_createProviderRegistry as createProviderRegistry } from 'ai';

// Configure once
const registry = createProviderRegistry({
  openai: openaiProvider({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.vercel.com/v1/ai-gateway',
    headers: {
      'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
    },
  }),
});

// Use everywhere with clean syntax
const result = streamText({
  model: registry.languageModel('openai:gpt-4o-mini'),
  prompt: 'Hello!',
});
```

### ✅ Pros
- Configure gateway once, use everywhere
- Cleaner than Approach 1
- Still has AI Gateway monitoring
- Great for production apps

### ❌ Cons
- Slightly more setup than pure registry
- Uses experimental API (may change)

---

## Recommendation

For **production apps with AI Gateway**, use **Approach 3**:

1. Create a `lib/ai.ts` file with your registry configuration
2. Export the configured registry
3. Import and use the clean syntax everywhere

```typescript
// lib/ai.ts
import { openai } from '@ai-sdk/openai';
import { experimental_createProviderRegistry as createProviderRegistry } from 'ai';

export const registry = createProviderRegistry({
  openai: openai({
    apiKey: process.env.OPENAI_API_KEY!,
    baseURL: 'https://api.vercel.com/v1/ai-gateway',
    headers: {
      'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
    },
  }),
});

// Usage anywhere:
// import { registry } from './lib/ai';
// const result = await generateText({
//   model: registry.languageModel('openai:gpt-4o-mini'),
//   prompt: '...',
// });
```

---

## When to Use Each

| Approach | Best For |
|----------|----------|
| **Approach 1** | Quick prototypes, learning, single-file scripts |
| **Approach 2** | Simple apps WITHOUT gateway monitoring |
| **Approach 3** | Production apps WITH gateway monitoring |

All three approaches work - choose based on your needs! 🚀

