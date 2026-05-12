'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling DOWN and scrolled past header height
        setIsVisible(false);
      } else {
        // Scrolling UP
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`site-header-nav fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-foreground/10 transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-full bg-accent" />
            <span className="text-lg font-light tracking-tight">Lumino</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ color: '#d1a26c' }}
                className="text-sm font-light transition-colors hover:text-accent"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden rounded-full bg-accent px-6 py-2 text-sm font-light text-white transition-all hover:shadow-lg md:block"
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex flex-col gap-4 border-t border-foreground/10 pt-4 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-light transition-colors hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  );
}
