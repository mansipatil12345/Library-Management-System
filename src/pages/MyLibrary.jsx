import { useState } from 'react';
import { 
  FiBook, 
  FiFileText, 
  FiClock, 
  FiAlertCircle, 
  FiRefreshCw, 
  FiCheckCircle,
  FiChevronRight,
  FiSearch,
  FiCalendar,
  FiDownload,
  FiBookOpen
} from 'react-icons/fi';

function MyLibrary() {
  const [activeTab, setActiveTab] = useState('borrowed');
  const [renewingId, setRenewingId] = useState(null);
  
  // Sample data - replace with your actual data source
  const borrowedItems = [
    {
      id: 1,
      title: 'Introduction to Algorithms',
      type: 'book',
      borrowDate: '2024-02-15',
      dueDate: '2024-03-15',
      status: 'due-soon',
      coverUrl: 'https://covers.openlibrary.org/b/id/8587804-L.jpg',
      renewalsLeft: 2,
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      type: 'research_paper',
      borrowDate: '2024-02-20',
      dueDate: '2024-03-20',
      status: 'active',
      coverUrl: 'https://covers.openlibrary.org/b/id/10484341-L.jpg',
      renewalsLeft: 1,
    }
  ];

  const history = [
    {
      id: 1,
      title: 'Clean Code',
      type: 'book',
      borrowDate: '2024-01-01',
      returnDate: '2024-01-15',
      status: 'returned',
      coverUrl: 'https://covers.openlibrary.org/b/id/8906626-L.jpg',
    }
  ];

  const fines = [
    {
      id: 1,
      title: 'Design Patterns',
      amount: 50,
      dueDate: '2024-03-01',
      status: 'pending',
      coverUrl: 'https://covers.openlibrary.org/b/id/7265447-L.jpg',
    }
  ];

  // Quick stats
  const stats = [
    {
      label: 'Active Borrows',
      value: borrowedItems.length,
      icon: FiBookOpen,
      color: 'blue',
      trend: '+1 this week'
    },
    {
      label: 'Items Returned',
      value: history.length,
      icon: FiCheckCircle,
      color: 'green',
      trend: 'All on time'
    },
    {
      label: 'Pending Fines',
      value: `₹${fines.filter(f => f.status === 'pending').reduce((sum, fine) => sum + fine.amount, 0)}`,
      icon: FiAlertCircle,
      color: 'red',
      trend: 'Due in 3 days'
    }
  ];

  // Date formatting without date-fns
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'due-soon': return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
      case 'overdue': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'active': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'returned': return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
      case 'pending': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'paid': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  // Handle renew action
  const handleRenew = (itemId) => {
    setRenewingId(itemId);
    // Simulate API call
    setTimeout(() => {
      setRenewingId(null);
      // In a real app, update the item's due date here
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Library</span>
          </h1>
          <p className="text-gray-600 mt-1">Manage your borrowed items, history, and fines</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className={`p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="bg-white rounded-2xl shadow-lg mb-8 border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-10 -z-10"></div>
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search your items..."
              className="w-full pl-12 pr-4 py-3 bg-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
            />
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex -mb-px px-4">
            {[
              { id: 'borrowed', label: 'Currently Borrowed', count: borrowedItems.length },
              { id: 'history', label: 'History', count: history.length },
              { id: 'fines', label: 'Fines', count: fines.filter(f => f.status === 'pending').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Borrowed Items Tab */}
          {activeTab === 'borrowed' && (
            <div className="space-y-6">
              {borrowedItems.length > 0 ? (
                borrowedItems.map((item) => {
                  const daysRemaining = getDaysRemaining(item.dueDate);
                  const isOverdue = daysRemaining < 0;
                  const status = isOverdue ? 'overdue' : daysRemaining <= 3 ? 'due-soon' : 'active';

                  return (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 overflow-hidden">
                      <div className="flex flex-col md:flex-row gap-6 p-6">
                        <div className="flex-shrink-0">
                          <img
                            src={item.coverUrl}
                            alt={item.title}
                            className="w-24 h-32 object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/96x128?text=No+Cover';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                              <div className="flex items-center gap-4 mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                  {isOverdue ? 'Overdue' : status === 'due-soon' ? 'Due Soon' : 'Active'}
                                  {!isOverdue && daysRemaining > 0 && ` (${daysRemaining} days)`}
                                </span>
                                <span className="text-sm text-gray-500 flex items-center gap-2">
                                  <FiCalendar className="text-gray-400" />
                                  Borrowed on {formatDate(item.borrowDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FiClock className="text-gray-400" />
                                <span>Due: {formatDate(item.dueDate)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FiDownload className="text-gray-400" />
                                <span>Downloads available</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {item.renewalsLeft > 0 ? (
                                <button
                                  onClick={() => handleRenew(item.id)}
                                  disabled={renewingId === item.id}
                                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    renewingId === item.id
                                      ? 'bg-blue-400 text-white cursor-not-allowed'
                                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md'
                                  }`}
                                >
                                  {renewingId === item.id ? (
                                    <>
                                      <FiRefreshCw className="animate-spin" />
                                      Renewing...
                                    </>
                                  ) : (
                                    <>
                                      <FiRefreshCw />
                                      Renew ({item.renewalsLeft} left)
                                    </>
                                  )}
                                </button>
                              ) : (
                                <span className="text-sm text-gray-500">No renewals left</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <FiBook className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No items currently borrowed</h3>
                  <p className="text-gray-500 max-w-md">
                    You don't have any active borrows. Visit the library to find books, research papers, and more.
                  </p>
                  <button className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium shadow-md transition-all">
                    Browse Library
                  </button>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              {history.length > 0 ? (
                history.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      <div className="flex-shrink-0">
                        <img
                          src={item.coverUrl}
                          alt={item.title}
                          className="w-24 h-32 object-cover rounded-lg shadow-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/96x128?text=No+Cover';
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                Returned
                              </span>
                              <span className="text-sm text-gray-500 flex items-center gap-2">
                                <FiCalendar className="text-gray-400" />
                                Borrowed on {formatDate(item.borrowDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiCheckCircle className="text-green-500" />
                            <span>Returned on {formatDate(item.returnDate)}</span>
                          </div>
                          
                          <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-all">
                            View details
                            <FiChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FiClock className="text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No history yet</h3>
                  <p className="text-gray-500 max-w-md">
                    Your borrowing history will appear here once you return items.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Fines Tab */}
          {activeTab === 'fines' && (
            <div className="space-y-6">
              {fines.length > 0 ? (
                <>
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Total Pending Fines</h3>
                        <p className="text-sm text-gray-500 mt-1">Please clear your dues to continue borrowing</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">
                          ₹{fines.filter(f => f.status === 'pending').reduce((sum, fine) => sum + fine.amount, 0)}
                        </p>
                        <p className="text-sm text-red-500">Due in 3 days</p>
                      </div>
                    </div>
                  </div>
                  
                  {fines.map((fine) => (
                    <div key={fine.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 overflow-hidden">
                      <div className="flex flex-col md:flex-row gap-6 p-6">
                        <div className="flex-shrink-0">
                          <img
                            src={fine.coverUrl}
                            alt={fine.title}
                            className="w-24 h-32 object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/96x128?text=No+Cover';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{fine.title}</h3>
                              <div className="flex items-center gap-4 mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  fine.status === 'pending'
                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                }`}>
                                  {fine.status === 'pending' ? 'Payment Pending' : 'Paid'}
                                </span>
                                <span className="text-sm text-gray-500">
                                  Due on {formatDate(fine.dueDate)}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-semibold text-gray-800">₹{fine.amount}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <FiAlertCircle className={
                                fine.status === 'pending' ? 'text-red-500' : 'text-green-500'
                              } />
                              <span className={
                                fine.status === 'pending' ? 'text-red-600' : 'text-green-600'
                              }>
                                {fine.status === 'pending' ? 'Payment required to continue borrowing' : 'Payment completed'}
                              </span>
                            </div>
                            
                            {fine.status === 'pending' && (
                              <button className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl text-sm font-medium shadow-md transition-all">
                                Pay Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <FiCheckCircle className="text-3xl text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No pending fines</h3>
                  <p className="text-gray-500 max-w-md">
                    You don't have any pending fines. Keep up the good work!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyLibrary;