import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default API;
