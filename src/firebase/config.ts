import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Enhanced debugging for production
console.log('Environment Variables Check:', {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing',
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing',
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'
});

// Check if all required config values are present
const missingConfigs = Object.entries(firebaseConfig).filter(([key, value]) => !value);

if (missingConfigs.length > 0) {
  console.error('Missing Firebase configuration:', missingConfigs.map(([key]) => key));
  
  // Show user-friendly error message
  const errorMessage = `Firebase configuration is missing. Please check your environment variables. Missing: ${missingConfigs.map(([key]) => key).join(', ')}`;
  
  // Create a visible error message on the page
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ef4444;
    color: white;
    padding: 1rem;
    text-align: center;
    z-index: 9999;
    font-family: Arial, sans-serif;
  `;
  errorDiv.innerHTML = `
    <strong>Configuration Error:</strong> ${errorMessage}
    <br><small>Please check your environment variables in Netlify.</small>
  `;
  document.body.appendChild(errorDiv);
}

// Initialize Firebase only if config is valid
let app;
let auth;
let db;
let storage;

try {
  if (missingConfigs.length === 0) {
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized successfully');
    
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    console.log('Firebase services initialized:', { auth: !!auth, db: !!db, storage: !!storage });
  } else {
    console.warn('Firebase not initialized due to missing configuration');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export { auth, db, storage };
export default app; 