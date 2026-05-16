'use client';

import { useEffect } from 'react';

export function HashScrollFix() {
  useEffect(() => {
    // Check if there's a hash in the URL on mount
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wait for components to mount and GSAP to calculate heights
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }, 800); // 800ms is usually enough for GSAP and images
      }
    };

    handleHash();
    
    // Also listen for hash changes
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return null;
}
