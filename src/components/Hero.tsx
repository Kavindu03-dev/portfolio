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
        <h1 ref={titleRef} className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6">
          CREATIVE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            DEVELOPER
          </span>
        </h1>
        <p ref={subRef} className="text-xl md:text-2xl text-gray-400 max-w-2xl">
          I build digital experiences with Next.js, Tailwind CSS, and GSAP.
        </p>
      </div>
    </section>
  );
}