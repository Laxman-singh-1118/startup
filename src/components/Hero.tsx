import React from 'react';
import { ArrowRight, Play, Shield, Bell, FileText, User } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

const Hero = () => {
  const { setShowLogin } = useModal();

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-[#1A2533] via-[#2A3441] to-[#1A2533] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-[#F7AE21] rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-[#09BFA5] rounded-lg rotate-45"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-[#FF8C42] rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 border-2 border-[#E1DBCD] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Never Miss an{' '}
                <span className="text-[#F7AE21]">Exam Opportunity</span>{' '}
                Again!
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                One Profile, Endless Possibilities — Simplify Your Competitive Exam Registrations with Our Secure, Intelligent Auto Form-Filling App.
              </p>
              
              <div className="bg-[#F7AE21] text-[#1A2533] px-6 py-3 rounded-lg inline-block font-bold text-lg">
                NO TENSION BAS FORM SUBMISSION
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              <button 
                onClick={() => setShowLogin(true)}
                className="w-full sm:w-auto bg-[#F7AE21] text-[#1A2533] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF8C42] transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight size={20} />
              </button>
              
              <button className="w-full sm:w-auto border-2 border-[#F7AE21] text-[#F7AE21] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#F7AE21] hover:text-[#1A2533] transition-all duration-200 flex items-center justify-center space-x-2">
                <Play size={20} />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Trust Line */}
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-[#F7AE21] to-[#FF8C42] rounded-full border-2 border-white flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                ))}
              </div>
              <span className="text-sm">
                Trusted by thousands of students and coaching centers across India.
              </span>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-[#1A2533] to-[#2A3441] rounded-lg p-6 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold">Student Dashboard</h3>
                  <div className="space-y-3">
                    <div className="bg-[#F7AE21] bg-opacity-20 p-3 rounded-lg flex items-center space-x-3">
                      <FileText className="text-[#F7AE21]" size={20} />
                      <span>Profile Complete</span>
                    </div>
                    <div className="bg-[#09BFA5] bg-opacity-20 p-3 rounded-lg flex items-center space-x-3">
                      <Shield className="text-[#09BFA5]" size={20} />
                      <span>Documents Secured</span>
                    </div>
                    <div className="bg-[#FF8C42] bg-opacity-20 p-3 rounded-lg flex items-center space-x-3">
                      <Bell className="text-[#FF8C42]" size={20} />
                      <span>3 New Exam Alerts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#09BFA5] rounded-lg flex items-center justify-center shadow-lg animate-bounce">
              <FileText className="text-white" size={24} />
            </div>
            <div className="absolute -top-2 -right-6 w-10 h-10 bg-[#FF8C42] rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Bell className="text-white" size={20} />
            </div>
            <div className="absolute -bottom-6 -left-2 w-14 h-14 bg-[#F7AE21] rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
              <Shield className="text-white" size={28} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;