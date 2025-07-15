import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiBook,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiDownload,
} from "react-icons/fi";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    publication_date: "",
    copies_owned: "",
    category_id: "",
    author_ids: [],
    authorIdsInput: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  const categories = [
    "All",
    "Programming",
    "Computer Science",
    "Web Development",
    "Mathematics",
    "Fiction",
  ];

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      toast.error("Failed to fetch books");
    }
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.join(", ").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || book.category_name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedAuthorIds = formData.authorIdsInput
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "")
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));

    try {
      const finalData = { ...formData, author_ids: processedAuthorIds };
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/books/${editBookId}`,
          finalData
        );
        toast.success("Book updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/books", finalData);
        toast.success("Book added successfully");
      }
      fetchBooks();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book");
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Book{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-gray-600">Manage your library's book collection</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              title: "",
              publication_date: "",
              copies_owned: "",
              category_id: "",
              author_ids: [],
              authorIdsInput: "",
            });
            setIsEdit(false);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <FiPlus size={18} />
          Add New Book
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search books..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category.toLowerCase() === "all" ? "all" : category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all">
            <FiDownload size={18} />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Authors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Copies
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.book_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {book.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {book.authors.join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {book.category_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.publication_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.copies_owned}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => {
                            setFormData({
                              title: book.title,
                              publication_date: book.publication_date,
                              copies_owned: book.copies_owned,
                              category_id: book.category_id || "",
                              author_ids: book.author_ids || [],
                              authorIdsInput: book.author_ids
                                ? book.author_ids.join(", ")
                                : "",
                            });
                            setIsEdit(true);
                            setEditBookId(book.book_id);
                            setShowModal(true);
                          }}
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={async () => {
                            try {
                              await axios.delete(
                                `http://localhost:5000/api/books/${book.book_id}`
                              );
                              toast.success("Book deleted successfully");
                              fetchBooks();
                            } catch (error) {
                              console.error("Error deleting book:", error);
                              toast.error("Failed to delete book");
                            }
                          }}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No books found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Book" : "Add New Book"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="date"
                placeholder="Publication Date"
                value={formData.publication_date}
                onChange={(e) =>
                  setFormData({ ...formData, publication_date: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Copies Owned"
                value={formData.copies_owned}
                onChange={(e) =>
                  setFormData({ ...formData, copies_owned: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Category ID"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Author IDs (comma separated)"
                value={formData.authorIdsInput}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorIdsInput: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {isEdit ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
