import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import Books from './pages/Books';
import ResearchPapers from './pages/ResearchPapers';
import QuestionPapers from './pages/QuestionPapers';
import MyLibrary from './pages/MyLibrary';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Help from './pages/Help';
import Request from './pages/Request';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for existing auth token
    return Boolean(localStorage.getItem('authToken'));
  });

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {isAuthenticated && <Navbar />}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            {/* Authentication Route */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <AuthPage setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/books"
              element={
                isAuthenticated ? <Books /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/research-papers"
              element={
                isAuthenticated ? (
                  <ResearchPapers />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/question-papers"
              element={
                isAuthenticated ? (
                  <QuestionPapers />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/my-library"
              element={
                isAuthenticated ? <MyLibrary /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/notifications"
              element={
                isAuthenticated ? (
                  <Notifications />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/help"
              element={
                isAuthenticated ? <Help /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/request"
              element={
                isAuthenticated ? <Request /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;