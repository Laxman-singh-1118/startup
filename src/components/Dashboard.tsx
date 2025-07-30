import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  Plus, 
  Calendar, 
  CheckCircle, 
  Clock,
  AlertCircle,
  GraduationCap,
  Shield,
  Users,
  BarChart3,
  Eye
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser, logout, getAllUsers } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [realUsers, setRealUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Proper role detection logic - only based on Firebase data
  const getUserRole = () => {
    const displayName = currentUser?.displayName || '';
    const email = currentUser?.email || '';
    console.log('Display name for role detection:', displayName);
    console.log('Email for role detection:', email);
    
    // Check if display name contains role information
    if (displayName.includes('(admin)')) {
      console.log('Detected admin role from display name');
      return 'admin';
    }
    if (displayName.includes('(student)')) {
      console.log('Detected student role from display name');
      return 'student';
    }
    
    // For existing accounts without role in display name, default to student
    // Only users explicitly registered as admin can access admin features
    console.log('No role found, defaulting to student for security');
    return 'student';
  };

  const userRole = getUserRole();
  const displayName = currentUser?.displayName?.replace(/\s*\([^)]*\)/, '') || currentUser?.email;
  
  console.log('Current user role:', userRole);
  console.log('Display name:', displayName);

  // Security check: Ensure admin users can only access admin features
  const isAdmin = userRole === 'admin';
  
  // If user is not admin but trying to access admin tabs, redirect to overview
  React.useEffect(() => {
    if (!isAdmin && ['students', 'track-submissions', 'push-alerts'].includes(activeTab)) {
      setActiveTab('overview');
    }
  }, [isAdmin, activeTab]);

  // Fetch real users when admin accesses students tab
  React.useEffect(() => {
    if (isAdmin && activeTab === 'students') {
      fetchUsers();
    }
  }, [isAdmin, activeTab]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const users = await getAllUsers();
      setRealUsers(users);
      console.log('Real users loaded:', users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Security warning component
  const SecurityWarning = () => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2">
        <AlertCircle className="text-red-500" size={20} />
        <div>
          <h3 className="text-sm font-medium text-red-800">Access Restricted</h3>
          <p className="text-sm text-red-700">
            Only users registered as administrators can access admin features. 
            Please contact your system administrator if you need admin access.
          </p>
        </div>
      </div>
    </div>
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Student-specific data
  const studentApplications = [
    {
      id: 1,
      examName: 'SSC CGL 2024',
      status: 'Applied',
      deadline: '2024-03-15',
      appliedDate: '2024-02-20'
    },
    {
      id: 2,
      examName: 'IBPS PO 2024',
      status: 'Draft',
      deadline: '2024-04-10',
      appliedDate: null
    },
    {
      id: 3,
      examName: 'Railway NTPC',
      status: 'Applied',
      deadline: '2024-03-30',
      appliedDate: '2024-02-18'
    }
  ];

  // Admin-specific data
  const adminData = {
    totalStudents: 1250,
    activeApplications: 890,
    pendingReviews: 45,
    recentStudents: [
      { name: 'Rahul Kumar', email: 'rahul@example.com', joinedDate: '2024-02-20' },
      { name: 'Priya Sharma', email: 'priya@example.com', joinedDate: '2024-02-19' },
      { name: 'Amit Patel', email: 'amit@example.com', joinedDate: '2024-02-18' }
    ],
    allApplications: [
      { id: 1, studentName: 'Rahul Kumar', examName: 'SSC CGL 2024', status: 'Pending Review', submittedDate: '2024-02-20' },
      { id: 2, studentName: 'Priya Sharma', examName: 'IBPS PO 2024', status: 'Approved', submittedDate: '2024-02-19' },
      { id: 3, studentName: 'Amit Patel', examName: 'Railway NTPC', status: 'Pending Review', submittedDate: '2024-02-18' },
      { id: 4, studentName: 'Sneha Singh', examName: 'SSC CGL 2024', status: 'Rejected', submittedDate: '2024-02-17' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
      case 'Approved':
        return 'text-green-600 bg-green-100';
      case 'Draft':
        return 'text-yellow-600 bg-yellow-100';
      case 'Pending':
      case 'Pending Review':
        return 'text-blue-600 bg-blue-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const studentTabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'applications', label: 'My Applications', icon: Calendar },
    { id: 'upload-docs', label: 'Upload Documents', icon: User },
    { id: 'scanner', label: 'Scanner', icon: Eye },
    { id: 'exam-suggestions', label: 'Exam Suggestions', icon: CheckCircle },
    { id: 'one-click-submit', label: 'One-Click Submit', icon: Plus },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'applications', label: 'All Applications', icon: FileText },
    { id: 'track-submissions', label: 'Track Submissions', icon: Eye },
    { id: 'push-alerts', label: 'Push Alerts', icon: Bell },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const tabs = userRole === 'admin' ? adminTabs : studentTabs;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                userRole === 'admin' ? 'bg-purple-600' : 'bg-blue-600'
              }`}>
                {userRole === 'admin' ? (
                  <Shield className="text-white" size={24} />
                ) : (
                  <FileText className="text-white" size={24} />
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Exam Platform</h1>
                <p className="text-sm text-gray-500">
                  {userRole === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  userRole === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
                }`}>
                  {userRole === 'admin' ? (
                    <Shield className="text-purple-600" size={16} />
                  ) : (
                    <GraduationCap className="text-blue-600" size={16} />
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700">{displayName}</span>
                  <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? userRole === 'admin' 
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className={`rounded-lg p-6 text-white ${
                  userRole === 'admin' 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700'
                }`}>
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {displayName?.split(' ')[0] || 'User'}!
                  </h2>
                  <p className="opacity-90">
                    {userRole === 'admin' 
                      ? `You have ${realUsers.length} registered students`
                      : `You have ${studentApplications.filter(app => app.status === 'Applied').length} active applications`
                    }
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {userRole === 'admin' ? (
                    <>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                            <p className="text-2xl font-bold text-gray-900">{realUsers.length}</p>
                          </div>
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="text-purple-600" size={24} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Active Applications</p>
                            <p className="text-2xl font-bold text-green-600">{adminData.activeApplications}</p>
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="text-green-600" size={24} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                            <p className="text-2xl font-bold text-yellow-600">{adminData.pendingReviews}</p>
                          </div>
                          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="text-yellow-600" size={24} />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Applications</p>
                            <p className="text-2xl font-bold text-gray-900">{studentApplications.length}</p>
                          </div>
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="text-blue-600" size={24} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Applied</p>
                            <p className="text-2xl font-bold text-green-600">
                              {studentApplications.filter(app => app.status === 'Applied').length}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="text-green-600" size={24} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Drafts</p>
                            <p className="text-2xl font-bold text-yellow-600">
                              {studentApplications.filter(app => app.status === 'Draft').length}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="text-yellow-600" size={24} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Recent Data */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {userRole === 'admin' ? 'Recent Students' : 'Recent Applications'}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {userRole === 'admin' ? (
                        loadingUsers ? (
                          <p className="text-center py-4">Loading students...</p>
                        ) : realUsers.length === 0 ? (
                          <p className="text-center py-4">No students found.</p>
                        ) : (
                          realUsers.slice(0, 3).map((user, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div>
                                <h4 className="font-medium text-gray-900">{user.displayName}</h4>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <p className="text-sm text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                              </div>
                              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                                View Profile
                              </button>
                            </div>
                          ))
                        )
                      ) : (
                        studentApplications.slice(0, 3).map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">{app.examName}</h4>
                              <p className="text-sm text-gray-500">Deadline: {app.deadline}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {userRole === 'admin' ? 'All Applications' : 'My Applications'}
                  </h3>
                  {userRole === 'student' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                      <Plus size={16} />
                      <span>New Application</span>
                    </button>
                  )}
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {userRole === 'admin' ? (
                      // Admin sees all applications from all students
                      adminData.allApplications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div>
                            <h4 className="font-medium text-gray-900">{app.examName}</h4>
                            <p className="text-sm text-gray-500">Student: {app.studentName}</p>
                            <p className="text-sm text-gray-500">Submitted: {app.submittedDate}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                              Review
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Student sees only their own applications
                      studentApplications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div>
                            <h4 className="font-medium text-gray-900">{app.examName}</h4>
                            <p className="text-sm text-gray-500">
                              {app.appliedDate ? `Applied: ${app.appliedDate}` : 'Not applied yet'}
                            </p>
                            <p className="text-sm text-gray-500">Deadline: {app.deadline}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && userRole === 'admin' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">All Students</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {loadingUsers ? (
                      <p className="text-center py-8">Loading students...</p>
                    ) : realUsers.length === 0 ? (
                      <p className="text-center py-8">No students found.</p>
                    ) : (
                      realUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div>
                            <h4 className="font-medium text-gray-900">{user.displayName}</h4>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-500">Joined: {user.metadata?.creationTime}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                              View Profile
                            </button>
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                              <Eye size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Student-specific tabs */}
            {activeTab === 'upload-docs' && userRole === 'student' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Upload Documents</h3>
                  <p className="text-sm text-gray-600 mt-1">Securely store all your documents in one place</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <User className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Upload Documents</h3>
                      <p className="mt-1 text-sm text-gray-500">Drag and drop files here, or click to select files</p>
                      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Choose Files
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Required Documents</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">Photo ID</h5>
                              <p className="text-sm text-gray-500">Aadhar Card, PAN Card, or Passport</p>
                            </div>
                            <span className="text-red-500 text-sm">Required</span>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">Educational Certificates</h5>
                              <p className="text-sm text-gray-500">10th, 12th, and Graduation certificates</p>
                            </div>
                            <span className="text-red-500 text-sm">Required</span>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">Caste Certificate</h5>
                              <p className="text-sm text-gray-500">If applicable for reservation</p>
                            </div>
                            <span className="text-gray-500 text-sm">Optional</span>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">Income Certificate</h5>
                              <p className="text-sm text-gray-500">For fee concession if applicable</p>
                            </div>
                            <span className="text-gray-500 text-sm">Optional</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'exam-suggestions' && userRole === 'student' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Exam Suggestions</h3>
                  <p className="text-sm text-gray-600 mt-1">Get personalized exam recommendations based on your profile</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Based on your profile:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Graduation: B.Tech Computer Science</li>
                        <li>• Age: 22 years</li>
                        <li>• Location: Delhi</li>
                        <li>• Preferred sectors: IT, Banking, Government</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Recommended Exams</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">SSC CGL 2024</h5>
                              <p className="text-sm text-gray-500">Combined Graduate Level</p>
                              <p className="text-sm text-green-600 mt-1">High Match: 95%</p>
                              <p className="text-sm text-gray-500">Deadline: March 15, 2024</p>
                            </div>
                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                              Apply Now
                            </button>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">IBPS PO 2024</h5>
                              <p className="text-sm text-gray-500">Probationary Officer</p>
                              <p className="text-sm text-green-600 mt-1">High Match: 88%</p>
                              <p className="text-sm text-gray-500">Deadline: April 10, 2024</p>
                            </div>
                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                              Apply Now
                            </button>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">Railway NTPC</h5>
                              <p className="text-sm text-gray-500">Non-Technical Popular Categories</p>
                              <p className="text-sm text-yellow-600 mt-1">Medium Match: 75%</p>
                              <p className="text-sm text-gray-500">Deadline: March 30, 2024</p>
                            </div>
                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                              Apply Now
                            </button>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">UPSC CSE 2024</h5>
                              <p className="text-sm text-gray-500">Civil Services Examination</p>
                              <p className="text-sm text-yellow-600 mt-1">Medium Match: 70%</p>
                              <p className="text-sm text-gray-500">Deadline: February 20, 2024</p>
                            </div>
                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'one-click-submit' && userRole === 'student' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">One-Click Submission</h3>
                  <p className="text-sm text-gray-600 mt-1">Apply to multiple exams with a single click</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2">Ready to Apply</h4>
                      <p className="text-sm text-green-800">You have uploaded all required documents. You can now apply to multiple exams with one click!</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Available for One-Click Application</h4>
                      <div className="space-y-3">
                        {studentApplications.map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h5 className="font-medium text-gray-900">{app.examName}</h5>
                              <p className="text-sm text-gray-500">Deadline: {app.deadline}</p>
                              <p className="text-sm text-gray-500">Status: {app.status}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              {app.status === 'Draft' ? (
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                  Apply Now
                                </button>
                              ) : (
                                <span className="text-gray-500 text-sm">Already Applied</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Apply to All Available Exams
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Admin-specific tabs */}
            {activeTab === 'track-submissions' && userRole === 'admin' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Track Submissions</h3>
                  <p className="text-sm text-gray-600 mt-1">Monitor application status and analytics</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">890</div>
                          <div className="text-sm text-gray-600">Total Submissions</div>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">745</div>
                          <div className="text-sm text-gray-600">Approved</div>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">45</div>
                          <div className="text-sm text-gray-600">Pending Review</div>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">100</div>
                          <div className="text-sm text-gray-600">Rejected</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Recent Submissions</h4>
                      <div className="space-y-3">
                        {adminData.allApplications.map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div>
                              <h5 className="font-medium text-gray-900">{app.examName}</h5>
                              <p className="text-sm text-gray-500">Student: {app.studentName}</p>
                              <p className="text-sm text-gray-500">Submitted: {app.submittedDate}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                {app.status}
                              </span>
                              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'push-alerts' && userRole === 'admin' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Push Alerts</h3>
                  <p className="text-sm text-gray-600 mt-1">Send notifications to students instantly</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">Quick Alert</h4>
                      <p className="text-sm text-purple-800">Send immediate notifications to all students or specific groups</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Send New Alert</h4>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <option>General Announcement</option>
                            <option>Exam Deadline Reminder</option>
                            <option>Application Status Update</option>
                            <option>New Exam Available</option>
                            <option>System Maintenance</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <option>All Students</option>
                            <option>Students with Pending Applications</option>
                            <option>Students with Approved Applications</option>
                            <option>Students with Rejected Applications</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Alert Title</label>
                          <input
                            type="text"
                            placeholder="Enter alert title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Alert Message</label>
                          <textarea
                            rows={4}
                            placeholder="Enter your message"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          ></textarea>
                        </div>
                        
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                          Send Alert
                        </button>
                      </form>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Recent Alerts</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h5 className="font-medium text-gray-900">SSC CGL 2024 Deadline Reminder</h5>
                            <p className="text-sm text-gray-500">Sent to: All Students</p>
                            <p className="text-sm text-gray-500">Sent: 2 hours ago</p>
                          </div>
                          <span className="text-green-600 text-sm">Sent</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h5 className="font-medium text-gray-900">New Exam Available: IBPS PO 2024</h5>
                            <p className="text-sm text-gray-500">Sent to: All Students</p>
                            <p className="text-sm text-gray-500">Sent: 1 day ago</p>
                          </div>
                          <span className="text-green-600 text-sm">Sent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {userRole === 'admin' ? (
                      <>
                        <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                          <AlertCircle className="text-purple-600 mt-1" size={20} />
                          <div>
                            <p className="font-medium text-gray-900">New Application Submitted</p>
                            <p className="text-sm text-gray-600">Rahul Kumar submitted an application for SSC CGL 2024</p>
                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                          <Clock className="text-yellow-600 mt-1" size={20} />
                          <div>
                            <p className="font-medium text-gray-900">Applications Pending Review</p>
                            <p className="text-sm text-gray-600">You have 45 applications waiting for your review</p>
                            <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                          <AlertCircle className="text-blue-600 mt-1" size={20} />
                          <div>
                            <p className="font-medium text-gray-900">SSC CGL 2024 Application Deadline</p>
                            <p className="text-sm text-gray-600">Application deadline is approaching. Complete your application soon.</p>
                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="text-green-600 mt-1" size={20} />
                          <div>
                            <p className="font-medium text-gray-900">Railway NTPC Application Submitted</p>
                            <p className="text-sm text-gray-600">Your application has been successfully submitted.</p>
                            <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Profile Information</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue={displayName || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={currentUser?.email || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                          <input
                            type="text"
                            defaultValue={userRole}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 capitalize"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Notification Preferences</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">Email notifications for deadlines</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">Application status updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">Marketing emails</span>
                        </label>
                      </div>
                    </div>

                    <button className={`text-white px-6 py-2 rounded-lg transition-colors ${
                      userRole === 'admin' 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 