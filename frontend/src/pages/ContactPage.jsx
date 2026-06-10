import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, MapPin, Clock, CheckCircle, Loader2, ArrowRight } from 'lucide-react';

const LEAD_ENDPOINT = 'https://admin.blockops.consulting/api/inbound/website-lead';

export const ContactPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const emptyLead = {
    name: '', email: '', phone: '',
    facilityName: '', message: '',
    company_website: '', // honeypot — leave blank
  };
  const [lead, setLead] = useState(emptyLead);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  const onChange = (e) => setLead((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.email.trim() || !lead.message.trim()) {
      setError('Please enter your name, email, and a message.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed.');
      }
      setStatus('success');
      setLead(emptyLead);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const inputCls =
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-light text-sm normal-case tracking-normal transition';

  return (
    <div className="bg-white min-h-screen">
      {/* ── Nav ─────────────────────────────────────── */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo-192.png" alt="Block Ops" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">Block Ops</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <a href="/#approach" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">Approach</a>
              <a href="/#results" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">Results</a>
              <a href="/#who-we-serve" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">Who We Serve</a>
              <Link to="/company" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">Company</Link>
              <Link to="/contact" className="text-primary transition font-bold uppercase tracking-wide text-sm">Contact</Link>
              <Link to="/login" className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm">Client Login</Link>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700 hover:text-primary transition">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="/#approach" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Approach</a>
                <a href="/#results" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Results</a>
                <a href="/#who-we-serve" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Who We Serve</a>
                <Link to="/company" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Company</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-primary transition font-bold uppercase tracking-wide text-sm px-4 py-2">Contact</Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mx-4 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm text-center">Client Login</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

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

      {/* ── Content ─────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Left — info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mb-6">Get in Touch</h2>
            <p className="text-gray-600 font-light leading-relaxed normal-case tracking-normal mb-8">
              Whether you're standardizing an existing program or building one from the ground up, we're here to help — starting with a free, no-obligation assessment.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                  <a href="mailto:support@blockops.consulting" className="text-gray-900 font-semibold hover:text-primary transition normal-case tracking-normal">support@blockops.consulting</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Location</p>
                  <p className="text-gray-900 font-semibold normal-case tracking-normal">Kansas City, KS</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
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

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-2xl border border-gray-100">
              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent — thank you.</h3>
                  <p className="text-sm text-gray-600 font-light normal-case tracking-normal max-w-sm mx-auto">
                    We've received your message and a member of our team will reach out shortly. Check your inbox for a confirmation.
                  </p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={submit}>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
                  {/* Honeypot */}
                  <input
                    type="text" name="company_website" value={lead.company_website} onChange={onChange}
                    tabIndex={-1} autoComplete="off" aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="name" value={lead.name} onChange={onChange} placeholder="Your Name *" className={inputCls} />
                    <input type="email" name="email" value={lead.email} onChange={onChange} placeholder="Email Address *" className={inputCls} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="tel" name="phone" value={lead.phone} onChange={onChange} placeholder="Phone (optional)" className={inputCls} />
                    <input type="text" name="facilityName" value={lead.facilityName} onChange={onChange} placeholder="Facility Name (optional)" className={inputCls} />
                  </div>
                  <textarea name="message" value={lead.message} onChange={onChange} placeholder="How can we help? *" rows="5" className={inputCls}></textarea>
                  {status === 'error' && <p className="text-sm text-red-600 font-light">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-primary text-white py-3.5 rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : (<>Send Message <ArrowRight size={16} /></>)}
                  </button>
                </form>
              )}
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
