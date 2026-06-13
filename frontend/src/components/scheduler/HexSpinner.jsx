import React from 'react';

// Spinning hexagon loader in the Block Ops teal — a faint hexagon track with a
// rotating teal arc. Used while the booking widget fetches availability.
const HEX = 'M24 6 L39.59 15 L39.59 33 L24 42 L8.41 33 L8.41 15 Z';

export default function HexSpinner({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className="animate-spin"
      style={{ animationDuration: '1.1s', transformOrigin: 'center' }}
      role="status"
      aria-label="Loading"
    >
      <path d={HEX} fill="none" stroke="#42A5B3" strokeOpacity="0.15" strokeWidth="3" strokeLinejoin="round" />
      <path
        d={HEX}
        fill="none"
        stroke="#42A5B3"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        strokeDasharray="28 72"
      />
    </svg>
  );
}
