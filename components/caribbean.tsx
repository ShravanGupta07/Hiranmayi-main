'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const retreats = [
  {
    id: 'genial',
    subtitle: 'ANJANERI LAKESIDE • NASHIK',
    title: 'Genial',
    logo: '/Genial-logo.png',
    description: 'A unique lakeside sanctuary of just 10 exclusive ultra-luxury villas, thoughtfully crafted to offer uninterrupted living amidst nature\'s serene tranquility in Anjaneri.',
    images: {
      left: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=cover&w=600&q=80', // Lakeside luxury villa
      topRight: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=cover&w=600&q=80', // Sunset pool
      bottomRight: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=cover&w=600&q=80' // Luxury villa interior
    }
  },
  {
    id: 'zinnia',
    subtitle: 'KACHURLI FORESTS • TRIMBAKESHWAR',
    title: 'Zinnia',
    logo: '/Zinnia-logo.png',
    description: 'A luxurious tourist home sanctuary spanning 17 acres of lush greenery with breathtaking waterfalls and recreation zones.',
    images: {
      left: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=cover&w=600&q=80', // Forest hills
      topRight: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=cover&w=600&q=80', // Walkway path
      bottomRight: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=cover&w=600&q=80' // Landscape
    }
  },
  {
    id: 'abloom',
    subtitle: 'RIVERSIDE SANCTUARY • NASHIK',
    title: 'Abloom',
    logo: '/abloom-logo.png',
    description: 'A premium gated community of 10 equal-sized plots, perfectly bridging riverside serenity with spiritual tranquility and modern ready infrastructure.',
    images: {
      left: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=cover&w=600&q=80', // Sunset meadow
      topRight: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=cover&w=600&q=80', // Forest river
      bottomRight: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=cover&w=600&q=80' // Hill pathway
    }
  }
];

const RETREAT_SLICE_COUNT = 12; // Slices for horizontal line transition

