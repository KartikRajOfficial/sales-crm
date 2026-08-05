import axios from 'axios';

// Base URL is configurable via VITE_API_URL for different environments,
// but defaults to the local backend so the app runs with zero config.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request interceptor — automatically attach the JWT as a Bearer token.
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle expired/invalid sessions.
//
// We only force a redirect when a token *existed* (i.e. a real session
// expiry) AND the failing request was NOT an auth endpoint. Without this
// guard, a simple "wrong password" 401 on /auth/login would wipe storage
// and hard-reload the page before the login form could show its error toast.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const isAuthRequest = url.includes('/auth/');
    const hadToken = Boolean(localStorage.getItem('token'));

    if (status === 401 && hadToken && !isAuthRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Avoid redirect loop if we're already on the login page.
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
