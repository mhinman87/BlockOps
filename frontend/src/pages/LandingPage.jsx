import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Shield, 
  TrendingUp, 
  Clock, 
  FileText, 
  Monitor, 
  HeadphonesIcon,
  Building2,
  Scissors,
  CheckCircle2,
  ChevronDown,
  Stethoscope,
  BookOpen,
  BarChart3,
  Users,
  Zap,
  Target
} from 'lucide-react';
import HexagonParallax from '../components/HexagonParallax';
import { ScrollReveal, RevealText } from '../components/ScrollReveal';

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cursor spotlight + hexagon cursor
  const heroRef = useRef(null);
  const blobRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });
  const cursorPx = useRef({ x: -100, y: -100 });
  const ringPx = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const blob = blobRef.current;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!blob) return;

    const handleMouseMove = (e) => {
      // Update cursor px position (viewport coords for fixed elements)
      cursorPx.current = { x: e.clientX, y: e.clientY };
      // Show cursors on first move
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '1';
      // Update blob target using hero-relative % (spotlight stays in hero)
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        targetPos.current = { x: (x / rect.width) * 100, y: (y / rect.height) * 100 };
      }
    };
    const handleMouseLeave = () => {
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    };

    // Inject spin keyframe
    const styleEl = document.createElement('style');
    styleEl.textContent = `@keyframes hex-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(styleEl);

    const dotWrapper = dot?.firstElementChild;
    const ringWrapper = ring?.firstElementChild;
    const dotSvg = dotWrapper?.querySelector('svg');
    const ringSvg = ringWrapper?.querySelector('svg');
    const INTERACTIVE = 'a, button, [role="button"], select, input, textarea, label, .group';
    const handleMouseOver = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        if (dotSvg) dotSvg.style.animation = 'hex-spin 0.9s linear infinite';
        if (ringSvg) ringSvg.style.animation = 'hex-spin 1.6s linear infinite reverse';
        if (dotWrapper) dotWrapper.style.transform = 'scale(2)';
        if (ringWrapper) ringWrapper.style.transform = 'scale(2)';
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        if (dotSvg) dotSvg.style.animation = 'none';
        if (ringSvg) ringSvg.style.animation = 'none';
        if (dotWrapper) dotWrapper.style.transform = 'scale(1)';
        if (ringWrapper) ringWrapper.style.transform = 'scale(1)';
      }
    };

    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.07;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.07;
      blob.style.background = `radial-gradient(ellipse 700px 550px at ${currentPos.current.x}% ${currentPos.current.y}%, rgba(66,165,179,0.28) 0%, rgba(66,165,179,0.06) 45%, transparent 70%)`;
      if (dot) dot.style.transform = `translate(${cursorPx.current.x - 10}px, ${cursorPx.current.y - 10}px)`;
      ringPx.current.x += (cursorPx.current.x - ringPx.current.x) * 0.1;
      ringPx.current.y += (cursorPx.current.y - ringPx.current.y) * 0.1;
      if (ring) ring.style.transform = `translate(${ringPx.current.x - 22}px, ${ringPx.current.y - 22}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      document.head.removeChild(styleEl);
    };
  }, []);

  const painPoints = [
    {
      icon: Target,
      title: 'Inconsistent Block Success',
      description: 'Without standardized protocols, block success rates vary wildly between providers — leading to patient pain, opioid dependence, and lost revenue.',
    },
    {
      icon: Clock,
      title: 'PACU Bottlenecks',
      description: 'Patients without regional anesthesia spend longer in recovery. Every extra minute in PACU costs your facility $30-50 in staffing and overhead.',
    },
    {
      icon: BarChart3,
      title: 'Missed Billing Revenue',
      description: 'Incorrect CPT coding, missed modifiers, and undocumented blocks leave thousands of dollars on the table every month.',
    },
  ];

  const roiStats = [
    { value: '$700K+', label: 'Annual PACU Savings', sublabel: 'Per facility average' },
    { value: '40-60%', label: 'Opioid Reduction', sublabel: 'First 24 hours post-op' },
    { value: '15:1', label: 'Return on Investment', sublabel: 'Year one' },
  ];

  const deliverables = [
    {
      icon: FileText,
      title: 'Physical Deliverables',
      description: 'Clinical protocols, pocket reference cards, wall posters, patient education materials, and a complete block bay setup guide — everything your team needs at the bedside.',
      items: ['Safety protocols (LAST, time-out procedures)', 'Block-specific technique cards', 'Patient consent & home instruction packets', 'Nursing assessment cards', 'Block bay equipment & layout specs'],
    },
    {
      icon: Monitor,
      title: 'Digital Platform',
      description: 'A secure dashboard for tracking implementation progress, accessing your digital resource library, managing deliverables, and monitoring program outcomes.',
      items: ['QR-accessible video reference library', 'EMR documentation templates', 'Outcome tracking & reporting tools', 'Dosing calculators & quick references', 'Competency tracking system'],
    },
    {
      icon: HeadphonesIcon,
      title: 'Ongoing Support',
      description: 'Your program doesn\'t end at launch. We provide continuous optimization, updated protocols when guidelines change, and strategic support as your program grows.',
      items: ['Protocol updates (ASRA, ASA guidelines)', 'Quarterly outcome reviews', 'Revenue optimization audits', 'Expansion planning & new block packs', 'Champion provider support'],
    },
  ];

  const phases = [
    {
      number: '01',
      title: 'Site Assessment',
      duration: 'Weeks 1-2',
      description: 'On-site evaluation of your facility, staff, case mix, and existing anesthesia program. We identify gaps and build a custom implementation plan.',
    },
    {
      number: '02',
      title: 'Foundation Launch',
      duration: 'Weeks 3-6',
      description: 'Deploy core safety protocols, physical infrastructure, digital platform access, and champion provider activation. Your program goes live.',
    },
    {
      number: '03',
      title: 'Training & Expansion',
      duration: 'Weeks 7-12',
      description: 'Hands-on block training, team competency development, supervised case ramp-up, and Tier 1 sign-offs for your providers.',
    },
    {
      number: '04',
      title: 'Optimization',
      duration: 'Months 4-6+',
      description: 'Outcome data review, surgeon feedback integration, revenue optimization, billing audits, and strategic expansion into additional block types.',
    },
  ];

  const pillars = [
    { icon: Stethoscope, title: 'Clinical Architecture', subtitle: 'The Product', description: 'Evidence-based protocols, techniques, safety systems, and pharmacology frameworks.' },
    { icon: Zap, title: 'Physical Operations', subtitle: 'The Engine', description: 'Block bay design, workflow optimization, scheduling, supply chain, and equipment.' },
    { icon: Monitor, title: 'Digital Platform', subtitle: 'The System', description: 'Dashboards, EMR templates, tracking tools, mobile references, and video library.' },
    { icon: Users, title: 'Human Capital', subtitle: 'The People', description: 'Provider and nursing training, competency tiers, governance, and sustainability.' },
    { icon: Building2, title: 'Stakeholder Integration', subtitle: 'The Partners', description: 'Surgeon compacts, patient journey design, and referring provider engagement.' },
    { icon: BarChart3, title: 'Value Intelligence', subtitle: 'The Proof', description: 'Billing optimization, outcome measurement, ROI analysis, and compliance.' },
  ];

  const faqs = [
    {
      question: 'What size facility is this designed for?',
      answer: 'We work with ambulatory surgery centers (2-6 ORs) and hospitals looking to build or expand their regional anesthesia capabilities. The ideal facility has at least one provider with regional training who can serve as the on-site champion.',
    },
    {
      question: 'How long does implementation take?',
      answer: 'A full Foundation + Block Pack implementation typically runs 12-16 weeks from assessment to optimization. Your program is live and performing blocks by week 3-6, with ongoing refinement after that.',
    },
    {
      question: 'Do you need to access patient data?',
      answer: 'No. Block Ops operates entirely outside the patient data layer. We provide protocols, training, and systems — your team applies them. No HIPAA compliance concerns.',
    },
    {
      question: 'What makes this different from hiring a consultant?',
      answer: 'A traditional consultant gives you advice and leaves. We deliver a complete system — physical materials, digital infrastructure, training frameworks, and ongoing support. It\'s the difference between getting a recommendation and getting an operating system.',
    },
    {
      question: 'Is the initial consultation really free?',
      answer: 'Yes. We provide a comprehensive assessment of your current anesthesia program at no cost. You\'ll receive a clear picture of the gaps, the opportunity, and what implementation would look like — before any commitment.',
    },
  ];

  const team = [
    {
      name: 'Samir Bhakta, MD',
      role: 'Regional Anesthesia Specialist',
      description: 'Board-certified anesthesiologist specializing in regional anesthesia techniques. Leads all clinical architecture, protocol development, and on-site implementation.',
    },
    {
      name: 'Adrian',
      role: 'Medical Sales',
      description: 'Dedicated to connecting healthcare facilities with the right solutions and guiding them through the engagement process.',
    },
    {
      name: 'Max Hinman',
      role: 'Chief Information Officer',
      description: 'Building the technology platform and operational systems that power Block Ops.',
    },
  ];

  return (
    <div className="bg-white w-full cursor-hidden">
      {/* Hex cursor — dot (fixed, page-wide) */}
      <div ref={cursorDotRef} className="fixed top-0 left-0 pointer-events-none" style={{ zIndex: 9999, opacity: 0, willChange: 'transform', transition: 'opacity 0.2s ease' }}>
        <div style={{ display: 'inline-block', transformOrigin: 'center', transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <svg width="20" height="20" viewBox="0 0 100 100">
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="rgba(66,165,179,0.2)" stroke="#42A5B3" strokeWidth="5" />
          </svg>
        </div>
      </div>
      {/* Hex cursor — trailing ring (fixed, page-wide) */}
      <div ref={cursorRingRef} className="fixed top-0 left-0 pointer-events-none" style={{ zIndex: 9998, opacity: 0, willChange: 'transform', transition: 'opacity 0.2s ease' }}>
        <div style={{ display: 'inline-block', transformOrigin: 'center', transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <svg width="44" height="44" viewBox="0 0 100 100">
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="none" stroke="rgba(66,165,179,0.35)" strokeWidth="3" />
          </svg>
        </div>
      </div>
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo-192.png" alt="Block Ops" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">Block Ops</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#approach" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Approach
              </a>
              <a href="#results" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Results
              </a>
              <a href="#who-we-serve" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Who We Serve
              </a>
              <a href="#about" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                About
              </a>
              <Link to="/blog" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">
                Blog
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm"
              >
                Client Login
              </Link>
              <a
                href="#contact"
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-bold uppercase tracking-wide text-sm"
              >
                Free Consultation
              </a>
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
                <a href="#approach" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Approach</a>
                <a href="#results" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Results</a>
                <a href="#who-we-serve" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Who We Serve</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">About</a>
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Blog</Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mx-4 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm text-center">Client Login</Link>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mx-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-bold uppercase tracking-wide text-sm text-center">Free Consultation</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="pt-24 sm:pt-32 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center overflow-hidden"
        style={{ background: '#060d14' }}
      >
        {/* Cursor spotlight blob */}
        <div ref={blobRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
        {/* Ambient static glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'radial-gradient(ellipse 500px 400px at 85% 15%, rgba(66,165,179,0.10) 0%, transparent 70%)' }} />
        <HexagonParallax />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <ScrollReveal triggerOnMount delay={0}>
            <div className="inline-block px-4 py-1.5 bg-primary/20 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
              Regional Anesthesiology Consulting
            </div>
          </ScrollReveal>
          <RevealText
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            triggerOnMount
            delay={0.1}
          >
            Build a Regional Anesthesia Center of Excellence
          </RevealText>
          <ScrollReveal triggerOnMount delay={0.4}>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed normal-case tracking-normal">
              We deliver the complete system — protocols, training, infrastructure, and ongoing support — to transform your facility's anesthesia program. Evidence-based. Measurable. Turnkey.
            </p>
          </ScrollReveal>
          <ScrollReveal triggerOnMount delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm shadow-lg shadow-primary/30"
              >
                Schedule Free Assessment
                <ArrowRight size={18} />
              </a>
              <a
                href="#approach"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3.5 rounded-lg hover:bg-white/20 transition font-bold uppercase tracking-wide text-sm border border-white/20"
              >
                See How It Works
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          THE PROBLEM
      ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-18">
            <div className="inline-block px-4 py-1.5 bg-white/10 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
              The Problem
            </div>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Most Facilities Know Regional Is Better.
            </RevealText>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400 mb-6">Few Have the System to Deliver It.</p>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-base sm:text-lg normal-case tracking-normal">
              The clinical evidence is overwhelming — regional anesthesia reduces pain, cuts opioid use, and accelerates recovery. But without the right infrastructure, training, and protocols, results are inconsistent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.12}>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 sm:p-8 hover:border-primary/50 transition h-full">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{point.title}</h3>
                  <p className="text-gray-400 font-light text-sm sm:text-base normal-case tracking-normal">{point.description}</p>
                </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ROI / RESULTS
      ═══════════════════════════════════════════════ */}
      <section id="results" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
        <HexagonParallax />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14 sm:mb-18">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
              The Results
            </div>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Math Speaks for Itself
            </RevealText>
            <p className="text-gray-600 max-w-2xl mx-auto font-light text-base sm:text-lg normal-case tracking-normal">
              A structured regional anesthesia program generates measurable value from day one — in direct billing, PACU efficiency, opioid reduction, and surgical throughput.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {roiStats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.12}>
              <div className="text-center p-8 sm:p-10 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary hover:shadow-xl transition h-full">
                <p className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-2">{stat.value}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{stat.label}</p>
                <p className="text-sm text-gray-500 font-light normal-case tracking-normal">{stat.sublabel}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 font-light normal-case tracking-normal">
              Based on published outcomes data from ASRA, ASA, and peer-reviewed literature for facilities performing 1,000+ blocks annually.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          THE GOLD STANDARD — 6 PILLARS
      ═══════════════════════════════════════════════ */}
      <section id="approach" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-18">
            <div className="inline-block px-4 py-1.5 bg-white/10 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
              Our Framework
            </div>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              The Gold Standard
            </RevealText>
            <p className="text-gray-400 max-w-3xl mx-auto font-light text-base sm:text-lg normal-case tracking-normal">
              Every Block Ops engagement is built on our six-pillar framework — a comprehensive blueprint for what a world-class regional anesthesia program looks like. No gaps. No guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.08}>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-primary/50 transition group h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 w-11 h-11 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                      <Icon className="text-primary" size={22} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">{pillar.title}</h3>
                      <p className="text-primary text-xs font-bold uppercase tracking-wider">{pillar.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 font-light text-sm normal-case tracking-normal">{pillar.description}</p>
                </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHAT YOU GET — DELIVERABLES
      ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
        <HexagonParallax />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14 sm:mb-18">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
              What You Get
            </div>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              A Complete System, Not Just Advice
            </RevealText>
            <p className="text-gray-600 max-w-2xl mx-auto font-light text-base sm:text-lg normal-case tracking-normal">
              Every engagement includes a Foundation Package with all the infrastructure your program needs, plus modular Block Packs tailored to your surgical case mix.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {deliverables.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-xl hover:border-primary/30 transition">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 font-light text-sm sm:text-base mb-5 normal-case tracking-normal">{item.description}</p>
                  <ul className="space-y-2">
                    {item.items.map((li, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 normal-case tracking-normal">
                        <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                        <span className="font-light">{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          IMPLEMENTATION TIMELINE
      ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 sm:mb-18">
            <div className="inline-block px-4 py-1.5 bg-white/10 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
              How It Works
            </div>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              From Assessment to Excellence
            </RevealText>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-base sm:text-lg normal-case tracking-normal">
              A structured implementation that gets your program live fast and optimizes over time.
            </p>
          </div>

          <div className="space-y-6">
            {phases.map((phase, index) => (
              <div key={index} className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition">
                  <span className="text-2xl font-black text-primary">{phase.number}</span>
                </div>
                <div className="flex-1 pb-6 border-b border-gray-800 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{phase.title}</h3>
                    <span className="text-primary text-sm font-bold uppercase tracking-wider">{phase.duration}</span>
                  </div>
                  <p className="text-gray-400 font-light text-sm sm:text-base normal-case tracking-normal">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm shadow-lg shadow-primary/30"
            >
              Start With a Free Assessment
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHO WE SERVE
      ═══════════════════════════════════════════════ */}
      <section id="who-we-serve" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
        <HexagonParallax />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14 sm:mb-18">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
              Who We Serve
            </div>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for Facilities Ready to Lead
            </RevealText>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Hospitals */}
            <div className="group">
              <div className="relative">
                <svg viewBox="0 0 100 100" className="w-full max-w-sm mx-auto h-auto">
                  <defs>
                    <clipPath id="hexClipHosp">
                      <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" />
                    </clipPath>
                    <filter id="glowHosp">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" fill="#f3f4f6" />
                  <image 
                    href="/images/who-we-serve/hospital.png" 
                    x="7" y="2" width="86" height="96"
                    clipPath="url(#hexClipHosp)"
                    preserveAspectRatio="xMidYMid slice"
                    style={{ filter: 'grayscale(100%)' }}
                    className="group-hover:opacity-40"
                  />
                  <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" fill="black" clipPath="url(#hexClipHosp)" className="opacity-0 group-hover:opacity-60" />
                  <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" fill="none" stroke="#42A5B3" strokeWidth="0.8" filter="url(#glowHosp)" />
                  <foreignObject x="15" y="25" width="70" height="50" clipPath="url(#hexClipHosp)">
                    <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <p className="text-white text-center font-light" style={{ fontSize: '5px', lineHeight: '1.4', textShadow: '0 1px 4px rgba(0,0,0,0.9)', padding: '0 2px' }}>
                        From community hospitals to large health systems — we bring structured regional anesthesia programs to facilities of all sizes.
                      </p>
                    </div>
                  </foreignObject>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 text-center">Hospitals</h3>
              <p className="text-gray-600 text-center font-light text-sm mt-2 normal-case tracking-normal">Expanding or standardizing existing regional programs</p>
            </div>

            {/* Surgery Centers */}
            <div className="group">
              <div className="relative">
                <svg viewBox="0 0 100 100" className="w-full max-w-sm mx-auto h-auto">
                  <defs>
                    <clipPath id="hexClipSurg">
                      <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" />
                    </clipPath>
                    <filter id="glowSurg">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" fill="#f3f4f6" />
                  <image 
                    href="/images/who-we-serve/surgery.png" 
                    x="7" y="2" width="86" height="96"
                    clipPath="url(#hexClipSurg)"
                    preserveAspectRatio="xMidYMid slice"
                    style={{ filter: 'grayscale(100%)' }}
                    className="group-hover:opacity-40"
                  />
                  <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" fill="black" clipPath="url(#hexClipSurg)" className="opacity-0 group-hover:opacity-60" />
                  <path d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z" fill="none" stroke="#42A5B3" strokeWidth="0.8" filter="url(#glowSurg)" />
                  <foreignObject x="15" y="25" width="70" height="50" clipPath="url(#hexClipSurg)">
                    <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <p className="text-white text-center font-light" style={{ fontSize: '5px', lineHeight: '1.4', textShadow: '0 1px 4px rgba(0,0,0,0.9)', padding: '0 2px' }}>
                        Customized regional anesthesia solutions for ambulatory surgery centers looking to reduce opioids, accelerate recovery, and improve throughput.
                      </p>
                    </div>
                  </foreignObject>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 text-center">Surgery Centers</h3>
              <p className="text-gray-600 text-center font-light text-sm mt-2 normal-case tracking-normal">Building new regional capabilities from the ground up</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TEAM
      ═══════════════════════════════════════════════ */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-18">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
              Our Team
            </div>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built by Clinicians, for Clinicians
            </RevealText>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 text-center hover:shadow-xl transition">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full mx-auto mb-4" style={{ filter: 'grayscale(100%)' }}></div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary font-bold uppercase tracking-wider text-xs mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 font-light normal-case tracking-normal">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CREDIBILITY BAR
      ═══════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            <div className="flex items-center gap-2 text-gray-500">
              <Shield size={20} className="text-primary" />
              <span className="text-sm font-bold uppercase tracking-wider">Evidence-Based Protocols</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <BookOpen size={20} className="text-primary" />
              <span className="text-sm font-bold uppercase tracking-wider">ASRA & ASA Aligned</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Shield size={20} className="text-primary" />
              <span className="text-sm font-bold uppercase tracking-wider">No HIPAA Exposure</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <RevealText as="h2" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </RevealText>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition"
                >
                  <span className="text-sm sm:text-base font-bold text-gray-900 pr-4 normal-case tracking-normal">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-sm sm:text-base text-gray-600 font-light normal-case tracking-normal leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CONTACT / CTA
      ═══════════════════════════════════════════════ */}
      <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — CTA Copy */}
            <div>
              <div className="inline-block px-4 py-1.5 bg-white/10 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
                Get Started
              </div>
              <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to See What Regional Can Do for Your Facility?
              </RevealText>
              <p className="text-gray-400 font-light text-base sm:text-lg mb-8 normal-case tracking-normal leading-relaxed">
                Schedule a free, no-obligation assessment. We'll evaluate your current program, identify the opportunity, and show you exactly what a structured regional anesthesia system looks like — before any commitment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                  <span className="text-gray-300 font-light normal-case tracking-normal">Comprehensive program assessment — 100% free</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                  <span className="text-gray-300 font-light normal-case tracking-normal">Clear ROI projections for your specific facility</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                  <span className="text-gray-300 font-light normal-case tracking-normal">Custom implementation plan with transparent pricing</span>
                </div>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Schedule Your Free Assessment</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-light text-sm normal-case tracking-normal"
                  />
                  <input
                    type="text"
                    placeholder="Title / Role"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-light text-sm normal-case tracking-normal"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-light text-sm normal-case tracking-normal"
                />
                <input
                  type="text"
                  placeholder="Facility Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-light text-sm normal-case tracking-normal"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-light text-sm text-gray-500 normal-case tracking-normal bg-white">
                  <option value="">Facility Type</option>
                  <option value="hospital">Hospital</option>
                  <option value="asc">Ambulatory Surgery Center</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="Tell us about your current anesthesia program and goals (optional)"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary font-light text-sm normal-case tracking-normal"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3.5 rounded-lg hover:bg-gray-800 transition font-bold text-sm shadow-lg"
                >
                  Request Free Assessment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer className="bg-black text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <img src="/logo-192.png" alt="Block Ops" className="w-8 h-8" />
              <span className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">Block Ops</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              <a href="#approach" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Approach</a>
              <a href="#results" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Results</a>
              <a href="#who-we-serve" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Who We Serve</a>
              <a href="#about" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Team</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Contact</a>
              <Link to="/blog" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Blog</Link>
              <Link to="/login" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Client Login</Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 font-light text-xs sm:text-sm normal-case tracking-normal">
              &copy; {new Date().getFullYear()} Block Ops. All rights reserved.
            </p>
            <p className="text-gray-600 font-light text-xs normal-case tracking-normal">
              Kansas City, KS &middot; info@blockops.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
