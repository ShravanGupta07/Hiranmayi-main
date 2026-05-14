'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    number: '115',
    title: 'JOINT VENTURES COMPLETED',
    description: 'Through over 115 successfully completed joint ventures, we have built trusted partnerships that unlock value and transform landscapes, uniting stakeholders to deliver premium developments.',
    bigImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881e61a7e42ff6909d76b_amenities-img-1--big.avif',
    smallImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881e6a674c6a8d122c34d_amenities-img-1--small.avif',
    bigAlt: 'Interior view of a modern building corridor with high textured walls, a curved ramp, and a large skylight ceiling.',
    smallAlt: 'Bright gym room with large windows, wooden floor, black workout benches, and a mirror wall reflecting dumbbells and equipment.',
  },
  {
    id: 2,
    number: '49+',
    title: 'OUR MISSIONS',
    description: 'Our 49+ distinct missions are defined by a purpose-driven commitment to social responsibility, sustainable building practices, and architectural longevity to elevate how communities connect.',
    bigImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881f24c53d654d7f00751_amenities-img-3--big.avif',
    smallImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881f1049ac7d72bb5f66f_amenities-img-3--small.avif',
    bigAlt: 'Bright living room with orange sectional sofa, colorful coffee table, yellow ottoman, red pouf, and three vibrant abstract paintings on the wall.',
    smallAlt: 'Modern interior hallway with wooden ceiling beams, large abstract painting, potted plants, and natural light from floor-to-ceiling windows.',
  },
  {
    id: 3,
    number: '19',
    title: 'PROJECTS UNDERWAY',
    description: 'With 19 active projects currently underway, our crews are actively sculpting the next generation of premium residential and commercial spaces with cutting-edge design and timeless craftsmanship.',
    bigImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881ec1f8b80b2102e2e7b_amenities-img-2--big.avif',
    smallImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881eb51e7ae892329f6f6_amenities-img-2--small.avif',
    bigAlt: 'Modern wooden cabin with glass walls and warm interior lighting, set against misty mountains and surrounded by a stone patio with a small reflecting pool.',
    smallAlt: 'Woman in white dress meditating on a spacious patio overlooking a misty forest landscape with modern seating.',
  },
];

const SLICE_COUNT = 15; // Number of horizontal cut slices for the transitions

