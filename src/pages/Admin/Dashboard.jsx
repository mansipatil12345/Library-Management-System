import { FiBook, FiUsers, FiAlertCircle, FiBarChart2, FiCalendar, FiClock, FiDollarSign, FiSettings, FiUser, FiPlusCircle, FiDatabase } from 'react-icons/fi';

export default function Dashboard() {
  // Sample data - replace with API calls in production
  const stats = [
    { 
      icon: <FiBook className="text-2xl" />,
      title: 'Total Books', 
      value: '2,458',
      change: '+12% this month',
      color: 'from-blue-100 to-blue-50 text-blue-800'
    },
    { 
      icon: <FiUsers className="text-2xl" />,
      title: 'Active Users', 
      value: '1,892',
      change: '+5% this week',
      color: 'from-green-100 to-green-50 text-green-800'
    },
    { 
      icon: <FiAlertCircle className="text-2xl" />,
      title: 'Overdue Items', 
      value: '47',
      change: '3 critical',
      color: 'from-yellow-100 to-yellow-50 text-yellow-800'
    },
    { 
      icon: <FiDollarSign className="text-2xl" />,
      title: 'Fines Collected', 
      value: '₹8,950',
      change: 'This month',
      color: 'from-purple-100 to-purple-50 text-purple-800'
    }
  ];

  const recentActivities = [
    { id: 1, user: 'Rahul Sharma', action: 'Borrowed "Clean Code"', time: '10 mins ago', icon: <FiBook /> },
    { id: 2, user: 'Priya Patel', action: 'Returned late (+3 days)', time: '25 mins ago', icon: <FiClock /> },
    { id: 3, user: 'System', action: 'Added 15 new research papers', time: '2 hours ago', icon: <FiDatabase /> },
    { id: 4, user: 'Amit Singh', action: 'Paid ₹250 fine', time: '5 hours ago', icon: <FiDollarSign /> }
  ];

  const quickActions = [
    { icon: <FiPlusCircle size={20} />, label: 'Add New Book', path: '/admin/books/add' },
    { icon: <FiUser size={20} />, label: 'Manage Users', path: '/admin/users' },
    { icon: <FiBarChart2 size={20} />, label: 'Generate Reports', path: '/admin/reports' },
    { icon: <FiSettings size={20} />, label: 'System Settings', path: '/admin/settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Admin <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-gray-600">Library management at a glance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <FiCalendar className="text-gray-500" />
            <span className="text-sm font-medium">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} p-5 rounded-2xl shadow-sm border border-gray-200/50`}>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-2 bg-white/30 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <p className="text-xs mt-3 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <FiBarChart2 size={20} />
            </div>
            <span>Quick Actions</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.path}
                className="flex flex-col items-center p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all group"
              >
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-2 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-center">{action.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <FiClock size={20} />
            </div>
            <span>Recent Activities</span>
          </h2>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-all">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full mr-4">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-medium text-gray-800 truncate">{activity.user}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 truncate">{activity.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <FiSettings size={20} />
          </div>
          <span>System Status</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Book Status */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">Book Inventory</h3>
            <div className="space-y-2">
              {[
                { label: 'Available', value: '1,842', color: 'bg-blue-500' },
                { label: 'Checked Out', value: '616', color: 'bg-green-500' },
                { label: 'Reserved', value: '189', color: 'bg-yellow-500' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Stats */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">User Statistics</h3>
            <div className="space-y-2">
              {[
                { label: 'Active Students', value: '1,523' },
                { label: 'Faculty Members', value: '369' },
                { label: 'Overdue Accounts', value: '47' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">System Health</h3>
            <div className="space-y-2">
              {[
                { label: 'Storage Used', value: '64%' },
                { label: 'Last Backup', value: 'Today 02:00' },
                { label: 'Uptime', value: '99.98%' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}