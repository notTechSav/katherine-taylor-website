import 'dotenv/config';
import express from 'express';
import { openai } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';

const app = express();
app.use(express.json());

// Helper to create AI Gateway configured model
function getGatewayModel(modelName: string = 'gpt-4o-mini') {
  if (!process.env.AI_GATEWAY_API_KEY || !process.env.OPENAI_API_KEY) {
    throw new Error('Required API keys not set in .env file');
  }

  return openai(modelName, {
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.vercel.com/v1/ai-gateway',
    headers: {
      'X-Vercel-AI-Gateway-API-Key': process.env.AI_GATEWAY_API_KEY!,
    },
  });
}

// Standard text generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await generateText({
      model: getGatewayModel(),
      prompt,
    });

    res.json({
      text: result.text,
      usage: result.usage,
      finishReason: result.finishReason,
    });
  } catch (error) {
    console.error('Generate error:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

// Streaming endpoint
app.post('/api/stream', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Set headers for SSE (Server-Sent Events)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const { textStream } = await streamText({
      model: getGatewayModel(),
      prompt,
    });

    // Stream the response
    for await (const textPart of textStream) {
      res.write(`data: ${JSON.stringify({ text: textPart })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Streaming error:', error);
    res.status(500).json({ error: 'Failed to stream text' });
  }
});

// Chat endpoint with message history
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const result = await generateText({
      model: getGatewayModel(),
      messages,
    });

    res.json({
      message: result.text,
      usage: result.usage,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    gateway: 'configured',
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`\n📍 Available endpoints:`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   POST /api/generate - Text generation`);
  console.log(`   POST /api/stream - Streaming text`);
  console.log(`   POST /api/chat - Chat with message history`);
  console.log(`\n💡 Test with curl:`);
  console.log(`   curl http://localhost:${PORT}/api/health`);
  console.log(`   curl -X POST http://localhost:${PORT}/api/generate -H "Content-Type: application/json" -d '{"prompt":"Hello!"}'`);
});