export function TakeATour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggerLength = 500; // Pinning for exactly 5 scrolls (500vh)

      // Setup ScrollTrigger Pinned Timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${scrollTriggerLength}%`,
          pin: true,
          scrub: 1, // Smooth, precise 1:1 wheel scrubbing feel
          anticipatePin: 1,
          // Automatically hide navbar on pin, and show again on completion/reversion
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
          },
        },
      });

      // Animate the vertical progress line height (Linear fill over duration 1)
      mainTl.fromTo(
        '.tour-progress-line-gsap',
        { height: '0%' },
        { height: '100%', ease: 'none', duration: 1 },
        0
      );

      const slideBoxes = gsap.utils.toArray('.tour-slide-box-gsap') as HTMLElement[];
      const bigImgs = gsap.utils.toArray('.tour-big-img-gsap') as HTMLElement[];
      const smallImgs = gsap.utils.toArray('.tour-small-img-gsap') as HTMLElement[];

      // Slide 1 is active initially
      gsap.set(slideBoxes[0], { opacity: 1, visibility: 'visible' });
      gsap.set(bigImgs[0], { opacity: 1 });
      gsap.set(smallImgs[0], { opacity: 1 });

      const slicesBig1 = bigImgs[0].querySelectorAll('.tour-slice-strip-gsap');
      const slicesSmall1 = smallImgs[0].querySelectorAll('.tour-slice-strip-gsap');
      gsap.set(slicesBig1, { scaleY: 1, opacity: 1 });
      gsap.set(slicesSmall1, { scaleY: 1, opacity: 1 });

      // Initialize Slide 1 text elements
      const initNum = slideBoxes[0].querySelector('.tour-number-gsap');
      const initTitle = slideBoxes[0].querySelector('.tour-title-gsap');
      const initDesc = slideBoxes[0].querySelector('.tour-desc-gsap');
      gsap.set(initNum, { y: 0, opacity: 1 });
      gsap.set(initTitle, { y: 0, opacity: 1 });
      gsap.set(initDesc, { y: 0, opacity: 1 });

      // Initialize other slides' slices to scaleY: 0
      for (let s = 1; s < 3; s++) {
        gsap.set(bigImgs[s], { opacity: 1 });
        gsap.set(smallImgs[s], { opacity: 1 });
        gsap.set(bigImgs[s].querySelectorAll('.tour-slice-strip-gsap'), { scaleY: 0, opacity: 0 });
        gsap.set(smallImgs[s].querySelectorAll('.tour-slice-strip-gsap'), { scaleY: 0, opacity: 0 });
      }

      // -- SLIDE 1 ➔ SLIDE 2 TRANSITION (At Scroll 2->3 Boundary, progress 0.30 to 0.40) --
      const outStart1 = 0.30;
      const outDuration1 = 0.10;
      const inStart1 = 0.40;
      const inDuration1 = 0.10;

      // Smoothly animate out Slide 1 text
      mainTl.to(initNum, { y: -30, opacity: 0, duration: outDuration1, ease: 'power2.inOut' }, outStart1);
      mainTl.to(initTitle, { y: -20, opacity: 0, duration: outDuration1, ease: 'power2.inOut' }, outStart1);
      mainTl.to(initDesc, { y: -10, opacity: 0, duration: outDuration1, ease: 'power2.inOut' }, outStart1);
      mainTl.to(slideBoxes[0], { opacity: 0, duration: outDuration1, ease: 'power2.inOut' }, outStart1);
      mainTl.set(slideBoxes[0], { visibility: 'hidden' }, outStart1 + outDuration1);
      
      // Horizontal Cut (Slices) transition out Slide 1
      mainTl.to(slicesBig1, { scaleY: 0, opacity: 0, duration: outDuration1, stagger: 0.004, ease: 'power2.inOut', transformOrigin: 'center center' }, outStart1);
      mainTl.to(slicesSmall1, { scaleY: 0, opacity: 0, duration: outDuration1, stagger: 0.004, ease: 'power2.inOut', transformOrigin: 'center center' }, outStart1);

      // Smoothly animate in Slide 2
      const num2 = slideBoxes[1].querySelector('.tour-number-gsap');
      const title2 = slideBoxes[1].querySelector('.tour-title-gsap');
      const desc2 = slideBoxes[1].querySelector('.tour-desc-gsap');
      const slicesBig2 = bigImgs[1].querySelectorAll('.tour-slice-strip-gsap');
      const slicesSmall2 = smallImgs[1].querySelectorAll('.tour-slice-strip-gsap');

      mainTl.set(slideBoxes[1], { visibility: 'visible' }, inStart1);
      mainTl.fromTo(slideBoxes[1], { opacity: 0 }, { opacity: 1, duration: inDuration1, ease: 'power2.out' }, inStart1);
      mainTl.fromTo(num2, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: inDuration1, ease: 'power2.out' }, inStart1);
      mainTl.fromTo(title2, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: inDuration1, ease: 'power2.out' }, inStart1 + 0.02);
      mainTl.fromTo(desc2, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: inDuration1, ease: 'power2.out' }, inStart1 + 0.03);
      
      // Horizontal Cut (Slices) transition in Slide 2
      mainTl.fromTo(slicesBig2, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: inDuration1, stagger: 0.004, ease: 'power2.out', transformOrigin: 'center center' }, inStart1);
      mainTl.fromTo(slicesSmall2, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: inDuration1, stagger: 0.004, ease: 'power2.out', transformOrigin: 'center center' }, inStart1 + 0.02);


      // -- SLIDE 2 ➔ SLIDE 3 TRANSITION (At Scroll 4->5 Boundary, progress 0.70 to 0.80) --
      const outStart2 = 0.70;
      const outDuration2 = 0.10;
      const inStart2 = 0.80;
      const inDuration2 = 0.10;

      // Smoothly animate out Slide 2 text
      mainTl.to(num2, { y: -30, opacity: 0, duration: outDuration2, ease: 'power2.inOut' }, outStart2);
      mainTl.to(title2, { y: -20, opacity: 0, duration: outDuration2, ease: 'power2.inOut' }, outStart2);
      mainTl.to(desc2, { y: -10, opacity: 0, duration: outDuration2, ease: 'power2.inOut' }, outStart2);
      mainTl.to(slideBoxes[1], { opacity: 0, duration: outDuration2, ease: 'power2.inOut' }, outStart2);
      mainTl.set(slideBoxes[1], { visibility: 'hidden' }, outStart2 + outDuration2);
      
      // Horizontal Cut (Slices) transition out Slide 2
      mainTl.to(slicesBig2, { scaleY: 0, opacity: 0, duration: outDuration2, stagger: 0.004, ease: 'power2.inOut', transformOrigin: 'center center' }, outStart2);
      mainTl.to(slicesSmall2, { scaleY: 0, opacity: 0, duration: outDuration2, stagger: 0.004, ease: 'power2.inOut', transformOrigin: 'center center' }, outStart2);

      // Smoothly animate in Slide 3
      const num3 = slideBoxes[2].querySelector('.tour-number-gsap');
      const title3 = slideBoxes[2].querySelector('.tour-title-gsap');
      const desc3 = slideBoxes[2].querySelector('.tour-desc-gsap');
      const slicesBig3 = bigImgs[2].querySelectorAll('.tour-slice-strip-gsap');
      const slicesSmall3 = smallImgs[2].querySelectorAll('.tour-slice-strip-gsap');

      mainTl.set(slideBoxes[2], { visibility: 'visible' }, inStart2);
      mainTl.fromTo(slideBoxes[2], { opacity: 0 }, { opacity: 1, duration: inDuration2, ease: 'power2.out' }, inStart2);
      mainTl.fromTo(num3, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: inDuration2, ease: 'power2.out' }, inStart2);
      mainTl.fromTo(title3, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: inDuration2, ease: 'power2.out' }, inStart2 + 0.02);
      mainTl.fromTo(desc3, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: inDuration2, ease: 'power2.out' }, inStart2 + 0.03);
      
      // Horizontal Cut (Slices) transition in Slide 3
      mainTl.fromTo(slicesBig3, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: inDuration2, stagger: 0.004, ease: 'power2.out', transformOrigin: 'center center' }, inStart2);
      mainTl.fromTo(slicesSmall3, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: inDuration2, stagger: 0.004, ease: 'power2.out', transformOrigin: 'center center' }, inStart2 + 0.02);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="tour" ref={containerRef} className="relative bg-[#E8F5E9]">
      
      {/* ScrollTrigger Pin Target */}
      <section
        ref={triggerRef}
        className="relative w-full h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-16 overflow-hidden select-none bg-[#E8F5E9]"
      >
        
        {/* Header Label: Centered at the top of the section */}
        <div className="absolute top-8 left-0 right-0 mx-auto flex flex-col items-center text-center z-20 gap-2">
          <span className="font-serif text-3xl md:text-4xl lg:text-[2.6rem] font-medium text-[#0A1D0F] tracking-wide leading-tight">
            An Immersive Journey
          </span>
          <div className="w-12 h-[1px] bg-[#1B5E20]/60" />
        </div>

        {/* Left Section: Progress Bar, Text Slider */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center h-full z-10 relative">
          
          {/* Progress bar container and text block */}
          <div className="flex items-start gap-6 h-[260px] relative mt-4">
            
            {/* Vertical Progress Bar */}
            <div className="w-[1px] h-[260px] bg-[#C8E6C9] relative overflow-hidden rounded-full shrink-0 mt-1">
              <div className="tour-progress-line-gsap absolute top-0 left-0 w-full bg-[#1B5E20] h-0 transition-shadow duration-300" />
            </div>
            
            {/* Absolute Text Stack */}
            <div className="relative flex-1 h-[260px]">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="tour-slide-box-gsap absolute left-0 w-full flex flex-col justify-start opacity-0 pointer-events-none"
                  style={{ visibility: 'hidden' }}
                >
                  {/* Subtle Milestone Number (Perfectly clear and visible) */}
                  <span className="tour-number-gsap block font-serif text-4xl md:text-5xl lg:text-[3.2rem] font-medium text-[#2E7D32] mb-2 leading-none">
                    {slide.number}
                  </span>

                  {/* Title Description (Geometric Serif Typography, elegant uppercase) */}
                  <h3 className="tour-title-gsap text-2xl md:text-3xl lg:text-[2.2rem] font-serif text-[#0A1D0F] font-medium leading-[1.1] tracking-wide mb-4 uppercase">
                    {slide.title}
                  </h3>

                  {/* Body Paragraph (Inter Normal 400) */}
                  <p className="tour-desc-gsap text-[#1B3224]/80 font-sans font-normal text-[13px] leading-[17px] max-w-xs">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Section: Overlapping Architectural Portrait Slices */}
        <div className="flex w-full lg:w-[50%] h-[42vh] lg:h-[72vh] relative items-center justify-center mt-2 lg:mt-10">
          
          {/* Large Image Frame (Background / Stacked / 3:4 portrait aspect) */}
          <div className="w-[70%] lg:w-[75%] h-[90%] relative ml-auto mr-4 rounded-none overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/5 bg-black/10">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="tour-big-img-gsap absolute top-0 left-0 w-full h-full"
              >
                {/* 15 Horizontal Cut Slices for elegant blinds transition */}
                <div className="relative w-full h-full">
                  {Array.from({ length: SLICE_COUNT }).map((_, i) => (
                    <div
                      key={i}
                      className="tour-slice-strip-gsap absolute left-0 w-full overflow-hidden"
                      style={{
                        top: `${i * (100 / SLICE_COUNT)}%`,
                        height: `${100 / SLICE_COUNT}%`,
                      }}
                    >
                      <img
                        src={slide.bigImage}
                        alt={slide.bigAlt}
                        className="absolute left-0 w-full object-cover"
                        style={{
                          height: `${SLICE_COUNT * 100}%`,
                          top: `-${i * 100}%`,
                        }}
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Small Image Frame (Foreground / Stacked / Left Overlap) */}
          <div className="absolute left-[-2%] lg:left-[-5%] top-[15%] lg:top-[22%] w-[45%] lg:w-[42%] h-[60%] lg:h-[56%] z-20 rounded-none overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.7)] border border-white/10 bg-black/10">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="tour-small-img-gsap absolute top-0 left-0 w-full h-full"
              >
                {/* 15 Horizontal Cut Slices for elegant blinds transition */}
                <div className="relative w-full h-full">
                  {Array.from({ length: SLICE_COUNT }).map((_, i) => (
                    <div
                      key={i}
                      className="tour-slice-strip-gsap absolute left-0 w-full overflow-hidden"
                      style={{
                        top: `${i * (100 / SLICE_COUNT)}%`,
                        height: `${100 / SLICE_COUNT}%`,
                      }}
                    >
                      <img
                        src={slide.smallImage}
                        alt={slide.smallAlt}
                        className="absolute left-0 w-full object-cover"
                        style={{
                          height: `${SLICE_COUNT * 100}%`,
                          top: `-${i * 100}%`,
                        }}
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* Atmospheric Glowing Orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#4CAF50]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-[300px] h-[300px] rounded-full bg-[#1B5E20]/15 blur-[100px] pointer-events-none" />
    </div>
  );
}
