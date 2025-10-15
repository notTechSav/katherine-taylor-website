import { ReactNode } from 'react';
import { useFadeInOnScroll } from '../../hooks/useFadeInOnScroll';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className = '' }: SectionProps) {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <section
      id={id}
      ref={ref}
      className={`
        h-screen w-full
        flex items-center justify-center
        relative overflow-hidden
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        ${className}
      `}
      style={{
        height: '100vh',
        minHeight: 'var(--app-height, 100vh)'
      }}
    >
      {children}
    </section>
  );
}
