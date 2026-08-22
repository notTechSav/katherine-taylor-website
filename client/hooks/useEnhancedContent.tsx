import { useState, useCallback } from 'react';

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  prompt?: string;
  loading?: boolean;
  error?: string | null;
}

export interface GenerationOptions {
  temperature?: number;
  maxTokens?: number;
  styleDirectives?: string[];
  useCache?: boolean;
}

const CACHE_KEY_PREFIX = 'content_cache_';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const useEnhancedContent = () => {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [globalLoading, setGlobalLoading] = useState(false);

  // Cache management
  const getCachedContent = useCallback((cacheKey: string): string | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY_PREFIX + cacheKey);
      if (!cached) return null;

      const { content, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(CACHE_KEY_PREFIX + cacheKey);
        return null;
      }
      return content;
    } catch {
      return null;
    }
  }, []);

  const setCachedContent = useCallback((cacheKey: string, content: string) => {
    try {
      localStorage.setItem(
        CACHE_KEY_PREFIX + cacheKey,
        JSON.stringify({ content, timestamp: Date.now() })
      );
    } catch (error) {
      console.warn('Failed to cache content:', error);
    }
  }, []);

  const clearCache = useCallback((cacheKey?: string) => {
    if (cacheKey) {
      localStorage.removeItem(CACHE_KEY_PREFIX + cacheKey);
    } else {
      // Clear all content cache
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_KEY_PREFIX))
        .forEach(key => localStorage.removeItem(key));
    }
  }, []);

  // Generate content with Claude API
  const generateContent = useCallback(
    async (
      prompt: string,
      options: GenerationOptions = {}
    ): Promise<string> => {
      const {
        temperature = 1.0,
        maxTokens = 4096,
        styleDirectives = [],
        useCache = true,
      } = options;

      // Check cache first
      const cacheKey = `${prompt}_${temperature}_${maxTokens}_${styleDirectives.join(',')}`;
      if (useCache) {
        const cached = getCachedContent(cacheKey);
        if (cached) return cached;
      }

      throw new Error(
        'AI content generation is disabled. A server-side /api/content/generate implementation is required.'
      );
    },
    [getCachedContent]
  );

  // Generate a single section
  const generateSection = useCallback(
    async (
      sectionId: string,
      prompt: string,
      options?: GenerationOptions
    ): Promise<void> => {
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId ? { ...s, loading: true, error: null } : s
        )
      );

      try {
        const content = await generateContent(prompt, options);
        setSections((prev) =>
          prev.map((s) =>
            s.id === sectionId
              ? { ...s, content, loading: false, error: null }
              : s
          )
        );
      } catch (error) {
        setSections((prev) =>
          prev.map((s) =>
            s.id === sectionId
              ? {
                  ...s,
                  loading: false,
                  error:
                    error instanceof Error
                      ? error.message
                      : 'Unknown error occurred',
                }
              : s
          )
        );
      }
    },
    [generateContent]
  );

  // Generate multiple sections in parallel
  const generateMultipleSections = useCallback(
    async (
      sectionConfigs: Array<{
        id: string;
        prompt: string;
        options?: GenerationOptions;
      }>
    ): Promise<void> => {
      setGlobalLoading(true);

      await Promise.allSettled(
        sectionConfigs.map(({ id, prompt, options }) =>
          generateSection(id, prompt, options)
        )
      );

      setGlobalLoading(false);
    },
    [generateSection]
  );

  // Update section content manually
  const updateSection = useCallback(
    (sectionId: string, updates: Partial<ContentSection>) => {
      setSections((prev) =>
        prev.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
      );
    },
    []
  );

  // Add a new section
  const addSection = useCallback((section: ContentSection) => {
    setSections((prev) => [...prev, section]);
  }, []);

  // Remove a section
  const removeSection = useCallback((sectionId: string) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  }, []);

  // Initialize sections
  const initializeSections = useCallback((initialSections: ContentSection[]) => {
    setSections(initialSections);
  }, []);

  return {
    sections,
    globalLoading,
    generateSection,
    generateMultipleSections,
    updateSection,
    addSection,
    removeSection,
    initializeSections,
    clearCache,
  };
};
