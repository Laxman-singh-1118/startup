import React from 'react';
import { Zap, Shield, Calendar, Bell, Smartphone, Lock, BarChart3, FileText, Users, AlertCircle, Settings, Eye } from 'lucide-react';

const Features = () => {
  const studentFeatures = [
    {
      icon: <Zap className="w-8 h-8 text-[#F7AE21]" />,
      title: "Smart Form Autofill",
      description: "AI-powered form completion saves hours of manual entry"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#F7AE21]" />,
      title: "Document Vault",
      description: "Secure cloud storage for all your important documents"
    },
    {
      icon: <Calendar className="w-8 h-8 text-[#F7AE21]" />,
      title: "Multi-Exam Support",
      description: "Apply to SSC, Banking, Railway, and other government exams"
    },
    {
      icon: <Bell className="w-8 h-8 text-[#F7AE21]" />,
      title: "Deadline Alerts",
      description: "Never miss application deadlines with smart notifications"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#F7AE21]" />,
      title: "PWA Ready",
      description: "Works offline and installs like a native mobile app"
    },
    {
      icon: <Lock className="w-8 h-8 text-[#F7AE21]" />,
      title: "Bank-Grade Security",
      description: "256-bit encryption ensures your data stays protected"
    }
  ];

  const adminFeatures = [
    {
      icon: <BarChart3 className="w-8 h-8 text-[#09BFA5]" />,
      title: "Dashboard Access",
      description: "Comprehensive analytics and student management interface"
    },
    {
      icon: <FileText className="w-8 h-8 text-[#09BFA5]" />,
      title: "Form Templates",
      description: "Pre-built templates for different exam categories"
    },
    {
      icon: <Eye className="w-8 h-8 text-[#09BFA5]" />,
      title: "Status Tracking",
      description: "Real-time monitoring of application submissions"
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-[#09BFA5]" />,
      title: "Batch Notifications",
      description: "Send alerts to multiple students simultaneously"
    },
    {
      icon: <Users className="w-8 h-8 text-[#09BFA5]" />,
      title: "Batch Management",
      description: "Organize students into groups for better management"
    },
    {
      icon: <Settings className="w-8 h-8 text-[#09BFA5]" />,
      title: "Role-Based Access",
      description: "Different permission levels for team collaboration"
    }
  ];

  const FeatureCard = ({ feature, isStudent }: { feature: any, isStudent: boolean }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${
        isStudent ? 'bg-[#FFF8E7]' : 'bg-[#E6FCF7]'
      }`}>
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold text-[#1A2533] mb-3">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2533] mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline exam applications and document management
          </p>
        </div>

        {/* Student Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-[#F7AE21] text-[#1A2533] px-6 py-3 rounded-full font-semibold text-xl">
              <Zap size={24} />
              <span>Student Features</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} isStudent={true} />
            ))}
          </div>
        </div>

        {/* Admin Features */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-[#09BFA5] text-white px-6 py-3 rounded-full font-semibold text-xl">
              <Settings size={24} />
              <span>Admin Features</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} isStudent={false} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#1A2533] to-[#2A3441] p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience These Features?</h3>
            <p className="text-gray-300 mb-6">Join thousands of students who are already saving time and reducing stress</p>
            <button className="bg-[#F7AE21] text-[#1A2533] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF8C42] transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1">
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;