import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FiUser, 
  FiLock, 
  FiMail, 
  FiEye, 
  FiEyeOff, 
  FiArrowRight, 
  FiBook, 
  FiShield,
  FiCoffee,
  FiBookOpen,
  FiCalendar,
  FiFileText,
  FiUsers,
  FiGrid
} from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';

export default function AuthPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isLogin && !isAdminLogin && !formData.name) {
      toast.error('Please enter your name');
      return;
    }

    const loadingToast = toast.loading(isLogin ? 'Signing in...' : 'Creating account...');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      toast.dismiss(loadingToast);
    } catch (error) {
      toast.dismiss(loadingToast);
      // Error is already handled in AuthContext
    }
  };

  const features = [
    {
      title: "Digital Library Access",
      description: "Explore over 10,000 books, journals, and research papers.",
      icon: <FiBookOpen size={24} />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Study Space Booking",
      description: "Reserve quiet rooms and collaborative workspaces.",
      icon: <FiCoffee size={24} />,
      color: "from-amber-500 to-amber-600"
    },
    {
      title: "Resource Management",
      description: "Track borrowed materials and manage returns.",
      icon: <FiGrid size={24} />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Academic Calendar",
      description: "Stay updated with important academic dates and events.",
      icon: <FiCalendar size={24} />,
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col md:flex-row">
      {/* Header for mobile only */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
        <h1 className="text-2xl font-bold">
          {isAdminLogin ? 'Library Administration' : 'Student Learning Portal'}
        </h1>
        <p className="text-blue-100 mt-1">
          {isLogin ? 'Sign in to continue' : 'Create your account'}
        </p>
      </div>

      {/* Main content container */}
      <div className="flex flex-grow flex-col md:flex-row p-4 md:p-0">
        {/* Left Side - Auth Form */}
        <div className="flex-1 flex items-center justify-center order-2 md:order-1">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Role Selection */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  onClick={() => setIsAdminLogin(false)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    !isAdminLogin ? 'bg-white text-blue-600 shadow-md' : 'bg-transparent text-white hover:bg-blue-700/30'
                  }`}
                >
                  <FiBook size={16} />
                  Student
                </button>
                <button
                  onClick={() => setIsAdminLogin(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    isAdminLogin ? 'bg-white text-blue-600 shadow-md' : 'bg-transparent text-white hover:bg-blue-700/30'
                  }`}
                >
                  <FiShield size={16} />
                  Admin
                </button>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-blue-100 mt-1">
                  {isAdminLogin ? 'Library Management Portal' : 'Student Learning Portal'}
                </p>
              </div>
            </div>

            {/* Login/Signup Toggle */}
            {!isAdminLogin && (
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                    isLogin
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiUser size={16} />
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                    !isLogin
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiUsers size={16} />
                  Sign Up
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {!isLogin && !isAdminLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiUser className="text-blue-500" />
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 shadow-sm"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiMail className="text-blue-500" />
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={isAdminLogin ? "admin@university.edu" : "student@university.edu"}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiLock className="text-blue-500" />
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 shadow-sm"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {!isLogin && "Password must be at least 6 characters"}
                  </p>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => toast('Password reset functionality would go here')}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <FiArrowRight className="transform transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {!isAdminLogin && (
              <div className="px-6 pb-6 text-center text-sm text-gray-600">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"  
                      onClick={() => setIsLogin(false)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Features Showcase */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 items-center justify-center order-1 md:order-2">
          <div className="max-w-lg p-8">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-blue-600/20 rounded-full"></div>
                <div className="absolute inset-4 bg-blue-700/20 rounded-full"></div>
                <div className="absolute inset-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white">
                  {isAdminLogin ? <FiShield size={24} /> : <FiBook size={24} />}
                </div>
              </div>
            </div>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isAdminLogin ? 'Library Administration' : 'Digital Learning Hub'}
              </h2>
              <p className="text-gray-600">
                {isAdminLogin 
                  ? 'Powerful tools to manage library resources and monitor activity' 
                  : 'Access thousands of resources to enhance your academic journey'}
              </p>
            </div>
            
            <div className="relative h-64 mb-8">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
                    i === activeFeature ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-2">
              {features.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === activeFeature ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
}