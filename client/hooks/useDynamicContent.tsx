import { useState, useEffect } from 'react';

interface DynamicContentOptions {
  page?: string;
  customPrompt?: string;
  brandVoice?: string;
}

interface DynamicContentState {
  content: string;
  loading: boolean;
  error: string | null;
}

export const useDynamicContent = (options: DynamicContentOptions = {}) => {
  const [state, setState] = useState<DynamicContentState>({
    content: '',
    loading: false,
    error: null,
  });

  const generateContent = async () => {
    const page = options.page || window.location.pathname || "home";
    const brandVoice = options.brandVoice || "Katherine Taylor brand voice";
    const prompt = options.customPrompt || 
      `Write the final website copy for the ${page} page in the ${brandVoice}. Use quiet authority, precision, no filler.`;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

      if (!apiKey) {
        throw new Error('Anthropic API key not found. Please set VITE_ANTHROPIC_API_KEY environment variable.');
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: "Return only HTML, no commentary.",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.content?.[0]?.text || "";

      setState({
        content,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        content: '',
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  useEffect(() => {
    generateContent();
  }, [options.page, options.customPrompt, options.brandVoice]);

  return {
    ...state,
    regenerate: generateContent,
  };
};

