'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Script from 'next/script';
import { HoverBorderGradient } from './ui/hover-border-gradient';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const openCalendly = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/dev-shrameco/30min?hide_landing_page_details=1&background_color=0b1b12&text_color=ffffff&primary_color=d1a26c'
      });
    } else {
      window.open('https://calendly.com/dev-shrameco/30min', '_blank');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Parallax Effect
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 2. Image Reveal (Overlay Wipe)
      gsap.to(overlayRef.current, {
        height: "0%",
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // 3. Staggered Content Reveal
      gsap.fromTo(
        [textRef.current, formRef.current],
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: "play none none none"
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative w-full min-h-screen overflow-hidden flex bg-[#111312] pt-24 lg:pt-32 pb-24">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#111312]">
        <video 
          ref={bgRef}
          src="/Footer_video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="absolute -top-[15%] left-0 w-full h-[130%] object-cover object-center opacity-60" 
        />
        {/* Wipe Reveal Overlay */}
        <div ref={overlayRef} className="absolute inset-0 bg-[#111312] z-10 w-full h-full"></div>
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111312]/90 via-[#111312]/50 to-transparent z-[5]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111312] via-transparent to-transparent z-[5]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-start gap-16 w-full max-w-[1600px]">
        
        {/* Left Column - Text */}
        <div ref={textRef} className="w-full lg:w-1/2 text-white flex flex-col items-start">
          <h2 className="text-2xl md:text-3xl lg:text-[2rem] font-serif italic uppercase leading-snug mb-6">
            A LIFE ROOTED IN<br />GREEN LUXURY
          </h2>
          <p className="text-[13px] md:text-[14px] font-sans font-light leading-relaxed max-w-[320px] opacity-90 mb-8">
            Our villa communities are thoughtfully designed for those who seek more than just a home — they seek a lifestyle. Schedule a private viewing or request a brochure to begin your journey with Hiranmayi.
          </p>

          <HoverBorderGradient 
            onClick={openCalendly}
          >
            Schedule a meet
          </HoverBorderGradient>

          {/* Load Calendly assets */}
          <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        </div>

        {/* Right Column - Form Block */}
        <div ref={formRef} className="w-full lg:w-[560px] bg-[#273B32] p-10 md:p-14 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl text-center text-white font-serif italic uppercase mb-3">
            ENVISION YOUR<br />LIFE WITH HIRANMAYI
          </h2>
          <p className="text-sm text-center text-white/70 mb-12 font-sans font-light">
            Our manager will contact you as soon as possible.
          </p>
          
          <form className="flex flex-col gap-10">
            <div className="relative mt-4">
              <input 
                type="text" 
                id="name"
                placeholder="NAME" 
                className="peer w-full bg-transparent border-b border-white/20 text-white text-xs placeholder-transparent pb-2 focus:outline-none focus:border-white transition-colors uppercase tracking-widest font-sans" 
                required 
              />
              <label htmlFor="name" className="absolute left-0 -top-4 text-white/60 text-[10px] transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-0 peer-placeholder-shown:text-white/60 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white uppercase tracking-widest pointer-events-none">NAME</label>
            </div>
            <div className="relative mt-4">
              <input 
                type="email" 
                id="email"
                placeholder="EMAIL" 
                className="peer w-full bg-transparent border-b border-white/20 text-white text-xs placeholder-transparent pb-2 focus:outline-none focus:border-white transition-colors uppercase tracking-widest font-sans" 
                required 
              />
              <label htmlFor="email" className="absolute left-0 -top-4 text-white/60 text-[10px] transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-0 peer-placeholder-shown:text-white/60 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white uppercase tracking-widest pointer-events-none">EMAIL</label>
            </div>
            <div className="relative mt-4">
              <input 
                type="tel" 
                id="phone"
                placeholder="PHONE" 
                className="peer w-full bg-transparent border-b border-white/20 text-white text-xs placeholder-transparent pb-2 focus:outline-none focus:border-white transition-colors uppercase tracking-widest font-sans" 
              />
              <label htmlFor="phone" className="absolute left-0 -top-4 text-white/60 text-[10px] transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-0 peer-placeholder-shown:text-white/60 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white uppercase tracking-widest pointer-events-none">PHONE</label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-white text-[#273B32] rounded-full py-4 mt-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white/90 transition-colors cursor-pointer"
            >
              REQUEST
            </button>

            <p className="text-[10px] text-white/50 text-center leading-relaxed mt-2 px-2 font-sans font-light">
              By sending your request, you're agreeing to our privacy policy. We promise to keep your personal information safe and secure.
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}
