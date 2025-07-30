import React from 'react';
import { UserPlus, Upload, Lightbulb, MousePointer, Bell, Settings, Users, AlertCircle, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const studentSteps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "Create Profile",
      description: "Set up your account with basic information"
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Docs Once",
      description: "Securely store all your documents in one place"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Auto Exam Suggestions",
      description: "Get personalized exam recommendations"
    },
    {
      icon: <MousePointer className="w-8 h-8" />,
      title: "One-Click Submission",
      description: "Apply to multiple exams with a single click"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Get Notified",
      description: "Receive alerts for deadlines and updates"
    }
  ];

  const adminSteps = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Login",
      description: "Access your admin dashboard securely"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Add/View Students",
      description: "Manage student profiles and information"
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Push Alerts",
      description: "Send notifications to students instantly"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Track Submissions",
      description: "Monitor application status and analytics"
    }
  ];

  const StepCard = ({ step, index, isStudent }: { step: any, index: number, isStudent: boolean }) => (
    <div className={`relative p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
      isStudent 
        ? (index % 2 === 0 ? 'bg-[#F7AE21] text-[#1A2533]' : 'bg-white text-[#1A2533] border-2 border-[#F7AE21]')
        : (index % 2 === 0 ? 'bg-[#09BFA5] text-white' : 'bg-white text-[#1A2533] border-2 border-[#09BFA5]')
    }`}>
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4 mx-auto">
        {step.icon}
      </div>
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#FF8C42] text-white rounded-full flex items-center justify-center font-bold text-sm">
        {index + 1}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
      <p className="text-center text-sm opacity-90">{step.description}</p>
    </div>
  );

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2533] mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps for students and powerful tools for administrators
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Students Flow */}
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-[#F7AE21] text-[#1A2533] px-6 py-3 rounded-full font-semibold text-lg">
                <UserPlus size={24} />
                <span>For Students</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {studentSteps.map((step, index) => (
                <StepCard key={index} step={step} index={index} isStudent={true} />
              ))}
            </div>
          </div>

          {/* Admins Flow */}
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-[#09BFA5] text-white px-6 py-3 rounded-full font-semibold text-lg">
                <Settings size={24} />
                <span>For Admins</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {adminSteps.map((step, index) => (
                <StepCard key={index} step={step} index={index} isStudent={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-[#1A2533] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#2A3441] transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;