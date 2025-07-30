import React from 'react';
import { AlertTriangle, Calendar, FileX, TrendingDown, CheckCircle, Shield, Zap, Bell } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    {
      icon: <FileX className="w-8 h-8 text-red-500" />,
      title: "Manual Form-Filling",
      description: "Repetitive data entry for every exam application"
    },
    {
      icon: <Calendar className="w-8 h-8 text-red-500" />,
      title: "Missed Deadlines",
      description: "No proper tracking system for exam dates"
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-red-500" />,
      title: "Document Mess",
      description: "Scattered files across multiple devices"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      title: "No Tracking",
      description: "Unable to monitor application status"
    }
  ];

  const solutions = [
    {
      icon: <CheckCircle className="w-8 h-8 text-[#09BFA5]" />,
      title: "One-Time Profile",
      description: "Set up once, use for all applications"
    },
    {
      icon: <Zap className="w-8 h-8 text-[#09BFA5]" />,
      title: "AI-Assisted Autofill",
      description: "Smart form completion in seconds"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#09BFA5]" />,
      title: "Secure Doc Vault",
      description: "Bank-grade security for all documents"
    },
    {
      icon: <Bell className="w-8 h-8 text-[#09BFA5]" />,
      title: "Exam Alerts",
      description: "Never miss important deadlines again"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2533] mb-6">
            From Problem to Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the challenges students face and have built the perfect solution
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Problems */}
          <div className="bg-[#FFF2E0] rounded-2xl p-8 lg:p-12">
            <div className="flex items-center mb-8">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
              <h3 className="text-3xl font-bold text-[#1A2533]">The Problems</h3>
            </div>
            
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex-shrink-0">
                    {problem.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1A2533] mb-2">
                      {problem.title}
                    </h4>
                    <p className="text-gray-600">
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="bg-[#E6FCF7] rounded-2xl p-8 lg:p-12">
            <div className="flex items-center mb-8">
              <CheckCircle className="w-8 h-8 text-[#09BFA5] mr-3" />
              <h3 className="text-3xl font-bold text-[#1A2533]">Our Solutions</h3>
            </div>
            
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex-shrink-0">
                    {solution.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1A2533] mb-2">
                      {solution.title}
                    </h4>
                    <p className="text-gray-600">
                      {solution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;