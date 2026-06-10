import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Shared marketing nav for the public site (landing, contact, etc.) so the
// pages can't drift. Anchor links use /# so they work from any page.
const LINK = 'text-primary hover:opacity-70 transition font-bold uppercase tracking-wide text-sm';

export default function MarketingNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-192.png" alt="Block Ops" className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">Block Ops</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/#approach" className={LINK}>Approach</a>
            <a href="/#results" className={LINK}>Results</a>
            <a href="/#who-we-serve" className={LINK}>Who We Serve</a>
            <a href="/#about" className={LINK}>About</a>
            <Link to="/blog" className={LINK}>Blog</Link>
            <Link to="/contact" className={LINK}>Contact</Link>
            <Link to="/login" className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm">Client Login</Link>
            <a href="/#contact" className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-bold uppercase tracking-wide text-sm">Free Consultation</a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-700 hover:text-primary transition">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="/#approach" onClick={() => setOpen(false)} className={`${LINK} px-4 py-2`}>Approach</a>
              <a href="/#results" onClick={() => setOpen(false)} className={`${LINK} px-4 py-2`}>Results</a>
              <a href="/#who-we-serve" onClick={() => setOpen(false)} className={`${LINK} px-4 py-2`}>Who We Serve</a>
              <a href="/#about" onClick={() => setOpen(false)} className={`${LINK} px-4 py-2`}>About</a>
              <Link to="/blog" onClick={() => setOpen(false)} className={`${LINK} px-4 py-2`}>Blog</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className={`${LINK} px-4 py-2`}>Contact</Link>
              <Link to="/login" onClick={() => setOpen(false)} className="mx-4 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm text-center">Client Login</Link>
              <a href="/#contact" onClick={() => setOpen(false)} className="mx-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-bold uppercase tracking-wide text-sm text-center">Free Consultation</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
