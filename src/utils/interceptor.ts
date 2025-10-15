import axios, { AxiosError } from "axios";
import qs from "qs";
import { getToken, removeToken } from "./auth";

export const baseURL = import.meta.env.VITE_BASE_API_URL;

// 判断是否为第三方 API（不包含标准响应结构）
const isThirdPartyAPI = (url?: string) => {
	if (!url) return false;
	const thirdPartyHosts = ["api.restful-api.dev"];
	return thirdPartyHosts.some((host) => url.includes(host));
};

const service = axios.create({
	baseURL,
	timeout: 10000,
	withCredentials: false,
	paramsSerializer: (params) => {
		return qs.stringify(params, { arrayFormat: "repeat" });
	},
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		// 跳过 blob 类型的响应检查
		if (response.config?.responseType === "blob") {
			return response;
		}

		// 第三方 API 直接返回，不做业务错误码检查
		if (isThirdPartyAPI(response.config.url)) {
			return response;
		}

		const { code } = response.data;

		// 处理 401 未授权
		if (code === 401) {
			removeToken();
			window.location.href = "/login";
			return Promise.reject(new Error("未授权，请重新登录"));
		}

		// 业务错误码处理（非 0 表示业务失败）
		if (code !== 0) {
			const error = new Error(response.data.message || "请求失败");
			return Promise.reject(error);
		}

		return response.data;
	},
	(error: AxiosError) => {
		// 网络错误或服务器错误
		if (error.response) {
			// 服务器返回了错误状态码
			const { status } = error.response;

			switch (status) {
				case 401:
					removeToken();
					window.location.href = "/login";
					break;
				case 403:
					error.message = "没有权限访问";
					break;
				case 404:
					error.message = "请求的资源不存在";
					break;
				case 500:
					error.message = "服务器内部错误";
					break;
				case 502:
					error.message = "网关错误";
					break;
				case 503:
					error.message = "服务不可用";
					break;
				case 504:
					error.message = "网关超时";
					break;
				default:
					error.message = `请求失败 (${status})`;
			}
		} else if (error.request) {
			// 请求已发出但没有收到响应
			error.message = "网络连接失败，请检查网络";
		} else {
			// 请求配置出错
			error.message = error.message || "请求配置错误";
		}

		return Promise.reject(error);
	}
);

export default service;
