import { useEffect, useRef, useState } from 'react';

export function useFadeInOnScroll() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.3,                      // Early trigger for mobile (30% visible)
        rootMargin: '0px 0px -10% 0px'       // Slight offset for better UX
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return { ref, isVisible };
}
