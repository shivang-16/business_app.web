
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { signUpUser } from "../actions/userActions"; 
import { Link } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton"; 
import { OTPModal } from "../components/otpModal";


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [formEmail, setFormEmail] = useState('')
  
  
    const onFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
  
      setIsSigningUp(true);
  
      const data = { name, email, password };
      setFormEmail(email)
  
      try {
        const response = await signUpUser(data);
  
        if (response.status) {
          toast.success("Signup Successful! Please verify your email.");
          setShowOtpModal(true); 
        } else {
          toast.error("Signup Failed");
        }
      } catch (error: any) {
        console.log(error);
        toast.error("Signup Failed");
      } finally {
        setIsSigningUp(false);
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
  
          {/* Google Login Button */}
          <GoogleLoginButton />
  
          <div className="flex items-center justify-center m-4">
            <hr className="w-full border-t-1 border-gray-300" />
            <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-600">OR</span>
          </div>
  
          {/* Signup Form */}
          <form onSubmit={onFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your name"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your email"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your password"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Confirm your password"
              />
            </div>
  
            <button
              type="submit"
              className={`w-full p-3 bg-blue-600 text-white rounded-md ${isSigningUp ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSigningUp}
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
  
          <div className="w-full text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">Login</Link>
            </p>
          </div>
        </div>
  
        {/* OTP Modal */}
        {showOtpModal && <OTPModal email={formEmail} onClose={() => setShowOtpModal(false)} />}
      </div>
    );
  };
  
  export default Signup;