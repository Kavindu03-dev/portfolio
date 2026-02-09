'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  { 
    title: "Shadow Commerce", 
    cat: "Next.js / Stripe", 
    tag: "01",
    desc: "A high-performance digital marketplace forged for speed."
  },
  { 
    title: "Zenith Portfolio", 
    cat: "GSAP / Three.js", 
    tag: "02",
    desc: "Immersive 3D storytelling experience with fluid animations."
  },
  { 
    title: "Oni Dashboard", 
    cat: "TypeScript / AI", 
    tag: "03",
    desc: "Data visualization interface with a lethal dark aesthetic."
  },
];

export default function Projects() {
  const container = useRef(null);
  
  useGSAP(() => {
    // Reveal Cards on Scroll
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".project-card",
        start: "top 85%",
      },
      clipPath: "inset(100% 0% 0% 0%)", // Cutting reveal effect
      y: 50,
      stagger: 0.2,
      duration: 1.2,
      ease: "power4.inOut"
    });
  }, { scope: container });

  // 3D Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const dx = x - xc;
    const dy = y - yc;
    
    gsap.to(card, {
      rotationY: dx / 10,
      rotationX: -dy / 10,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.5
    });
  };

  return (
    <section id="projects" ref={container} className="py-32 px-6 bg-black relative overflow-hidden">
      
      {/* Background Japanese Watermark */}
      <div className="absolute top-20 right-[-5%] text-[15rem] font-bold text-red-950/10 select-none pointer-events-none font-cinzel opacity-20">
        武士
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col mb-20">
          <span className="text-red-600 font-share-tech tracking-[0.5em] text-sm mb-2 uppercase">My Arsenal</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white font-cinzel leading-none">
            SELECTED <br/> <span className="text-red-600">WORKS</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 perspective-1000">
          {projectsData.map((project, i) => (
            <div 
              key={i} 
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className="project-card group relative h-[550px] cursor-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Unique Shape: Clipped Card */}
              <div className="absolute inset-0 bg-zinc-900 border-l border-red-600/30 transition-all duration-500 group-hover:border-red-600 group-hover:bg-zinc-800/40"
                   style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}>
                
                {/* Number Overlay */}
                <span className="absolute top-4 right-8 font-cinzel text-6xl text-white/5 font-bold group-hover:text-red-600/10 transition-colors">
                  {project.tag}
                </span>

                {/* Animated Inner Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                     style={{ background: 'radial-gradient(circle at center, rgba(220,38,38,0.15) 0%, transparent 80%)' }} />

                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-20" style={{ transform: 'translateZ(50px)' }}>
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 border border-red-600/50 flex items-center justify-center rotate-45 group-hover:rotate-180 transition-transform duration-700">
                        <div className="w-2 h-2 bg-red-600" />
                    </div>
                    <span className="text-gray-500 font-share-tech text-xs tracking-widest uppercase">{project.cat}</span>
                  </div>

                  {/* Bottom Content */}
                  <div>
                    <h3 className="text-4xl font-cinzel font-bold text-white mb-4 leading-tight group-hover:text-red-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 font-share-tech text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      {project.desc}
                    </p>
                    
                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-[1px] w-0 bg-red-600 group-hover:w-12 transition-all duration-500"></div>
                        <span className="text-red-600 font-share-tech text-xs tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE</span>
                    </div>
                  </div>
                </div>

                {/* Samurai Sword "Slash" Line (Decorative) */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[1px] bg-red-600/20 rotate-[35deg] group-hover:translate-y-[500px] transition-transform duration-1000 ease-in-out pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Custom Scoped CSS for Perspective */}
        <style jsx>{`
          .perspective-1000 { perspective: 1000px; }
        `}</style>
      </div>
    </section>
  );
}