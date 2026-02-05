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
    subtitle: "University Name Here",
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
    // 1. Timeline Animation
    const items = gsap.utils.toArray('.timeline-item');
    
    items.forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1, // staggering effect
        ease: "power3.out"
      });
    });

    // 2. Skills Animation
    gsap.from('.skill-badge', {
      scrollTrigger: {
        trigger: '#skills-grid',
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "back.out(1.7)"
    });

  }, { scope: container });

  return (
    <section id="whyme" ref={container} className="py-32 px-6 bg-zinc-950 border-t border-white/5 relative">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
          <h2 className="text-sm font-bold text-purple-500 mb-4 tracking-widest uppercase">My Journey</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white uppercase font-anton">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Hire Me?</span>
          </h3>
        </div>

        {/* Timeline Section */}
        <div className="relative mb-32">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 w-px h-full bg-white/10 transform md:-translate-x-1/2 ml-4 md:ml-0" />

          <div className="space-y-16">
            {timelineData.map((item, i) => (
              <div key={i} className={`timeline-item relative flex flex-col md:flex-row ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center`}>
                
                {/* Spacer for layout balance */}
                <div className="hidden md:block w-1/2" />
                
                {/* Dot on the line */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-zinc-950 transform -translate-x-1.5 md:-translate-x-1/2 ml-4 md:ml-0 mt-1.5 md:mt-0 z-10" />

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                  <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
                    <span className="text-purple-400 text-sm font-mono mb-2 block">{item.year}</span>
                    <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm mb-4">{item.subtitle}</p>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-4xl mx-auto text-center">
           <h3 className="text-2xl md:text-3xl font-bold text-white mb-12">Tools & Arsenal</h3>
           
           <div id="skills-grid" className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, i) => (
                <div 
                  key={i}
                  className="skill-badge px-6 py-3 bg-zinc-900 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all cursor-default"
                >
                  <span className="text-gray-300 font-medium">{skill}</span>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}