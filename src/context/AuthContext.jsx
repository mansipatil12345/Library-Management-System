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


// ======================================================
// FIREBASE CONFIGURATION
// ======================================================

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


// ======================================================
// INITIALIZE FIREBASE
// ======================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ======================================================
// ADMIN EMAILS
// ======================================================
//
// Put the email address that should have admin access here.
//
// Everyone else will automatically be treated as a student.
//
// Example:
// const ADMIN_EMAILS = [
//   'admin@gmail.com'
// ];
//
// ======================================================

const ADMIN_EMAILS = [
  'patilmansi7722@gmail.com'
];


// ======================================================
// AUTH CONTEXT
// ======================================================

const AuthContext = createContext();


// ======================================================
// AUTH PROVIDER
// ======================================================

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  // ====================================================
  // GET USER ROLE
  // ====================================================

  const getUserRole = (email) => {

    if (!email) {
      return 'student';
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (ADMIN_EMAILS.includes(normalizedEmail)) {
      return 'admin';
    }

    return 'student';
  };


  // ====================================================
  // AUTH STATE LISTENER
  // ====================================================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {

        if (firebaseUser) {

          const role = getUserRole(firebaseUser.email);

          setUser({
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            role: role
          });

        } else {

          setUser(null);

        }

        setLoading(false);
      }
    );


    // Cleanup listener
    return () => unsubscribe();

  }, []);


  // ====================================================
  // LOGIN
  // ====================================================

  const login = async (email, password) => {

    try {

      // Remove accidental spaces
      email = email.trim();

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const firebaseUser = userCredential.user;

      // Determine role
      const role = getUserRole(firebaseUser.email);


      // Save user in React state
      setUser({
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || '',
        role: role
      });


      toast.success('Login successful!');


      // ==================================================
      // REDIRECT BASED ON ROLE
      // ==================================================

      if (role === 'admin') {

        navigate('/admin/dashboard');

      } else {

        navigate('/student/home');

      }

    } catch (error) {

      console.error('Login error:', error);

      toast.error(
        getErrorMessage(error.code)
      );

    }
  };


  // ====================================================
  // REGISTER
  // ====================================================

  const register = async (name, email, password) => {

    try {

      email = email.trim();

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const firebaseUser = userCredential.user;


      // Determine role
      //
      // IMPORTANT:
      // Normal users = student
      // Admin email = admin

      const role = getUserRole(firebaseUser.email);


      // Save user in React state
      setUser({
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        name: name,
        role: role
      });


      toast.success(
        'Account created successfully!'
      );


      // ==================================================
      // REDIRECT BASED ON ROLE
      // ==================================================

      if (role === 'admin') {

        navigate('/admin/dashboard');

      } else {

        navigate('/student/home');

      }

    } catch (error) {

      console.error('Registration error:', error);

      toast.error(
        getErrorMessage(error.code)
      );

    }
  };


  // ====================================================
  // LOGOUT
  // ====================================================

  const logout = async () => {

    try {

      await signOut(auth);

      setUser(null);

      navigate('/');

      toast.success(
        'Logged out successfully!'
      );

    } catch (error) {

      console.error('Logout error:', error);

      toast.error(
        'Failed to log out'
      );

    }
  };


  // ====================================================
  // FIREBASE ERROR MESSAGES
  // ====================================================

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

      case 'auth/invalid-credential':
        return 'Invalid email or password';

      case 'auth/email-already-in-use':
        return 'Email already in use';

      case 'auth/weak-password':
        return 'Password should be at least 6 characters';

      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';

      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';

      case 'auth/operation-not-allowed':
        return 'Email/password authentication is not enabled in Firebase.';

      default:
        return 'Authentication failed. Please try again.';
    }
  };


  // ====================================================
  // CONTEXT VALUE
  // ====================================================

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };


  // ====================================================
  // PROVIDER
  // ====================================================

  return (
    <AuthContext.Provider value={value}>

      {!loading && children}

    </AuthContext.Provider>
  );
}


// ======================================================
// CUSTOM AUTH HOOK
// ======================================================

export function useAuth() {

  return useContext(AuthContext);

}