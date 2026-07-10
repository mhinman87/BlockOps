import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock } from 'lucide-react';
import MarketingNav from '../components/MarketingNav';
import BookingWidget from '../components/scheduler/BookingWidget';

export const ContactPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* ── Nav (shared) ────────────────────────────── */}
      <MarketingNav />

      {/* ── Hero band (light) ───────────────────────── */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary font-bold uppercase tracking-[0.12em] text-xs sm:text-sm mb-4">Contact</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 uppercase tracking-tight mb-5">Let's Talk</h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 font-light leading-relaxed normal-case tracking-normal">
            Tell us about your facility and where you want your regional anesthesia program to go. We'll get back to you within one business day.
          </p>
        </div>
      </section>

      {/* ── Book a call (scheduler widget) ──────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-xl mx-auto text-center mb-8">
          <p className="text-primary font-bold uppercase tracking-[0.12em] text-xs sm:text-sm mb-3">Book a Call</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">Schedule a Discovery Call</h2>
          <p className="max-w-lg mx-auto text-base text-gray-600 font-light leading-relaxed normal-case tracking-normal">
            Pick a time that works for you — 30 minutes, no pitch deck, just a real conversation about your program.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <BookingWidget />
        </div>
      </section>

      {/* ── Contact info ────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mb-6">Get in Touch</h2>
          <p className="max-w-2xl mx-auto text-gray-600 font-light leading-relaxed normal-case tracking-normal mb-10">
            Whether you're standardizing an existing program or building one from the ground up, we're here to help — starting with a free, no-obligation assessment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                <a href="mailto:support@blockops.consulting" className="text-gray-900 font-semibold hover:text-primary transition normal-case tracking-normal">support@blockops.consulting</a>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Location</p>
                <p className="text-gray-900 font-semibold normal-case tracking-normal">Kansas City, KS</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Response Time</p>
                <p className="text-gray-900 font-semibold normal-case tracking-normal">Within one business day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="bg-black text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo-192.png" alt="Block Ops" className="w-8 h-8" />
              <span className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">Block Ops</span>
            </Link>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              <a href="/#approach" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Approach</a>
              <a href="/#results" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Results</a>
              <Link to="/company" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Company</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Contact</Link>
              <Link to="/blog" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Blog</Link>
              <Link to="/login" className="text-gray-400 hover:text-white transition font-semibold uppercase tracking-wide text-xs sm:text-sm">Client Login</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 font-light text-xs sm:text-sm normal-case tracking-normal">
              &copy; {new Date().getFullYear()} Block Ops. All rights reserved.
            </p>
            <p className="text-gray-600 font-light text-xs normal-case tracking-normal">
              Kansas City, KS &middot; support@blockops.consulting
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
