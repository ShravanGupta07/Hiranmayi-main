'use client';

import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111211] text-white py-16 px-6 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Headings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-6 pt-8">
          <div className="md:col-span-5 lg:col-span-5">
            <h4 className="text-white/40 text-[13px] font-sans italic tracking-widest uppercase">(Get in touch)</h4>
          </div>
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-white/40 text-[13px] font-sans italic tracking-widest uppercase">(Location)</h4>
          </div>
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-white/40 text-[13px] font-sans italic tracking-widest uppercase">(Contact)</h4>
          </div>
        </div>

        {/* Separator Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="w-full h-[1px] bg-white/10 origin-center"
        ></motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pt-8 pb-16">
          
          {/* Column 1 - Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            className="flex flex-col md:col-span-5 lg:col-span-5"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-wide">HIRANMAYI</h2>
          </motion.div>

          {/* Column 2 - Location */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col md:col-span-3 lg:col-span-3"
          >
            <p className="text-white/90 text-[13px] md:text-sm font-sans font-light leading-relaxed">
              Nashik,<br />
              Maharashtra, India
            </p>
          </motion.div>

          {/* Column 3 - Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:col-span-4 lg:col-span-4"
          >
            <div className="flex flex-col gap-3">
              <a href="mailto:hiranmayi0422@gmail.com" className="text-white text-base md:text-lg font-serif italic tracking-wide hover:opacity-70 transition-opacity uppercase">
                HIRANMAYI0422@GMAIL.COM
              </a>
              <a href="tel:+919766180144" className="text-white text-base md:text-lg font-serif italic tracking-wide hover:opacity-70 transition-opacity">
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
          className="w-full h-[1px] bg-white/10 my-8 origin-center"
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
        </motion.div>

      </div>
    </footer>
  );
}
