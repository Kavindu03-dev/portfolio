import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyMe from '@/components/WhyMe'; // <-- 1. Import Here
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SplineBackground from '@/components/SplineBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* 1. 3D Background (Fixed at the back) */}
      <SplineBackground />

      {/* 2. Main Content (Sitting on top) */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <WhyMe /> {/* <-- 2. Add Component Here */}
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}