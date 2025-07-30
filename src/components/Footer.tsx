import React from 'react';
import { FileText, Facebook, Instagram, Linkedin, MessageCircle, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#features', label: 'Features' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <MessageCircle size={20} />, href: '#', label: 'Telegram' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#1A2533] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F7AE21] to-[#FF8C42] rounded-lg flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold">SARKARIFORMSETU</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              Simplifying competitive exam applications for Indian students through automation, 
              secure document storage, and smart deadline alerts.
            </p>
            
            <div className="flex items-center space-x-2 text-[#F7AE21]">
              <Mail size={16} />
              <span className="text-sm">support@sarkariformsetu.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#F7AE21] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect With Us</h3>
            <div className="flex space-x-3 mb-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-[#F7AE21] hover:text-[#1A2533] transition-all duration-200 transform hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="space-y-2 text-sm text-gray-300">
              <p>Join our community of</p>
              <p className="text-[#F7AE21] font-semibold">10,000+ students</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 SARKARIFORMSETU. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#privacy" className="text-gray-400 hover:text-[#F7AE21] transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-[#F7AE21] transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 bg-[#F7AE21] text-[#1A2533] rounded-lg flex items-center justify-center hover:bg-[#FF8C42] transition-all duration-200 transform hover:-translate-y-1"
                aria-label="Scroll to top"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#0F1419] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-500">
            SARKARIFORMSETU is an independent platform designed to assist students with exam applications. 
            We are not affiliated with any government organization or exam conducting body.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;