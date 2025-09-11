import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { saveAs } from "file-saver";
import type { Response } from "@/services/type";
import instance from "./interceptor";

export type ExtraOptions = Pick<AxiosRequestConfig, "timeout" | "headers" | "responseType">;

function request<T>(url: string, params: any, method: string, options = {}) {
	return new Promise<T>((resolve, reject) => {
		let data = {};

		if (method === "get") data = { params };
		else data = { data: params };

		instance({
			url,
			method,
			...data,
			...options,
		})
			.then((res) => {
				/* 如果是blob，则直接返回 */
				if (res.config?.responseType === "blob") {
					resolve(res as any);
				} else if (res.data.code === 0) {
					resolve(res.data);
				} else {
					reject(res.data);
				}
			})
			.catch((err) => {
				reject(err);
				console.error(err);
			});
	});
}

export function get<T, K = any>(url: string, params?: K, options?: ExtraOptions) {
	return request<Response<T>>(url, params, "get", options);
}

export function post<T, K = any>(url: string, params?: K, options?: ExtraOptions) {
	return request<Response<T>>(url, params, "post", options);
}

export function put<T, K = any>(url: string, params?: K, options?: ExtraOptions) {
	return request<Response<T>>(url, params, "put", options);
}

export function del<T, K = any>(url: string, params?: K, options?: ExtraOptions) {
	return request<Response<T>>(url, params, "delete", options);
}

export async function download<T extends AxiosResponse, K = any>(url: string, params?: K, options?: ExtraOptions) {
	const { filename = "download.xlsx", method = "get" } = (params as any) || {};
	const res = await request<T>(url, params, method, { responseType: "blob", ...options });

	// 处理文件名
	let refinedFilename = filename;

	const disposition = res.headers["content-disposition"];
	if (disposition) {
		const match = disposition.match(/filename="?([^"]+)"?/);
		if (match && match[1]) {
			refinedFilename = decodeURIComponent(match[1]);
		}
	}

	saveAs(res.data, refinedFilename);
}
