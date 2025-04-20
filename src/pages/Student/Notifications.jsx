import { useState } from 'react';
import { FiClock, FiAlertCircle, FiBook, FiBell, FiCheck, FiChevronRight } from 'react-icons/fi';

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'due',
      title: 'Book Due Tomorrow',
      message: 'Your borrowed book "Introduction to Algorithms" is due tomorrow.',
      timestamp: '2 hours ago',
      isRead: false,
    },
    {
      id: 2,
      type: 'fine',
      title: 'Fine Generated',
      message: 'A fine of ₹50 has been generated for late return of "Design Patterns".',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: 3,
      type: 'availability',
      title: 'Book Available',
      message: 'The book "Clean Code" you requested is now available.',
      timestamp: '2 days ago',
      isRead: false,
    },
    {
      id: 4,
      type: 'system',
      title: 'System Maintenance',
      message: 'Library system will be under maintenance on Sunday, March 17th, from 2 AM to 4 AM.',
      timestamp: '3 days ago',
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type) => {
    const baseClass = "p-2 rounded-lg";
    switch (type) {
      case 'due':
        return <div className={`${baseClass} bg-yellow-100 text-yellow-600`}><FiClock size={18} /></div>;
      case 'fine':
        return <div className={`${baseClass} bg-red-100 text-red-600`}><FiAlertCircle size={18} /></div>;
      case 'availability':
        return <div className={`${baseClass} bg-green-100 text-green-600`}><FiBook size={18} /></div>;
      case 'system':
        return <div className={`${baseClass} bg-blue-100 text-blue-600`}><FiBell size={18} /></div>;
      default:
        return <div className={`${baseClass} bg-gray-100 text-gray-600`}><FiBell size={18} /></div>;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-gray-600 mt-1">Your recent library activities</p>
          </div>
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm shadow-md hover:shadow-lg transition-all"
          >
            <FiCheck size={16} />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden ${
              !notification.isRead ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="p-5">
              <div className="flex items-start gap-4">
                {getNotificationIcon(notification.type)}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-bold ${
                      notification.isRead ? 'text-gray-700' : 'text-gray-900'
                    }`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {notification.timestamp}
                    </span>
                  </div>
                  <p className={`mt-2 ${
                    notification.isRead ? 'text-gray-500' : 'text-gray-700'
                  }`}>
                    {notification.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <span>Mark as read</span>
                    <FiChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if needed) */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white/80 rounded-2xl shadow-sm mt-8 border border-gray-200/50">
          <div className="relative mb-6">
            <FiBell className="text-6xl text-gray-300" />
            <div className="absolute -inset-4 bg-blue-100 rounded-full opacity-20 -z-10"></div>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No notifications</h3>
          <p className="text-gray-500 max-w-md text-center">
            You don't have any notifications at this time.
          </p>
        </div>
      )}
    </div>
  );
}

export default Notifications;