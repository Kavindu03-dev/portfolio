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

  // Text Refs
  const textContainerRef = useRef(null);
  const hiTextRef = useRef(null);
  const iamTextRef = useRef(null);

  const roleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const embersRef = useRef([]);

  // Marquee Ref
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);

  // Roles List
  const roles = [
    "SOFTWARE DEVELOPER",
    "WEB DEVELOPER",
    "AI ENTHUSIAST",
    "DATA ENGINEER",
    "DATA ANALYST"
  ];

  // Duplicate roles for smoother infinite scroll
  const marqueeRoles = [...roles, ...roles, ...roles, ...roles];

  useGSAP(() => {

    // SAFETY CHECK
    if (
      !samurai1Ref.current ||
      !samurai2Ref.current ||
      !samurai3Ref.current ||
      !katanaRef.current ||
      !textContainerRef.current ||
      !hiTextRef.current ||
      !iamTextRef.current ||
      !marqueeRef.current ||
      !marqueeInnerRef.current
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
    gsap.set(hiTextRef.current, { opacity: 0, scale: 0.5, filter: "blur(10px)" });
    gsap.set(iamTextRef.current, { opacity: 0, scale: 0.5, filter: "blur(10px)" });

    // Roles Text Setup (Hide initially by moving down)
    roleRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 100, zIndex: 45 });
    });

    // Marquee Setup
    gsap.set(marqueeRef.current, { opacity: 0, y: 20 });

    // 2. MASTER TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=10000",
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

    // --- PHASE 4: THE ROLES LOOP (SLIDE UP ANIMATION) ---
    roles.forEach((_, index) => {
      const el = roleRefs.current[index];
      if (!el) return;

      // 1. Enter (Slide up from bottom to center)
      tl.to(el, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out"
      }, index === 0 ? ">" : ">-=0.4"); // First one immediately, others overlap slightly

      // 2. Hold
      tl.to(el, {
        scale: 1.1,
        textShadow: "0 0 25px white, 0 0 35px #ff0000", // Glow Effect
        duration: 1,
        ease: "none"
      });

      // 3. Exit (Move up and fade out)
      tl.to(el, {
        y: -100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.6,
        ease: "power2.in"
      });
    });

    // --- PHASE 5: ZOOM TO HANDLE + "HI" & "I AM" ---

    // 1. Start Katana Zoom
    tl.to(katanaRef.current, {
      scale: 5,
      y: 300,
      duration: 4,
      ease: "power1.inOut"
    });

    // 2. "HI" Text enters
    tl.to(hiTextRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "<");

    // 3. "HI" Text exits
    tl.to(hiTextRef.current, {
      opacity: 0,
      scale: 1.5,
      filter: "blur(10px)",
      duration: 0.5,
      delay: 0.5
    }, ">");

    // 4. "I AM" Text enters
    tl.to(iamTextRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "<+=0.3");

    // 5. "I AM" Text exits
    tl.to(iamTextRef.current, {
      opacity: 0,
      scale: 1.5,
      filter: "blur(10px)",
      duration: 0.5,
      delay: 0.5
    }, ">");


    // --- PHASE 6: FINAL REVEAL (KAVINDU) ---
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

    // --- PHASE 7: MARQUEE REVEAL ---
    tl.to(marqueeRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "<+=1"); // Appear slightly after name


    // --- CONTINUOUS ANIMATIONS (Non-ScrollTrigger) ---

    // Embers
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

    // Marquee Infinite Scroll
    // We have two identical sets of children in a flex container. 
    // Moving xPercent to -50 will move exactly half the width (one full set), 
    // creating a seamless loop when it resets.
    gsap.to(marqueeInnerRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 60, // Much slower speed
      repeat: -1
    });

  }, { scope: containerRef });

  const imageClasses = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[85vh] md:h-[95vh] w-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]";

  const glowingTextClass = "font-cinzel text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] shadow-red-500 whitespace-nowrap";

  // Shared classes for the Title texts
  const mainTitleContainerClass = "absolute inset-0 flex flex-col items-center justify-center z-[60] text-center px-4 pointer-events-none";
  const mainTitleTextClass = "font-cinzel text-6xl sm:text-8xl md:text-9xl font-bold uppercase text-white drop-shadow-[0_0_25px_rgba(255,0,0,0.8)] tracking-widest";
  const subTitleClass = "font-share-tech text-xl md:text-3xl text-red-500 tracking-[0.5em] font-bold uppercase drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]";
  const dividerClass = "h-[1px] w-24 md:w-48 bg-gradient-to-r from-transparent via-red-600 to-transparent";

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
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none mix-blend-screen">
          {roles.map((role, index) => (
            <div
              key={index}
              ref={(el) => { if (el) roleRefs.current[index] = el }}
              // Absolute positioning to center all texts
              className="absolute flex justify-center items-center w-full"
            >
              <h2 className={glowingTextClass}>
                {role}
              </h2>
            </div>
          ))}
        </div>

        {/* --- INTRO TEXT: "HI" --- */}
        <div ref={hiTextRef} className={mainTitleContainerClass}>
          <h1 className={mainTitleTextClass}>HI</h1>
          <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <div className={dividerClass} />
          </div>
        </div>

        {/* --- INTRO TEXT: "I AM" --- */}
        <div ref={iamTextRef} className={mainTitleContainerClass}>
          <h1 className={mainTitleTextClass}>I AM</h1>
          <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <div className={dividerClass} />
          </div>
        </div>

        {/* --- MAIN TITLE: "KAVINDU" --- */}
        <div ref={textContainerRef} className={mainTitleContainerClass}>
          <h1 className={mainTitleTextClass}>KAVINDU</h1>
          <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <div className={dividerClass} />
            <p className={subTitleClass}>The Code Warrior</p>
            <div className={dividerClass} />
          </div>
        </div>

        {/* --- FOOTER MARQUEE --- */}
        <div
          ref={marqueeRef}
          className="absolute bottom-10 left-0 w-full z-[70] overflow-hidden pointer-events-none opacity-0"
        >
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-900 to-transparent mb-2" />

          {/* Inner Container for Infinite Scroll */}
          <div className="flex w-fit" ref={marqueeInnerRef}>
            {/* First Set of Roles */}
            <div className="flex whitespace-nowrap gap-12 px-6">
              {marqueeRoles.map((role, i) => (
                <span key={`set1-${i}`} className="text-red-500 font-share-tech text-xl tracking-[0.2em] uppercase opacity-80">
                  {role} <span className="text-gray-600 mx-4">•</span>
                </span>
              ))}
            </div>
            {/* Second Set of Roles (Duplicate for Seamless Loop) */}
            <div className="flex whitespace-nowrap gap-12 px-6">
              {marqueeRoles.map((role, i) => (
                <span key={`set2-${i}`} className="text-red-500 font-share-tech text-xl tracking-[0.2em] uppercase opacity-80">
                  {role} <span className="text-gray-600 mx-4">•</span>
                </span>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-900 to-transparent mt-2" />
        </div>

      </section>
    </main>
  );
}