export function Caribbean() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggerLength = 400; // Expanded to 400vh for ultra-smooth 3-project scrolling

      // Timeline for Pinning and Animating Card Expansion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${scrollTriggerLength}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onEnter: () => {
            const h = document.querySelector('.site-header-nav');
            if (h) gsap.to(h, { opacity: 0, y: -100, duration: 0.4, ease: 'power2.out', pointerEvents: 'none' });
          },
          onLeave: () => {
            const h = document.querySelector('.site-header-nav');
            if (h) gsap.to(h, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', pointerEvents: 'auto' });
          },
          onEnterBack: () => {
            const h = document.querySelector('.site-header-nav');
            if (h) gsap.to(h, { opacity: 0, y: -100, duration: 0.4, ease: 'power2.out', pointerEvents: 'none' });
          },
          onLeaveBack: () => {
            const h = document.querySelector('.site-header-nav');
            if (h) gsap.to(h, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', pointerEvents: 'auto' });
          }
        }
      });

      // --- PHASE 1: Card Expansion (0.0 to 0.25) ---
      tl.fromTo(cardRef.current, 
        {
          width: '34.3786vw',
          height: '80.6996vh',
          borderRadius: '0px'
        },
        {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          duration: 0.25,
          ease: 'power1.inOut'
        },
        0
      );

      tl.to('.retreats-bg-img', { opacity: 0, duration: 0.25, ease: 'power1.inOut' }, 0);
      tl.to('.retreats-intro-content', { opacity: 0, scale: 0.95, duration: 0.1, ease: 'power2.inOut' }, 0.15);
      tl.set('.retreats-intro-content', { display: 'none' }, 0.25);

      // Initialize all slices of Genial, Zinnia, and Abloom to scaleY: 0, opacity: 0
      gsap.set('.retreat-slice-strip-gsap', { scaleY: 0, opacity: 0 });

      // --- PHASE 2: Genial Project (0.25 to 0.5) ---
      const startGen = 0.25;
      const endGen = 0.5;
      const durGenIn = 0.08;
      const durGenOut = 0.08;

      const genContainer = '#retreat-genial';
      const genText = `${genContainer} .retreat-text-stack`;
      const genSlicesLeft = `${genContainer} .retreat-img-left .retreat-slice-strip-gsap`;
      const genSlicesTopRight = `${genContainer} .retreat-img-top-right .retreat-slice-strip-gsap`;
      const genSlicesBottomRight = `${genContainer} .retreat-img-bottom-right .retreat-slice-strip-gsap`;

      tl.set(genContainer, { display: 'flex' }, startGen);
      tl.fromTo(genText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durGenIn, ease: 'power2.out' }, startGen);
      
      // Horizontal Cut (Slices) transition in Genial
      tl.fromTo(genSlicesLeft, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: durGenIn + 0.04, stagger: 0.005, ease: 'power2.out', transformOrigin: 'center center' }, startGen);
      tl.fromTo(genSlicesTopRight, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: durGenIn + 0.04, stagger: 0.005, ease: 'power2.out', transformOrigin: 'center center' }, startGen + 0.02);
      tl.fromTo(genSlicesBottomRight, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: durGenIn + 0.04, stagger: 0.005, ease: 'power2.out', transformOrigin: 'center center' }, startGen + 0.04);

      tl.to(genText, { opacity: 0, y: -30, duration: durGenOut, ease: 'power2.inOut' }, endGen - durGenOut);
      
      // Horizontal Cut (Slices) transition out Genial
      tl.to(genSlicesLeft, { scaleY: 0, opacity: 0, duration: durGenOut, stagger: 0.003, ease: 'power2.inOut', transformOrigin: 'center center' }, endGen - durGenOut);
      tl.to(genSlicesTopRight, { scaleY: 0, opacity: 0, duration: durGenOut, stagger: 0.003, ease: 'power2.inOut', transformOrigin: 'center center' }, endGen - durGenOut);
      tl.to(genSlicesBottomRight, { scaleY: 0, opacity: 0, duration: durGenOut, stagger: 0.003, ease: 'power2.inOut', transformOrigin: 'center center' }, endGen - durGenOut);
      tl.set(genContainer, { display: 'none' }, endGen);

      // --- PHASE 3: Zinnia Project (0.5 to 0.75) ---
      const startZin = 0.5;
      const endZin = 0.75;
      const durZinIn = 0.08;
      const durZinOut = 0.08;

      const zinContainer = '#retreat-zinnia';
      const zinText = `${zinContainer} .retreat-text-stack`;
      const zinSlicesLeft = `${zinContainer} .retreat-img-left .retreat-slice-strip-gsap`;
      const zinSlicesTopRight = `${zinContainer} .retreat-img-top-right .retreat-slice-strip-gsap`;
      const zinSlicesBottomRight = `${zinContainer} .retreat-img-bottom-right .retreat-slice-strip-gsap`;

      tl.set(zinContainer, { display: 'flex' }, startZin);
      tl.fromTo(zinText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durZinIn, ease: 'power2.out' }, startZin);
      
      // Horizontal Cut (Slices) transition in Zinnia
      tl.fromTo(zinSlicesLeft, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: durZinIn + 0.04, stagger: 0.005, ease: 'power2.out', transformOrigin: 'center center' }, startZin);
      tl.fromTo(zinSlicesTopRight, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: durZinIn + 0.04, stagger: 0.005, ease: 'power2.out', transformOrigin: 'center center' }, startZin + 0.02);
      tl.fromTo(zinSlicesBottomRight, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: durZinIn + 0.04, stagger: 0.005, ease: 'power2.out', transformOrigin: 'center center' }, startZin + 0.04);

      tl.to(zinText, { opacity: 0, y: -30, duration: durZinOut, ease: 'power2.inOut' }, endZin - durZinOut);
      
      // Horizontal Cut (Slices) transition out Zinnia
      tl.to(zinSlicesLeft, { scaleY: 0, opacity: 0, duration: durZinOut, stagger: 0.003, ease: 'power2.inOut', transformOrigin: 'center center' }, endZin - durZinOut);
      tl.to(zinSlicesTopRight, { scaleY: 0, opacity: 0, duration: durZinOut, stagger: 0.003, ease: 'power2.inOut', transformOrigin: 'center center' }, endZin - durZinOut);
      tl.to(zinSlicesBottomRight, { scaleY: 0, opacity: 0, duration: durZinOut, stagger: 0.003, ease: 'power2.inOut', transformOrigin: 'center center' }, endZin - durZinOut);
      tl.set(zinContainer, { display: 'none' }, endZin);

      // --- PHASE 4: Abloom Project (0.75 to 1.0) ---
      const startAb = 0.75;
      const durAbIn = 0.08;

      const abContainer = '#retreat-abloom';
      const abText = `${abContainer} .retreat-text-stack`;
      const abSlicesLeft = `${abContainer} .retreat-img-left .retreat-slice-strip-gsap`;
      const abSlicesTopRight = `${abContainer} .retreat-img-top-right .retreat-slice-strip-gsap`;
      const abSlicesBottomRight = `${abContainer} .retreat-img-bottom-right .retreat-slice-strip-gsap`;

      tl.set(abContainer, { display: 'flex' }, startAb);
      tl.fromTo(abText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durAbIn, ease: 'power2.out' }, startAb);
      
      // Horizontal Cut (Slices) transition in Abloom
      tl.fromTo(abSlicesLeft, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: durAbIn + 0.04, stagger: 0.005, ease: 'power2.out', transformOrigin: 'center center' }, startAb);
      tl.fromTo(abSlicesTopRight, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: durAbIn + 0.04, stagger: 0.005, ease: 'power2.out', transformOrigin: 'center center' }, startAb + 0.02);
      tl.fromTo(abSlicesBottomRight, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: durAbIn + 0.04, stagger: 0.005, ease: 'power2.out', transformOrigin: 'center center' }, startAb + 0.04);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black">
      
      {/* ScrollTrigger Container */}
      <div
        ref={triggerRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        
        {/* Full-screen Tropical Beach Background Image */}
        <div className="retreats-bg-img absolute top-0 left-0 w-full h-full">
          <img
            src="/Background_gallery.jpeg"
            alt="Tropical Beach Backdrop"
            className="w-full h-full object-cover"
          />
          {/* Soft overlay to give sky depth */}
          <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px]" />
        </div>

        {/* Pinned Card that expands (Luxury Dark Forest Green matching website theme) */}
        <div
          ref={cardRef}
          className="relative bg-[#0a1d0f] shadow-[0_30px_70px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden"
          style={{ willChange: 'width, height' }}
        >
          
          {/* Phase 1 Copy (Fades out during expansion) */}
          <div className="retreats-intro-content max-w-2xl px-8 text-center flex flex-col items-center justify-center h-full z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#E8F5E9] leading-tight mb-6 font-serif uppercase tracking-wider">
              Featured Projects
            </h2>
            
            {/* Elegant Divider Line */}
            <div className="w-16 h-[1px] bg-[#A5D6A7] mb-8" />
            
            <p className="text-[#C8E6C9]/90 font-sans font-normal leading-relaxed text-sm md:text-base max-w-md">
              Explore our handpicked portfolio of landmark developments, premium joint ventures, and architectural masterworks.
            </p>
          </div>

          {/* Phase 2 & 3: Floating Retreat Slides (Loaded inside the expanded card container) */}
          {retreats.map((retreat, index) => {
            return (
              <div
                key={retreat.id}
                id={`retreat-${retreat.id}`}
                className="absolute inset-0 w-full h-full flex items-center justify-center px-4 py-12 select-none"
                style={{ display: 'none' }}
              >
                {/* 1. Lighter Shade "Up" Previous Project Title (Only if there is a previous project) */}
                {index > 0 && (
                  <div className="absolute top-10 left-0 right-0 text-center pointer-events-none select-none z-0">
                    <span className="font-serif text-2xl md:text-3xl lg:text-[2.2rem] uppercase tracking-[0.35em] text-[#E8F5E9]/10">
                      {retreats[index - 1].title}
                    </span>
                  </div>
                )}

                {/* 2. Lighter Shade "Down" Next Project Title (Only if there is a next project) */}
                {index < retreats.length - 1 && (
                  <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none select-none z-0">
                    <span className="font-serif text-2xl md:text-3xl lg:text-[2.2rem] uppercase tracking-[0.35em] text-[#E8F5E9]/10">
                      {retreats[index + 1].title}
                    </span>
                  </div>
                )}
                {/* Left Column: Floating Image 1 (Symmetrical Center - Mid of Line with Horizontal Slices) */}
                <div className="retreat-img-left hidden lg:block absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 w-[180px] lg:w-[230px] h-[300px] lg:h-[380px] rounded-none overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.6)] border border-white/5 z-20 bg-black/10">
                  <div className="relative w-full h-full bg-transparent">
                    {Array.from({ length: RETREAT_SLICE_COUNT }).map((_, i) => (
                      <div
                        key={i}
                        className="retreat-slice-strip-gsap absolute left-0 w-full overflow-hidden"
                        style={{
                          top: `${i * (100 / RETREAT_SLICE_COUNT)}%`,
                          height: `${100 / RETREAT_SLICE_COUNT}%`,
                        }}
                      >
                        <img
                          src={retreat.images.left}
                          alt={`${retreat.title} View Left`}
                          className="absolute left-0 w-full object-cover"
                          style={{
                            height: `${RETREAT_SLICE_COUNT * 100}%`,
                            top: `-${i * 100}%`,
                          }}
                          loading="eager"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Central Column: Elegant Symmetrical Text Stack with Brand Logo & Name */}
                <div className="w-full flex flex-col items-center justify-center text-center px-4 z-30 mx-auto">
                  <div className="retreat-text-stack flex flex-col items-center w-full">
                    
                    {/* 1. Top Accent Divider (Long Diamond Line with Faded Ends & Hollow Diamond - Same to Same) */}
                    <div className="flex items-center justify-center gap-4 w-[50vw] max-w-xl mb-6 z-10 pointer-events-none">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#A5D6A7]/25" />
                      <div className="w-2.5 h-2.5 border border-[#A5D6A7]/45 rotate-45 bg-transparent" />
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#A5D6A7]/25" />
                    </div>

                    {/* 2. Integrated Custom Brand Logo (Rendered in Original Colors with 100% Transparency) */}
                    {retreat.logo && (
                      <div className="mb-4 flex justify-center h-14 md:h-16 max-w-[220px] bg-transparent">
                        <img
                          src={retreat.logo}
                          alt={`${retreat.title} Logo`}
                          className="h-full w-auto object-contain bg-transparent select-none pointer-events-none"
                        />
                      </div>
                    )}

                    {/* 3. Project Name (Title) */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#E8F5E9] leading-tight mb-6 font-serif uppercase tracking-wider">
                      {retreat.title}
                    </h2>

                    {/* 4. Project Description (Content - Two Lines Flow layout width) */}
                    <p className="text-[#C8E6C9]/90 font-sans font-normal leading-relaxed text-sm md:text-base lg:text-lg max-w-lg lg:max-w-xl px-4 z-10 pointer-events-none mx-auto">
                      {retreat.description}
                    </p>

                    {/* 5. Bottom Accent Divider (Long Line Close with Faded Ends & Hollow Diamond) */}
                    <div className="flex items-center justify-center gap-4 w-[50vw] max-w-xl mt-8 z-10 pointer-events-none">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#A5D6A7]/25" />
                      <div className="w-2.5 h-2.5 border border-[#A5D6A7]/45 rotate-45 bg-transparent" />
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#A5D6A7]/25" />
                    </div>
                    
                  </div>
                </div>

                {/* Right Column: Two Floating Square Images (Top Right & Bottom Right Corners - Small and Square with Horizontal Slices) */}
                <div className="hidden lg:block">
                  
                  {/* Top Right Corner Square Image */}
                  <div className="retreat-img-top-right absolute right-6 lg:right-8 top-8 lg:top-10 w-[180px] lg:w-[230px] h-[180px] lg:h-[230px] rounded-none overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.6)] border border-white/5 z-20 bg-black/10">
                    <div className="relative w-full h-full bg-transparent">
                      {Array.from({ length: RETREAT_SLICE_COUNT }).map((_, i) => (
                        <div
                          key={i}
                          className="retreat-slice-strip-gsap absolute left-0 w-full overflow-hidden"
                          style={{
                            top: `${i * (100 / RETREAT_SLICE_COUNT)}%`,
                            height: `${100 / RETREAT_SLICE_COUNT}%`,
                          }}
                        >
                          <img
                            src={retreat.images.topRight}
                            alt={`${retreat.title} View Top Right`}
                            className="absolute left-0 w-full object-cover"
                            style={{
                              height: `${RETREAT_SLICE_COUNT * 100}%`,
                              top: `-${i * 100}%`,
                            }}
                            loading="eager"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Right Corner Square Image */}
                  <div className="retreat-img-bottom-right absolute right-6 lg:right-8 bottom-8 lg:bottom-10 w-[180px] lg:w-[230px] h-[180px] lg:h-[230px] rounded-none overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.6)] border border-white/5 z-20 bg-black/10">
                    <div className="relative w-full h-full bg-transparent">
                      {Array.from({ length: RETREAT_SLICE_COUNT }).map((_, i) => (
                        <div
                          key={i}
                          className="retreat-slice-strip-gsap absolute left-0 w-full overflow-hidden"
                          style={{
                            top: `${i * (100 / RETREAT_SLICE_COUNT)}%`,
                            height: `${100 / RETREAT_SLICE_COUNT}%`,
                          }}
                        >
                          <img
                            src={retreat.images.bottomRight}
                            alt={`${retreat.title} View Bottom Right`}
                            className="absolute left-0 w-full object-cover"
                            style={{
                              height: `${RETREAT_SLICE_COUNT * 100}%`,
                              top: `-${i * 100}%`,
                            }}
                            loading="eager"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
