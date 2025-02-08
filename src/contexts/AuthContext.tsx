import { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import axios from 'axios';

interface User extends FirebaseUser {
  isAdmin?: boolean;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get the ID token
          const token = await firebaseUser.getIdToken();
          
          // Get user data from our backend
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Merge Firebase user with our backend user data
          setUser({
            ...firebaseUser,
            isAdmin: response.data.isAdmin,
            displayName: response.data.displayName || firebaseUser.displayName || ''
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters long');
    }

    try {
      // Register user in our backend first
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        email,
        password,
        displayName
      });

      // After successful backend registration, sign in
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email is already registered');
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters');
      }
      if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Email/Password sign up is not enabled. Please contact support.');
      }
      // If it's a backend error
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      // If it's a generic error
      throw new Error(error.message || 'Failed to create account. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 