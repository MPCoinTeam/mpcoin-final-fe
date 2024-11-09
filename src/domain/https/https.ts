import { NODE_ENV_DEFAULT } from '@/common/constants/Environments';
import login from '@/domain/mocks/login';
import profile from '@/domain/mocks/profile';
import signUp from '@/domain/mocks/sign-up';
import useConfig from '@/domain/usecases/hooks/configs/useConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const { nodeEnv, apiUrl } = useConfig();
const axiosInstance = axios.create({
  baseURL: apiUrl,
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.interceptors.request.use(async (req) => {
  req.headers['Authorization'] = `Bearer ${await AsyncStorage.getItem('access_token')}`;
  return req;
});
if (nodeEnv == NODE_ENV_DEFAULT) {
  const mock = new MockAdapter(axiosInstance);
  mock.onGet('/userinfo').reply(profile);
  mock.onPost('/auth/login').reply(200, login);
  mock.onPost('/auth/signup').reply(signUp);
}

export default axiosInstance;
