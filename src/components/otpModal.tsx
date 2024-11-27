import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../actions/userActions";
import toast from "react-hot-toast";

export const OTPModal = ({ email, onClose }: { email: string, onClose: () => void }) => {
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
  
    const navigate = useNavigate();
  
    const verifyOtp = async () => {
      setIsVerifying(true);
      try {
        const response = await verifyUser( email, otp );
  
        const data = response.data;
  
        if (data.success) {
          toast.success("OTP Verified");
          onClose(); 
          navigate("/", { replace: true });
        } else {
          toast.error("Invalid OTP");
        }
      } catch (error) {
        toast.error("Verification Failed");
      } finally {
        setIsVerifying(false);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-lg w-96">
          <h3 className="text-xl font-bold text-center mb-4">Enter OTP</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Enter the OTP sent to your email"
            maxLength={6}
          />
          <div className="flex justify-between items-center">
            <button
              onClick={verifyOtp}
              className={`bg-blue-600 text-white py-2 px-4 rounded-md ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>
            <button onClick={onClose} className="text-sm text-blue-600">Close</button>
          </div>
        </div>
      </div>
    );
  };