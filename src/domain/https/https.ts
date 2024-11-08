import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useConfig from '@/domain/usecases/hooks/configs/useConfig';
import { NODE_ENV_DEFAULT } from '@/common/constants/Environments';
import profile from '@/domain/mocks/profile';
import login from '@/domain/mocks/login';
import signUp from '@/domain/mocks/sign-up';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { nodeEnv, apiUrl } = useConfig();
const axiosInstance = axios.create({
  baseURL: apiUrl,
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.interceptors.request.use(async req => {
    req.headers['Authorization'] = `Bearer ${await AsyncStorage.getItem("access_token")}`;
    return req;
})
if (nodeEnv == NODE_ENV_DEFAULT) {
  const mock = new MockAdapter(axiosInstance);
  mock.onGet('/userinfo').reply(profile);
  mock.onPost('/auth/login').reply(200, login);
  mock.onPost('/auth/signup').reply(signUp);
}

export default axiosInstance;
