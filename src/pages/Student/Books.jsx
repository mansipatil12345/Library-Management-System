import { useState } from 'react';
import { 
  FiBook, 
  FiFilter, 
  FiSearch, 
  FiStar, 
  FiClock,
  FiMapPin,
  FiChevronRight,
  FiBookmark,
  FiDownload,
  FiGrid,
  FiList,
  FiInfo,
  FiUser,
  FiCalendar
} from 'react-icons/fi';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

function Books() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savedBooks, setSavedBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  // Quick stats
  const stats = [
    {
      label: 'Total Books',
      value: '1000+',
      icon: FiBook,
      color: 'blue',
      trend: '+15 new arrivals'
    },
    {
      label: 'Available Now',
      value: '750',
      icon: FiGrid,
      color: 'green',
      trend: '75% of collection'
    },
    {
      label: 'Most Popular',
      value: 'Fiction',
      icon: FiStar,
      color: 'amber',
      trend: 'This month'
    }
  ];

  // Enhanced book data
  const books = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Psychology',
      available: true,
      rating: 4.8,
      copies: 5,
      availableCopies: 2,
      location: 'Floor 2, Shelf B12',
      coverUrl: 'https://m.media-amazon.com/images/I/51-uspgqWIL._SY425_.jpg',
      description: 'Tiny changes, remarkable results - build good habits and break bad ones',
      publishDate: '2018',
      pages: 320,
      language: 'English'
    },
    {
      id: 2,
      title: 'Dune',
      author: 'Frank Herbert',
      category: 'Science Fiction',
      available: true,
      rating: 4.7,
      copies: 3,
      availableCopies: 1,
      location: 'Floor 1, Shelf F05',
      coverUrl: 'https://m.media-amazon.com/images/I/41UZeCEKOBL._SY425_.jpg',
      description: 'Epic sci-fi saga set in a distant future amidst a feudal interstellar society',
      publishDate: '1965',
      pages: 412,
      language: 'English'
    },
    {
      id: 3,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      category: 'History',
      available: false,
      rating: 4.6,
      copies: 4,
      availableCopies: 0,
      location: 'Floor 3, Shelf A08',
      coverUrl: 'https://m.media-amazon.com/images/I/41+lolL22gL._SY425_.jpg',
      description: 'Brief history of humankind exploring evolution of our species',
      publishDate: '2014',
      pages: 443,
      language: 'English'
    }
  ];

  const categories = ['All', 'Psychology', 'Science Fiction', 'History', 'Computer Science', 'Biography'];

  const toggleSaveBook = (bookId) => {
    setSavedBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId) 
        : [...prev, bookId]
    );
  };

  const filteredBooks = activeCategory === 'All' 
    ? books 
    : books.filter(book => book.category === activeCategory);

  const BookCard = ({ book, viewMode }) => {
    const isGrid = viewMode === 'grid';
    
    return (
      <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group relative ${
        isGrid ? '' : 'flex'
      }`}>
        {/* Ribbon for unavailable books */}
        {!book.available && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 transform rotate-12 translate-x-2 -translate-y-1 z-10 shadow-md">
            Checked Out
          </div>
        )}
        
        {/* Book Cover with Save Button */}
        <div className={`relative ${isGrid ? 'h-64' : 'h-48 w-36'} overflow-hidden`}>
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x450?text=No+Cover';
            }}
          />
          
          {/* Save Book Button */}
          <button 
            onClick={() => toggleSaveBook(book.id)}
            className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
              savedBooks.includes(book.id)
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'bg-white/90 text-gray-700 hover:bg-blue-600/90 hover:text-white shadow-sm'
            }`}
          >
            {savedBooks.includes(book.id) ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          
          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1 bg-white/90 rounded-full text-sm font-medium shadow-sm">
            <FiStar className="text-amber-400" />
            <span>{book.rating}</span>
          </div>
        </div>
        
        {/* Book Details */}
        <div className={`p-5 ${isGrid ? '' : 'flex-1'}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2 font-medium">{book.author}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              book.availableCopies > 0 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
            }`}>
              {book.availableCopies > 0 ? `${book.availableCopies} Available` : '0 Available'}
            </span>
          </div>
          
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{book.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <FiCalendar className="mr-2 text-blue-500" />
              <span>{book.publishDate}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FiUser className="mr-2 text-green-500" />
              <span>{book.language}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FiMapPin className="mr-2 text-blue-500" />
            <span>{book.location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium text-gray-700">{book.availableCopies}</span>
              <span className="text-gray-400">/{book.copies} copies</span>
            </div>
            
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                book.availableCopies > 0
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed'
              }`}
              disabled={book.availableCopies <= 0}
            >
              <FiBook />
              {book.availableCopies > 0 ? 'Reserve Now' : 'Join Waitlist'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Digital <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Library</span>
          </h1>
          <p className="text-gray-600 mt-1">Discover and borrow from our vast collection</p>
        </div>

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
      <div className="bg-white rounded-2xl shadow-lg mb-8 border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-10 -z-10"></div>
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                className="w-full pl-12 pr-4 py-3 bg-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiList size={20} />
              </button>
              <button 
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <FiFilter />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-3 p-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} viewMode={viewMode} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-lg mt-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiBook className="text-3xl text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No books found</h3>
          <p className="text-gray-500 max-w-md text-center">
            We couldn't find any books matching your criteria. Try adjusting your filters.
          </p>
          <button 
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium shadow-md transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* View More Button */}
      {filteredBooks.length > 0 && (
        <div className="flex justify-center mt-10">
          <button className="group flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium shadow-sm transition-all hover:shadow-md">
            View More Books
            <FiChevronRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Books;