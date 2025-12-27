import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

const Login = ({ onClose, setUser }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // ✅ Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const userData = { email: user.email, username: user.displayName };
      
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Update the state
      setUser(userData);
  
      toast.success(`Welcome, ${user.displayName}!`);
      onClose();
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      toast.error(error.message);
    }
  };
  
  const handleAuth = async () => {
    try {
      if (!email || !password) {
        toast.error("Email and Password are required");
        return;
      }
  
      let userCredential;
      if (isSignup) {
        if (!username) {
          toast.error("Please enter a username");
          return;
        }
  
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: username });
  
        // Save user to localStorage
        const userData = { email: user.email, username };
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
  
      const user = userCredential.user;
      const userData = { email: user.email, username: user.displayName || localStorage.getItem("username") };
  
      // Update user state and localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
  
      toast.success(`${isSignup ? "Signup" : "Login"} successful! Welcome ${user.displayName || "User"}`);
      onClose();
    } catch (error) {
      console.error("Firebase Auth Error:", error.code, error.message);
      toast.error(error.message);
    }
  };
  
  return (
    <div className="p-4 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-20 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-900"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-900"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-900"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {/* ✅ Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-black text-black py-2 rounded-md hover:bg-gray-200 transition mt-3"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-600 text-sm text-center mt-3 cursor-pointer hover:underline"
        >
          {isSignup ? "Already have an account? Login" : "New user? Sign up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
