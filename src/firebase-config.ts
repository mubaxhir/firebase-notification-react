import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCApfZ6a-HAszCNwoQ9UxvDNpqqjkPHpwM",
    authDomain: "notification-app-23490.firebaseapp.com",
    projectId: "notification-app-23490",
    storageBucket: "notification-app-23490.appspot.com",
    messagingSenderId: "163310060597",
    appId: "1:163310060597:web:3de4c668253f08f4b59d7c",
    measurementId: "G-VCDJZF7JTH"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

// Connect to Firebase Emulators if running locally
if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}

export { db, auth, functions };
