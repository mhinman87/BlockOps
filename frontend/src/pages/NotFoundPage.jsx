import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo-192.png" alt="Block Ops" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">Block Ops</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-lg">
          {/* Hexagon with 404 */}
          <div className="mb-8 flex justify-center">
            <svg width="160" height="160" viewBox="0 0 100 100">
              <path
                d="M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z"
                fill="none"
                stroke="#42A5B3"
                strokeWidth="1.5"
                opacity="0.3"
              />
              <path
                d="M50 12 L83 32 L83 68 L50 88 L17 68 L17 32 Z"
                fill="none"
                stroke="#42A5B3"
                strokeWidth="1"
                opacity="0.15"
              />
              <text
                x="50"
                y="48"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#42A5B3"
                fontSize="22"
                fontWeight="900"
                fontFamily="Montserrat, sans-serif"
              >
                404
              </text>
              <text
                x="50"
                y="64"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#9CA3AF"
                fontSize="6"
                fontWeight="300"
                fontFamily="Montserrat, sans-serif"
                letterSpacing="0.15em"
              >
                PAGE NOT FOUND
              </text>
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            This page doesn't exist
          </h1>
          <p className="text-gray-400 font-light text-base sm:text-lg mb-10 normal-case tracking-normal leading-relaxed">
            The page you're looking for may have been moved or removed. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm"
            >
              <Home size={18} />
              Go Home
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition font-bold uppercase tracking-wide text-sm border border-white/20"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-center">
          <p className="text-gray-600 font-light text-xs normal-case tracking-normal">
            &copy; {new Date().getFullYear()} Block Ops. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
