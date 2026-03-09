import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

const posts = {
  'future-of-regional-anesthesia-in-ambulatory-surgery': {
    title: 'The Future of Regional Anesthesia in Ambulatory Surgery',
    author: 'Dr. Samir Bhakta',
    date: 'March 7, 2026',
    readTime: '6 min read',
    category: 'Industry Trends',
    content: `
The ambulatory surgery center (ASC) model is one of the fastest-growing segments in American healthcare. With more than 6,100 Medicare-certified ASCs operating nationwide, and hundreds more opening each year, the shift from hospital-based to outpatient surgical care is undeniable.

This growth creates a real challenge, though. How do you deliver high-quality anesthesia care in a setting designed for speed, efficiency, and same-day discharge?

The answer is increasingly clear: regional anesthesia.

## Why Regional Anesthesia Is the Future of ASC Care

### 1. The Opioid Equation

General anesthesia with opioid-based pain management has been the default for decades. The consequences are well-documented. Postoperative nausea, prolonged PACU stays, respiratory depression, and the ever-present risk of opioid dependence all come with the territory.

Regional anesthesia changes this completely. A well-placed nerve block can reduce opioid consumption by **40-60% in the first 24 hours** post-surgery. For an ASC performing 2,000+ orthopedic cases annually, that represents a meaningful shift in patient outcomes across the board.

### 2. PACU Throughput

Every minute a patient spends in the PACU costs your facility $30-50 in staffing and overhead. Patients who receive regional anesthesia consistently recover faster, with studies showing **30-45 minute reductions in PACU time** compared to general anesthesia alone.

For a busy ASC, this translates to:
- More cases per day without expanding physical space
- Reduced nursing overtime
- Higher patient satisfaction scores, since patients wake up comfortable instead of nauseated

### 3. The Revenue Opportunity

Regional anesthesia saves money, but it also generates revenue. Properly coded and billed nerve blocks generate **$200-800 per case in additional reimbursement** through CPT codes that many facilities currently leave on the table.

The math is straightforward. A facility performing 1,500 eligible cases per year with proper block billing can generate **$300K-$1.2M in additional annual revenue**, often exceeding the entire cost of implementing a regional program.

## What's Holding Facilities Back?

If the clinical and financial case is this strong, why isn't every ASC running a regional program?

Three barriers come up consistently:

**Lack of standardized protocols.** Without a structured system, block quality varies wildly between providers. One anesthesiologist may achieve 95% success rates while another struggles at 60%. Patients notice. Surgeons notice.

**Training gaps.** Many anesthesiologists completed residency with limited regional exposure. They're competent general practitioners but haven't developed the pattern recognition and technical skill that comes from performing hundreds of blocks under structured mentorship.

**Infrastructure deficits.** A successful regional program needs more than a willing provider and an ultrasound machine. It needs block bay design, safety protocols, nursing workflows, documentation templates, billing processes, and ongoing quality measurement.

## The System Approach

This is why we built Block Ops as a **system**, not a consultancy. A consultant tells you what to do. A system gives you everything you need to do it, and keeps working long after the consultant leaves.

Our six-pillar framework addresses every dimension of a regional anesthesia program:

1. **Clinical Architecture**: Evidence-based protocols aligned with ASRA and ASA guidelines
2. **Physical Operations**: Block bay design, workflow optimization, supply chain
3. **Digital Platform**: Dashboards, documentation templates, outcome tracking
4. **Human Capital**: Provider training, competency tiers, nursing education
5. **Stakeholder Integration**: Surgeon buy-in, patient education, care coordination
6. **Value Intelligence**: Billing optimization, ROI measurement, compliance

## Looking Ahead

The facilities that invest in regional anesthesia infrastructure today are positioning themselves for the next decade of ambulatory surgery. As payer models increasingly reward quality outcomes and reduced opioid use, having a structured, measurable regional program will move from competitive advantage to baseline requirement.

The real question isn't whether regional anesthesia belongs in your ASC. It's whether you have the system to deliver it consistently, safely, and profitably.

---

*Dr. Samir Bhakta is a board-certified anesthesiologist specializing in regional anesthesia techniques, with extensive experience building perioperative programs for ambulatory surgery centers and hospitals.*
    `,
  },
};

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = posts[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Simple markdown-ish renderer for the blog content
  const renderContent = (content) => {
    const lines = content.trim().split('\n');
    const elements = [];
    let i = 0;
    let listItems = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="space-y-2 my-6 ml-4">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700 font-light normal-case tracking-normal leading-relaxed">
                <span className="text-primary mt-1.5 text-xs">●</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const formatInline = (text) => {
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    };

    while (i < lines.length) {
      const line = lines[i];

      if (line.trim() === '') {
        flushList();
        i++;
        continue;
      }

      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={i} className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={i} className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.trim().startsWith('- ')) {
        listItems.push(line.trim().replace(/^- /, ''));
      } else if (line.trim().match(/^\d+\. /)) {
        listItems.push(line.trim().replace(/^\d+\. /, ''));
      } else if (line.trim() === '---') {
        flushList();
        elements.push(<hr key={i} className="my-10 border-gray-200" />);
      } else {
        flushList();
        elements.push(
          <p
            key={i}
            className="text-gray-700 font-light text-base sm:text-lg leading-relaxed my-4 normal-case tracking-normal"
            dangerouslySetInnerHTML={{ __html: formatInline(line) }}
          />
        );
      }
      i++;
    }
    flushList();
    return elements;
  };

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

      {/* Article Header */}
      <section className="pt-28 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition font-bold uppercase tracking-wide text-xs mb-8"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 bg-white/10 text-primary font-bold uppercase tracking-wider text-xs rounded-full mb-6">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5 font-light normal-case tracking-normal">
              <User size={14} /> {post.author}
            </span>
            <span className="flex items-center gap-1.5 font-light normal-case tracking-normal">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 font-light normal-case tracking-normal">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {renderContent(post.content)}
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Want to Build a Regional Program?
          </h2>
          <p className="text-gray-600 font-light mb-8 normal-case tracking-normal">
            Schedule a free assessment and see what Block Ops can do for your facility.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-bold uppercase tracking-wide text-sm"
          >
            Get Started
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
