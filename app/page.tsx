import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { TakeATour } from '@/components/take-a-tour';
import { Caribbean } from '@/components/caribbean';
import GallerySection from '@/components/GallerySection';
import { Services } from '@/components/services';
import { CTA } from '@/components/cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <TakeATour />
        <Caribbean />
        <GallerySection />
        <Services />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
