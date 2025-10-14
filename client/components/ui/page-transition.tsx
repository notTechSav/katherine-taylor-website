/**
 * Page Transition Component - YSL Style
 *
 * Based on YSL.com transition system:
 * - Fast 300ms transitions
 * - Simple opacity fades (no complex animations)
 * - Uses --ease-fade cubic-bezier
 * - Mobile-first responsive
 */

import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * YSL-Style Page Transition
 *
 * Transition specs (from YSL code):
 * - Duration: 300ms (--transition-base)
 * - Easing: cubic-bezier(0.25, 0.1, 0.25, 1) (--ease-fade)
 * - Effect: Opacity fade only (no scale, no slide)
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3, // 300ms like YSL
          ease: [0.25, 0.1, 0.25, 1], // --ease-fade from YSL
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Faster transition for mobile (optional)
 * Mobile devices benefit from slightly faster transitions
 */
export function MobilePageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2, // Faster for mobile (200ms)
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Optional: Image fade transition
 * For product images, gallery items, etc.
 */
export function ImageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
