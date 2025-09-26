import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this if your backend is running on a different port
  withCredentials: true, // This is important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  getAdmin: async () => {
    const response = await api.get('/auth/admin');
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async (category?: string, special?: boolean) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (special) params.append('special', 'true');
    
    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  create: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  update: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  
  toggleAvailability: async (id: string) => {
    const response = await api.put(`/products/${id}/availability`);
    return response.data;
  },
  
  setSpecialOffer: async (id: string, offerData: { offerPrice: number; validUntil: string }) => {
    const response = await api.put(`/products/${id}/special-offer`, offerData);
    return response.data;
  },
  
  removeSpecialOffer: async (id: string) => {
    const response = await api.delete(`/products/${id}/special-offer`);
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  getAll: async () => {
    const response = await api.get('/admin');
    return response.data;
  },
  
  create: async (adminData: any) => {
    const response = await api.post('/admin', adminData);
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/admin/${id}`);
    return response.data;
  },
  
  update: async (id: string, adminData: any) => {
    const response = await api.put(`/admin/${id}`, adminData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/admin/${id}`);
    return response.data;
  },
  
  toggleStatus: async (id: string) => {
    const response = await api.put(`/admin/${id}/status`);
    return response.data;
  },
};

export default api;
