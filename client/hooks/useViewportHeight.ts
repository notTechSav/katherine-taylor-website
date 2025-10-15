import { useEffect } from 'react';

export function useViewportHeight() {
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    // Set on mount
    setAppHeight();

    // Update on resize and orientation change
    window.addEventListener('resize', setAppHeight);
    window.addEventListener('orientationchange', setAppHeight);

    // iOS-specific: update when viewport changes (Safari toolbar)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', setAppHeight);
    }

    return () => {
      window.removeEventListener('resize', setAppHeight);
      window.removeEventListener('orientationchange', setAppHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', setAppHeight);
      }
    };
  }, []);
}
