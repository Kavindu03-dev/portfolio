'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className="py-24 px-6 bg-zinc-900">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-sm font-bold text-purple-500 mb-4 tracking-widest uppercase">About Me</h2>
          <div ref={textRef}>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Passionate about creating smooth web interactions.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              I specialize in frontend development, focusing on performance and animation. 
              My goal is to bridge the gap between design and engineering using modern tools 
              like Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
        <div className="h-[400px] w-full bg-gradient-to-tr from-purple-900 to-slate-800 rounded-2xl flex items-center justify-center border border-white/5">
          <span className="text-white/20 font-bold text-xl">Image Placeholder</span>
        </div>
      </div>
    </section>
  );
}