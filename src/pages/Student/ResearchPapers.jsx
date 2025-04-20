import { useState } from 'react';
import {
  BookOpen,
  Filter,
  Search,
  Download,
  ExternalLink,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Bookmark,
  Share2,
  TrendingUp,
  GraduationCap,
  Clock,
  BookMarked,
  SlidersHorizontal,
  FileText,
  Star,
  ArrowUpRight,
  BarChart3
} from 'lucide-react';

export default function ResearchPapers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAbstracts, setExpandedAbstracts] = useState([]);
  const [activeDomain, setActiveDomain] = useState('All');
  const [savedPapers, setSavedPapers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');

  const papers = [
    {
      id: 1,
      title: 'Deep Learning Approaches in Mobile Edge Computing',
      authors: ['Sarah Johnson', 'Michael Chen'],
      domain: 'Computer Science',
      year: '2024',
      journal: 'IEEE Transactions on Neural Networks',
      citations: 45,
      abstract: 'This comprehensive study explores the integration of deep learning models in mobile edge computing environments, focusing on optimization techniques for resource-constrained devices and real-time processing requirements. Our findings demonstrate significant improvements in latency and energy efficiency.',
      doi: '10.1109/TNN.2024.0001',
      available: true,
      downloads: 512,
      trending: true,
      rating: 4.8,
      readingTime: '15 min'
    },
    {
      id: 2,
      title: 'Quantum Computing: A New Paradigm in Cryptography',
      authors: ['David Smith', 'Emma Wilson'],
      domain: 'Computer Science',
      year: '2023',
      journal: 'Nature Quantum Computing',
      citations: 89,
      abstract: 'An analysis of quantum computing applications in modern cryptographic systems reveals groundbreaking potential for secure communication protocols. This paper presents novel approaches to quantum-resistant encryption methods.',
      doi: '10.1038/QC.2023.0123',
      available: true,
      downloads: 784,
      trending: true,
      rating: 4.9,
      readingTime: '20 min'
    },
    {
      id: 3,
      title: 'Sustainable Energy Systems: A Comprehensive Review',
      authors: ['Robert Brown', 'Lisa Davis'],
      domain: 'Engineering',
      year: '2024',
      journal: 'Renewable Energy Journal',
      citations: 32,
      abstract: 'This review paper discusses recent advances in sustainable energy systems, highlighting innovative approaches to grid integration and storage solutions. The research presents case studies from successful implementations worldwide.',
      doi: '10.1016/REJ.2024.0045',
      available: false,
      downloads: 321,
      trending: false,
      rating: 4.5,
      readingTime: '25 min'
    }
  ];

  const domains = ['All', 'Computer Science', 'Engineering', 'Physics', 'Biology', 'Mathematics'];
  const years = ['All', '2024', '2023', '2022', '2021'];
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'citations', label: 'Most Cited' },
    { value: 'downloads', label: 'Most Downloaded' },
    { value: 'date', label: 'Latest' }
  ];

  const toggleAbstract = (id) => {
    setExpandedAbstracts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSave = (id) => {
    setSavedPapers(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredPapers = papers
    .filter(p => activeDomain === 'All' ? true : p.domain === activeDomain)
    .filter(p => selectedYear === 'All' ? true : p.year === selectedYear)
    .sort((a, b) => {
      switch (sortBy) {
        case 'citations':
          return b.citations - a.citations;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'date':
          return b.year.localeCompare(a.year);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Research Papers
                </h1>
                <p className="text-sm text-gray-500">
                  {filteredPapers.length} papers available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch md:self-auto w-full md:w-auto">
              <div className="relative flex-1 md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search papers, authors, or keywords..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg border ${
                  showFilters 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                <select
                  value={activeDomain}
                  onChange={(e) => setActiveDomain(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <FileText className="w-5 h-5" />, label: 'Total Papers', value: '2.5K+', trend: '+125 this month', color: 'blue' },
            { icon: <Users className="w-5 h-5" />, label: 'Authors', value: '500+', trend: '+45 new', color: 'green' },
            { icon: <BarChart3 className="w-5 h-5" />, label: 'Citations', value: '15K+', trend: '+2.3K this year', color: 'purple' },
            { icon: <Download className="w-5 h-5" />, label: 'Downloads', value: '50K+', trend: '+5K this month', color: 'amber' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Papers List */}
        <div className="space-y-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    {/* Title and Badges */}
                    <div className="flex flex-wrap items-start gap-3 mb-4">
                      <h2 className="text-xl font-bold text-gray-900 flex-1 hover:text-blue-600 transition-colors">
                        {paper.title}
                      </h2>
                      <div className="flex gap-2">
                        {paper.trending && (
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1
                            ${paper.available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          <Clock className="w-3 h-3" />
                          {paper.available ? 'Available' : 'Restricted'}
                        </span>
                      </div>
                    </div>

                    {/* Paper Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{paper.authors.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{paper.journal} • {paper.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-gray-600">{paper.rating} rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{paper.readingTime} read</span>
                      </div>
                    </div>

                    {/* Abstract */}
                    <div className="mb-4">
                      <p className={`text-gray-700 ${expandedAbstracts.includes(paper.id) ? '' : 'line-clamp-2'}`}>
                        {paper.abstract}
                      </p>
                      <button
                        onClick={() => toggleAbstract(paper.id)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                      >
                        {expandedAbstracts.includes(paper.id) ? (
                          <>
                            <span>Show less</span>
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Read more</span>
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Stats and Links */}
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Download className="w-4 h-4 text-blue-500" />
                        <span>{paper.downloads} downloads</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ArrowUpRight className="w-4 h-4 text-blue-500" />
                        <span>{paper.citations} citations</span>
                      </div>
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-4 h-4" />
                        DOI: {paper.doi}
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 min-w-[140px]">
                    <button
                      disabled={!paper.available}
                      className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        paper.available
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button
                      onClick={() => toggleSave(paper.id)}
                      className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        savedPapers.includes(paper.id)
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {savedPapers.includes(paper.id) ? (
                        <>
                          <BookMarked className="w-4 h-4" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4" />
                          Save
                        </>
                      )}
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-all">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPapers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No papers found</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              We couldn't find any papers matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setActiveDomain('All');
                setSelectedYear('All');
                setSortBy('relevance');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredPapers.length > 0 && (
          <div className="flex justify-center mt-10">
            <button className="group px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium shadow-sm transition-all hover:shadow-md hover:border-gray-300 flex items-center gap-2">
              Load More Papers
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}