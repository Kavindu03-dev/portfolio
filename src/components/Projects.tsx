'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  { title: "E-Commerce", cat: "Next.js / Stripe", color: "from-blue-500 to-cyan-500" },
  { title: "Portfolio 2024", cat: "GSAP / React", color: "from-purple-500 to-pink-500" },
  { title: "Dashboard", cat: "Tailwind / Chart.js", color: "from-orange-500 to-red-500" },
];

export default function Projects() {
  const container = useRef(null);
  
  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section id="projects" ref={container} className="py-32 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 text-center">Selected Works</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {projectsData.map((project, i) => (
            <div 
              key={i} 
              className="project-card group relative h-[400px] bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-sm text-gray-400 mb-2">{project.cat}</p>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}