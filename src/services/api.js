import axios from 'axios';
import { auth } from '../firebase';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Firebase ID token
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error getting ID token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - could redirect to login
      console.error('Unauthorized - token may be expired');
    }
    return Promise.reject(error);
  }
);

// API methods
export const productAPI = {
  getAll: (category) => {
    const params = category ? { category } : {};
    return api.get('/products', { params });
  },
  getById: (id) => api.get(`/products/${id}`),
};

export const orderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
};

export const checkoutAPI = {
  createSession: (cartItems) => api.post('/checkout/session', { cartItems }),
};

export const authAPI = {
  getMe: () => api.get('/auth/me'),
};

export default api;
