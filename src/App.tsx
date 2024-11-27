import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import Home from './pages/Home';
import Signup from './pages/Signup';
import { useEffect } from 'react';
import { getUser } from './actions/userActions';
import { setUserData } from './redux/slices/userSlice';
import { UserDataProps } from './types';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthenticated } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    (async () => {
      const {data} = await getUser() as { data: {user: UserDataProps} };
      console.log(data, "here");
      if (data && data.user) {
        dispatch(setUserData(data.user)); 
      }
    })();
  }, [dispatch]); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
        <Route path='/login' element={isAuthenticated ? <Home /> : <Login />} />
        <Route path='/signup' element={isAuthenticated ? <Home /> : <Signup />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
