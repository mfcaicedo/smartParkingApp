import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyALxmN1HbJuJpok77pIchzNL4q1MALNrWg',
  authDomain: 'mfcaicedo-afd34.firebaseapp.com',
  projectId: 'mfcaicedo-afd34',
  storageBucket: 'mfcaicedo-afd34.appspot.com',
  messagingSenderId: '621929313026',
  appId: '1:621929313026:web:1168ef0f7aa4e426c7081b',
  measurementId: 'G-G1Z4S02B36',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
