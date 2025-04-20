import { useState } from 'react';
import { FiBook, FiClock, FiAlertCircle, FiSearch, FiStar, FiChevronRight } from 'react-icons/fi';

export default function Home() {
  const [activeTab, setActiveTab] = useState('books');

  // Stats data
  const stats = [
    { 
      icon: '📚',
      title: 'Books Borrowed', 
      value: 8,
      trend: '+2 this week',
      color: 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-800 border border-blue-200'
    },
    { 
      icon: '📝',
      title: 'Papers Read', 
      value: 14,
      trend: '+5 this month',
      color: 'bg-gradient-to-br from-green-100 to-green-50 text-green-800 border border-green-200'
    },
    { 
      icon: '⏰',
      title: 'Due Soon', 
      value: 2,
      trend: 'Return by Fri',
      color: 'bg-gradient-to-br from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200'
    },
    { 
      icon: '💰',
      title: 'Fines', 
      value: '₹50',
      trend: '1 pending',
      color: 'bg-gradient-to-br from-red-100 to-red-50 text-red-800 border border-red-200'
    }
  ];

  // Recommendations
  const recommendations = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      rating: 4.8,
      available: true,
      description: 'Build good habits and break bad ones',
      coverColor: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Deep Work',
      author: 'Cal Newport',
      rating: 4.7,
      available: false,
      description: 'Master focused work in a distracted world',
      coverColor: 'bg-purple-100'
    }
  ];

  // Activities
  const activities = [
    {
      id: 1,
      type: 'due',
      title: 'Design Patterns',
      daysLeft: 3
    },
    {
      id: 2,
      type: 'fine',
      title: 'Late Return',
      amount: 50
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Digital Library</span>
          </h1>
          <p className="text-gray-600 mt-1">Your personalized learning dashboard</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-20 -z-10"></div>
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search books, papers..."
            className="w-full pl-12 pr-4 py-3 border-0 bg-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`p-5 rounded-2xl shadow-sm ${stat.color} hover:shadow-md transition-all`}>
            <div className="text-3xl mb-3">{stat.icon}</div>
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-bold my-2">{stat.value}</p>
            <p className="text-xs font-medium">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {['books', 'papers', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommendations */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <FiBook size={20} />
            </div>
            <span>Recommended For You</span>
          </h2>
          
          <div className="space-y-4">
            {recommendations.map(book => (
              <div key={book.id} className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-all group">
                <div className={`${book.coverColor} w-16 h-20 rounded-lg mr-4 flex items-center justify-center text-gray-700 text-2xl font-bold shadow-sm group-hover:shadow-md transition-all`}>
                  {book.title.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{book.title}</h3>
                      <p className="text-sm text-gray-600">{book.author}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {book.available ? 'Available' : 'Borrowed'}
                    </span>
                  </div>
                  <div className="flex items-center mt-3">
                    <div className="flex items-center mr-4">
                      <FiStar className="text-amber-400 mr-1" />
                      <span className="text-sm font-medium">{book.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500 flex-1 line-clamp-1">{book.description}</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      Details <FiChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <FiClock size={20} />
            </div>
            <span>Recent Activities</span>
          </h2>
          
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-xl transition-all">
                <div>
                  <h3 className="font-medium text-gray-800">{activity.title}</h3>
                  {activity.type === 'due' ? (
                    <div className="flex items-center text-sm text-yellow-600 mt-1">
                      <FiClock className="mr-2" />
                      <span>Due in {activity.daysLeft} days</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-red-600 mt-1">
                      <FiAlertCircle className="mr-2" />
                      <span>Fine: ₹{activity.amount}</span>
                    </div>
                  )}
                </div>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activity.type === 'due' 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md' 
                    : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-md'
                }`}>
                  {activity.type === 'due' ? 'Renew' : 'Pay Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { icon: <FiBook size={20} />, label: 'Browse Books', color: 'blue' },
          { icon: <FiSearch size={20} />, label: 'Research Papers', color: 'green' },
          { icon: <FiClock size={20} />, label: 'Borrowing History', color: 'yellow' },
          { icon: <FiAlertCircle size={20} />, label: 'Fines & Payments', color: 'red' }
        ].map((action, i) => (
          <button 
            key={i} 
            className={`flex flex-col items-center p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-gray-200 hover:border-${action.color}-300 group`}
          >
            <div className={`p-3 mb-3 rounded-lg bg-${action.color}-100 text-${action.color}-600 group-hover:bg-${action.color}-600 group-hover:text-white transition-all`}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}