import axios from 'axios';

export const baseURL = process.env.BASE_API_URL;

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
