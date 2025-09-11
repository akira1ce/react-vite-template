import axios from "axios";
import qs from "qs";
import { getToken, removeToken } from "./auth";

export const baseURL = import.meta.env.VITE_BASE_API_URL;

const service = axios.create({
	baseURL,
	timeout: 10000,
	withCredentials: false,
	paramsSerializer: (params) => {
		return qs.stringify(params, { arrayFormat: "repeat" });
	},
});

service.interceptors.request.use((config) => {
	const token = getToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

service.interceptors.response.use((response) => {
	if (response.data.code === 401) {
		removeToken();
		window.location.href = "/login";
	}

	return response;
});

export default service;
