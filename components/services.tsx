'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'High Quality\nProducts',
    description: 'Luxurious, exquisite design harmonious with the surrounding architecture to provide optimal living conditions.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
        <path d="M23 45C35.1503 45 45 35.1503 45 23C45 10.8497 35.1503 1 23 1C10.8497 1 1 10.8497 1 23C1 35.1503 10.8497 45 23 45Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M32.7167 23.0917L23 13.375L13.2833 23.0917L23 32.8084L32.7167 23.0917Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Comprehensive\nAmenities',
    description: 'Landscape infrastructure perfectly integrated with world-class common amenities for all residents.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
        <path d="M43.731 43.7311V1L0.999821 1V43.7311H43.731Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M31.791 22.3655C31.791 17.1599 27.5711 12.9399 22.3655 12.9399C17.1599 12.9399 12.9399 17.1599 12.9399 22.3655C12.9399 27.5711 17.1599 31.791 22.3655 31.791C27.5711 31.791 31.791 27.5711 31.791 22.3655Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Professional\nServices',
    description: 'Our 24/7 customer service center is always ready to support residents and provide comprehensive information.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="45" viewBox="0 0 46 45" fill="none">
        <path d="M44.2767 24.6348H1V43.7114H44.2767V24.6348Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M32.1767 10.5383C32.1767 5.27045 27.9063 1 22.6384 1C17.3706 1 13.1001 5.27045 13.1001 10.5383C13.1001 15.8062 17.3706 20.0767 22.6384 20.0767C27.9063 20.0767 32.1767 15.8062 32.1767 10.5383Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Green & Clean\nEnvironment',
    description: 'Every urban area is carefully constructed on the principle of living in perfect harmony with nature.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path d="M43 1H1V20H43V1Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M19.8366 24H1V42.8366H19.8366V24Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M42.8366 24H24V42.8366H42.8366V24Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
      </svg>
    )
  },
  {
    id: 5,
    title: 'Community\nConnection',
    description: 'Fostering a deep sense of belonging and affection among family members and neighbors alike.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" fill="none">
        <path d="M20.5 1H1.5V43H20.5V1Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M44.8366 23.8955H26V42.7321H44.8366V23.8955Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M44.8366 10.4183C44.8366 5.21672 40.6199 1 35.4183 1C30.2167 1 26 5.21672 26 10.4183C26 15.6199 30.2167 19.8366 35.4183 19.8366C40.6199 19.8366 44.8366 15.6199 44.8366 10.4183Z" stroke="#BAA184" strokeWidth="2" strokeMiterlimit="10"></path>
      </svg>
    )
  }
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background expansion animation
      gsap.to('.bg-container', {
        width: '100%',
        borderRadius: '0px',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 1,
        },
      });

      // Heading animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // Card animations with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );

      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative w-full pt-24 pb-0 overflow-hidden flex flex-col items-center justify-center bg-white">

      {/* Animated Background Container */}
      <div className="bg-container relative bg-[#C8E6C9] mx-auto overflow-hidden" style={{ width: '85%', borderRadius: '40px' }}>
        {/* Subtle vertical grid lines */}
        <div className="absolute inset-0 z-0 flex justify-between px-10 md:px-20 max-w-[1400px] mx-auto pointer-events-none">
          <div className="w-[1px] h-full bg-[#BAA184]/15"></div>
          <div className="w-[1px] h-full bg-[#BAA184]/15 hidden md:block"></div>
          <div className="w-[1px] h-full bg-[#BAA184]/15 hidden lg:block"></div>
          <div className="w-[1px] h-full bg-[#BAA184]/15 hidden lg:block"></div>
          <div className="w-[1px] h-full bg-[#BAA184]/15"></div>
        </div>

        {/* Giant "Solutions" watermark */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none select-none flex items-end justify-center">
          <h2 className="text-[35vw] md:text-[28vw] font-sans font-bold text-transparent tracking-tighter whitespace-nowrap -mb-[5vw] ml-[-2vw]" style={{ WebkitTextStroke: '2px rgba(186, 161, 132, 0.35)' }}>
            Solutions
          </h2>
        </div>

        {/* Inner Content Wrapper */}
        <div className="mx-auto max-w-6xl relative z-10 pt-20 pb-20 px-6 md:px-10">
        {/* Title */}
        <h3 ref={titleRef} className="section-title text-[#1A1A1A] font-sans font-medium text-2xl md:text-3xl lg:text-[2.5rem] leading-tight max-w-4xl mb-16">
          We execute every project with a focus on costs, schedules, quality, and market-tailored solutions.
        </h3>

        {/* Mosaic Cards Grid */}
        <div className="flex flex-col gap-6">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, index) => (
              <div
                key={service.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="mosaic-card bg-white rounded-xl p-8 md:p-10 shadow-sm flex flex-col justify-between aspect-[4/3] md:aspect-square cursor-pointer transition-shadow"
              >
                <div className="w-12 h-12 mb-auto flex-shrink-0">
                  {service.svg}
                </div>
                <div className="mt-8">
                  <div className="mosaic-text text-[#1A1A1A] text-[1.25rem] md:text-[1.35rem] font-sans font-medium leading-snug whitespace-pre-line mb-3">
                    {service.title}
                  </div>
                  <p className="text-[#1A1A1A]/70 text-[0.85rem] md:text-[0.95rem] font-sans font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: 2 Rectangle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.slice(3, 5).map((service, index) => (
              <div
                key={service.id}
                ref={(el) => {
                  cardsRef.current[index + 3] = el;
                }}
                className="mosaic-card bg-white rounded-xl p-8 md:p-10 shadow-sm flex flex-col justify-between min-h-[250px] md:min-h-[280px] cursor-pointer transition-shadow"
              >
                <div className="w-12 h-12 mb-auto flex-shrink-0">
                  {service.svg}
                </div>
                <div className="mt-8 md:mt-12 lg:mt-16">
                  <div className="mosaic-text text-[#1A1A1A] text-[1.25rem] md:text-[1.35rem] font-sans font-medium leading-snug whitespace-pre-line mb-3">
                    {service.title}
                  </div>
                  <p className="text-[#1A1A1A]/70 text-[0.85rem] md:text-[0.95rem] font-sans font-light leading-relaxed max-w-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
