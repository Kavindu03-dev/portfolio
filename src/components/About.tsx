'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef(null);
  const scrollLineRef = useRef(null);

  const bioText = "I am Kavindu, a Data Science Undergraduate at SLIIT. Like a Samurai mastering the blade, I sharpen my mind in the arts of Data and Code. I am a Software Developer, Web Developer, and AI Enthusiast, crafting digital solutions with precision and honor. My path is one of continuous learning, seeking to conquer complex problems with the speed of an algorithm and the discipline of a warrior.";

  // Helper to split text into words for animation
  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block mr-2 opacity-10 transition-colors duration-300 hover:text-red-500">
        {word}
      </span>
    ));
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",   // Pin when top hits top
        end: "+=3000",      // Scroll distance to unpin (longer = slower reading)
        pin: true,
        scrub: 1,
      }
    });

    // 1. Title Reveal (Quickly at start)
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      filter: "blur(10px)",
      duration: 2 // Relative duration in timeline
    });

    // 2. Word-by-Word Text Reveal
    if (textContainerRef.current) {
      const words = textContainerRef.current.querySelectorAll('span');
      tl.to(words, {
        opacity: 1,
        stagger: 0.1, // Stagger reveal
        color: "#e5e7eb",
        duration: 10, // Takes up main chunk of timeline
        ease: "none"
      });
    }

    // 3. Hold / Wait period
    // Just add a dummy tween to extend the timeline so there's a pause after text finishes
    tl.to({}, { duration: 5 });

  }, { scope: container });

  const titleClass = "font-cinzel text-5xl md:text-7xl font-bold text-white mb-16 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] text-center";
  const paragraphClass = "font-share-tech text-3xl md:text-5xl text-gray-500 leading-relaxed tracking-wide mb-12 text-center max-w-5xl mx-auto";

  return (
    <section id="about" ref={container} className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-6">

      {/* Background Texture - REMOVED for unified theme */}
      {/* Kept minimal if needed, but for now fully clean as requested */}

      {/* Decorative center line behind everything */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-900/20 -translate-x-1/2 z-0" />

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Section Label */}
        <div className="flex flex-col items-center gap-2 mb-8 opacity-70">
          <div className="h-12 w-[1px] bg-red-600"></div>
          <span className="text-red-500 font-share-tech uppercase tracking-[0.3em] text-sm">Origins</span>
        </div>

        <h2 ref={titleRef} className={titleClass}>
          Forged in <br /> <span className="text-red-600">Code & Logic</span>
        </h2>

        <div ref={textContainerRef} className={paragraphClass}>
          {splitText(bioText)}
        </div>

        {/* Signature / Button */}
        <div className="mt-10 pt-6 border-t border-gray-800/50 flex items-center justify-center gap-6 opacity-0 animate-[fadeIn_1s_delay-1000ms_forwards]">
          <button className="group relative px-8 py-3 bg-transparent border border-red-800 overflow-hidden rounded-none hover:border-red-600 transition-colors duration-300">
            <div className="absolute inset-0 w-0 bg-red-900/40 transition-all duration-[250ms] ease-out group-hover:w-full opacity-0 group-hover:opacity-100" />
            <span className="relative font-cinzel font-bold text-white tracking-widest group-hover:text-red-100">
              View My Arsenal
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}