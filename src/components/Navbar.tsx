import React from 'react';
import { UserDataProps } from '../types';
import { useNavigate } from 'react-router-dom'; // For navigation
import { useAppDispatch } from '../redux/hooks'; // Assuming you're using Redux to manage state
import { logoutUser } from '../actions/userActions'; // You should create an action for logging out
import { clearUserData } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';

interface NavbarProps {
  user: UserDataProps;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async() => {
    const res = await logoutUser() 
    dispatch(clearUserData())
    console.log(res, "form lgout")
    if(res.data.success){
        toast.success("Logged Out")
        navigate('/login'); 
    } else {
        toast.error("Error Loggin")
    }
};

  return (
    <nav className="flex sticky top-0 items-center justify-between bg-white shadow px-6 py-4">
      <h1 className="flex flex-1 text-3xl font-bold">
        Order Management App
      </h1>

      <div className="flex space-x-6 ml-6">
        <button className="text-gray-600 hover:text-gray-800">
          <span role="img" aria-label="Cart" className='hover:bg-gray-200 rounded-lg p-2'>🛒</span>
        </button>
      </div>

      <div className="ml-6 flex items-center space-x-4">
        <div className="flex flex-col items-center text-gray-700 hover:bg-gray-100 rounded-lg p-2">
          <div>{user.name.split(' ')[0]}</div>
          <div>{user.email}</div>
        </div>
        
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
