import { NODE_ENV_DEFAULT } from '@/common/constants/Environments';
import balancesMock from '@/domain/mocks/balances';
import loginMock from '@/domain/mocks/login';
import profileMock from '@/domain/mocks/profile';
import signUpMock from '@/domain/mocks/sign-up';
import useConfig from '@/domain/usecases/hooks/configs/useConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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

  // Enable mocks for development mode
  // if (nodeEnv === NODE_ENV_DEFAULT) {
  //   const mock = new MockAdapter(axiosInstance);

  //   // Mock API endpoints
  //   mock.onGet('/users/profile').reply(200, profileMock);
  //   mock.onPost('/auth/login').reply(200, loginMock);
  //   mock.onPost('/auth/signup').reply(200, signUpMock);
  //   mock.onGet('/balances/').reply(200, balancesMock);
  // }

  return axiosInstance;
};

const axiosInstance = configureAxiosInstance();

export default axiosInstance;
