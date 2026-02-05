'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const container = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef<(HTMLSpanElement | null)[]>([]);
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
    <header 
      ref={container} 
      className="fixed top-0 w-full z-50"
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <div className="absolute top-0 left-0 w-full z-50 px-6 h-20 flex items-center justify-between mix-blend-difference text-white">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          PORTFOLIO.
        </Link>

        <button 
          onClick={toggleMenu}
          onMouseEnter={() => setIsMenuOpen(true)}
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

      <div 
        ref={menuRef}
        className="fixed inset-0 bg-[#050505] z-40 flex flex-col -translate-y-full"
      >
        <div className="w-full h-full flex flex-col justify-center items-center">
          
          <div className="links anchors flex flex-col w-full">
            {menuItems.map((item, i) => (
              <a
                key={i}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                // Fixed height: h-12 (mobile) and md:h-20 (desktop) to make boxes smaller
                className="links__item group relative w-full border-b border-white/10 overflow-hidden cursor-pointer flex items-end justify-center h-12 md:h-20 decoration-0"
              >
                <div className="absolute bottom-0 left-0 w-full h-0 bg-[#bfd0e0] transition-all duration-500 ease-in-out group-hover:h-full" />

                {/* - text-6xl / 8xl: Large text size
                    - -mb-2 md:-mb-3: Negative margin pulls text down to create the 'clipped' look
                */}
                <span 
                  ref={(el) => { if (linksRef.current) linksRef.current[i] = el; }}
                  className="links__text relative z-10 block font-sans font-bold text-6xl md:text-8xl tracking-tighter leading-[0.8] text-[#bfd0e0] group-hover:text-black transition-colors duration-300 -mb-2 md:-mb-3"
                >
                  {item.name}
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </header>
  );
}