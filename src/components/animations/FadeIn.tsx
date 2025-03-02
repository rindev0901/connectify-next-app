
import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 500,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (ref.current) {
            ref.current.style.opacity = '1';
            ref.current.style.transform = 'translate3d(0, 0, 0)';
            if (once) observer.unobserve(entry.target);
          }
        } else if (!once) {
          if (ref.current) {
            ref.current.style.opacity = '0';
            switch (direction) {
              case 'up':
                ref.current.style.transform = 'translate3d(0, 20px, 0)';
                break;
              case 'down':
                ref.current.style.transform = 'translate3d(0, -20px, 0)';
                break;
              case 'left':
                ref.current.style.transform = 'translate3d(20px, 0, 0)';
                break;
              case 'right':
                ref.current.style.transform = 'translate3d(-20px, 0, 0)';
                break;
              case 'none':
                ref.current.style.transform = 'translate3d(0, 0, 0)';
                break;
            }
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [direction, once, rootMargin, threshold]);

  let initialTransform;
  switch (direction) {
    case 'up':
      initialTransform = 'translate3d(0, 20px, 0)';
      break;
    case 'down':
      initialTransform = 'translate3d(0, -20px, 0)';
      break;
    case 'left':
      initialTransform = 'translate3d(20px, 0, 0)';
      break;
    case 'right':
      initialTransform = 'translate3d(-20px, 0, 0)';
      break;
    case 'none':
      initialTransform = 'translate3d(0, 0, 0)';
      break;
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: 0,
        transform: initialTransform,
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
