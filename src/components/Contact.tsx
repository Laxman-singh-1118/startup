import React, { useState } from 'react';
import { Mail, MessageCircle, Send, MapPin, Phone, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="w-8 h-8 text-[#F7AE21]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2533] mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We're here to help you succeed in your exam journey
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1A2533] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7AE21] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1A2533] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7AE21] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1A2533] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7AE21] focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F7AE21] text-[#1A2533] py-4 rounded-lg font-semibold text-lg hover:bg-[#FF8C42] transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#1A2533] to-[#2A3441] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#F7AE21] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#1A2533]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Support</h4>
                    <p className="text-gray-300">support@sarkariformsetu.in</p>
                    <p className="text-sm text-gray-400 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#09BFA5] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone Support</h4>
                    <p className="text-gray-300">+91 XXXX-XXXXX</p>
                    <p className="text-sm text-gray-400 mt-1">Monday to Friday, 9 AM - 6 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FF8C42] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Business Hours</h4>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-sm text-gray-400 mt-1">IST (Indian Standard Time)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#1A2533] mb-6">Quick Questions?</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#1A2533] mb-2">Is it really free?</h4>
                  <p className="text-gray-600 text-sm">Yes! Our basic features are completely free with no hidden charges.</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#1A2533] mb-2">How secure is my data?</h4>
                  <p className="text-gray-600 text-sm">We use bank-grade 256-bit encryption to protect all your documents and personal information.</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#1A2533] mb-2">Which exams are supported?</h4>
                  <p className="text-gray-600 text-sm">We support SSC, Banking, Railway, UPSC, and many other government exam applications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Links */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-gray-600">
            <a href="#privacy" className="hover:text-[#F7AE21] transition-colors duration-200 font-medium">
              Privacy Policy
            </a>
            <span className="text-gray-400">|</span>
            <a href="#terms" className="hover:text-[#F7AE21] transition-colors duration-200 font-medium">
              Terms of Use
            </a>
            <span className="text-gray-400">|</span>
            <a href="#support" className="hover:text-[#F7AE21] transition-colors duration-200 font-medium">
              Support Center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;