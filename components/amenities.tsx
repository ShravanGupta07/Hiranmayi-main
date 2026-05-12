'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    title: ['WELLNESS-', 'CENTERED', 'AMENITIES'],
    description: [
      'From private fitness studios to',
      'guided meditation sessions, our',
      'amenities are designed to enhance',
      'your well-being and foster a sense',
      'of harmony.',
    ],
    bigImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881e61a7e42ff6909d76b_amenities-img-1--big.avif',
    smallImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881e6a674c6a8d122c34d_amenities-img-1--small.avif',
    bigAlt: 'Interior view of a modern building corridor with high textured walls, a curved ramp, and a large skylight ceiling.',
    smallAlt: 'Bright gym room with large windows, wooden floor, black workout benches, and a mirror wall reflecting dumbbells and equipment.',
  },
  {
    id: 2,
    title: ['ART', 'INSPIRED', 'SPACES'],
    description: [
      'From artful communal lounges to',
      'thoughtfully curated design details,',
      'every environment celebrates a rich',
      'sense of place.',
    ],
    bigImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881f24c53d654d7f00751_amenities-img-3--big.avif',
    smallImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881f1049ac7d72bb5f66f_amenities-img-3--small.avif',
    bigAlt: 'Bright living room with orange sectional sofa, colorful coffee table, yellow ottoman, red pouf, and three vibrant abstract paintings on the wall.',
    smallAlt: 'Modern interior hallway with wooden ceiling beams, large abstract painting, potted plants, and natural light from floor-to-ceiling windows.',
  },
  {
    id: 3,
    title: ['NATURE-', 'INFUSED', 'RETREATS'],
    description: [
      'Garden pathways, quiet courtyards,',
      'and softly landscaped outdoor',
      'rooms provide moments of calm',
      'and the restorative beauty of',
      'nature.',
    ],
    bigImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881ec1f8b80b2102e2e7b_amenities-img-2--big.avif',
    smallImage: 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec/693881eb51e7ae892329f6f6_amenities-img-2--small.avif',
    bigAlt: 'Modern wooden cabin with glass walls and warm interior lighting, set against misty mountains and surrounded by a stone patio with a small reflecting pool.',
    smallAlt: 'Woman in white dress meditating on a spacious patio overlooking a misty forest landscape with modern seating.',
  },
];

