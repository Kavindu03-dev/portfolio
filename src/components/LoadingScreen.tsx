'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function LoadingScreen() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const slashRef = useRef<HTMLDivElement>(null);
    const topPanelRef = useRef<HTMLDivElement>(null);
    const bottomPanelRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsLoaded(true);
                // Optional: Hide entirely after animation
                if (containerRef.current) {
                    containerRef.current.style.display = 'none';
                }
            }
        });

        // 1. Counter Animation (0 to 100)
        tl.to(counterRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        })
            .to({}, {
                duration: 2,
                onUpdate: function () {
                    const prog = Math.round(this.progress() * 100);
                    setProgress(prog);
                    if (counterRef.current) {
                        counterRef.current.innerText = `${prog}%`;
                    }
                },
                ease: "power2.inOut"
            });

        // 2. Text Reveal ("INITIALIZING DOJO...")
        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "<0.5")
            // Pulse Effect
            .to(textRef.current, {
                opacity: 0.5,
                duration: 0.8,
                repeat: 3, // Pulse a few times while counter finishes
                yoyo: true,
                ease: "sine.inOut"
            });

        // 3. Fast Slash Effect
        tl.to(slashRef.current, {
            scaleX: 1,
            opacity: 1,
            duration: 0.1,
            ease: "power4.out"
        })
            .to(slashRef.current, {
                opacity: 0,
                duration: 0.2,
                delay: 0.1
            });

        // 4. Split Screen Exit
        // Move Text & Counter out first
        tl.to([textRef.current, counterRef.current], {
            opacity: 0,
            scale: 1.5,
            filter: "blur(10px)",
            duration: 0.5,
            ease: "power2.in"
        }, "<");

        // Panel Separation
        tl.to(topPanelRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power3.inOut"
        }, "-=0.2")
            .to(bottomPanelRef.current, {
                yPercent: 100,
                duration: 1.2,
                ease: "power3.inOut"
            }, "<");

    }, { scope: containerRef });

    // If we decided to persist "loaded" state, we could check it here.
    // For now, we always show it on mount.

    if (isLoaded) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden">

            {/* TOP PANEL (For Split Effect) */}
            <div ref={topPanelRef} className="absolute top-0 left-0 w-full h-1/2 bg-black z-10 border-b border-red-900/30" />

            {/* BOTTOM PANEL (For Split Effect) */}
            <div ref={bottomPanelRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-10 border-t border-red-900/30" />

            {/* CENTER CONTENT (On top of panels) */}
            <div className="relative z-20 flex flex-col items-center gap-4">
                {/* Counter */}
                <div
                    ref={counterRef}
                    className="font-share-tech text-6xl md:text-8xl font-bold text-red-600 opacity-0 tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]"
                >
                    0%
                </div>

                {/* Loading Text */}
                <h2
                    ref={textRef}
                    className="font-cinzel text-xl md:text-2xl text-gray-400 opacity-0 translate-y-10 tracking-[0.3em] uppercase"
                >
                    Initializing Dojo...
                </h2>
            </div>

            {/* SLASH VISUAL (Line through screen) */}
            <div
                ref={slashRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[2px] bg-white shadow-[0_0_20px_white,0_0_40px_red] z-30 opacity-0 origin-left rotate-[-15deg]"
            />

        </div>
    );
}
