import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

const CTA = () => {
  const { setShowLogin } = useModal();

  return (
    <section className="py-20 bg-gradient-to-br from-[#F7AE21] via-[#FF8C42] to-[#F7AE21] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#1A2533] rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-[#1A2533] rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-[#1A2533] rounded-full"></div>
        <div className="absolute bottom-10 right-40 w-24 h-24 border-2 border-[#1A2533] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#1A2533] text-[#F7AE21] px-6 py-3 rounded-full font-semibold">
            <Star size={20} />
            <span>Join 10,000+ Happy Students</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-[#1A2533] leading-tight">
            Start Filling Smarter —{' '}
            <span className="relative">
              It's 100% Free!
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#1A2533] transform rotate-1"></div>
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-xl text-[#1A2533] max-w-2xl mx-auto leading-relaxed opacity-90">
            Join thousands of students who have already simplified their exam journey. 
            No credit card required, no hidden fees.
          </p>

          {/* CTAs */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <button 
              onClick={() => setShowLogin(true)}
              className="w-full sm:w-auto bg-[#1A2533] text-[#F7AE21] px-10 py-5 rounded-xl font-bold text-xl hover:bg-[#2A3441] transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 flex items-center justify-center space-x-3 group"
            >
              <span>Create Free Account</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button className="w-full sm:w-auto border-3 border-[#1A2533] text-[#1A2533] px-10 py-5 rounded-xl font-bold text-xl hover:bg-[#1A2533] hover:text-[#F7AE21] transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 flex items-center justify-center space-x-3">
              <Play size={24} />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Demo Preview Placeholder */}
          <div className="mt-12">
            <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-500">
              <div className="bg-gradient-to-br from-[#1A2533] to-[#2A3441] rounded-lg p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#F7AE21] rounded-full flex items-center justify-center mx-auto">
                    <Play size={32} className="text-[#1A2533]" />
                  </div>
                  <h4 className="text-lg font-semibold">2-Minute Demo Video</h4>
                  <p className="text-gray-300 text-sm">See how easy it is to get started</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center space-x-8 mt-12 text-[#1A2533] opacity-75">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#09BFA5] rounded-full"></div>
              <span className="text-sm font-medium">No Setup Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#09BFA5] rounded-full"></div>
              <span className="text-sm font-medium">Bank-Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#09BFA5] rounded-full"></div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;