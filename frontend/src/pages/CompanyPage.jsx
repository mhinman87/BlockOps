import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

export const CompanyPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const leadership = [
    {
      name: 'Dr. Samir Bhakta',
      role: 'Regional Anesthesia Specialist',
      roleColor: 'text-primary',
      description: 'Board-certified anesthesiologist specializing in regional anesthesia techniques. Samir leads all clinical architecture, protocol development, and on-site implementation for Block Ops. His expertise drives the Gold Standard framework that defines every engagement.',
    },
    {
      name: 'Max Hinman',
      role: 'Chief Information Officer',
      roleColor: 'text-primary',
      description: 'Building the technology platform and operational systems that power Block Ops. Max oversees the digital infrastructure, client dashboard, and the systems that make Block Ops scalable.',
    },
    {
      name: 'Adrian',
      role: 'Medical Sales',
      roleColor: 'text-primary',
      description: 'Dedicated to connecting healthcare facilities with the right solutions. Adrian guides prospective clients through the engagement process and ensures a smooth transition from initial contact to active implementation.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo-192.png" alt="Block Ops" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">Block Ops</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/#approach" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Approach
              </a>
              <a href="/#results" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Results
              </a>
              <a href="/#who-we-serve" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Who We Serve
              </a>
              <a href="/#about" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                About
              </a>
              <Link
                to="/login"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm"
              >
                Client Login
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
                <a href="/#approach" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Approach</a>
                <a href="/#results" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Results</a>
                <a href="/#who-we-serve" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Who We Serve</a>
                <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">About</a>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mx-4 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm text-center">Client Login</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/company/skyline-1.png)' }}
      >
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-12 sm:mb-16 uppercase tracking-tight drop-shadow-2xl">
            The Company
          </h1>
        </div>
        
        {/* Overlapping Black Box - positioned with negative bottom to overflow */}
        <div className="absolute left-0 right-0 z-20 px-4 sm:px-6 lg:px-8" style={{ bottom: '-150px' }}>
          <div className="max-w-4xl mx-auto bg-black p-8 sm:p-12 rounded-lg shadow-2xl">
            <p className="text-base sm:text-lg md:text-xl text-white font-light leading-relaxed normal-case tracking-normal text-center">
              Block Ops delivers complete regional anesthesia systems to healthcare facilities — evidence-based protocols, 
              physical infrastructure, digital tools, and ongoing support. We don't just consult and leave. We build 
              programs that run, measure, and improve on their own. Every engagement is structured around our Gold Standard 
              framework: six pillars that define what a world-class regional anesthesia program looks like.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white" style={{ paddingTop: '200px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block px-6 py-2 bg-black text-white font-bold uppercase tracking-wider text-xs sm:text-sm mb-8 rounded">
              Leadership Team
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-20 sm:space-y-32">
            {leadership.map((member, index) => (
              <div key={index} className="max-w-4xl mx-auto">
                {/* Role Label */}
                <div className="text-center mb-4">
                  <span className={`${member.roleColor} font-bold uppercase tracking-wider text-xs sm:text-sm`}>
                    {member.role}
                  </span>
                </div>
                
                {/* Name */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 text-center mb-8 uppercase tracking-tight">
                  {member.name}
                </h2>
                
                {/* Description */}
                <p className="text-base sm:text-lg text-gray-700 font-light leading-relaxed text-center normal-case tracking-normal">
                  {member.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 sm:mt-32">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm sm:text-base shadow-lg"
            >
              Return to Home
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyPage;

