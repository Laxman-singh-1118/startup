import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAllUsers: () => Promise<any[]>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      if (!auth) {
        throw new Error('Firebase is not initialized. Please check your configuration.');
      }
      
      console.log('Attempting to sign up user:', email);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', result.user.uid);
      await updateProfile(result.user, { displayName });
      console.log('Profile updated with display name:', displayName);

      // Store user data in Firestore for admin access
      const userRole = displayName.includes('(admin)') ? 'admin' : 'student';
      const cleanDisplayName = displayName.replace(/\s*\([^)]*\)/, '');

      if (db) {
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          displayName: cleanDisplayName,
          role: userRole,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });

        console.log('User data stored in Firestore');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setFirebaseError(error.message);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      if (!auth) {
        throw new Error('Firebase is not initialized. Please check your configuration.');
      }
      
      console.log('Attempting to login user:', email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      
      // Update last login time in Firestore and create record if doesn't exist
      if (auth.currentUser && db) {
        const user = auth.currentUser;
        const userRole = user.displayName?.includes('(admin)') ? 'admin' : 'student';
        const cleanDisplayName = user.displayName?.replace(/\s*\([^)]*\)/, '') || user.email || '';
        
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: cleanDisplayName,
          role: userRole,
          lastLogin: new Date().toISOString(),
          createdAt: user.metadata.creationTime || new Date().toISOString()
        }, { merge: true });
        
        console.log('User data updated in Firestore');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setFirebaseError(error.message);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    if (!auth) {
      console.error('Firebase auth not initialized');
      return Promise.resolve();
    }
    return signOut(auth);
  };

  const getAllUsers = async () => {
    try {
      if (!db) {
        console.error('Firebase Firestore not initialized');
        return [];
      }
      
      console.log('Fetching all users from Firestore');
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', 'student'));
      const querySnapshot = await getDocs(q);

      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Fetched users:', users);
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  useEffect(() => {
    if (!auth) {
      console.error('Firebase auth not initialized');
      setLoading(false);
      setFirebaseError('Firebase is not properly configured. Please check your environment variables.');
      return;
    }
    
    console.log('Setting up Firebase auth state listener');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? `User logged in: ${user.email}` : 'No user');
      setCurrentUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth state listener error:', error);
      setFirebaseError(error.message);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    getAllUsers,
    loading,
    firebaseError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 