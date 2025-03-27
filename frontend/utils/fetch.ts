import axios from 'axios';
import { FormData } from '@/components/RegisterPayable/RegisterPayable';
import { Payable } from './types';

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

export const handleFetchAssignorById = async (id: string) => {
  const { data } = await api.get(`/integrations/assignor/${id}`);

  return data;
};

export const handleCreatePayable = async (formData: FormData) => {
  const { value, emissionDate, assignor } = formData;
  const { data, status } = await api.post('/integrations/payable', {
    value: Number(value),
    emissionDate,
    assignorId: assignor,
  });

  return { data, status };
};

export const handleFetchPayables = async () => {
  const { data, status } = await api.get('/integrations/payable');

  return { data, status };
};

export const handleFetchPayableByID = async (id: string) => {
  const { data } = await api.get(`/integrations/payable/${id}`);

  return data;
};

export const handleDeletePayable = async (id: string) => {
  const { data } = await api.delete(`/integrations/payable/${id}`);

  return data;
};

export const handleUpdatePayable = async (payable: Payable) => {
  const { id, ...info } = payable;
  const { data } = await api.patch(`/integrations/payable/${id}`, info);

  return data;
};
