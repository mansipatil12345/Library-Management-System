import { useState } from 'react';
import { FiFileText, FiFilter, FiSearch, FiDownload, FiCalendar, FiUser, FiAward, FiClock, FiBookOpen, FiBarChart, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function QuestionPapers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Sample data
  const papers = [
    {
      id: 1,
      title: 'Data Structures and Algorithms',
      subject: 'Data Structures',
      year: '2024',
      examType: 'Mid Semester',
      department: 'Computer Science',
      semester: '3rd',
      available: true,
      professor: 'Dr. Sarah Johnson',
      duration: '3 hours',
      maxMarks: 100,
      downloads: 245,
      difficulty: 'Medium',
      lastUpdated: '2024-03-15',
    },
    {
      id: 2,
      title: 'Advanced Database Concepts',
      subject: 'Database Management',
      year: '2023',
      examType: 'End Semester',
      department: 'Computer Science',
      semester: '4th',
      available: true,
      professor: 'Dr. Michael Chen',
      duration: '3 hours',
      maxMarks: 100,
      downloads: 189,
      difficulty: 'Hard',
      lastUpdated: '2023-12-20',
    },
    {
      id: 3,
      title: 'Computer Networks Quiz',
      subject: 'Computer Networks',
      year: '2024',
      examType: 'Quiz',
      department: 'Computer Science',
      semester: '5th',
      available: false,
      professor: 'Dr. Emma Wilson',
      duration: '1 hour',
      maxMarks: 30,
      downloads: 97,
      difficulty: 'Easy',
      lastUpdated: '2024-02-28',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Papers', icon: FiFileText },
    { id: 'recent', label: 'Recent', icon: FiCalendar },
    { id: 'popular', label: 'Most Downloaded', icon: FiDownload },
    { id: 'upcoming', label: 'Upcoming', icon: FiBarChart }
  ];

  const years = ['all', '2024', '2023', '2022', '2021'];

  // Quick stats
  const stats = [
    { 
      label: 'Total Papers',
      value: '150+',
      icon: FiFileText,
      color: 'blue',
      trend: '+12 this month'
    },
    { 
      label: 'Active Downloads',
      value: '2.5k',
      icon: FiDownload,
      color: 'green',
      trend: '+48% vs last month'
    },
    { 
      label: 'Success Rate',
      value: '85%',
      icon: FiBarChart,
      color: 'purple',
      trend: '+5% improvement'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Hard': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Question <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Papers</span>
          </h1>
          <p className="text-gray-600 mt-1">Access and download past examination papers</p>
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

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-10 -z-10"></div>
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by title, subject, or professor..."
              className="w-full pl-12 pr-4 py-3 bg-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <filter.icon size={18} />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {papers.map(paper => (
          <div key={paper.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{paper.title}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      paper.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {paper.available ? 'Available' : 'Unavailable'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(paper.difficulty)}`}>
                      {paper.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500">Last Updated</span>
                  <span className="text-sm font-medium">{new Date(paper.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FiBookOpen className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Subject</p>
                    <p className="font-medium">{paper.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FiUser className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Professor</p>
                    <p className="font-medium">{paper.professor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FiCalendar className="text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500">Exam Details</p>
                    <p className="font-medium">{paper.year} • {paper.examType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FiClock className="text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-medium">{paper.duration}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiDownload className="mr-1" />
                    <span>{paper.downloads} downloads</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiAward className="mr-1" />
                    <span>{paper.maxMarks} marks</span>
                  </div>
                </div>
                <button
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    paper.available
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!paper.available}
                >
                  {paper.available ? (
                    <>
                      <FiDownload size={16} />
                      Download
                    </>
                  ) : (
                    <>
                      <FiAlertCircle size={16} />
                      Unavailable
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}