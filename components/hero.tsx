'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 257;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const frameRef = useRef({ index: 1 });
  const renderRequested = useRef(false);

  useEffect(() => {
    let animation: gsap.core.Tween | null = null;
    let lastDrawnBitmap: ImageBitmap | HTMLImageElement | null = null;
    const loadedBitmaps: (ImageBitmap | HTMLImageElement)[] = [];

    const renderFrame = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      const currentIndex = Math.floor(frameRef.current.index);
      
      let bitmap = loadedBitmaps[currentIndex];
      
      // Progressive fallback: if current frame is not loaded yet,
      // find and render the nearest loaded frame for zero-latency scrolling.
      if (!bitmap) {
        for (let offset = 1; offset <= TOTAL_FRAMES; offset++) {
          const prev = currentIndex - offset;
          const next = currentIndex + offset;
          if (prev >= 1 && loadedBitmaps[prev]) {
            bitmap = loadedBitmaps[prev];
            break;
          }
          if (next <= TOTAL_FRAMES && loadedBitmaps[next]) {
            bitmap = loadedBitmaps[next];
            break;
          }
        }
      }

      if (canvas && context && bitmap) {
        // Skip drawing if the bitmap is exactly the same as last rendered frame
        if (lastDrawnBitmap === bitmap && canvas.width > 0) {
          renderRequested.current = false;
          return;
        }
        lastDrawnBitmap = bitmap;

        const ratio = window.devicePixelRatio || 1;
        const width = document.documentElement.clientWidth || window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.scale(ratio, ratio);

        const imgRatio = bitmap.width / bitmap.height;
        const canvasRatio = width / height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawWidth = height * imgRatio;
          drawHeight = height;
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(bitmap, offsetX, offsetY, drawWidth, drawHeight);
      }
      renderRequested.current = false;
    };

    const requestRender = () => {
      if (!renderRequested.current) {
        renderRequested.current = true;
        requestAnimationFrame(renderFrame);
      }
    };

    const initScrollAnimation = () => {
      if (!containerRef.current || !canvasRef.current) return;

      renderFrame();

      // Main frame sequence animation
      animation = gsap.to(frameRef.current, {
        index: TOTAL_FRAMES,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: () => requestRender(),
        },
      });
    };

    const startHybridPreload = () => {
      const isMobile = window.innerWidth < 768;
      const initialLimit = isMobile ? 25 : 50;

      // Build queue prioritizing initial frames
      const loadQueue: number[] = [];
      for (let i = 2; i <= initialLimit; i++) loadQueue.push(i);

      // Background batch 1 (key frames every 5th frame)
      for (let i = initialLimit + 1; i <= TOTAL_FRAMES; i += 5) {
        loadQueue.push(i);
      }

      // Background batch 2 (remaining frames)
      for (let i = initialLimit + 1; i <= TOTAL_FRAMES; i++) {
        if ((i - (initialLimit + 1)) % 5 !== 0) loadQueue.push(i);
      }

      let queueIndex = 0;

      const loadNext = async () => {
        if (queueIndex >= loadQueue.length) return;

        const i = loadQueue[queueIndex++];
        if (!i) return;

        const frameNum = i.toString().padStart(3, '0');
        const url = `/frames-webp/ezgif-frame-${frameNum}.webp`;

        try {
          if (typeof window !== 'undefined' && window.createImageBitmap) {
            const response = await fetch(url, { priority: i <= initialLimit ? 'high' : 'low' } as RequestInit);
            const blob = await response.blob();
            const bitmap = await window.createImageBitmap(blob);
            loadedBitmaps[i] = bitmap;
          } else {
            // Fallback for older browsers
            const img = new Image();
            img.decoding = 'async';
            img.src = url;
            await new Promise((resolve) => {
              img.onload = () => {
                loadedBitmaps[i] = img;
                resolve(true);
              };
              img.onerror = () => resolve(false);
            });
          }

          // Re-render if looking near this frame
          requestRender();
        } catch (e) {
          // Silently catch network drops and continue queue
        }

        loadNext();
      };

      // Start 3 concurrent workers
      for (let w = 0; w < 3; w++) {
        loadNext();
      }
    };

    // Load Frame 1 instantly
    const firstImg = new Image();
    firstImg.src = '/frames-webp/ezgif-frame-001.webp';
    firstImg.onload = () => {
      loadedBitmaps[1] = firstImg;
      requestRender();
      initScrollAnimation();
      ScrollTrigger.refresh();
      
      // Start background hybrid queue
      if (typeof window !== 'undefined') {
        setTimeout(startHybridPreload, 50);
      }
    };

    (window as any).resetHeroToStart = () => {
      frameRef.current.index = 1;
      requestRender();
    };

    window.addEventListener('resize', requestRender);
    return () => {
      window.removeEventListener('resize', requestRender);
      delete (window as any).resetHeroToStart;
      if (animation) animation.kill();
    };
  }, []);

  // Smooth cinematic 4.5-second preloader progress timer (bypass on reload/subsequent visits)
  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem('hiranmayi_preloaded') === 'true';

    if (alreadyVisited) {
      setIsLoaded(true);
      setLoadingProgress(100);
      return;
    }

    const startTime = Date.now();
    const duration = 4500; // Exactly 4.5 seconds to 100%

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);
        sessionStorage.setItem('hiranmayi_preloaded', 'true');
        setIsLoaded(true);
      }
    }, 45);

    return () => clearInterval(timer);
  }, []);

  // Lock scrolling while preloader is active
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLoaded]);

  return (
    <>
      {/* Premium Minimalist Loader Overlay - Placed at Root Level with z-[999999] to Completely Conceal Header */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[999999] h-screen w-screen flex flex-col items-center justify-center bg-[#0B1B12]"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Brand Logo with soft float/fade entry */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="px-6"
              >
                <img 
                  src="/Hir_Logo-768x140-removebg-preview.png" 
                  alt="HIRANMAYI" 
                  className="h-10 md:h-14 w-auto object-contain brightness-100"
                />
              </motion.div>
              
              {/* Premium Golden Loading Progress Bar */}
              <div className="flex flex-col items-center gap-2 w-48 md:w-56">
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#D1A26C]/20 relative">
                  <motion.div 
                    className="absolute h-full left-0 top-0 bg-gradient-to-r from-[#D1A26C] to-[#EAE5D9]"
                    style={{ width: `${loadingProgress}%`, transition: 'width 0.2s ease-out' }}
                  />
                </div>
                <div className="flex justify-between items-center w-full px-1">
                  <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#EAE5D9]/60">
                    Loading Sanctuary
                  </span>
                  <span className="font-mono text-[10px] text-[#D1A26C] tracking-widest font-bold">
                    {loadingProgress}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="hero" ref={containerRef} className="relative w-full overflow-hidden bg-[#0B1B12]">
        {/* Sticky Canvas Container */}
        <div className="relative h-screen w-full">
          
          {/* Cinematic Canvas */}
          <canvas
            ref={canvasRef}
            className="h-full w-full object-cover"
            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
          />

        {/* Subtle Vignette */}
        <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-b from-white/10 via-transparent to-white/10" />
      </div>

    </div>
    </>
  );
}
