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
      name: 'Dr. Adrian Smith',
      role: 'Founder & Chief Executive Officer',
      roleColor: 'text-primary',
      description: 'Board-certified anesthesiologist with over 15 years of experience in regional anesthesia. Adrian founded Block Ops with a vision to revolutionize how healthcare facilities implement and optimize their anesthesia programs. His clinical expertise combined with business acumen has guided the company from a single consultation practice to a comprehensive platform serving medical institutions nationwide.',
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      roleColor: 'text-primary',
      description: 'Former lead engineer at major healthcare tech companies, Sarah brings deep expertise in building HIPAA-compliant software platforms. She oversees the development of Block Ops\' proprietary management system that enables clients to track progress, manage billing, and access training resources seamlessly. Sarah holds a B.S. in Computer Science from MIT and an M.S. in Healthcare Informatics.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Clinical Operations',
      roleColor: 'text-primary',
      description: 'With a background in anesthesiology and healthcare administration, Marcus ensures that every Block Ops engagement delivers exceptional clinical outcomes. He leads our team of consultants and trainers, developing standardized protocols while customizing solutions for each client\'s unique needs. Marcus has successfully overseen the implementation of regional anesthesia programs at over 50 facilities.',
    },
  ];

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
              <a href="/#consulting" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Process
              </a>
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
                <a 
                  href="/#consulting" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  Our Process
                </a>
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
              Block Ops is revolutionizing regional anesthesia consulting. By seamlessly connecting healthcare facilities 
              with expert anesthesiologists through our platform, we make advanced pain management techniques more accessible, 
              opening up better possibilities for patients and more efficient operations for providers. From our founding to 
              our rapid expansion across medical centers nationwide, Block Ops' growing presence continues to bring institutions 
              and their patients closer to excellence in anesthesia care.
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

