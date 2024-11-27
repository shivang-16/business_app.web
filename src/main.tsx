import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import './index.css';
import App from './App.tsx';
import { makeStore } from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = makeStore(); 

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID 
console.log(clientId, "here")

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}> 
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
