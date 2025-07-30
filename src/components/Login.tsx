import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase/config';
import { updateProfile } from 'firebase/auth';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, GraduationCap, Shield, X } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState<'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // For login, check if the user has the correct role
        await login(email, password);
        
        // Check if the logged-in user has the correct role
        const currentUser = auth.currentUser;
        if (currentUser?.displayName) {
          const userRoleFromName = currentUser.displayName.includes('(admin)') ? 'admin' : 'student';
          if (userRoleFromName !== userRole) {
            // User logged in but has different role than selected
            await logout();
            setError(`This account is registered as a ${userRoleFromName}, not ${userRole}. Please select the correct account type.`);
            setLoading(false);
            return;
          }
        } else {
          // For existing accounts without role, they can only be students
          if (userRole === 'admin') {
            await logout();
            setError('This account is not registered as an admin. Only users explicitly registered as admins can access admin features.');
            setLoading(false);
            return;
          }
        }
        
        onClose(); // Close modal after successful login
      } else {
        // Add role to display name for signup
        const fullDisplayName = `${displayName} (${userRole})`;
        await signup(email, password, fullDisplayName);
        onClose(); // Close modal after successful signup
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600">
            {isLogin 
              ? 'Sign in to your exam platform account' 
              : 'Join thousands of students using our platform'
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
            <AlertCircle className="text-red-500" size={20} />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection - Show for both login and signup */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserRole('student')}
                className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-all ${
                  userRole === 'student'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <GraduationCap size={24} />
                <span className="font-medium">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setUserRole('admin')}
                className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-all ${
                  userRole === 'admin'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Shield size={24} />
                <span className="font-medium">Admin</span>
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed ${
              userRole === 'admin' 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setDisplayName('');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'
            }
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 