import axios from 'axios';
import { auth } from '@/config/firebase';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token and we haven't tried to refresh it yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const user = auth.currentUser;
        if (user) {
          // Force token refresh
          const token = await user.getIdToken(true);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const apiService = {
  // Auth
  register: async (data: { email: string; password: string; displayName: string }) => {
    return api.post('/api/auth/register', data);
  },

  updateProfile: async (data: { displayName?: string; profilePicture?: string }) => {
    return api.patch('/api/auth/profile', data);
  },

  // Questionnaire
  submitQuestionnaire: async (data: any) => {
    return api.post('/api/questionnaire', data);
  },

  getMyQuestionnaires: async () => {
    return api.get('/api/questionnaire/my');
  },

  getQuestionnaire: async (id: string) => {
    return api.get(`/api/questionnaire/${id}`);
  },

  getAdminQuestionnaire: async (id: string) => {
    return api.get(`/api/questionnaire/admin/${id}`);
  },

  updateQuestionnaire: async (id: string, data: any) => {
    return api.patch(`/api/questionnaire/${id}`, data);
  },

  deleteQuestionnaire: async (id: string) => {
    return api.delete(`/api/questionnaire/${id}`);
  },

  // Admin
  getAllUsers: async (params?: { page?: number; limit?: number; search?: string }) => {
    return api.get('/api/admin/users', { params });
  },

  getUserDetails: async (userId: string) => {
    return api.get(`/api/admin/users/${userId}`);
  },

  getAnalytics: async () => {
    return api.get('/api/admin/analytics');
  },

  updateUserRole: async (userId: string, isAdmin: boolean) => {
    return api.patch(`/api/admin/users/${userId}/role`, { isAdmin });
  },

  deleteUser: async (userId: string) => {
    return api.delete(`/api/admin/users/${userId}`);
  },

  getAllQuestionnaires: async (params?: { 
    page?: number; 
    limit?: number; 
    status?: string 
  }) => {
    return api.get('/api/questionnaire/admin/all', { params });
  },

  updateQuestionnaireStatus: async (id: string, data: { 
    status: string; 
    adminFeedback?: string 
  }) => {
    return api.patch(`/api/questionnaire/admin/${id}`, data);
  },

  // Notifications
  getNotifications: async () => {
    return api.get('/api/users/notifications');
  },

  markNotificationAsRead: async (notificationId: string) => {
    return api.patch(`/api/users/notifications/${notificationId}`);
  },

  markAllNotificationsAsRead: async () => {
    return api.post('/api/users/notifications/mark-all-read');
  },

  getUnreadNotificationsCount: async () => {
    return api.get('/api/users/notifications/unread-count');
  }
};

export default apiService; 