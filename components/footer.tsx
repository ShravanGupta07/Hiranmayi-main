'use client';

import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111211] text-white py-16 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 pt-8">
          
          {/* Column 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col md:col-span-6 lg:col-span-6"
          >
            <h4 className="text-white/40 text-sm font-sans italic tracking-widest uppercase mb-12">(Get in touch)</h4>
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white tracking-tight">HIRANMAYI</h2>
          </motion.div>

          {/* Column 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col md:pt-0 md:col-span-3 lg:col-span-3"
          >
            <h4 className="text-white/40 text-sm font-sans italic tracking-widest uppercase mb-12">(Location)</h4>
            <p className="text-white/80 text-sm md:text-base font-sans font-light leading-relaxed">
              Nashik,<br />
              Maharashtra, India
            </p>
          </motion.div>

          {/* Column 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:pt-0 md:col-span-3 lg:col-span-3"
          >
            <h4 className="text-white/40 text-sm font-sans italic tracking-widest uppercase mb-12">(Contact)</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:hiranmayi0422@gmail.com" className="text-white text-base md:text-lg font-serif italic tracking-wide hover:opacity-70 transition-opacity uppercase">
                HIRANMAYI0422@GMAIL.COM
              </a>
              <a href="tel:+919766180144" className="text-white text-base md:text-lg font-serif italic tracking-wide hover:opacity-70 transition-opacity uppercase">
                +91 976 618 0144
              </a>
            </div>
          </motion.div>

        </div>

        {/* Horizontal Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="w-full h-[1px] bg-white/10 my-8 origin-left"
        ></motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-[11px] text-white/40 font-sans font-light mt-8 tracking-wide"
        >
          <p>©{currentYear}. Hiranmayi Real Estate Pvt. Ltd. All rights reserved.</p>
          <a href="#" className="hover:text-white transition-colors mt-4 md:mt-0">Manage cookies</a>
          <p className="mt-4 md:mt-0 flex items-center gap-2">
            Made by <span className="text-white/60">❉ Phenomenon</span>
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
