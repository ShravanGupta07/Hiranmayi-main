'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ScrollHandlerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const backFromProject = searchParams.get('backFromProject');
    
    if (backFromProject) {
      // Small delay to ensure Lenis and GSAP are ready
      const timer = setTimeout(() => {
        const element = document.getElementById('featured-projects');
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
          
          // Clean up the URL so refresh starts at the top
          router.replace('/', { scroll: false });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  return null;
}

export function ScrollHandler() {
  return (
    <Suspense fallback={null}>
      <ScrollHandlerContent />
    </Suspense>
  );
}
