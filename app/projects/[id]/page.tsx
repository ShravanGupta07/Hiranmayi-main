'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const projects = [
  {
    id: 'genial',
    title: 'Genial',
    logo: '/Genial-logo.png',
    subtitle: 'ANJANERI LAKESIDE • NASHIK',
  },
  {
    id: 'zinnia',
    title: 'Zinnia',
    logo: '/Zinnia-logo.png',
    subtitle: 'KACHURLI FORESTS • TRIMBAKESHWAR',
  },
  {
    id: 'abloom',
    title: 'Abloom',
    logo: '/abloom-logo.png',
    subtitle: 'RIVERSIDE SANCTUARY • NASHIK',
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const found = projects.find(p => p.id === params.id);
    if (found) {
      setProject(found);
    }
  }, [params.id]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#0B1B12] flex flex-col items-center justify-center p-6 text-center">
      
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-10 left-6 md:left-12 z-50"
      >
        <Link 
          href="/?backFromProject=true"
          className="text-[#d1a26c] font-sans text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 group cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center max-w-2xl"
        >
          {/* Project Logo */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-8 h-20 md:h-24"
          >
            <img 
              src={project.logo} 
              alt={project.title} 
              className="h-full w-auto object-contain brightness-0 invert opacity-80" 
            />
          </motion.div>

          {/* Project Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#E8F5E9] uppercase tracking-[0.15em] mb-4">
            {project.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[#d1a26c] font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] mb-12">
            {project.subtitle}
          </p>

          {/* Coming Soon Message */}
          <div className="relative">
            <div className="w-12 h-[1px] bg-white/20 mx-auto mb-8" />
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-white/40 font-serif italic text-xl md:text-2xl tracking-widest uppercase"
            >
              Coming Soon
            </motion.h2>
            <p className="mt-4 text-white/20 font-sans text-[10px] uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
              We are meticulously crafting the digital experience for this retreat.
            </p>
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4CAF50]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}
