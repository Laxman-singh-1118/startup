import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';
import Login from './Login';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const { showLogin, setShowLogin } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#features', label: 'Features' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F7AE21] to-[#FF8C42] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1A2533]">SARKARIFORMSETU</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#1A2533] hover:text-[#F7AE21] transition-colors duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
              
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-[#1A2533]">
                    <div className="w-8 h-8 bg-[#F7AE21] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">
                      {currentUser.displayName?.split(' ')[0] || 'User'}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-[#1A2533] hover:text-red-600 transition-colors duration-200"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-[#F7AE21] text-[#1A2533] px-6 py-2 rounded-lg font-semibold hover:bg-[#FF8C42] transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Login / Sign Up
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#1A2533]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[#1A2533] hover:text-[#F7AE21] transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              {currentUser ? (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-[#1A2533]">
                    <div className="w-8 h-8 bg-[#F7AE21] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">
                      {currentUser.displayName || currentUser.email}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200 py-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setShowLogin(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-[#F7AE21] text-[#1A2533] px-6 py-3 rounded-lg font-semibold hover:bg-[#FF8C42] transition-colors duration-200"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky CTA */}
      {!currentUser && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 p-4">
          <button 
            onClick={() => setShowLogin(true)}
            className="w-full bg-[#F7AE21] text-[#1A2533] py-3 rounded-lg font-semibold hover:bg-[#FF8C42] transition-colors duration-200 shadow-lg"
          >
            Login / Sign Up
          </button>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} />
      )}
    </>
  );
};

export default Header;