'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.2
    })
    .from(subRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");
  }, { scope: container });

  return (
    <section ref={container} className="h-screen flex flex-col justify-center px-6 pt-16">
      <div className="container mx-auto">
        {/* Updated Font (font-anton) and Size (text-[10rem] for massive impact) */}
        <h1 ref={titleRef} className="font-anton text-6xl md:text-9xl lg:text-[11rem] uppercase leading-[0.85] text-white mb-8">
          HI I'M <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            KAVINDU
          </span>
        </h1>
        
        {/* Updated Subtitle */}
        <p ref={subRef} className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed">
          Data Science Undergraduate | AI Enthusiast | Software Developer.
        </p>
      </div>
    </section>
  );
}