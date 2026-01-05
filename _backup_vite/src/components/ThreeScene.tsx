import React, { useRef, useEffect } from 'react';

// Simple animated SVG-based 3D-like effect as a lightweight alternative to Three.js
// This creates floating geometric shapes that respond to scroll

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const shapes = containerRef.current.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
          const speed = 0.02 + index * 0.01;
          const rotation = scrollY * speed;
          const translateY = Math.sin(scrollY * 0.005 + index) * 20;
          (shape as HTMLElement).style.transform = `rotate(${rotation}deg) translateY(${translateY}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Floating Geometric Shapes */}
      <div className="floating-shape absolute top-20 right-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500">
          <polygon
            points="50,5 95,25 95,75 50,95 5,75 5,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="floating-shape absolute top-40 right-32 w-24 h-24 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full text-sky-500">
          <rect
            x="15"
            y="15"
            width="70"
            height="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            transform="rotate(45 50 50)"
          />
        </svg>
      </div>

      <div className="floating-shape absolute bottom-40 right-20 w-20 h-20 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-400">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="floating-shape absolute top-60 right-48 w-16 h-16 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
          <polygon
            points="50,10 90,90 10,90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Truck Wireframe */}
      <div className="floating-shape absolute bottom-32 right-40 w-40 h-24 opacity-15">
        <svg viewBox="0 0 120 60" className="w-full h-full text-emerald-500">
          {/* Truck body */}
          <rect x="5" y="20" width="60" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Truck cabin */}
          <path d="M65 20 L65 50 L95 50 L95 35 L80 20 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Wheels */}
          <circle cx="25" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="80" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Window */}
          <path d="M68 25 L68 35 L78 35 L78 28 L73 23 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Additional decorative elements */}
      <div className="floating-shape absolute top-32 left-10 w-12 h-12 opacity-10 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-300">
          <polygon
            points="50,5 95,25 95,75 50,95 5,75 5,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="floating-shape absolute bottom-60 left-20 w-16 h-16 opacity-10 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-sky-400">
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default ThreeScene;
