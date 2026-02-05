'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const container = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(menuRef.current, {
      y: 0,
      duration: 0.8,
      ease: "power3.inOut",
    })
    .from(linksRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.3");

  }, { scope: container });

  useEffect(() => {
    if (tl.current) {
      if (isMenuOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isMenuOpen]);

  const menuItems = [
    { name: 'HOME', id: 'home' },
    { name: 'ABOUT ME', id: 'about' },
    { name: 'WHY ME', id: 'whyme' },
    { name: 'PROJECTS', id: 'projects' },
    { name: 'CONTACT', id: 'contact' },
  ];

  return (
    // Added onMouseLeave here to close menu when cursor leaves the header area completely
    <header 
      ref={container} 
      className="fixed top-0 w-full z-50"
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      {/* 1. Top Bar */}
      <div className="absolute top-0 left-0 w-full z-50 px-6 h-20 flex items-center justify-between mix-blend-difference text-white">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          PORTFOLIO.
        </Link>

        {/* Updated Button with onMouseEnter */}
        <button 
          onClick={toggleMenu}
          onMouseEnter={() => setIsMenuOpen(true)} // <-- AUTO SHOW ON HOVER
          className="group flex flex-col items-end gap-[6px] p-2 cursor-pointer"
        >
           {isMenuOpen ? (
              <div className="relative w-8 h-8 flex items-center justify-center">
                 <span className="absolute w-full h-[2px] bg-white rotate-45 transform transition-transform" />
                 <span className="absolute w-full h-[2px] bg-white -rotate-45 transform transition-transform" />
              </div>
           ) : (
             <>
               <span className="w-8 h-[2px] bg-white transition-all group-hover:w-10" />
               <span className="w-8 h-[2px] bg-white transition-all group-hover:w-6" />
               <span className="w-8 h-[2px] bg-white transition-all group-hover:w-8" />
             </>
           )}
        </button>
      </div>

      {/* 2. Full Screen Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-black z-40 flex flex-col -translate-y-full"
      >
        <div className="container mx-auto px-6 h-full flex flex-col justify-center">
          
          <div className="absolute top-8 right-20 hidden md:flex items-center gap-8 text-gray-400">
             <div className="flex gap-6 text-2xl">
                <a href="#" className="hover:text-white transition-colors">✉️</a>
                <a href="#" className="hover:text-white transition-colors">⌘</a>
                <a href="#" className="hover:text-white transition-colors">in</a>
             </div>
             <a 
               href="/cv.pdf" 
               className="border border-white/20 px-4 py-2 rounded-md text-sm text-white hover:bg-white hover:text-black transition-all"
             >
               Download CV
             </a>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item, i) => (
              <div key={item.name} className="overflow-hidden">
                <a
                  ref={(el) => { if (linksRef.current) linksRef.current[i] = el; }}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className="block font-anton text-6xl md:text-8xl lg:text-9xl text-gray-400 hover:text-white transition-colors uppercase leading-none tracking-wide"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}