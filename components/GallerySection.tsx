'use client';

import InfiniteMenu from './InfiniteMenu';

export default function GallerySection() {
  const items = [
    {
      image: '/portfolio-1.jpg',
      link: '#',
      title: 'Hiranmayi Zinnia',
      description: 'Elegant masterwork homes crafted with pure symmetry.'
    },
    {
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      link: '#',
      title: 'Golden Crest Villa',
      description: 'An architectural masterwork on sunset coastal cliffs.'
    },
    {
      image: '/portfolio-2.jpg',
      link: '#',
      title: 'Hiranmayi Genial',
      description: 'Prestige landmark spaces built for generational legacy.'
    },
    {
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      link: '#',
      title: 'Emerald Lake Estate',
      description: 'A waterfront oasis enveloped by lush garden lawns.'
    },
    {
      image: '/portfolio-3.jpg',
      link: '#',
      title: 'Hiranmayi Abloom',
      description: 'Curated wellness retreats balancing design and peace.'
    },
    {
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      link: '#',
      title: 'Luminary Canopy',
      description: 'High-end modern chalet blending into dense mountain trees.'
    }
  ];

  return (
    <section className="relative w-full bg-[#ffffff] py-24 border-t border-black/5 overflow-hidden">
      
      {/* Curved soft ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[350px] bg-[#A5D6A7]/10 blur-[120px] rounded-full pointer-events-none select-none z-0" />

      {/* Luxury Section Header */}
      <div className="relative flex flex-col items-center text-center px-6 mb-4 z-20 pointer-events-none">
        <span className="font-serif text-xs md:text-sm uppercase tracking-[0.45em] text-[#1B5E20] mb-3 block opacity-90">
          Virtual Showcase
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-[2.8rem] font-normal text-[#0a1d0f] tracking-wider uppercase mb-5 leading-tight">
          Gallery
        </h2>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#1B5E20]/30 to-transparent mb-5" />
        <p className="text-[#0a1d0f]/75 font-sans font-light max-w-2xl text-sm md:text-lg lg:text-xl leading-relaxed">
          Experience standard-defining architectures and bespoke designs.
        </p>
      </div>

      {/* Infinite Menu Canvas Container */}
      <div className="relative w-full h-[550px] md:h-[650px] z-10 -mt-8 md:-mt-16">
        <InfiniteMenu items={items} scale={1.0} />
      </div>

    </section>
  );
}
