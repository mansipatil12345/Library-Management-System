import { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiBook, 
  FiFileText, 
  FiAlertCircle,
  FiCalendar,
  FiBookmark,
  FiClock,
  FiDownload,
  FiTrendingUp,
  FiAward,
  FiEdit,
  FiChevronRight,
  FiSettings,
  FiBookOpen
} from 'react-icons/fi';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    studentId: 'CS2024001',
    department: 'Computer Science',
    semester: '6th',
    phone: '+1234567890',
    joinDate: '2024-01-15',
    stats: {
      borrowed: 3,
      returned: 15,
      fines: 1,
      totalFineAmount: 50,
    },
    recentActivities: [
      {
        id: 1,
        type: 'borrow',
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        date: 'March 1, 2024',
        status: 'Due in 3 days',
        statusColor: 'text-yellow-600'
      },
      {
        id: 2,
        type: 'access',
        title: 'Research Paper Access',
        author: 'Database Systems Journal',
        date: 'March 5, 2024',
        status: 'Active',
        statusColor: 'text-green-600'
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Early Bird',
        description: 'Returned 5 books before due date',
        progress: 80,
        icon: FiClock
      },
      {
        id: 2,
        title: 'Bookworm',
        description: 'Borrowed 50+ books',
        progress: 45,
        icon: FiBookOpen
      }
    ]
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiUser },
    { id: 'borrowed', label: 'Borrowed Items', icon: FiBook },
    { id: 'history', label: 'History', icon: FiClock },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const stats = [
    { 
      icon: FiBook,
      title: 'Currently Borrowed', 
      value: user.stats.borrowed,
      trend: '+1 this week',
      color: 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-800 border border-blue-200'
    },
    { 
      icon: FiBookmark,
      title: 'Total Returned', 
      value: user.stats.returned,
      trend: '+3 this month',
      color: 'bg-gradient-to-br from-green-100 to-green-50 text-green-800 border border-green-200'
    },
    { 
      icon: FiAlertCircle,
      title: 'Active Fines', 
      value: user.stats.fines,
      trend: 'Pay now',
      color: 'bg-gradient-to-br from-red-100 to-red-50 text-red-800 border border-red-200'
    },
    { 
      icon: FiTrendingUp,
      title: 'Total Fine Amount', 
      value: `₹${user.stats.totalFineAmount}`,
      trend: 'Due soon',
      color: 'bg-gradient-to-br from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all">
              <FiEdit className="text-gray-600" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {user.name}
              <span className="ml-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-full">
                {user.studentId}
              </span>
            </h1>
            <p className="text-gray-600 mt-1">{user.department} • {user.semester} Semester</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 text-gray-700 font-medium flex items-center gap-2">
          <FiSettings className="text-gray-500" />
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 flex items-center gap-2 font-medium text-sm border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl shadow-sm ${stat.color} hover:shadow-md transition-all group cursor-pointer`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/50 rounded-lg">
                <stat.icon size={20} className="text-current" />
              </div>
              <h3 className="text-sm font-medium">{stat.title}</h3>
            </div>
            <p className="text-3xl font-bold mb-2">{stat.value}</p>
            <p className="text-sm font-medium opacity-75">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <FiUser size={20} />
            </div>
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 text-gray-600 mb-1">
                  <FiMail className="text-blue-500" />
                  <span className="text-sm">Email Address</span>
                </div>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 text-gray-600 mb-1">
                  <FiPhone className="text-green-500" />
                  <span className="text-sm">Phone Number</span>
                </div>
                <p className="font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 text-gray-600 mb-1">
                  <FiCalendar className="text-purple-500" />
                  <span className="text-sm">Join Date</span>
                </div>
                <p className="font-medium text-gray-900">{user.joinDate}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 text-gray-600 mb-1">
                  <FiAward className="text-yellow-500" />
                  <span className="text-sm">Department</span>
                </div>
                <p className="font-medium text-gray-900">{user.department}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <FiClock size={20} />
            </div>
            Recent Activities
          </h2>

          <div className="space-y-4">
            {user.recentActivities.map(activity => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 rounded-xl transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.author}</p>
                  </div>
                  <span className={`${activity.statusColor} text-sm font-medium`}>
                    {activity.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{activity.date}</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Details <FiChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 font-medium transition-all flex items-center justify-center gap-2">
            View All Activities
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <FiAward size={20} />
          </div>
          Achievements
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {user.achievements.map(achievement => (
            <div key={achievement.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg text-purple-600">
                  <achievement.icon size={20} />
                </div>
                <h3 className="font-medium text-gray-900">{achievement.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
              <p className="text-right text-sm font-medium text-gray-600 mt-1">
                {achievement.progress}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;