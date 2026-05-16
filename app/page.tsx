import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Mission } from '@/components/mission';
import { TakeATour } from '@/components/take-a-tour';
import { Caribbean } from '@/components/caribbean';
import GallerySection from '@/components/GallerySection';
import { Services } from '@/components/services';
import { CTA } from '@/components/cta';
import { Footer } from '@/components/footer';
import { ScrollHandler } from '@/components/scroll-handler';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <ScrollHandler />
      <Header />
      <main>
        <Hero />
        <Mission />
        <TakeATour />
        <div id="featured-projects">
          <Caribbean />
        </div>
        <GallerySection />
        <Services />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
