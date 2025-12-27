import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import GoogleAuthProvider

const firebaseConfig = {
  apiKey: "AIzaSyAyZiP52O4-Fn8Q8Z8NQaGpp5sheeFGOYU",
  authDomain: "newsmania-eb32b.firebaseapp.com",
  projectId: "newsmania-eb32b",
  storageBucket: "newsmania-eb32b.firebasestorage.app",
  messagingSenderId: "575693406305",
  appId: "1:575693406305:web:723652e4949b2a33856a20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Google provider instance

export { auth, googleProvider }; // Export provider
