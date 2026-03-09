import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User, ChevronLeft } from 'lucide-react';

const blogPosts = [
  {
    slug: 'future-of-regional-anesthesia-in-ambulatory-surgery',
    title: 'The Future of Regional Anesthesia in Ambulatory Surgery',
    excerpt: 'As ambulatory surgery centers continue to grow, regional anesthesia is becoming the cornerstone of modern perioperative care. Here\'s why the shift is accelerating — and what it means for your facility.',
    author: 'Samir Bhakta, MD',
    date: 'March 7, 2026',
    readTime: '6 min read',
    category: 'Industry Trends',
    featured: true,
  },
  {
    slug: 'reducing-opioid-dependence-with-nerve-blocks',
    title: 'Reducing Opioid Dependence: How Nerve Blocks Are Changing Post-Op Recovery',
    excerpt: 'The opioid crisis has forced healthcare to rethink pain management. Regional anesthesia offers a proven, evidence-based alternative that improves outcomes and reduces risk.',
    author: 'Samir Bhakta, MD',
    date: 'Coming Soon',
    readTime: '5 min read',
    category: 'Patient Safety',
    featured: false,
  },
  {
    slug: 'building-a-block-program-from-scratch',
    title: 'Building a Regional Anesthesia Program From Scratch: A Practical Guide',
    excerpt: 'Starting a regional anesthesia program can feel overwhelming. We break down the essential steps — from infrastructure to training to your first 100 blocks.',
    author: 'Block Ops Team',
    date: 'Coming Soon',
    readTime: '8 min read',
    category: 'Implementation',
    featured: false,
  },
];

export const BlogPage = () => {
  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured);

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo-192.png" alt="Block Ops" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">Block Ops</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm">Home</Link>
              <Link to="/blog" className="text-primary font-bold uppercase tracking-wide text-sm">Blog</Link>
              <Link to="/login" className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm">Client Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-white/10 text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full mb-6">
            Insights & Innovation
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
            The Block Ops Blog
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-light normal-case tracking-normal">
            Expert perspectives on regional anesthesia, medical innovation, and building world-class perioperative programs.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition group">
              <div className="p-8 sm:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-primary/10 text-primary font-bold uppercase tracking-wider text-xs rounded-full">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-gray-200 text-gray-600 font-bold uppercase tracking-wider text-xs rounded-full">
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-primary transition">
                  <Link to={`/blog/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-gray-600 font-light text-base sm:text-lg mb-6 normal-case tracking-normal leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5 font-light normal-case tracking-normal">
                    <User size={14} /> {featured.author}
                  </span>
                  <span className="flex items-center gap-1.5 font-light normal-case tracking-normal">
                    <Calendar size={14} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-light normal-case tracking-normal">
                    <Clock size={14} /> {featured.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 mt-6 text-primary font-bold uppercase tracking-wide text-sm hover:gap-3 transition-all"
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {rest.map((post, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-lg hover:border-primary/30 transition">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 font-bold uppercase tracking-wider text-xs rounded-full">
                  {post.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-4 mb-3">{post.title}</h3>
                <p className="text-gray-600 font-light text-sm normal-case tracking-normal mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-light normal-case tracking-normal">
                    <User size={12} /> {post.author}
                  </span>
                  <span className="flex items-center gap-1 font-light normal-case tracking-normal">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Anesthesia Program?
          </h2>
          <p className="text-gray-400 font-light mb-8 normal-case tracking-normal">
            See how Block Ops can bring evidence-based regional anesthesia to your facility.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm"
          >
            Schedule Free Assessment <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo-192.png" alt="Block Ops" className="w-8 h-8" />
            <span className="text-xl font-black uppercase tracking-wide">Block Ops</span>
          </div>
          <p className="text-gray-500 font-light text-xs normal-case tracking-normal">
            &copy; {new Date().getFullYear()} Block Ops. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
