import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../redux/hooks";
import { loginUser } from "../actions/userActions";
import { setUserData } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton"; // Assuming this is a separate component for Google login


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const data = { email, password };
    
    try {
      const response = await loginUser(data);

      if (response.ok) {
        dispatch(setUserData(response.user));
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error("Login Failed");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Login Failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

     {/* Google Login Button */}
     <GoogleLoginButton />

     <div className="flex items-center justify-center m-8">
          <hr className="w-full border-t-1 border-gray-300" />
          <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-600">OR</span>
        </div>

        {/* Login Form */}
        <form onSubmit={onFormSubmit}>
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
              type={isLoggingIn ? 'password' : 'text'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-sm">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-600">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className={`w-full p-3 bg-blue-600 text-white rounded-md ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging In..." : "Login"}
          </button>
        </form>

    

   

        <div className="w-full text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
