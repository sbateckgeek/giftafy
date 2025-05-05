
import React, { useEffect, useRef } from 'react';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({ children }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            // Optional: Remove the class when element is not in view
            // entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );

    // Select all elements with the fade-in-section class
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    // Clean up
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return <>{children}</>;
};

export default ScrollAnimationWrapper;
