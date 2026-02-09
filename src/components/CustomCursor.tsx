'use client';

import { useEffect, useRef } from 'react';

function isFinePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches ?? false;
}

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const outer = useRef({ x: 0, y: 0 });

  const rafId = useRef<number | null>(null);
  const enabled = useRef(false);
  const hoveringInteractive = useRef(false);
  const mouseDown = useRef(false);

  useEffect(() => {
    enabled.current = isFinePointer();
    if (!enabled.current) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target as Element | null;
      const interactive = !!target?.closest(
        'a,button,[role="button"],summary,[data-cursor="interactive"]'
      );

      if (interactive !== hoveringInteractive.current) {
        hoveringInteractive.current = interactive;
        outerRef.current?.setAttribute('data-interactive', interactive ? 'true' : 'false');
      }
    };

    const onMouseDown = () => {
      mouseDown.current = true;
      outerRef.current?.setAttribute('data-down', 'true');
      dotRef.current?.setAttribute('data-down', 'true');
    };

    const onMouseUp = () => {
      mouseDown.current = false;
      outerRef.current?.removeAttribute('data-down');
      dotRef.current?.removeAttribute('data-down');
    };

    const onMouseLeave = () => {
      outerRef.current?.setAttribute('data-hidden', 'true');
      dotRef.current?.setAttribute('data-hidden', 'true');
    };

    const onMouseEnter = () => {
      outerRef.current?.removeAttribute('data-hidden');
      dotRef.current?.removeAttribute('data-hidden');
    };

    const tick = () => {
      // Match native cursor feel: no trailing/lerp.
      outer.current.x = mouse.current.x;
      outer.current.y = mouse.current.y;

      // Center the elements on the pointer
      const outerEl = outerRef.current;
      const dotEl = dotRef.current;

      if (outerEl) {
        outerEl.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotEl) {
        dotEl.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);

    rafId.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);

      if (rafId.current != null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Use fixed + translate to position at pointer; style transform origin to center.
  return (
    <>
      {/* Outer ring (lerps / trails slightly) */}
      <div
        ref={outerRef}
        aria-hidden="true"
        className={
          "pointer-events-none fixed left-0 top-0 z-[60] " +
          "h-8 w-8 rounded-full border border-white/25 opacity-80 transition-[opacity,border-color] duration-150 " +
          "data-[hidden=true]:opacity-0 data-[interactive=true]:border-red-600/60 data-[interactive=true]:opacity-100 " +
          "data-[down=true]:scale-90"
        }
      />

      {/* Dot + soft glow (follows pointer directly) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={
          "pointer-events-none fixed left-0 top-0 z-[61] " +
          "opacity-90 transition-opacity duration-75 data-[hidden=true]:opacity-0 data-[down=true]:scale-90"
        }
      >
        <div className="absolute left-1/2 top-1/2 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-md" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600" />
      </div>
    </>
  );
}
