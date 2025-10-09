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
      // Call server-side API route instead of Anthropic directly (security best practice)
      const response = await fetch("/api/content/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.9,
          maxTokens: 4096,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.content || "";

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

