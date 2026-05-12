'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const heroImages = [
  { id: 1, src: '/hero-1.jpg', alt: 'Luxury Interior Design' },
  { id: 2, src: '/hero-2.jpg', alt: 'Architectural Photography' },
  { id: 3, src: '/hero-3.jpg', alt: 'Premium Design Showcase' },
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoplay) return;

    autoplayTimeoutRef.current = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    };
  }, [currentImageIndex, isAutoplay]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-text-line',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePrevImage = () => {
    setIsAutoplay(false);
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNextImage = () => {
    setIsAutoplay(false);
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url('${heroImages[currentImageIndex].src}')`,
      }}
    >
      {/* Overlay Gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '900px' }}
        >
          <h1
            className="hero-text-line"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: 'white',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}
          >
            Lumino Collective
          </h1>
          <p
            className="hero-text-line"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              fontWeight: 300,
              color: '#f3f4f6',
              marginBottom: '48px',
              lineHeight: 1.6,
            }}
          >
            Crafting Exceptional Experiences Through Design & Innovation
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-text-line"
            onClick={() => {
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '12px 48px',
              fontSize: '1.125rem',
              fontWeight: 300,
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              backgroundColor: 'transparent',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            }}
          >
            Explore Our Work
          </motion.button>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevImage}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNextImage}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Navigation Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          gap: '12px',
        }}
      >
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setIsAutoplay(false);
              setCurrentImageIndex(index);
            }}
            whileHover={{ scale: 1.2 }}
            style={{
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
              width: index === currentImageIndex ? '32px' : '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <motion.div
        style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          zIndex: 20,
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.875rem',
          fontWeight: 300,
          letterSpacing: '0.05em',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {currentImageIndex + 1} / {heroImages.length}
      </motion.div>
    </div>
  );
}
