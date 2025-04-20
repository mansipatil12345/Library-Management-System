import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsS_3eIhNQdK5zPXnjchxW-WUrZi6Gl7U",
  authDomain: "library-51cd8.firebaseapp.com",
  projectId: "library-51cd8",
  storageBucket: "library-51cd8.appspot.com",
  messagingSenderId: "142075073971",
  appId: "1:142075073971:web:1bb9387910a2200ba5e7c6",
  measurementId: "G-VFZCJJ884X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          role: firebaseUser.email.includes('@admin') ? 'admin' : 'student'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      setUser({
        email: user.email,
        uid: user.uid,
        role: email.includes('@admin') ? 'admin' : 'student'
      });
      
      toast.success('Login successful!');
      
      // Redirect based on role
      if (email.includes('@admin')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/home');
      }
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    }
  };

  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      setUser({
        email: user.email,
        uid: user.uid,
        name,
        role: 'student' // Default role for new registrations
      });
      
      toast.success('Account created successfully!');
      navigate('/student/home');
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return 'Authentication failed. Please try again.';
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}