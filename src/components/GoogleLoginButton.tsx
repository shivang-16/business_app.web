import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../redux/hooks";
import { setUserData } from "../redux/slices/userSlice";
import { googleLogin } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import googleIcon from "../assets/google-icon.svg";

const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      setIsLoading(true);
      try {
        const data = { access_token: credentialResponse.access_token };
        console.log(data, "hre is repso")

        const res = await googleLogin(data);

        console.log(res, "here")
        dispatch(setUserData(res.data.user));

        if (res.data.success) {
          navigate("/");
          toast.success(res.message);
        } else {
          toast.error('Google login failed!');
        }
      } catch (error: any) {
        console.error("Axios error:", error);
        toast.error("Google login failed!");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error: any) => {
      console.error("Google login error:", error);
      toast.error("Google login failed!");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="flex items-center justify-center w-full h-12 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 text-gray-700 font-semibold text-lg lg:text-xl gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img
            src={googleIcon}
            alt="Google Icon"
            className="w-5 h-5"
          />
          Sign in with Google
        </>
      )}
    </button>
  );
};

export default GoogleLoginButton;
