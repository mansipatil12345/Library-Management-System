import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Suspense, lazy, useState, useEffect } from 'react';

// Layout Components
const StudentNavbar = lazy(() => import('./components/StudentNavbar'));
const AdminNavbar = lazy(() => import('./components/AdminNavbar'));

// Auth Component
const AuthPage = lazy(() => import('./pages/Auth/AuthPage'));

// Student Components
const StudentHome = lazy(() => import('./pages/Student/Home'));
const StudentBooks = lazy(() => import('./pages/Student/Books'));
const StudentResearchPapers = lazy(() => import('./pages/Student/ResearchPapers'));
const QuestionPapers = lazy(() => import('./pages/Student/QuestionPapers'));
const MyLibrary = lazy(() => import('./pages/Student/MyLibrary'));
const Notifications = lazy(() => import('./pages/Student/Notifications'));
const Profile = lazy(() => import('./pages/Student/Profile'));
const Settings = lazy(() => import('./pages/Student/Settings'));

// Admin Components
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminBooks = lazy(() => import('./pages/Admin/Books'));
const AdminUsers = lazy(() => import('./pages/Admin/Users'));
const AdminReports = lazy(() => import('./pages/Admin/Reports'));
const AdminSettings = lazy(() => import('./pages/Admin/Settings'));

// Loading Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Error Boundary Component
const ErrorFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
      <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
      <p className="text-gray-700 mb-4">Please refresh the page or try again later</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();
  const [error, setError] = useState(null);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorFallback />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/home'} replace />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
};

// Layout Wrapper
const LayoutWrapper = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <Suspense fallback={null}>
          {user.role === 'student' ? <StudentNavbar /> : <AdminNavbar />}
        </Suspense>
      )}
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </main>
    </>
  );
};

// Main App Content
const AppContent = () => {
  return (
    <Routes>
      {/* Public Route - No Navbar */}
      <Route 
        path="/" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <AuthPage />
          </Suspense>
        } 
      />

      {/* Student Routes */}
      <Route path="/student/home" element={
        <ProtectedRoute requiredRole="student">
          <LayoutWrapper>
            <StudentHome />
          </LayoutWrapper>
        </ProtectedRoute>
      } />
      <Route path="/student/books" element={
        <ProtectedRoute requiredRole="student">
          <LayoutWrapper>
            <StudentBooks />
          </LayoutWrapper>
        </ProtectedRoute>
      } />
      <Route path="/student/research-papers" element={
        <ProtectedRoute requiredRole="student">
          <LayoutWrapper>
            <StudentResearchPapers />
          </LayoutWrapper>
        </ProtectedRoute>
      } />
      <Route path="/student/question-papers" element={
  <ProtectedRoute requiredRole="student">
    <LayoutWrapper>
      <QuestionPapers />
    </LayoutWrapper>
  </ProtectedRoute>
} />
<Route path="/student/my-library" element={
  <ProtectedRoute requiredRole="student">
    <LayoutWrapper>
      <MyLibrary />
    </LayoutWrapper>
  </ProtectedRoute>
} />
<Route path="/student/notifications" element={
  <ProtectedRoute requiredRole="student">
    <LayoutWrapper>
      <Notifications />
    </LayoutWrapper>
  </ProtectedRoute>
} />
<Route path="/student/profile" element={
  <ProtectedRoute requiredRole="student">
    <LayoutWrapper>
      <Profile />
    </LayoutWrapper>
  </ProtectedRoute>
} />
<Route path="/student/settings" element={
  <ProtectedRoute requiredRole="student">
    <LayoutWrapper>
      <Settings />
    </LayoutWrapper>
  </ProtectedRoute>
} />
      

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <LayoutWrapper>
            <AdminDashboard />
          </LayoutWrapper>
        </ProtectedRoute>
      } />
      <Route path="/admin/books" element={
        <ProtectedRoute requiredRole="admin">
          <LayoutWrapper>
            <AdminBooks />
          </LayoutWrapper>
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute requiredRole="admin">
          <LayoutWrapper>
            <AdminUsers />
          </LayoutWrapper>
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute requiredRole="admin">
          <LayoutWrapper>
            <AdminReports />
          </LayoutWrapper>
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute requiredRole="admin">
          <LayoutWrapper>
            <AdminSettings />
          </LayoutWrapper>
        </ProtectedRoute>
      } />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <Toaster position="top-right" />
          <Suspense fallback={<LoadingSpinner />}>
            <AppContent />
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}