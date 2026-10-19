const path = require('path');
const admin = require('firebase-admin');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      console.log('✅ Firebase Admin initialized');
    } else {
      console.warn('⚠️ Firebase Admin credentials not fully configured in backend .env');
    }
  } catch (error) {
    console.error('❌ Firebase Admin initialization error:', error.message);
  }
}

module.exports = admin;
