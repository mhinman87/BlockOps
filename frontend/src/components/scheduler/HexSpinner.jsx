import React from 'react';

// Two solid teal hexagons spinning in opposite directions — mirrors the site's
// hex cursor. Used while the booking widget fetches availability.
const HEX = 'M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z';

export default function HexSpinner({ size = 46 }) {
  const inner = Math.round(size * 0.5);
  return (
    <div style={{ position: 'relative', width: size, height: size }} role="status" aria-label="Loading">
      <style>{`
        @keyframes bo-hexspin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .bo-hex { animation: none !important; } }
      `}</style>
      {/* Outer — brand teal, clockwise */}
      <svg
        className="bo-hex"
        width={size} height={size} viewBox="0 0 100 100"
        style={{ position: 'absolute', inset: 0, animation: 'bo-hexspin 2.4s linear infinite', transformOrigin: 'center' }}
      >
        <path d={HEX} fill="#42A5B3" />
      </svg>
      {/* Inner — darker teal, counter-clockwise */}
      <svg
        className="bo-hex"
        width={inner} height={inner} viewBox="0 0 100 100"
        style={{ position: 'absolute', left: (size - inner) / 2, top: (size - inner) / 2, animation: 'bo-hexspin 1.5s linear infinite reverse', transformOrigin: 'center' }}
      >
        <path d={HEX} fill="#2f7c87" />
      </svg>
    </div>
  );
}
