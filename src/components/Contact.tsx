'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Reveal text on scroll
    gsap.from(".contact-reveal", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.3,
      duration: 1.2,
      ease: "power4.out"
    });

    // Pulse effect for the red glow
    gsap.to(".contact-glow", {
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: container });

  return (
    <section 
      id="contact" 
      ref={container} 
      className="py-40 bg-black px-6 text-center border-t border-red-900/30 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="contact-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none opacity-30" />

      <div className="container mx-auto relative z-10">
        
        {/* Call to Action Header */}
        <div className="mb-12">
          <span className="contact-reveal block text-red-600 font-share-tech tracking-[0.5em] text-sm uppercase mb-4">
            Available for New Quests
          </span>
          <h2 className="contact-reveal text-6xl md:text-8xl font-bold text-white font-cinzel leading-none mb-6">
            HAVE A <span className="text-red-600">CHALLENGE?</span>
          </h2>
        </div>

        {/* Email Link with Unique Animation */}
        <div className="contact-reveal relative inline-block group">
          <a 
            href="mailto:yourname@example.com"
            className="relative z-10 font-cinzel text-3xl md:text-5xl text-white hover:text-red-500 transition-colors duration-500"
          >
            DISPATCH A SCROLL
          </a>
          
          {/* Animated underline that looks like a sword slash */}
          <div className="absolute -bottom-4 left-0 w-0 h-[2px] bg-red-600 transition-all duration-700 group-hover:w-full shadow-[0_0_10px_#ff0000]" />
          
          {/* Subtext that appears on hover */}
          <p className="mt-8 font-share-tech text-gray-500 tracking-[0.2em] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Click to send an owl (or an email)
          </p>
        </div>

        {/* Social Arsenal / Secondary Contact */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-wrap justify-center gap-12">
          {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((social) => (
            <a 
              key={social}
              href="#" 
              className="contact-reveal font-share-tech text-xs text-gray-600 hover:text-red-500 tracking-[0.3em] uppercase transition-all duration-300 hover:-translate-y-1"
            >
              {social}
            </a>
          ))}
        </div>

        {/* The Final Seal (Watermark) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
          <span className="font-cinzel text-[10rem] font-bold text-white select-none">封</span>
        </div>

      </div>

      
    </section>
  );
}