import React, { useRef, useState, useEffect } from 'react';

/**
 * ScrollReveal — fade + slide-up on scroll (or on mount)
 * Use for paragraphs, cards, buttons, grids.
 */
export const ScrollReveal = ({ children, delay = 0, className = '', style = {}, triggerOnMount = false }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (triggerOnMount) {
      const timer = setTimeout(() => setVisible(true), 80 + delay * 1000);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnMount, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(40px)',
        transition: `opacity 0.75s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: triggerOnMount ? '0s' : `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * RevealText — word-by-word clipped line reveal for headings.
 * Each word slides up from behind a mask — the Alluvium-style effect.
 * Falls back to a fade+slide for non-string children (JSX with spans etc).
 */
export const RevealText = ({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  triggerOnMount = false,
}) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (triggerOnMount) {
      const timer = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnMount]);

  // Pure string → word-by-word clip reveal
  if (typeof children === 'string') {
    const words = children.split(' ');
    return (
      <Tag ref={ref} className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.28em' }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: visible ? 'translateY(0%)' : 'translateY(115%)',
                transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${delay + i * 0.07}s`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  // Mixed JSX (e.g. h1 with a colored <span>) → whole-element fade+slide
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(35px)',
        transition: `opacity 0.75s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
};
