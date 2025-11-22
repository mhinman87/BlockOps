import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Stethoscope, Monitor, Menu, X, Building2, Scissors, UserRound } from 'lucide-react';
import HexagonParallax from '../components/HexagonParallax';

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hospitalHover, setHospitalHover] = useState(false);
  const [surgeryHover, setSurgeryHover] = useState(false);
  const services = [
    {
      icon: Stethoscope,
      title: 'Regional Anesthesia Consulting',
      description: 'Expert consultation on regional anesthesia techniques and best practices.',
    },
    {
      icon: Users,
      title: 'Team Training',
      description: 'Comprehensive training programs for your medical team.',
    },
    {
      icon: Monitor,
      title: 'Platform Access',
      description: 'Track your progress, manage billing, and access resources through our intuitive software platform.',
    },
  ];

  const team = [
    {
      name: 'Dr. Anesthesiologist',
      role: 'Regional Anesthesia Specialist',
      description: 'Board-certified anesthesiologist with expertise in regional methods.',
    },
    {
      name: 'Sales Representative',
      role: 'Medical Sales',
      description: 'Dedicated to connecting clients with the right solutions.',
    },
    {
      name: 'CTO',
      role: 'Chief Technology Officer',
      description: 'Physician-programmer bridging healthcare and technology.',
    },
  ];

  return (
    <div className="bg-white w-full">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">Block Ops</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#consulting" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Process
              </a>
              <a href="#services" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Services
              </a>
              <a href="#who-we-serve" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Who We Serve
              </a>
              <a href="#about" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                About
              </a>
              <a href="#patients" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
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
                  href="#consulting" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  Our Process
                </a>
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  Services
                </a>
                <a 
                  href="#who-we-serve" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  Who We Serve
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2"
                >
                  About
                </a>
                <a 
                  href="#patients" 
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

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-20 sm:pb-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-cyan-50 relative min-h-screen">
        <HexagonParallax />
        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col justify-center min-h-[calc(100vh-8rem)]">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Regional Anesthesiology <span className="text-primary">Consulting</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto font-light px-4">
          We provide comprehensive assessments of your anesthesia program and deliver tailored recommendations designed to implement regional anesthesia techniques and optimize the effectiveness and success of your services.
          </p>
          <div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="consulting" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
            
            {/* Left Side - Content */}
            <div className="md:col-span-3 order-1 relative z-10">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-12 text-white">
                Our Process
              </h2>
              
              {/* Process Steps */}
              <div className="space-y-6 sm:space-y-8 mb-8">
                {/* Step 1 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                    <span className="text-lg sm:text-xl font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                      Website Contact
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 font-light">
                      Explore our services and get FREE consultations and initial insights.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                    <span className="text-lg sm:text-xl font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                      Outreach
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 font-light">
                      Connect with us through your preferred channel - call, email, or chat.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                    <span className="text-lg sm:text-xl font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                      Schedule Appointment
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 font-light">
                      Book your free consultation at a time that works for you.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                    <span className="text-lg sm:text-xl font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                      First Appointment
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 font-light">
                      Comprehensive assessment of your anesthesia program - 100% FREE.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                    <span className="text-lg sm:text-xl font-bold text-primary">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                      Transparent Pricing
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 font-light">
                      Clear cost breakdown with no hidden fees - see exactly what you're getting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="mt-8">
                <Link
                  to="#process-details"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm shadow-lg shadow-primary/50"
                >
                  Learn More About Our Process
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="md:col-span-2 order-2 relative hidden md:block">
              {/* Empty column to maintain layout spacing */}
            </div>
          </div>
          
          {/* Absolute positioned hexagon image that breaks out of grid */}
          <div className="absolute right-0 top-1/2 hidden md:block" style={{ width: '71.5%', transform: 'translateX(40%) translateY(-50%)' }}>
            <div className="relative">
              {/* Hexagon SVG Container - Extended right side */}
              <svg viewBox="0 0 100 100" className="w-full h-auto">
                <defs>
                  {/* Modified hexagon clip path - flat on right */}
                  <clipPath id="hexagonClipProcess">
                    <path d="M50 2 L100 2 L100 98 L50 98 L7 73 L7 27 Z" />
                  </clipPath>
                  
                  {/* Glow filter */}
                  <filter id="glowProcess">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Modified shape Background - Black - flat on right */}
                <path 
                  d="M50 2 L100 2 L100 98 L50 98 L7 73 L7 27 Z" 
                  fill="#000000"
                />
                
                {/* Process Image */}
                <image 
                  href="/images/process/contact-website.png" 
                  x="7" 
                  y="5" 
                  width="93" 
                  height="96"
                  clipPath="url(#hexagonClipProcess)"
                  preserveAspectRatio="xMidYMid slice"
                />
                
                {/* Border with Glow - only left hexagon side */}
                <path 
                  d="M50 2 L7 27 L7 73 L50 98" 
                  fill="none" 
                  stroke="#42A5B3" 
                  strokeWidth="0.8"
                  filter="url(#glowProcess)"
                  className="drop-shadow-[0_0_10px_rgba(66,165,179,0.5)]"
                />
              </svg>
            </div>
          </div>
          
          {/* Mobile image */}
          <div className="md:hidden mt-8">
            <img 
              src="/images/process/contact-website.png" 
              alt="Our Process" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center">
        <HexagonParallax />
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-10 sm:mb-16 text-gray-900">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="p-6 sm:p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition border border-gray-200"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-light">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section id="who-we-serve" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Centered Title */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-16 text-white text-center">
            Who We Serve
          </h2>
          
          {/* Two Hexagons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 max-w-5xl mx-auto">
            
            {/* Hospitals Hexagon */}
            <div 
              className="flex flex-col items-center group" 
              style={{ perspective: '1000px' }}
              onMouseEnter={() => setHospitalHover(true)}
              onMouseLeave={() => setHospitalHover(false)}
            >
              <div 
                className="relative w-full max-w-sm" 
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: hospitalHover ? 'rotateX(5deg) rotateY(-5deg) scale(1.05)' : 'rotateX(0deg) rotateY(0deg) scale(1)'
                }}
              >
                {/* Hexagon SVG Container */}
                <div className="relative">
                  <svg viewBox="0 0 100 100" className="w-full h-auto">
                    <defs>
                      {/* Hexagon clip path */}
                      <clipPath id="hexagonClipHospital">
                        <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" />
                      </clipPath>
                      
                      {/* Glow filter */}
                      <filter id="glowHospital">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Hexagon Background */}
                    <path 
                      d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" 
                      fill="#f3f4f6"
                    />
                    
                    {/* Hospital Image */}
                    <image 
                      href="/images/who-we-serve/hospital.png" 
                      x="7" 
                      y="2" 
                      width="86" 
                      height="96"
                      clipPath="url(#hexagonClipHospital)"
                      preserveAspectRatio="xMidYMid slice"
                      className="group-hover:opacity-40"
                    />
                    
                    {/* Dark Overlay on Hover */}
                    <path 
                      d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" 
                      fill="black"
                      clipPath="url(#hexagonClipHospital)"
                      className="opacity-0 group-hover:opacity-60"
                    />
                    
                    {/* Hexagon Border with Glow */}
                    <path 
                      d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" 
                      fill="none" 
                      stroke="#42A5B3" 
                      strokeWidth="0.8"
                      filter="url(#glowHospital)"
                      className="drop-shadow-[0_0_10px_rgba(66,165,179,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(66,165,179,0.8)]"
                    />
                    
                    {/* Text Overlay */}
                    <foreignObject x="15" y="25" width="70" height="50" clipPath="url(#hexagonClipHospital)">
                      <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <p className="text-white text-center font-light"
                           style={{ 
                             fontSize: '5px',
                             lineHeight: '1.4',
                             textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                             padding: '0 2px'
                           }}>
                          From small rural facilities to large healthcare systems, we bring expertise in regional anesthesia to hospitals of all sizes and complexities.
                        </p>
                      </div>
                    </foreignObject>
                  </svg>
                </div>
              </div>
              
              {/* Label */}
              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 text-center">
                Hospitals
              </h3>
            </div>

            {/* Ambulatory Surgery Centers Hexagon */}
            <div 
              className="flex flex-col items-center group" 
              style={{ perspective: '1000px' }}
              onMouseEnter={() => setSurgeryHover(true)}
              onMouseLeave={() => setSurgeryHover(false)}
            >
              <div 
                className="relative w-full max-w-sm" 
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: surgeryHover ? 'rotateX(5deg) rotateY(5deg) scale(1.05)' : 'rotateX(0deg) rotateY(0deg) scale(1)'
                }}
              >
                {/* Hexagon SVG Container */}
                <div className="relative">
                  <svg viewBox="0 0 100 100" className="w-full h-auto">
                    <defs>
                      {/* Hexagon clip path */}
                      <clipPath id="hexagonClipSurgery">
                        <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" />
                      </clipPath>
                      
                      {/* Glow filter */}
                      <filter id="glowSurgery">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Hexagon Background */}
                    <path 
                      d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" 
                      fill="#f3f4f6"
                    />
                    
                    {/* Surgery Center Image */}
                    <image 
                      href="/images/who-we-serve/surgery.png" 
                      x="7" 
                      y="2" 
                      width="86" 
                      height="96"
                      clipPath="url(#hexagonClipSurgery)"
                      preserveAspectRatio="xMidYMid slice"
                      className="group-hover:opacity-40"
                    />
                    
                    {/* Dark Overlay on Hover */}
                    <path 
                      d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" 
                      fill="black"
                      clipPath="url(#hexagonClipSurgery)"
                      className="opacity-0 group-hover:opacity-60"
                    />
                    
                    {/* Hexagon Border with Glow */}
                    <path 
                      d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" 
                      fill="none" 
                      stroke="#42A5B3" 
                      strokeWidth="0.8"
                      filter="url(#glowSurgery)"
                      className="drop-shadow-[0_0_10px_rgba(66,165,179,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(66,165,179,0.8)]"
                    />
                    
                    {/* Text Overlay */}
                    <foreignObject x="15" y="25" width="70" height="50" clipPath="url(#hexagonClipSurgery)">
                      <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <p className="text-white text-center font-light"
                           style={{ 
                             fontSize: '5px',
                             lineHeight: '1.4',
                             textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                             padding: '0 2px'
                           }}>
                          We partner with your surgical center as an extension of your team, delivering customized regional anesthesia solutions tailored to your specific needs.
                        </p>
                      </div>
                    </foreignObject>
                  </svg>
                </div>
              </div>
              
              {/* Label */}
              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 text-center">
                Surgery Centers
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center">
        <HexagonParallax />
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-10 sm:mb-16 text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition text-center border border-gray-200"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-teal-400 to-primary rounded-full mx-auto mb-3 sm:mb-4"></div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-2 sm:mb-3 uppercase tracking-wide text-xs sm:text-sm">{member.role}</p>
                <p className="text-sm sm:text-base text-gray-600 font-light">{member.description}</p>
              </div>
            ))}
          </div>
          
          {/* Learn More About Company Button */}
          <div className="text-center">
            <Link
              to="/company"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm shadow-lg shadow-primary/50"
            >
              Learn More About Our Company
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="patients" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-10 sm:mb-16 text-gray-900">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold uppercase tracking-wider">Email</p>
                  <p className="text-sm sm:text-base text-gray-900 font-light">info@blockops.com</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold uppercase tracking-wider">Phone</p>
                  <p className="text-sm sm:text-base text-gray-900 font-light">(913) 555-0000</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-bold uppercase tracking-wider">Location</p>
                  <p className="text-sm sm:text-base text-gray-900 font-light">Kansas City, KS</p>
                </div>
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-light text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-light text-sm sm:text-base"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-light text-sm sm:text-base"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 sm:py-3 rounded-lg hover:opacity-90 transition font-bold text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 sm:mb-8">
            <div className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">Block Ops</div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              <Link
                to="/careers"
                className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm"
              >
                Careers
              </Link>
              <Link
                to="/careers"
                className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm"
              >
                About
              </Link>
              <Link
                to="/careers"
                className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm"
              >
                Patients
              </Link>
              <Link
                to="/careers"
                className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm"
              >
                Who We Serve
              </Link>
              <Link
                to="/careers"
                className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 font-light text-xs sm:text-sm">
              &copy; 2026 Block Ops. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
