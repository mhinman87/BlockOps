import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

export const ProcessPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const stepRefs = useRef([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step-index'));
            setVisibleSteps((prev) => new Set([...prev, stepIndex]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const processSteps = [
    {
      number: 1,
      title: 'Explore our website',
      description: 'Look around and see what we have to offer. If you want, you can sign up with a free account and explore our customer dashboard',
    },
    {
      number: 2,
      title: 'Schedule an appointment',
      description: 'Reach out to schedule an appointment. In this appointment you can ask any and all questions that you have about our company and services. We will also be asking you questions to get more familiar with your situation and how we can help',
    },
    {
      number: 3,
      title: 'Tier 1 Assessment',
      description: 'After gathering some information about your facility and situation, we will provide a tier 1 assessment. This is meant to show you our understanding of where you are and our commitment to take you where you need to go.',
    },
    {
      number: 4,
      title: 'Contract',
      description: 'Everything up to this point is 100% free.',
    },
  ];

  // Hexagon path
  const hexagonPath = "M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z";

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">
              Block Ops
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/process" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Process
              </Link>
              <a href="/#services" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Services
              </a>
              <a href="/#who-we-serve" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Who We Serve
              </a>
              <a href="/#about" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                About
              </a>
              <a href="/#patients" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Patients
              </a>
              <Link
                to="/login"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/process" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  Our Process
                </Link>
                <a 
                  href="/#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  Services
                </a>
                <a 
                  href="/#who-we-serve" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  Who We Serve
                </a>
                <a 
                  href="/#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  About
                </a>
                <a 
                  href="/#patients" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  Patients
                </a>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mx-4 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/process/nerves.png)' }}
      >
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-12 sm:mb-16 uppercase tracking-tight drop-shadow-2xl">
            Our Process
          </h1>
        </div>
        
        {/* Overlapping Black Box */}
        <div className="absolute left-0 right-0 z-20 px-4 sm:px-6 lg:px-8" style={{ bottom: '-150px' }}>
          <div className="max-w-4xl mx-auto bg-black p-8 sm:p-12 rounded-lg shadow-2xl">
            <p className="text-base sm:text-lg md:text-xl text-white font-light leading-relaxed normal-case tracking-normal text-center">
              At Block Ops, we believe in transparency and partnership. Our process is designed to ensure you 
              understand exactly how we can help your facility excel in regional anesthesia. From your first 
              visit to our website through contract signing, we're committed to earning your trust every step 
              of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white" style={{ paddingTop: '200px' }}>
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block px-6 py-2 bg-black text-white font-bold uppercase tracking-wider text-xs sm:text-sm mb-8 rounded">
              How It Works
            </div>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Line - positioned to go through center of hexagons - hidden on mobile */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-primary hidden sm:block"
              style={{ left: 'calc(2rem + 0.3125rem)' }} // Adjusted to center through hexagons
            />

            {/* Steps */}
            <div className="space-y-16 sm:space-y-20">
              {processSteps.map((step, index) => {
                const isVisible = visibleSteps.has(index);
                return (
                  <div
                    key={step.number}
                    ref={(el) => (stepRefs.current[index] = el)}
                    data-step-index={index}
                    className="relative flex items-start gap-6 sm:gap-8 transition-all duration-700 ease-out"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Hexagon with Number - centered on the line */}
                    <div className="relative flex-shrink-0" style={{ marginLeft: '-0.125rem' }}>
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 100 100"
                        className="w-16 h-16 sm:w-20 sm:h-20"
                      >
                        <path
                          d={hexagonPath}
                          fill="white"
                          stroke="#42A5B3"
                          strokeWidth="3"
                        />
                        <text
                          x="50"
                          y="50"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="font-black text-primary"
                          style={{ fontSize: '36px' }}
                        >
                          {step.number}
                        </text>
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-base sm:text-lg text-gray-700 font-light leading-relaxed normal-case tracking-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 sm:mt-32">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm sm:text-base shadow-lg"
            >
              Get Started Today
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcessPage;

