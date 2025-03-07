'use client';
import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/libs/endpoints';
import { useAuth } from '@/context/AuthContext';
import { ImSpinner8 } from 'react-icons/im'; // Import a spinner icon

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [keepSignedIn, setKeepSignedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(5); // Countdown timer
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isModalOpen && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1); // Decrease countdown every second
      }, 1000);
    } else if (isModalOpen && countdown === 0) {
      router.push('/admin/dashboard'); // Redirect when countdown reaches 0
    }
    return () => clearTimeout(timer); // Cleanup timer
  }, [isModalOpen, countdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await adminLogin(email, password);
      if (response.success) {
        login(response.token, response.user); // Save the token and user data
        setIsModalOpen(true); // Show the success modal
      } else {
        setError(response.message || 'Login failed'); // Show error message
      }
    } catch (err) {
      setError('An error occurred. Please try again.'); // Handle unexpected errors
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle visibility
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-2 rounded-lg w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border custom-placeholder placeholder-gray-400 border-gray-200 rounded-3xl shadow-sm focus:outline-none focus:ring-gray-700 focus:border-gray-700 bg-transparent"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border custom-placeholder placeholder-gray-400 border-gray-200 rounded-3xl shadow-sm focus:outline-none focus:ring-gray-700 focus:border-gray-700 bg-transparent"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <FiEyeOff className="text-gray-500 hover:text-gray-700" />
              ) : (
                <FiEye className="text-gray-500 hover:text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* "Keep me signed in" and "Forgot password" row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="keepSignedIn"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
              className="h-4 w-4 text-[#000034] border-gray-300 rounded focus:ring-[#000034]"
            />
            <label htmlFor="keepSignedIn" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <a href="/forgot-password" className="text-sm text-[#000034] hover:underline font-bold">
            Forgot password?
          </a>
        </div>

        {/* Display error message */}
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full bg-[#000034] text-white py-2 px-4 rounded-3xl hover:bg-[#000034] focus:outline-none focus:ring-2 focus:ring-[#000034] focus:ring-offset-2"
        >
          Login
        </button>
      </form>

      {/* Modal for Successful Login */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md flex flex-col justify-center">
            <div className="bg-green-100 p-2 flex flex-col rounded-full w-min self-center">
              <div className="bg-green-300 p-2 self-center rounded-full w-min">
                <FaRegCheckCircle className="text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Sign In Successful</h3>
            <p className="text-gray-600 mb-4">
              You have successfully signed in as an Admin. You will be redirected shortly.
            </p>
            <div className="flex items-center justify-center gap-2">
              <ImSpinner8 className="animate-spin text-[#000034]" /> {/* Spinner */}
              <span className="text-sm text-gray-600">Redirecting in {countdown} seconds...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;