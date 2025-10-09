# 🔧 Vercel AI Gateway Setup Guide

## The Issue

You're not seeing requests in your Vercel dashboard because **Vercel AI Gateway primarily works with deployed Vercel applications**, not local development.

## ✅ How to Actually Set Up AI Gateway

### Step 1: Check Your Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Look for one of these sections:
   - **Observability** → **AI Gateway** (newer UI)
   - **Settings** → **AI Gateway** (project settings)
   - **AI Gateway** tab (team level)

### Step 2: Verify Gateway Status

If you see AI Gateway in your dashboard:
- ✅ Check if it's **enabled** for your project
- ✅ Look for **API Keys** section
- ✅ Verify your `AI_GATEWAY_API_KEY` matches

If you DON'T see AI Gateway:
- ❌ It might not be available for your plan
- ❌ Or it needs to be enabled for your team/project

### Step 3: Deploy to See Analytics

The AI Gateway **requires a deployed Vercel app** to track requests:

```bash
# In your main project (not this demo)
vercel deploy

# Or for production
vercel --prod
```

Once deployed, requests from your **live application** will show up in the dashboard.

---

## 🤔 Why Local Development Isn't Showing Up

### The Truth About AI Gateway

1. **Local Development** → Requests go **directly to OpenAI**
   - No gateway tracking
   - No analytics logged
   - Just uses your OpenAI API key

2. **Deployed on Vercel** → Requests go **through AI Gateway**
   - Full tracking and logging
   - Analytics in dashboard
   - Cost monitoring
   - Rate limiting

### What Your Current API Key Might Be

Your `AI_GATEWAY_API_KEY` starting with `vck_...` looks like a Vercel Connect key, which might be for:
- Vercel Connect (different from AI Gateway)
- Vercel API access
- Or a placeholder that needs activation

---

## 📊 Where to Find Analytics (Once Deployed)

After deploying your app to Vercel:

1. **Observability Tab**:
   - Go to https://vercel.com/dashboard
   - Click **Observability** in the sidebar
   - Look for **AI Gateway** section

2. **Project Settings**:
   - Select your project
   - Go to **Settings** → **AI Gateway**
   - View usage and analytics

3. **Team Level** (if available):
   - Click **AI Gateway** in the main navigation
   - See all AI requests across projects

---

## 🚀 Recommended Approach

### Option A: Deploy to Test Gateway

1. Create a simple Vercel project:
   ```bash
   cd /path/to/your/project
   vercel init
   ```

2. Deploy your app:
   ```bash
   vercel deploy
   ```

3. Make requests from the **deployed app**

4. Check dashboard for analytics

### Option B: Use Without Gateway (Local Dev)

For local development, you don't really need the gateway:

```typescript
// Just use OpenAI directly
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-4o-mini',
  prompt: 'Hello!',
});
```

This works fine for development and testing!

### Option C: Alternative Monitoring

For local development monitoring, consider:
- **Helicone** - https://helicone.ai (works locally)
- **Langfuse** - https://langfuse.com (works locally)
- **OpenAI Dashboard** - https://platform.openai.com/usage (basic usage)

---

## 💡 What We Learned

1. ✅ **Your setup works!** - AI SDK is correctly calling OpenAI
2. ✅ **Your API keys are valid** - Requests are successful
3. ⚠️ **AI Gateway = Production Feature** - Needs deployed app
4. 💡 **Local dev = Direct OpenAI** - No gateway tracking

---

## 🎯 Next Steps

### To See AI Gateway in Action:

1. **Deploy your main Cartier project to Vercel**
2. **Enable AI Gateway in project settings** (if available)
3. **Make AI requests from the deployed app**
4. **Check Observability → AI Gateway** for analytics

### For Local Development:

Just use OpenAI directly - you don't need the gateway complexity:

```typescript
// lib/ai.ts (simplified for local dev)
import { openai } from '@ai-sdk/openai';

export const models = {
  gpt4oMini: () => openai('gpt-4o-mini'),
  gpt4o: () => openai('gpt-4o'),
};
```

---

## ❓ Still Want to Try?

1. Check if your Vercel plan includes AI Gateway
2. Look at: https://vercel.com/docs/ai-gateway
3. Or contact Vercel support to confirm your setup

The demo we built **works perfectly** for AI development - the gateway is just a production monitoring add-on! 🎉

