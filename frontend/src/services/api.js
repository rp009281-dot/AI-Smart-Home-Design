import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Attach JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('smart_home_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authApi = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },
  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },
  getProfile: async () => {
    const res = await api.get('/auth/profile');
    return res.data;
  }
};

export const aiApi = {
  generateDesign: async (inputData) => {
    const res = await api.post('/ai/generate-design', inputData);
    return res.data;
  },
  estimateCost: async (costParams) => {
    const res = await api.post('/ai/estimate-cost', costParams);
    return res.data;
  }
};

export const materialsApi = {
  getMaterials: async () => {
    const res = await api.get('/materials');
    return res.data;
  },
  getSmartFeatures: async () => {
    const res = await api.get('/smart-features');
    return res.data;
  }
};

export const projectApi = {
  createProject: async (projectData) => {
    const res = await api.post('/projects', projectData);
    return res.data;
  },
  getUserProjects: async () => {
    const res = await api.get('/projects');
    return res.data;
  },
  getProjectById: async (id) => {
    const res = await api.get(`/projects/${id}`);
    return res.data;
  },
  deleteProject: async (id) => {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  }
};

export const savedDesignApi = {
  saveDesign: async (designData) => {
    const res = await api.post('/saved-designs', designData);
    return res.data;
  },
  getUserSavedDesigns: async () => {
    const res = await api.get('/saved-designs');
    return res.data;
  },
  deleteSavedDesign: async (id) => {
    const res = await api.delete(`/saved-designs/${id}`);
    return res.data;
  }
};

export const contactApi = {
  sendMessage: async (messageData) => {
    const res = await api.post('/contact', messageData);
    return res.data;
  }
};

export default api;