export function Amenities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We only execute on desktop/larger viewports if we want pinning, or make it fully responsive.
    // GSAP ScrollTrigger works extremely well across all screen sizes when styled correctly.
    const ctx = gsap.context(() => {
      const scrollTriggerLength = 300; // percent of window height per scroll phase

      // Pin the section
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${scrollTriggerLength}%`,
          pin: true,
          scrub: 1.2, // Adds a slight friction inertia for ultra-premium feel
          anticipatePin: 1,
        },
      });

      // Animate the progress line height
      mainTl.fromTo(
        '.amenities-progress-line-gsap',
        { height: '0%' },
        { height: '100%', ease: 'none' },
        0
      );

      // We have 3 slides.
      // Slide 0: 0% to 33%
      // Slide 1: 33% to 66%
      // Slide 2: 66% to 100%
      // Let's create animations at specific points in the main timeline.

      // We'll select our DOM elements
      const slideBoxes = gsap.utils.toArray('.amenities-slide-box-gsap') as HTMLElement[];
      const bigImgs = gsap.utils.toArray('.amenities-big-img-gsap') as HTMLElement[];
      const smallImgs = gsap.utils.toArray('.amenities-small-img-gsap') as HTMLElement[];

      // Initial state: first slide is active
      gsap.set(slideBoxes[0], { opacity: 1, visibility: 'visible' });
      gsap.set(bigImgs[0], { opacity: 1, scale: 1 });
      gsap.set(smallImgs[0], { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });

      // First text box letters/words slide in initially
      const initTitleLines = slideBoxes[0].querySelectorAll('.title-line-inner');
      const initDescLines = slideBoxes[0].querySelectorAll('.desc-line-inner');
      gsap.set(initTitleLines, { y: '0%' });
      gsap.set(initDescLines, { y: '0%' });

      // Define Slide 1 -> Slide 2 Transition
      // Triggers at 33% scroll (value 0.33 of timeline)
      const transition1 = 0.33;
      
      // -- OUT OF SLIDE 1 --
      mainTl.to(
        initTitleLines,
        { y: '-105%', duration: 0.15, ease: 'power2.inOut' },
        transition1
      );
      mainTl.to(
        initDescLines,
        { y: '-105%', duration: 0.15, ease: 'power2.inOut', stagger: 0.02 },
        transition1
      );
      mainTl.to(
        slideBoxes[0],
        { opacity: 0, visibility: 'hidden', duration: 0.15 },
        transition1 + 0.1
      );
      mainTl.to(
        bigImgs[0],
        { opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.inOut' },
        transition1
      );
      mainTl.to(
        smallImgs[0],
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, duration: 0.2, ease: 'power2.inOut' },
        transition1
      );

      // -- INTO SLIDE 2 --
      const titleLines2 = slideBoxes[1].querySelectorAll('.title-line-inner');
      const descLines2 = slideBoxes[1].querySelectorAll('.desc-line-inner');
      
      // Set initial positions before fade in
      mainTl.set(slideBoxes[1], { visibility: 'visible' }, transition1 + 0.15);
      mainTl.to(slideBoxes[1], { opacity: 1, duration: 0.2 }, transition1 + 0.15);
      
      mainTl.fromTo(
        titleLines2,
        { y: '105%' },
        { y: '0%', duration: 0.25, ease: 'power2.out' },
        transition1 + 0.2
      );
      mainTl.fromTo(
        descLines2,
        { y: '105%' },
        { y: '0%', duration: 0.25, ease: 'power2.out', stagger: 0.02 },
        transition1 + 0.22
      );
      mainTl.fromTo(
        bigImgs[1],
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        transition1 + 0.15
      );
      mainTl.fromTo(
        smallImgs[1],
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.3, ease: 'power2.out' },
        transition1 + 0.2
      );


      // Define Slide 2 -> Slide 3 Transition
      // Triggers at 66% scroll (value 0.66 of timeline)
      const transition2 = 0.66;

      // -- OUT OF SLIDE 2 --
      mainTl.to(
        titleLines2,
        { y: '-105%', duration: 0.15, ease: 'power2.inOut' },
        transition2
      );
      mainTl.to(
        descLines2,
        { y: '-105%', duration: 0.15, ease: 'power2.inOut', stagger: 0.02 },
        transition2
      );
      mainTl.to(
        slideBoxes[1],
        { opacity: 0, visibility: 'hidden', duration: 0.15 },
        transition2 + 0.1
      );
      mainTl.to(
        bigImgs[1],
        { opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.inOut' },
        transition2
      );
      mainTl.to(
        smallImgs[1],
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, duration: 0.2, ease: 'power2.inOut' },
        transition2
      );

      // -- INTO SLIDE 3 --
      const titleLines3 = slideBoxes[2].querySelectorAll('.title-line-inner');
      const descLines3 = slideBoxes[2].querySelectorAll('.desc-line-inner');

      mainTl.set(slideBoxes[2], { visibility: 'visible' }, transition2 + 0.15);
      mainTl.to(slideBoxes[2], { opacity: 1, duration: 0.2 }, transition2 + 0.15);

      mainTl.fromTo(
        titleLines3,
        { y: '105%' },
        { y: '0%', duration: 0.25, ease: 'power2.out' },
        transition2 + 0.2
      );
      mainTl.fromTo(
        descLines3,
        { y: '105%' },
        { y: '0%', duration: 0.25, ease: 'power2.out', stagger: 0.02 },
        transition2 + 0.22
      );
      mainTl.fromTo(
        bigImgs[2],
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        transition2 + 0.15
      );
      mainTl.fromTo(
        smallImgs[2],
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.3, ease: 'power2.out' },
        transition2 + 0.2
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0C0D0F]">
      
      {/* ScrollTrigger Pin target */}
      <section
        ref={triggerRef}
        className="relative w-full h-screen flex items-center justify-between px-6 md:px-12 lg:px-24 py-12 overflow-hidden select-none"
      >
        
        {/* Left Section: Progress line & Texts */}
        <div className="w-full lg:w-[40%] flex items-center h-full z-10">
          
          {/* Vertical Progress Bar */}
          <div className="flex items-center gap-8 h-[250px] relative">
            <div className="w-[1px] h-[250px] bg-white/10 relative overflow-hidden rounded-full">
              <div className="amenities-progress-line-gsap absolute top-0 left-0 w-full bg-accent h-0 transition-shadow duration-300" />
            </div>
            
            {/* Slide Texts Stacked Absolutely */}
            <div className="relative w-[300px] md:w-[450px] h-full flex items-center">
              {slides.map((slide, sIdx) => (
                <div
                  key={slide.id}
                  className="amenities-slide-box-gsap absolute left-0 w-full flex flex-col justify-center opacity-0 pointer-events-none"
                  style={{ visibility: 'hidden' }}
                >
                  {/* Slide Title */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-bold leading-[1.2] tracking-wide mb-6">
                    {slide.title.map((line, lIdx) => (
                      <span
                        key={lIdx}
                        className="relative block overflow-hidden h-[1.3em]"
                      >
                        <span className="title-line-inner relative block text-left translate-y-[105%] transition-transform">
                          {line}
                        </span>
                      </span>
                    ))}
                  </h2>

                  {/* Slide Description */}
                  <div className="text-white/60 font-sans font-light leading-relaxed text-[14px] md:text-base">
                    {slide.description.map((line, lIdx) => (
                      <span
                        key={lIdx}
                        className="relative block overflow-hidden"
                      >
                        <span className="desc-line-inner relative block text-left translate-y-[105%] transition-transform">
                          {line}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Section: Overlapping Image Containers */}
        <div className="hidden lg:flex w-[52%] h-[75vh] relative items-center justify-center">
          
          {/* Big Images Stack (Background) */}
          <div className="w-[85%] h-full relative ml-auto rounded-none overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/5">
            {slides.map((slide, sIdx) => (
              <div
                key={slide.id}
                className="amenities-big-img-gsap absolute top-0 left-0 w-full h-full opacity-0 scale-[1.05]"
              >
                <img
                  src={slide.bigImage}
                  alt={slide.bigAlt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            ))}
          </div>

          {/* Small Images Stack (Foreground, overlapping the big image on the left) */}
          <div className="absolute left-0 bottom-[10%] w-[42%] h-[52%] z-20 rounded-none overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.7)] border border-white/10">
            {slides.map((slide, sIdx) => (
              <div
                key={slide.id}
                className="amenities-small-img-gsap absolute top-0 left-0 w-full h-full opacity-0"
                style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              >
                <img
                  src={slide.smallImage}
                  alt={slide.smallAlt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* Background Ambience Elements */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
    </div>
  );
}
