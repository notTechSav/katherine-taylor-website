# 🚀 Quick Start Guide

Get up and running with Vercel AI Gateway in 3 minutes!

## Step 1: Add Your OpenAI API Key

Open `.env` and add your OpenAI key:

```bash
AI_GATEWAY_API_KEY=vck_0Wul6eTqYtDDkHRD0nN0M05A5fZMAhL2avCP7C341bo2oFpFwX0MjiOi
OPENAI_API_KEY=sk-your-key-here  # ⬅️ ADD THIS
```

## Step 2: Test It!

Run the production example:

```bash
pnpm demo:production
```

You should see:
- ✅ Text generation working
- ✅ Streaming responses
- ✅ Chat conversations
- 📊 Token usage stats

## Step 3: Check Your Dashboard

All requests are now logged in your Vercel dashboard at:
- https://vercel.com/dashboard → AI Gateway

You'll see:
- 📊 Request counts
- 💰 Token usage and costs
- ⚡ Response times
- 📈 Usage trends

## Step 4: Use in Your Project

Copy `lib-ai.ts` to your project:

```bash
# From your main project
cp demo/demo/lib-ai.ts ./lib/ai.ts
```

Then use it anywhere:

```typescript
import { generateText } from 'ai';
import { models } from './lib/ai';

const result = await generateText({
  model: models.gpt4oMini(),
  prompt: 'Hello!',
});
```

That's it! 🎉

---

## Troubleshooting

### Error: "OPENAI_API_KEY is not set"
➜ Add your OpenAI API key to `.env`

### Error: "AI_GATEWAY_API_KEY is not set"
➜ Check that your `.env` file has the gateway key

### No analytics in Vercel dashboard
➜ Make sure requests are actually going through (check for 200 status codes)

### "Invalid API key" error
➜ Verify both keys are correct in `.env`

---

## What's Next?

- 📖 Read [`APPROACHES.md`](./APPROACHES.md) to understand different patterns
- 🔧 Try other demos: `pnpm demo:streaming`, `pnpm demo:chat`
- 🚀 Run the Express server: `pnpm server`
- 📚 Check the main [README.md](./README.md) for full documentation

