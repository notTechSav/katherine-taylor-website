# Vercel AI Gateway Demo

This demo shows how to use the Vercel AI Gateway with the Vercel AI SDK.

## ⚡ Quick Start

**Want to get started immediately?** Check out [QUICKSTART.md](./QUICKSTART.md)!

**TL;DR:**
1. Add `OPENAI_API_KEY` to `.env`
2. Run `pnpm demo:production`
3. Check your Vercel dashboard for analytics 📊

📋 **Full overview?** See [SUMMARY.md](./SUMMARY.md) for everything we built!

---

## Setup

1. Your AI Gateway key is already configured in `.env`:
   - ✅ `AI_GATEWAY_API_KEY`: Already set!

2. Add your OpenAI API key to `.env`:
   ```bash
   echo 'OPENAI_API_KEY=sk-your-key-here' >> .env
   ```

## Run Demos

### Simple Scripts

```bash
# Basic text generation (with Gateway)
pnpm start
# or
pnpm demo:basic

# Streaming example (with Gateway)
pnpm demo:streaming

# Chat conversation example (with Gateway)
pnpm demo:chat

# Registry-based approach (without Gateway - simpler!)
pnpm demo:registry

# Registry + Gateway (best of both worlds!)
pnpm demo:registry-gateway

# Production pattern (RECOMMENDED for real apps!)
pnpm demo:production
```

### Express Server

```bash
# Start the server
pnpm server

# In another terminal, test the endpoints
./test-server.sh

# Or manually test:
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello!"}'
```

## What is Vercel AI Gateway?

The Vercel AI Gateway is a proxy layer that:
- 📊 **Monitors and logs** AI API requests
- 🔒 **Provides security** and rate limiting
- 💰 **Tracks usage** and costs across providers
- 🚀 **Caches responses** for better performance
- 🔄 **Routes requests** across multiple providers
- 📈 **Analytics** and insights into AI usage

It sits between your application and the AI provider (like OpenAI), adding observability and control without changing your code significantly.

## Project Structure

```
demo/
├── 📝 Documentation
│   ├── README.md              # This file - main documentation
│   ├── QUICKSTART.md          # 3-minute setup guide
│   ├── SUMMARY.md             # Complete overview of everything
│   └── APPROACHES.md          # Detailed comparison of approaches
│
├── 🎯 Demos (Simple Examples)
│   ├── index.ts               # Basic text generation
│   ├── streaming-demo.ts      # Streaming responses
│   ├── chat-demo.ts          # Multi-turn chat
│   ├── registry-demo.ts      # Registry approach (no gateway)
│   └── registry-gateway-demo.ts  # Registry + Gateway
│
├── ⭐ Production Pattern (RECOMMENDED)
│   ├── lib-ai.ts              # Reusable AI config - copy to your app!
│   └── production-example.ts  # Shows how to use lib-ai.ts
│
├── 🚀 Server
│   ├── server-demo.ts         # Express server with 4 endpoints
│   └── test-server.sh         # Quick server testing script
│
└── 🔧 Config
    ├── .env                   # Your API keys (DO NOT COMMIT)
    ├── .env.example           # Template for required keys
    ├── .gitignore            # Git ignore rules
    └── package.json          # Scripts and dependencies
```

## 💡 Multiple Approaches

We've implemented **3 different approaches** for using the AI Gateway. Check out [`APPROACHES.md`](./APPROACHES.md) for a detailed comparison!

**TL;DR**: For production, use the **Registry + Gateway** approach (`registry-gateway-demo.ts`) - it's clean and monitored!

## API Endpoints (Server Demo)

- `GET /api/health` - Health check
- `POST /api/generate` - Generate text from a prompt
- `POST /api/stream` - Stream text generation (SSE)
- `POST /api/chat` - Chat with message history

## Example Integration

To use this in your main project, copy the gateway configuration:

```typescript
import { openai } from '@ai-sdk/openai';

const model = openai('gpt-4o-mini', {
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.vercel.com/v1/ai-gateway',
  headers: {
    'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
  },
});
```

## Next Steps

1. Add your `OPENAI_API_KEY` to `.env`
2. Run any of the demos
3. Check the Vercel dashboard for usage analytics
4. Integrate into your main application

