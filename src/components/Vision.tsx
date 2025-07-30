import React from 'react';
import { Target, Users, Shield, Rocket } from 'lucide-react';

const Vision = () => {
  const visionPoints = [
    {
      icon: <Users className="w-8 h-8 text-[#F7AE21]" />,
      title: "Empower Exam Aspirants",
      description: "Make competitive exam preparation accessible and stress-free for every student"
    },
    {
      icon: <Target className="w-8 h-8 text-[#09BFA5]" />,
      title: "Create Centralized Form Ecosystem",
      description: "Build a unified platform for all government exam applications across India"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#FF8C42]" />,
      title: "Ensure Data Privacy",
      description: "Maintain the highest standards of security and privacy for student information"
    },
    {
      icon: <Rocket className="w-8 h-8 text-[#1A2533]" />,
      title: "Scale to Full Automation",
      description: "Achieve complete automation of the exam application process nationwide"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1A2533] mb-6 leading-tight">
                Our Mission Is To Reduce Student Stress,{' '}
                <span className="text-[#F7AE21]">One Form at a Time</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                SARKARIFORMSETU is designed for students preparing for SSC, banking, railway, and other exams. 
                We remove the stress of repeated form-filling and document juggling by making the process secure, 
                fast, and automatic.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform empowers millions of Indian students to focus on what matters most - their preparation - 
                while we handle the administrative complexity of exam applications.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-[#F7AE21] text-[#1A2533] px-6 py-2 rounded-full font-semibold">
                10,000+ Students
              </div>
              <div className="bg-[#09BFA5] text-white px-6 py-2 rounded-full font-semibold">
                500+ Coaching Centers
              </div>
            </div>
          </div>

          {/* Right Content - Vision Points */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#1A2533] mb-8">Our Vision</h3>
            
            {visionPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
                  {point.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1A2533] mb-2">
                    {point.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-[#1A2533] to-[#2A3441] rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Making a Real Impact</h3>
            <p className="text-gray-300 text-lg">See how we're transforming the exam application experience</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#F7AE21] mb-2">10,000+</div>
              <div className="text-gray-300">Students Registered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#09BFA5] mb-2">50,000+</div>
              <div className="text-gray-300">Forms Submitted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF8C42] mb-2">95%</div>
              <div className="text-gray-300">Time Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#E1DBCD] mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;