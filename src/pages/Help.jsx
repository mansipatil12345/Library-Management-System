import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      category: 'General',
      questions: [
        {
          id: 'g1',
          question: 'How do I borrow a book?',
          answer: 'To borrow a book, search for it in the Books section, check its availability, and click on the "Reserve" button. Once approved, you can collect the book from the library desk.',
        },
        {
          id: 'g2',
          question: 'What is the maximum number of items I can borrow?',
          answer: 'Students can borrow up to 5 books and access 3 research papers simultaneously.',
        },
        {
          id: 'g3',
          question: 'How long can I keep borrowed items?',
          answer: 'Books can be borrowed for 14 days, and research papers can be accessed for 7 days. You can renew items if no one else has requested them.',
        },
      ],
    },
    {
      id: 2,
      category: 'Fines & Payments',
      questions: [
        {
          id: 'f1',
          question: 'What are the late return charges?',
          answer: 'Late return charges are ₹10 per day for books and ₹5 per day for research papers.',
        },
        {
          id: 'f2',
          question: 'How can I pay my fines?',
          answer: 'Fines can be paid online through the My Library section or at the library desk.',
        },
      ],
    },
    {
      id: 3,
      category: 'Technical Support',
      questions: [
        {
          id: 't1',
          question: 'I cannot access research papers. What should I do?',
          answer: 'First, check if you have active subscriptions. If the issue persists, contact technical support at support@library.edu.',
        },
        {
          id: 't2',
          question: 'How do I reset my password?',
          answer: 'Click on the "Forgot Password" link on the login page and follow the instructions sent to your registered email.',
        },
      ],
    },
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>

      <div className="relative">
        <input
          type="text"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibol

d mb-4">Need Immediate Help?</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Contact Library Desk</h3>
                <p className="text-gray-600 mb-2">Available: Mon-Fri, 9 AM - 5 PM</p>
                <button className="btn-primary">Call Now</button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Email Support</h3>
                <p className="text-gray-600 mb-2">Response within 24 hours</p>
                <button className="btn-primary">Send Email</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                Borrowing Guide
              </button>
              <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                Fine Calculator
              </button>
              <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                Library Rules
              </button>
              <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                User Manual
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFaqs.map((category) => (
              <div key={category.id}>
                <h3 className="font-medium text-gray-700 mb-2">{category.category}</h3>
                <div className="space-y-2">
                  {category.questions.map((faq) => (
                    <div
                      key={faq.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        <span className="font-medium">{faq.question}</span>
                        {expandedFaq === faq.id ? (
                          <FiChevronUp className="text-gray-400" />
                        ) : (
                          <FiChevronDown className="text-gray-400" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="p-4 bg-gray-50 border-t">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;