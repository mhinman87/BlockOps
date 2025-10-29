import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Stethoscope, Award } from 'lucide-react';

export const LandingPage = () => {
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
      icon: Award,
      title: 'Expert Guidance',
      description: 'Guidance from board-certified anesthesiologists.',
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-primary">Block Ops</div>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-6 py-2 text-gray-700 hover:text-primary transition"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Regional Anesthesiology <span className="text-primary">Consulting</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Expert consulting services from board-certified anesthesiologists specializing in regional methods. Elevate your practice with proven expertise.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition text-lg"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition"
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-primary rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">EMAIL</p>
                  <p className="text-gray-900 font-medium">info@blockops.com</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">PHONE</p>
                  <p className="text-gray-900 font-medium">(913) 555-0000</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">LOCATION</p>
                  <p className="text-gray-900 font-medium">Kansas City, KS</p>
                </div>
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2024 Block Ops. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
