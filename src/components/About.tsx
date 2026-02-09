'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const scrollLineRef = useRef(null);

  useGSAP(() => {
    // 1. Title Reveal Animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
      y: 100,
      opacity: 0,
      filter: "blur(10px)",
    });

    // 2. Text Reveal (Staggered lines)
    // අකුරු පේළියෙන් පේළිය මතු වීම
    gsap.from(textRef.current.children, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 75%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // 3. Image Parallax Effect
    // Scroll කරනකොට පින්තූරය ටිකක් පහළට යනවා (3D පෙනුමක්)
    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: 100,
      scale: 1.1,
      ease: "none",
    });

    // 4. Center Line Animation (Red Line)
    gsap.fromTo(scrollLineRef.current, 
        { height: "0%" },
        {
            height: "100%",
            scrollTrigger: {
                trigger: container.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
            },
            ease: "none"
        }
    );

  }, { scope: container });

  // Fonts should match your Hero section (Cinzel & Share Tech/Sans)
  const titleClass = "font-cinzel text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]";
  const highlightClass = "text-red-600 font-bold drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]";
  const paragraphClass = "font-share-tech text-lg md:text-xl text-gray-300 leading-loose tracking-wide mb-6 border-l-2 border-red-900/50 pl-6";

  return (
    <section id="about" ref={container} className="relative min-h-screen bg-black overflow-hidden py-24 px-6 flex items-center">
      
      {/* Background Texture / Fog (Optional subtle overlay) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,0,0,0.2),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT SIDE: TEXT CONTENT --- */}
        <div className="order-2 md:order-1">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4 opacity-70">
            <div className="h-[1px] w-12 bg-red-600"></div>
            <span className="text-red-500 font-share-tech uppercase tracking-[0.3em] text-sm">Origins</span>
          </div>

          <h2 ref={titleRef} className={titleClass}>
            Forged in <br/> <span className="text-red-600">Code & Logic</span>
          </h2>

          <div ref={textRef}>
            <p className={paragraphClass}>
              Just as a warrior sharpens their blade, I sharpen my skills in <span className={highlightClass}>Software Engineering</span>. 
              Every line of code is a strike, every bug a worthy opponent.
            </p>
            <p className={paragraphClass}>
              I don't just build websites; I craft <span className="text-white">digital experiences</span> that cut through the noise. 
              With a disciplined focus on <span className={highlightClass}>Performance</span>, <span className={highlightClass}>Scalability</span>, and <span className={highlightClass}>User Experience</span>, 
              I bring the precision of the old ways to modern technology.
            </p>
            <p className={paragraphClass}>
              My weapon of choice? A deadly combination of <span className="text-white">Next.js</span>, <span className="text-white">React</span>, and <span className="text-white">AI Integration</span>.
            </p>

            {/* Signature / Button */}
            <div className="mt-10 pt-6 border-t border-gray-800 flex items-center gap-6">
                 <button className="group relative px-8 py-3 bg-transparent border border-red-800 overflow-hidden rounded-none hover:border-red-600 transition-colors duration-300">
                    <div className="absolute inset-0 w-0 bg-red-900/40 transition-all duration-[250ms] ease-out group-hover:w-full opacity-0 group-hover:opacity-100" />
                    <span className="relative font-cinzel font-bold text-white tracking-widest group-hover:text-red-100">
                        View My Arsenal
                    </span>
                 </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: IMAGE / VISUAL --- */}
        <div className="order-1 md:order-2 relative h-[500px] md:h-[700px] w-full flex items-center justify-center">
            
            {/* Center Scroll Line (Behind Image) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-900 -translate-x-1/2 h-full overflow-hidden">
                <div ref={scrollLineRef} className="w-full bg-red-600 shadow-[0_0_15px_#ff0000]" />
            </div>

            {/* Image Container with Glow */}
            <div className="relative w-full h-full max-w-md mx-auto">
                {/* Red Glow Behind */}
                <div className="absolute inset-0 bg-red-600/10 blur-[60px] rounded-full scale-75 animate-pulse" />
                
                {/* Image Frame */}
                <div ref={imageRef} className="relative z-10 w-full h-full overflow-hidden border border-red-900/30 bg-black/50 grayscale hover:grayscale-0 transition-all duration-700">
                     {/* Replace src with your photo or a samurai mask/abstract code image */}
                     {/* <img 
                        src="/your-photo.jpg" 
                        alt="Kavindu" 
                        className="w-full h-full object-cover opacity-80" 
                     /> */}
                     
                     {/* Placeholder for now */}
                     <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-red-900/40">
                        <span className="font-cinzel text-6xl text-red-900 opacity-50 mb-4">侍</span>
                        <p className="text-gray-500 font-share-tech uppercase tracking-widest text-sm">
                            Image: Samurai Mask <br/> or <br/> Portrait in Dark Theme
                        </p>
                     </div>

                     {/* Corner Accents */}
                     <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600" />
                     <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600" />
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}