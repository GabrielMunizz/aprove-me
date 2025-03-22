import axios from 'axios';

const baseURL = 'http://localhost:3001';

const api = axios.create({
  baseURL,
});

const setAccessToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const handleLogin = async (login: string, password: string) => {
  const { data } = await api.post('/integrations/auth', {
    login,
    password,
  });

  setAccessToken(data.accessToken);

  return { data };
};

export const handleFetchAssignors = async () => {
  const { data } = await api.get('/integrations/assignor');

  return { data };
};
