// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Analytics is optional - only initialize if needed
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Validate Firebase configuration
const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredConfigKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  console.error('❌ Firebase configuration error: Missing required keys:', missingKeys);
  console.error('Please check your .env file and ensure all REACT_APP_FIREBASE_* variables are set.');
  console.error('Current config values:', Object.keys(firebaseConfig).map(key => ({
    key,
    value: firebaseConfig[key] ? 'SET' : 'MISSING',
    length: firebaseConfig[key]?.length || 0
  })));
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  if (process.env.NODE_ENV === 'development' && !missingKeys.length) {
    console.log('✅ Firebase app initialized successfully');
    console.log('📋 Project ID:', firebaseConfig.projectId);
    console.log('🌐 Auth Domain:', firebaseConfig.authDomain);
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  console.error('Please verify your Firebase configuration in .env file');
  throw error;
}

// Initialize Analytics only if measurementId exists and is valid
// Uncomment this if you need analytics:
// if (firebaseConfig.measurementId) {
//   const analytics = getAnalytics(app);
// }

// Initialize Auth with error handling
let auth;
try {
  auth = getAuth(app);
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Firebase Auth initialized');
  }
} catch (error) {
  console.error('❌ Firebase Auth initialization failed:', error.message);
  console.error('');
  console.error('🔧 TROUBLESHOOTING: auth/configuration-not-found error');
  console.error('');
  console.error('This error usually means Firebase Authentication is not enabled in Firebase Console.');
  console.error('');
  console.error('📝 To fix this, please:');
  console.error('1. Go to https://console.firebase.google.com/');
  console.error(`2. Select your project: ${firebaseConfig.projectId || 'YOUR_PROJECT_ID'}`);
  console.error('3. Click "Authentication" in the left sidebar');
  console.error('4. Click "Get started" (if you see it)');
  console.error('5. Go to the "Sign-in method" tab');
  console.error('6. Click on "Email/Password"');
  console.error('7. Toggle "Enable" to ON');
  console.error('8. Click "Save"');
  console.error('');
  console.error('After enabling, wait a few seconds and refresh your app.');
  throw error;
}

export { auth };