import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HeroAboutTransition from '@/components/HeroAboutTransition';
import About from '@/components/About';
import WhyMe from '@/components/WhyMe'; // <-- 1. Import Here
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <CustomCursor />
      {/* 2. Main Content (Sitting on top) */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <HeroAboutTransition />
        <About />
        <WhyMe /> {/* <-- 2. Add Component Here */}
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}