#!/bin/bash

echo "Testing Vercel AI Gateway Server..."
echo ""

echo "1. Health Check:"
curl http://localhost:3000/api/health
echo -e "\n"

echo "2. Generate Text:"
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Say hello in 5 words"}'
echo -e "\n"

echo "3. Chat:"
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What is 2+2?"}]}'
echo -e "\n"

echo "4. Stream (will show raw SSE):"
curl -X POST http://localhost:3000/api/stream \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Count to 5"}' \
  --no-buffer
echo -e "\n"

