import { toCamelCase } from '@/utils/transformer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Function to determine if token should be attached to a request
const shouldAttachToken = (url: string, publicRoutes?: string[]): boolean => {
  if (!publicRoutes) return false;
  return !publicRoutes.some((route) => url.includes(route));
};

// Configure Axios Instance
const createAxiosInstance = (apiUrl: string, publicRoutes?: string[]) => {
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      // Attach token only if the route requires authentication
      if (shouldAttachToken(config.url || '', publicRoutes)) {
        const accessToken = await AsyncStorage.getItem('access_token');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          // console.warn('No access token found, proceeding without Authorization header.');
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Transform response data to camelCase
      if (response.data) {
        response.data = toCamelCase(response.data);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

export { createAxiosInstance };
