import axios from 'axios';
import { FormData } from '@/components/RegisterPayable/RegisterPayable';

const baseURL = 'http://localhost:3001';

const api = axios.create({
  baseURL,
});

export const setAccessToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const handleLogin = async (login: string, password: string) => {
  const { data } = await api.post('/integrations/auth', {
    login,
    password,
  });

  return { data };
};

export const handleFetchAssignors = async () => {
  const { data } = await api.get('/integrations/assignor');

  return { data };
};

export const handleCreatePayable = async (formData: FormData) => {
  const { value, emissionDate, assignor } = formData;
  const { data } = await api.post('/integrations/payable', {
    value,
    emissionDate,
    assignor: Number(assignor),
  });

  console.log(data);
};
