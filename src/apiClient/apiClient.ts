import axios from 'axios';

console.log(import.meta.env.VITE_PUBLIC_API_BASE_URL, "here base url")
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL || 'http://localhost:4000', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${yourToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
