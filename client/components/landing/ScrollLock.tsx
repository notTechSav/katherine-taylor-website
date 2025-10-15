import { useEffect, useRef, useState } from 'react';

// Start with just hero section - we'll add more as we go
const sections = ['hero'];

export default function ScrollLock() {
  const [current, setCurrent] = useState(0);
  const isLockedRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const scrollTo = (index: number) => {
    // Prevent scrolling if locked, animating, or out of bounds
    if (isLockedRef.current || isAnimatingRef.current || index < 0 || index >= sections.length) {
      return;
    }

    // Lock scrolling
    isLockedRef.current = true;
    isAnimatingRef.current = true;
    setCurrent(index);

    // Scroll to section
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Unlock after YSL timing (1000ms) - DO NOT CHANGE THIS VALUE
    setTimeout(() => {
      isLockedRef.current = false;
      isAnimatingRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    // Wheel event handler (desktop)
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        scrollTo(current + 1);
      } else if (e.deltaY < 0) {
        scrollTo(current - 1);
      }
    };

    // Touch event handlers (mobile)
    let touchStartY = 0;
    let touchStartTime = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const diff = touchStartY - touchEndY;
      const timeDiff = touchEndTime - touchStartTime;

      // Require minimum swipe distance (50px) and reasonable speed
      if (Math.abs(diff) > 50 && timeDiff < 500) {
        if (diff > 0) {
          // Swipe up = scroll down
          scrollTo(current + 1);
        } else {
          // Swipe down = scroll up
          scrollTo(current - 1);
        }
      }
    };

    // Keyboard navigation (desktop)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollTo(current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollTo(current - 1);
      }
    };

    // Add event listeners
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [current]);

  return null;
}
