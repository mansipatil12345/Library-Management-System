import { useState } from 'react';
import { FiBook, FiFileText, FiSend } from 'react-icons/fi';

function Request() {
  const [requestType, setRequestType] = useState('book');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    year: '',
    description: '',
    reason: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Request New Items</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                  requestType === 'book'
                    ? 'bg-primary text-white'
                    : 'border hover:bg-gray-50'
                }`}
                onClick={() => setRequestType('book')}
              >
                <FiBook />
                Book
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                  requestType === 'research_paper'
                    ? 'bg-primary text-white'
                    : 'border hover:bg-gray-50'
                }`}
                onClick={() => setRequestType('research_paper')}
              >
                <FiFileText />
                Research Paper
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Request
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <FiSend />
                Submit Request
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Request Guidelines</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Provide accurate and complete information</li>
              <li>• Check if the item already exists in the library</li>
              <li>• Allow up to 7 days for request processing</li>
              <li>• You can track request status in My Library</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Requests</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiBook className="text-gray-400" />
                  <h3 className="font-medium">Clean Architecture</h3>
                </div>
                <p className="text-sm text-gray-500">Status: Under Review</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiFileText className="text-gray-400" />
                  <h3 className="font-medium">Machine Learning Survey</h3>
                </div>
                <p className="text-sm text-gray-500">Status: Approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Request;