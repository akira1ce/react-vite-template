import axios from 'axios';

export const baseURL = import.meta.env.BASE_URL;

const service = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: false,
});

service.interceptors.request.use((config) => {
  return config;
});

service.interceptors.response.use((response) => {
  return response;
});

export default service;
