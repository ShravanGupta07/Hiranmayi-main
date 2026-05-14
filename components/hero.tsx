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
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hiranmayi_preloaded') === 'true';
    }
    return false;
  });
  const [loadingProgress, setLoadingProgress] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hiranmayi_preloaded') === 'true') {
      return 100;
    }
    return 0;
  });
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ index: 1 });
  const renderRequested = useRef(false);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    let animation: gsap.core.Tween | null = null;
    let lastDrawnImage: HTMLImageElement | null = null;

    const renderFrame = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      const currentIndex = Math.floor(frameRef.current.index);
      
      let img = loadedImages[currentIndex];
      
      // Progressive fallback: if current frame is not loaded yet,
      // find and render the nearest loaded frame for zero-latency scrolling.
      if (!img || !img.complete) {
        for (let offset = 1; offset <= TOTAL_FRAMES; offset++) {
          const prev = currentIndex - offset;
          const next = currentIndex + offset;
          if (prev >= 1 && loadedImages[prev] && loadedImages[prev].complete) {
            img = loadedImages[prev];
            break;
          }
          if (next <= TOTAL_FRAMES && loadedImages[next] && loadedImages[next].complete) {
            img = loadedImages[next];
            break;
          }
        }
      }

      if (canvas && context && img && img.complete) {
        // Skip drawing if the image is exactly the same as last rendered frame
        if (lastDrawnImage === img && canvas.width > 0) {
          renderRequested.current = false;
          return;
        }
        lastDrawnImage = img;

        const ratio = window.devicePixelRatio || 1;
        const width = document.documentElement.clientWidth || window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.scale(ratio, ratio);

        const imgRatio = img.width / img.height;
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
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
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

    // Initialize scroll animation immediately so pinning order in GSAP is correct
    initScrollAnimation();

    // 1. Load the first frame immediately to display the hero section instantly
    const firstImg = new Image();
    firstImg.src = '/frames-webp/ezgif-frame-001.webp';
    firstImg.onload = () => {
      loadedImages[1] = firstImg;
      imagesRef.current = loadedImages;
      requestRender();
      ScrollTrigger.refresh();
      
      // 2. Preload remaining frames progressively in the background.
      if (typeof window !== 'undefined') {
        const startPreload = () => {
          setTimeout(preloadRemainingImages, 100);
        };
        if (document.readyState === 'complete') {
          startPreload();
        } else {
          window.addEventListener('load', startPreload);
          return () => window.removeEventListener('load', startPreload);
        }
      }
    };

    const preloadRemainingImages = () => {
      // Prioritize Keyframes: Load every 10th frame first (10, 20, 30... 250)
      const keyframes: number[] = [];
      for (let i = 10; i <= TOTAL_FRAMES; i += 10) {
        keyframes.push(i);
      }
      
      // Secondary: Load all remaining intermediate frames
      const normalFrames: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (i % 10 !== 0) normalFrames.push(i);
      }

      const loadQueue = [...keyframes, ...normalFrames];
      let queueIndex = 0;

      const loadNext = () => {
        if (queueIndex >= loadQueue.length) return;

        const i = loadQueue[queueIndex++];
        if (!i) return;

        const img = new Image();
        img.decoding = 'async';
        img.fetchPriority = i <= 30 ? 'high' : 'low';
        const frameNum = i.toString().padStart(3, '0');
        img.src = `/frames-webp/ezgif-frame-${frameNum}.webp`;

        img.onload = () => {
          loadedCount++;
          loadedImages[i] = img;
          
          // Render if user is looking near this frame
          const currentPos = Math.floor(frameRef.current.index);
          if (Math.abs(currentPos - i) <= 15) {
            requestRender();
          }
          loadNext();
        };

        img.onerror = () => {
          loadedCount++;
          loadNext();
        };
      };

      // Start 4 concurrent loader workers for rapid keyframe fetching
      for (let q = 0; q < 4; q++) {
        loadNext();
      }

      imagesRef.current = loadedImages;
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
