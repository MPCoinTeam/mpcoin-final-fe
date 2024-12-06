import useConfig from '@/domain/usecases/hooks/configs/useConfig';
import { toCamelCase } from '@/utils/transformer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const configureAxiosInstance = () => {
  const { nodeEnv, apiUrl } = useConfig();

  // Create Axios instance
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Attach token to Authorization header
  axiosInstance.interceptors.request.use(async (req) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
  });

  // Transform response data to camelCase
  axiosInstance.interceptors.response.use((response) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  });

  return axiosInstance;
};

const axiosInstance = configureAxiosInstance();

export default axiosInstance;
