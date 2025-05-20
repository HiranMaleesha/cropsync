import React, { useState } from "react";
import { Leaf } from "lucide-react";
import { customSignInWithEmailAndPassword, signInWithGoogle } from '../../firebase/auth';
import axios from 'axios';
import { User } from "firebase/auth";

interface LoginProps {
  onLogin?: (role: "agent" | "farmer") => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const determineUserRole = async (uid: string) => {
    try {
      // First check if user exists in farmers collection
      const response = await axios.get(`http://localhost:5000/api/farmers/check/${uid}`);
      if (response.data.exists) {
        return "farmer";
      }
      // If not found in farmers collection, they must be an agent
      return "agent";
    } catch (err) {
      // If error checking farmers collection, assume they're an agent
      return "agent";
    }
  };

  const handleLoginClick = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Sign in with Firebase
      const user: User = await customSignInWithEmailAndPassword(email, password);
      
      // Determine user role based on Firebase UID
      const role = await determineUserRole(user.uid);
      
      onLogin?.(role);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const user: User = await signInWithGoogle();
      
      // Determine user role based on Firebase UID
      const role = await determineUserRole(user.uid);
      
      onLogin?.(role);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Leaf className="mx-auto h-12 w-auto text-green-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleLoginClick(); }}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
