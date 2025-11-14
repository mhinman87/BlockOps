import React, { useEffect, useRef } from 'react';

const HexagonParallax = () => {
  const containerRef = useRef(null);
  const hexagonRefs = useRef([]);

  // Determine scale factor based on screen size
  const getScaleFactor = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width < 640) return 0.5; // Mobile - scale down to 50%
    if (width < 768) return 0.65; // Small tablets - scale down to 65%
    if (width < 1024) return 0.8; // Tablets - scale down to 80%
    return 1; // Desktop - full size
  };

  useEffect(() => {
    let animationFrameId;
    let lastScrollY = -1;
    
    const updateParallax = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      
      // Only update if scroll position changed
      if (currentScrollY !== lastScrollY) {
        lastScrollY = currentScrollY;
        
        // Update all hexagons with their individual speeds
        hexagonRefs.current.forEach((element) => {
          if (element) {
            const speed = parseFloat(element.getAttribute('data-speed'));
            const offsetY = currentScrollY * speed;
            element.style.transform = `translate(-50%, -50%) translateY(${offsetY}px)`;
          }
        });
      }
      
      // Continue the animation loop
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    // Start the animation loop
    updateParallax();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Hexagon path for SVG
  const hexagonPath = "M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z";

  // Nerve pattern paths - geometric Y-shaped branches and nodes
  const nervePattern1 = "M50 30 L50 50 M50 50 L35 65 M50 50 L65 65 M35 65 L35 75 M65 65 L65 75";
  const nervePattern2 = "M50 25 L50 75 M50 40 L40 50 M50 40 L60 50 M50 60 L35 70 M50 60 L65 70";
  const nervePattern3 = "M30 40 L70 60 M50 30 L50 70 M40 45 L60 55";

  // Hexagon configurations with different layers, sizes, positions, and patterns
  // Using negative speeds so they move UP as you scroll DOWN (classic parallax)
  // Y positions go beyond 100% so hexagons scroll into view from bottom
  const hexagons = [
    // Background layer (slowest, large and subtle)
    { size: 320, x: 5, y: 10, opacity: 0.12, speed: -0.15, pattern: nervePattern1, hasPattern: true },
    { size: 290, x: 75, y: 30, opacity: 0.14, speed: -0.18, pattern: null, hasPattern: false },
    { size: 310, x: 45, y: 60, opacity: 0.13, speed: -0.16, pattern: nervePattern2, hasPattern: true },
    { size: 300, x: 15, y: 90, opacity: 0.12, speed: -0.17, pattern: nervePattern3, hasPattern: true },
    { size: 285, x: 70, y: 120, opacity: 0.13, speed: -0.15, pattern: null, hasPattern: false },
    { size: 305, x: 40, y: 150, opacity: 0.12, speed: -0.16, pattern: nervePattern1, hasPattern: true },
    
    // Middle layer (medium speed, visible)
    { size: 210, x: 20, y: 25, opacity: 0.18, speed: -0.35, pattern: nervePattern3, hasPattern: true },
    { size: 230, x: 80, y: 45, opacity: 0.16, speed: -0.32, pattern: null, hasPattern: false },
    { size: 200, x: 50, y: 15, opacity: 0.20, speed: -0.38, pattern: nervePattern1, hasPattern: true },
    { size: 220, x: 30, y: 70, opacity: 0.17, speed: -0.34, pattern: null, hasPattern: false },
    { size: 215, x: 65, y: 95, opacity: 0.19, speed: -0.36, pattern: nervePattern2, hasPattern: true },
    { size: 205, x: 10, y: 115, opacity: 0.17, speed: -0.33, pattern: nervePattern3, hasPattern: true },
    { size: 225, x: 75, y: 135, opacity: 0.18, speed: -0.37, pattern: null, hasPattern: false },
    
    // Foreground layer (fastest, most dramatic parallax)
    { size: 140, x: 15, y: 20, opacity: 0.24, speed: -0.7, pattern: nervePattern2, hasPattern: true },
    { size: 150, x: 70, y: 35, opacity: 0.22, speed: -0.65, pattern: null, hasPattern: false },
    { size: 135, x: 40, y: 50, opacity: 0.26, speed: -0.75, pattern: nervePattern3, hasPattern: true },
    { size: 145, x: 85, y: 65, opacity: 0.23, speed: -0.72, pattern: null, hasPattern: false },
    { size: 155, x: 25, y: 85, opacity: 0.25, speed: -0.68, pattern: nervePattern1, hasPattern: true },
    { size: 142, x: 60, y: 105, opacity: 0.24, speed: -0.73, pattern: nervePattern2, hasPattern: true },
    { size: 148, x: 90, y: 125, opacity: 0.22, speed: -0.67, pattern: null, hasPattern: false },
    { size: 138, x: 35, y: 145, opacity: 0.26, speed: -0.76, pattern: nervePattern3, hasPattern: true },
  ];

  const scaleFactor = getScaleFactor();

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0, width: '100%', height: '100%' }}
    >
      {hexagons.map((hex, index) => {
        const scaledSize = hex.size * scaleFactor;
        return (
          <div
            key={index}
            ref={(el) => (hexagonRefs.current[index] = el)}
            data-speed={hex.speed}
            className="absolute"
            style={{
              left: `${hex.x}%`,
              top: `${hex.y}%`,
              transform: `translate(-50%, -50%) translateY(0px)`,
              willChange: 'transform',
            }}
          >
            <svg
              width={scaledSize}
              height={scaledSize}
              viewBox="0 0 100 100"
              style={{
                opacity: hex.opacity,
              }}
            >
              {              /* Hexagon shape */}
              <path
                d={hexagonPath}
                fill="none"
                stroke="#42A5B3"
                strokeWidth="2"
              />
              
              {/* Nerve pattern (if applicable) */}
              {hex.hasPattern && hex.pattern && (
                <path
                  d={hex.pattern}
                  fill="none"
                  stroke="#42A5B3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
              
              {/* Add small nodes at intersections for nerve patterns */}
              {hex.hasPattern && (
                <>
                  <circle cx="50" cy="50" r="2" fill="#42A5B3" opacity="0.6" />
                  <circle cx="35" cy="65" r="1.5" fill="#42A5B3" opacity="0.5" />
                  <circle cx="65" cy="65" r="1.5" fill="#42A5B3" opacity="0.5" />
                </>
              )}
            </svg>
          </div>
        );
      })}
      
      {/* Reduced motion support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .absolute[style*="transform"] {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HexagonParallax;

