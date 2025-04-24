import React, { useState } from "react";
import { Leaf } from "lucide-react";
import { customSignInWithEmailAndPassword, signInWithGoogle } from '../../firebase/auth';


interface LoginProps {
  onLogin?: (role: "agent" | "farmer") => void; // Marked as optional with ?
}


export function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<"agent" | "farmer">("agent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "farmer" || value === "agent") {
      setSelectedRole(value);
    }
  };

  const handleLoginClick = async () => {
    try {
      await customSignInWithEmailAndPassword(email, password);
      onLogin?.(selectedRole); // Optional chaining used here
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onLogin?.(selectedRole); // Optional chaining used here
    } catch (err: any) {
      setError(err.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
            <Leaf color="white" size={28} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          CropSync
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Agricultural Data Collection and Analysis System
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Login As
              </label>
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option value="agent">Agricultural Agent</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleLoginClick}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Google Login Button */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in with Google
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Language</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button type="button" className="btn-lang">English</button>
              <button type="button" className="btn-lang">සිංහල</button>
              <button type="button" className="btn-lang">தமிழ்</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
