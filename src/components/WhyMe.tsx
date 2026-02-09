'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "2024 - Present",
    title: "Freelance Creative Developer",
    subtitle: "Remote",
    description: "Building immersive web experiences using Next.js, WebGL, and GSAP for global clients.",
    type: "experience"
  },
  {
    year: "2021 - 2025",
    title: "BSc in Data Science",
    subtitle: "University of Sri Lanka",
    description: "Specializing in AI and Machine Learning foundations, bridging the gap between data and frontend visualization.",
    type: "education"
  },
  {
    year: "2023",
    title: "Frontend Intern",
    subtitle: "Tech Company",
    description: "Collaborated with senior developers to refactor legacy codebases to modern React standards.",
    type: "experience"
  }
];

const skills = [
  "Next.js", "React", "TypeScript", 
  "Tailwind CSS", "GSAP", "Three.js", 
  "Node.js", "Python", "Figma", 
  "Git", "MongoDB", "Framer Motion"
];

export default function WhyMe() {
  const container = useRef(null);

  useGSAP(() => {
    // 1. Title Animation
    gsap.from(".why-title", {
        scrollTrigger: {
            trigger: ".why-title",
            start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

    // 2. Timeline Animation
    const items = gsap.utils.toArray('.timeline-item');
    items.forEach((item: any) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        x: item.classList.contains('md:flex-row-reverse') ? 100 : -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    });

    // 3. Skills Animation (Staggered scale & blur)
    gsap.from('.skill-badge', {
      scrollTrigger: {
        trigger: '#skills-grid',
        start: "top 85%",
      },
      scale: 0,
      filter: "blur(10px)",
      opacity: 0,
      duration: 0.6,
      stagger: {
        amount: 1,
        grid: "auto",
        from: "center"
      },
      ease: "back.out(1.2)"
    });

  }, { scope: container });

  return (
    <section id="whyme" ref={container} className="py-32 px-6 bg-black border-t border-red-900/20 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
          <div className="inline-block py-1 px-4 border border-red-900/50 mb-4">
            <span className="text-xs font-bold text-red-600 tracking-[0.5em] uppercase font-share-tech">The Journey</span>
          </div>
          <h3 className="why-title text-5xl md:text-7xl font-bold text-white uppercase font-cinzel leading-none">
            Why <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">Hire Me?</span>
          </h3>
        </div>

        {/* Timeline Section */}
        <div className="relative mb-40">
          {/* Vertical Central Line */}
          <div className="absolute left-0 md:left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-red-900/50 to-transparent transform md:-translate-x-1/2 ml-4 md:ml-0" />

          <div className="space-y-24">
            {timelineData.map((item, i) => (
              <div key={i} className={`timeline-item relative flex flex-col md:flex-row ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center`}>
                
                <div className="hidden md:block w-1/2" />
                
                {/* Samurai Mask Icon or Dot */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-black border border-red-600 transform -translate-x-[15px] md:-translate-x-1/2 ml-4 md:ml-0 flex items-center justify-center z-10 rotate-45 group">
                    <div className="w-2 h-2 bg-red-600 animate-pulse" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                  <div className="group relative bg-zinc-950/50 backdrop-blur-md p-8 border-l-4 border-red-600 hover:bg-zinc-900/50 transition-all duration-500">
                    <span className="text-red-500 font-mono text-sm mb-2 block tracking-widest">{item.year}</span>
                    <h4 className="text-2xl font-cinzel font-bold text-white mb-1 group-hover:text-red-500 transition-colors">{item.title}</h4>
                    <p className="text-gray-400 font-share-tech text-sm mb-4 uppercase tracking-wider">{item.subtitle}</p>
                    <p className="text-gray-500 leading-relaxed font-share-tech">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center mb-16">
                <h3 className="text-3xl font-cinzel font-bold text-white mb-2">Technical Arsenal</h3>
                <div className="h-1 w-24 bg-red-600"></div>
            </div>
           
           <div id="skills-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, i) => (
                <div 
                  key={i}
                  className="skill-badge group relative px-6 py-4 bg-zinc-950 border border-red-900/20 flex items-center justify-center overflow-hidden hover:border-red-600 transition-colors"
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-red-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  
                  <span className="relative text-gray-400 font-share-tech uppercase tracking-widest group-hover:text-white transition-colors">
                    {skill}
                  </span>
                  
                  {/* Subtle Corner Accent */}
                  <div className="absolute top-0 right-0 w-1 h-1 bg-red-900" />
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}