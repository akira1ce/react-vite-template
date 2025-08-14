import axios from "axios";
import { getToken, removeToken } from "./auth";

export const baseURL = import.meta.env.VITE_BASE_API_URL;

const service = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: false,
});

service.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

service.interceptors.response.use((response) => {
  const res = response.data;

  if (res.code === 401) {
    removeToken();
    window.location.href = "/login";
  }

  return res;
});

export default service;
