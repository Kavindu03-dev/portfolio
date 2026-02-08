'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const samurai1Ref = useRef(null);
  const samurai2Ref = useRef(null);
  const samurai3Ref = useRef(null);
  const katanaRef = useRef(null);
  const extraContentRef = useRef(null);
  
  // Text Refs
  const textContainerRef = useRef(null);
  const roleRefs = useRef([]); 
  
  const embersRef = useRef([]);

  // Roles List
  const roles = [
    { left: "SOFTWARE", right: "DEVELOPER" },
    { left: "WEB", right: "DEVELOPER" },
    { left: "AI", right: "ENTHUSIAST" },
    { left: "DATA", right: "ENGINEER" },
    { left: "DATA", right: "ANALYST" }
  ];

  useGSAP(() => {
    
    // SAFETY CHECK
    if (
        !samurai1Ref.current || 
        !samurai2Ref.current || 
        !samurai3Ref.current || 
        !katanaRef.current || 
        !textContainerRef.current 
    ) return;

    // 1. INITIAL SETUP
    
    // Samurai Images
    gsap.set(samurai1Ref.current, { scale: 1, opacity: 1, filter: "brightness(0.4)" });
    gsap.set(samurai2Ref.current, { opacity: 0, scale: 1, filter: "brightness(0)" });
    gsap.set(samurai3Ref.current, { opacity: 0, scale: 1, filter: "brightness(1)" });
    
    // Katana Setup
    gsap.set(katanaRef.current, { 
      opacity: 0,
      scale: 0.85, 
      y: 450,
      filter: "blur(0px)"
    });

    // Main Title Setup
    gsap.set(textContainerRef.current, { opacity: 0, y: 50, scale: 0.8 });

    // Roles Text Setup
    roleRefs.current.forEach((el) => {
        if(!el) return;
        gsap.set(el, { opacity: 1, zIndex: 45 }); 
    });

    // 2. MASTER TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=9000",
        pin: true,
        scrub: 1,
      }
    });

    // --- PHASE 1: Samurai 1 -> Samurai 2 ---
    tl.to(samurai1Ref.current, { filter: "brightness(0)", scale: 0.95, duration: 1, ease: "power2.inOut" })
      .set(samurai1Ref.current, { opacity: 0 })
      .set(samurai2Ref.current, { opacity: 1, scale: 0.95 })
      .to(samurai2Ref.current, { filter: "brightness(1)", scale: 1, duration: 1, ease: "power2.inOut" });

    // --- PHASE 2: Samurai 2 -> Samurai 3 ---
    tl.to(samurai2Ref.current, { opacity: 0, filter: "blur(5px)", scale: 1.05, duration: 1, ease: "power1.inOut" })
      .to(samurai3Ref.current, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1, ease: "power1.inOut" }, "<");

    // --- PHASE 3: Samurai 3 OUT & Katana IN ---
    tl.to(samurai3Ref.current, {
      opacity: 0,
      scale: 1.15, 
      filter: "blur(20px)", 
      duration: 1.5 
    })
    .to(katanaRef.current, {
      opacity: 1,
      scale: 2.5,
      y: 50,
      filter: "blur(0px)",
      duration: 2,
      ease: "power2.out"
    }, "<"); 

    // --- PHASE 4: THE ROLES LOOP (UPDATED ANIMATION) ---
    
    roles.forEach((_, index) => {
        const container = roleRefs.current[index];
        if (!container) return;
        
        const leftWord = container.children[0];
        const rightWord = container.children[1];

        // 1. Entrance: දෙපැත්තේ කෙළවරේ සිට වේගයෙන් මැදට පැමිණීම
        tl.fromTo([leftWord, rightWord], 
            { 
                opacity: 0, 
                scale: 1.5, 
                filter: "blur(10px)",
                x: (i) => i === 0 ? -800 : 800 // වම් එක ඉතා ඈත වමෙන්, දකුණු එක ඉතා ඈත දකුණෙන්
            },
            {
                opacity: 1,
                scale: 1, 
                filter: "blur(0px)",
                x: 0, // නියමිත ස්ථානයට (Gap එක තියාගෙන)
                duration: 0.6,
                ease: "power4.out" // Impact එකක් එක්ක නවතින්න
            },
            index === 0 ? "<+=0.5" : ">-=0.1"
        );

        // 2. Hold: ටික වෙලාවක් රැඳී සිටීම (Glow Effect)
        tl.to([leftWord, rightWord], {
            textShadow: "0 0 25px white, 0 0 35px #ff0000",
            scale: 1.1, // පොඩි Zoom එකක්
            duration: 1.5,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut"
        });

        // 3. EXIT: "Into the Blade" Animation (කඩුව ඇතුලට ඇදී යාම)
        tl.to([leftWord, rightWord], {
            x: (i) => i === 0 ? 150 : -150, // වචන දෙක මැදට (එකිනෙකා දෙසට) එනවා
            scale: 0, // ශනිකව කුඩා වෙනවා
            opacity: 0,
            filter: "blur(20px)", 
            duration: 0.4, // ඉතා ඉක්මනින්
            ease: "expo.in" // Vacuum එකක් වගේ ඇතුලට අදිනවා
        });
    });

    // --- PHASE 5: ZOOM TO HANDLE ---
    tl.to(katanaRef.current, {
      scale: 5,
      y: 300,
      duration: 3,     
      ease: "power1.inOut"
    });

    // --- PHASE 6: THE CLIMAX ---
    tl.to(katanaRef.current, {
      scale: 40,
      y: 2000,
      opacity: 0,      
      duration: 3,     
      ease: "power2.in" 
    })
    .to(textContainerRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 2,
      ease: "back.out(1.7)"
    }, "<+=1"); 

    // --- EMBERS ANIMATION ---
    embersRef.current.forEach((ember) => {
      if (!ember) return;
      gsap.to(ember, {
        y: `-=${gsap.utils.random(800, 1200)}`,
        x: `+=${gsap.utils.random(-100, 100)}`,
        opacity: 0,
        duration: gsap.utils.random(5, 10),
        repeat: -1,
        ease: "none",
        delay: gsap.utils.random(0, 5),
      });
    });

  }, { scope: containerRef });

  const imageClasses = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[85vh] md:h-[95vh] w-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]";
  
  // දිලිසෙන අකුරු සඳහා Class එක
  const glowingTextClass = "font-cinzel text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] shadow-red-500 whitespace-nowrap";

  return (
    <main>
        {/* HERO SECTION */}
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-black to-black" />
        
        {/* Embers */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            {[...Array(30)].map((_, i) => (
            <div
                key={i}
                ref={(el) => { if (el) embersRef.current[i] = el }}
                className="absolute bottom-[-20px] w-1 h-1 md:w-2 md:h-2 bg-red-600 rounded-full blur-[1px] shadow-[0_0_15px_#ff0000]"
                style={{ left: `${Math.random() * 100}%`, opacity: Math.random() }}
            />
            ))}
        </div>

        {/* IMAGES CONTAINER */}
        <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Samurai Images */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={samurai1Ref} src="/samurai1.png" alt="Samurai 1" className={`${imageClasses} z-20`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={samurai2Ref} src="/samurai2.png" alt="Samurai 2" className={`${imageClasses} z-20`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={samurai3Ref} src="/samurai3.png" alt="Samurai 3" className={`${imageClasses} z-20`} />

            {/* Dark Shade Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] z-30 pointer-events-none" />
            
            {/* Katana Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
            ref={katanaRef}
            src="/katana.png" 
            alt="Katana" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100vh] w-auto object-contain drop-shadow-[0_0_30px_#ff0000] z-50"
            style={{ transformOrigin: "center top" }} 
            />
        </div>

        {/* --- SCROLLING ROLES TEXT --- */}
        {/* Gap එක වැඩි කළා (md:gap-32) කඩුවේ Handle එකට හොඳට ඉඩ තියන්න */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none mix-blend-screen">
             {roles.map((role, index) => (
                <div 
                    key={index}
                    ref={(el) => { if (el) roleRefs.current[index] = el }}
                    className="absolute flex justify-center items-center gap-12 md:gap-32 w-full" 
                >
                     {/* වම් පස වචනය */}
                     <h2 className={`${glowingTextClass} text-right flex-1`}>
                        {role.left}
                     </h2>
                     
                     {/* දකුණු පස වචනය */}
                     <h2 className={`${glowingTextClass} text-left flex-1`}>
                        {role.right}
                     </h2>
                </div>
             ))}
        </div>

        {/* --- MAIN TITLE --- */}
        <div ref={textContainerRef} className="relative z-[60] text-center px-4">
            <h1 className="font-cinzel text-6xl sm:text-8xl md:text-9xl font-bold uppercase text-white drop-shadow-[0_0_25px_rgba(255,0,0,0.8)] tracking-widest">
            KAVINDU
            </h1>
            <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <div className="h-[1px] w-24 md:w-48 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <p className="font-share-tech text-xl md:text-3xl text-red-500 tracking-[0.5em] font-bold uppercase drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                The Code Warrior
            </p>
            <div className="h-[1px] w-24 md:w-48 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            </div>
        </div>
        </section>

        {/* EXTRA CONTENT SECTION */}
        <div ref={extraContentRef} className="relative z-50 bg-black text-white min-h-screen flex flex-col items-center justify-center p-10">
            <h2 className="text-4xl font-cinzel mb-4 text-red-600">My Projects</h2>
            <p className="text-gray-400 max-w-2xl text-center font-share-tech text-lg">
                The battlefield of code awaits.
            </p>
        </div>
    </main>
  );
}