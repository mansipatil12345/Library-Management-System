import { FiBarChart2, FiDownload, FiFilter, FiCalendar, FiPlus } from 'react-icons/fi';
import { useState } from 'react';

export default function AdminReports() {
  // State for filters
  const [reportTypeFilter, setReportTypeFilter] = useState('All Report Types');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [showNewReportModal, setShowNewReportModal] = useState(false);

  // Sample report data
  const reports = [
    {
      id: 1,
      title: 'Monthly Book Circulation',
      description: 'Track book checkouts and returns by month',
      lastGenerated: '2023-06-15',
      frequency: 'Monthly',
      type: 'Circulation'
    },
    {
      id: 2,
      title: 'Overdue Items Report',
      description: 'List of all overdue books with borrower details',
      lastGenerated: '2023-06-18',
      frequency: 'Daily',
      type: 'Overdue Items'
    },
    {
      id: 3,
      title: 'User Activity Summary',
      description: 'Detailed user activity and engagement metrics',
      lastGenerated: '2023-06-01',
      frequency: 'Weekly',
      type: 'User Activity'
    },
    {
      id: 4,
      title: 'Collection Analysis',
      description: 'Breakdown of collection usage by category',
      lastGenerated: '2023-05-30',
      frequency: 'Quarterly',
      type: 'Collection Analysis'
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      report: 'Overdue Items',
      frequency: 'Daily',
      nextRun: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      recipients: 'librarian@university.edu'
    },
    {
      id: 2,
      report: 'Monthly Circulation',
      frequency: 'Monthly',
      nextRun: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(), // First of next month
      recipients: 'admin@university.edu'
    }
  ];

  const availableFormats = ['PDF', 'CSV', 'Excel'];

  // Filter reports based on selected filters
  const filteredReports = reports.filter(report => {
    const matchesType = reportTypeFilter === 'All Report Types' || report.type === reportTypeFilter;
    
    // Filter by time (simplified for demo)
    let matchesTime = true;
    if (timeFilter !== 'All Time') {
      const lastGenerated = new Date(report.lastGenerated);
      const now = new Date();
      const diffTime = now - lastGenerated;
      
      if (timeFilter === 'Last 7 Days') matchesTime = diffTime <= 7 * 24 * 60 * 60 * 1000;
      else if (timeFilter === 'Last 30 Days') matchesTime = diffTime <= 30 * 24 * 60 * 60 * 1000;
      else if (timeFilter === 'This Month') matchesTime = lastGenerated.getMonth() === now.getMonth() && lastGenerated.getFullYear() === now.getFullYear();
      else if (timeFilter === 'Last Month') {
        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        matchesTime = lastGenerated.getMonth() === lastMonth && lastGenerated.getFullYear() === year;
      }
    }
    
    return matchesType && matchesTime;
  });

  const handleDownload = (reportId, format) => {
    console.log(`Downloading report ${reportId} in ${format} format`);
    // In a real app, this would trigger a download
  };

  const handleGenerateNewReport = () => {
    setShowNewReportModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Library <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Reports</span>
          </h1>
          <p className="text-gray-600">Generate and manage system reports</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <FiCalendar className="text-gray-500" />
            <span className="text-sm font-medium">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              value={reportTypeFilter}
              onChange={(e) => setReportTypeFilter(e.target.value)}
            >
              <option>All Report Types</option>
              <option>Circulation</option>
              <option>Overdue Items</option>
              <option>User Activity</option>
              <option>Collection Analysis</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiCalendar className="text-gray-400" />
            </div>
            <select 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option>All Time</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>

          <button 
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            onClick={handleGenerateNewReport}
          >
            <FiPlus size={18} />
            Generate New Report
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <FiBarChart2 size={20} />
          </div>
          <span>Available Reports</span>
        </h2>
        
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 text-center">
            <p className="text-gray-500">No reports match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReports.map(report => (
              <div key={report.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.frequency === 'Daily' ? 'bg-blue-100 text-blue-800' :
                    report.frequency === 'Weekly' ? 'bg-green-100 text-green-800' :
                    report.frequency === 'Monthly' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.frequency}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500">
                    Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    {availableFormats.map(format => (
                      <button 
                        key={format}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => handleDownload(report.id, format)}
                      >
                        <FiDownload size={14} />
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <FiCalendar size={20} />
          </div>
          <span>Scheduled Reports</span>
          <button 
            className="ml-auto flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            onClick={() => setShowNewReportModal(true)}
          >
            <FiPlus size={14} />
            Add Schedule
          </button>
        </h2>
        
        {scheduledReports.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No scheduled reports
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scheduledReports.map(scheduled => (
                  <tr key={scheduled.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{scheduled.report}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheduled.frequency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(scheduled.nextRun)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheduled.recipients}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Report Modal */}
      {showNewReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate New Report</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select a report type</option>
                    <option>Monthly Book Circulation</option>
                    <option>Overdue Items Report</option>
                    <option>User Activity Summary</option>
                    <option>Collection Analysis</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      placeholder="Start date"
                    />
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      placeholder="End date"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                  <div className="flex gap-2">
                    {availableFormats.map(format => (
                      <label key={format} className="flex items-center">
                        <input type="radio" name="format" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-700">{format}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={() => setShowNewReportModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={() => {
                    console.log('Generating new report...');
                    setShowNewReportModal(false);
                  }}
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}