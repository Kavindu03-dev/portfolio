'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroAboutTransition() {
    const containerRef = useRef(null);
    const stripRef = useRef(null);
    const stripTextRef = useRef(null);
    const fullScreenTextRef = useRef(null);
    const overlayRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=2000",
                pin: true,
                scrub: 1,
            }
        });

        // Initial State
        gsap.set(stripRef.current, {
            rotation: 15,
            scale: 1.2,
            xPercent: 100, // Start off-screen right
            yPercent: -50,
            top: "50%",
            opacity: 0
        });

        gsap.set(fullScreenTextRef.current, {
            opacity: 0,
            scale: 0.5,
            y: 100
        });

        gsap.set(overlayRef.current, { opacity: 0 });


        // --- PHASE 1: DIAGONAL STRIP ENTER ---
        tl.to(stripRef.current, {
            xPercent: 0, // Center
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        })
            // Move layout text inside strip
            .to(stripTextRef.current, {
                xPercent: -20, // Scroll text left a bit
                duration: 1,
                ease: "none"
            }, "<");

        // --- PHASE 2: STRIP EXIT & FULL SCREEN TEXT ENTER ---
        tl.to(stripRef.current, {
            scale: 30, // Expand strip to fill screen or just fly out
            opacity: 0,
            duration: 1,
            ease: "power2.in"
        })
            .to(fullScreenTextRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(1.2)"
            }, "<+=0.5");

        // --- PHASE 3: FADE TO BLACK (ABOUT) ---
        // Note: We might want to keep the image visible if it transitions to the next section
        // But for this specific transition component, let's keep it consistent within the timeline
        tl.to(fullScreenTextRef.current, {
            scale: 1.5,
            opacity: 0,
            duration: 1,
            ease: "power2.in"
        });



    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center z-20">

            {/* Background Image REMOVED for unified black theme */}

            {/* Diagonal Strip */}
            <div
                ref={stripRef}
                className="absolute left-0 w-[120%] h-32 bg-red-600 flex items-center justify-center border-y-4 border-white shadow-[0_0_50px_rgba(255,0,0,0.5)] z-30"
                style={{ transformOrigin: "center center" }}
            >
                <div ref={stripTextRef} className="whitespace-nowrap flex gap-8">
                    {[...Array(5)].map((_, i) => (
                        <h2 key={i} className="text-black font-share-tech text-4xl md:text-6xl font-bold uppercase tracking-widest px-4">
                            LET'S GET TO KNOW ABOUT ME •
                        </h2>
                    ))}
                </div>
            </div>

            {/* Full Screen Text Reveal */}
            <div ref={fullScreenTextRef} className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
                <h1 className="font-cinzel text-6xl sm:text-8xl md:text-[10rem] font-bold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] text-center leading-none">
                    ABOUT<br /><span className="text-red-600">ME</span>
                </h1>
            </div>

        </section>
    );
}
