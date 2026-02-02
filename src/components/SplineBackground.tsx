'use client';

import Spline from '@splinetool/react-spline/next';

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* The Spline scene loads here */}
      <Spline 
        scene="https://prod.spline.design/wJOJUBQ4bPj7eWiE/scene.splinecode"
        className="w-full h-full"
      />
      {/* Dark overlay to make your text readable */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
    </div>
  );
}