import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { saveAs } from "file-saver";
import type { Response } from "@/services/type";
import instance from "./interceptor";

export type ExtraOptions = Pick<AxiosRequestConfig, "timeout" | "headers" | "responseType">;

type HttpMethod = "get" | "post" | "put" | "delete";

export function request<T>(
	url: string,
	params?: any,
	method: HttpMethod = "get",
	options: ExtraOptions = {}
): Promise<T> {
	const config: AxiosRequestConfig = {
		url,
		method,
		...options,
	};

	// GET 请求使用 params，其他方法使用 data
	if (method === "get") {
		config.params = params;
	} else {
		config.data = params;
	}

	return instance(config);
}

export function get<T>(url: string, params?: any, options?: ExtraOptions) {
	return request<Response<T>>(url, params, "get", options);
}

export function post<T>(url: string, params?: any, options?: ExtraOptions) {
	return request<Response<T>>(url, params, "post", options);
}

export function put<T>(url: string, params?: any, options?: ExtraOptions) {
	return request<Response<T>>(url, params, "put", options);
}

export function del<T>(url: string, params?: any, options?: ExtraOptions) {
	return request<Response<T>>(url, params, "delete", options);
}

export interface DownloadOptions extends ExtraOptions {
	filename?: string;
	method?: "get" | "post";
}

export async function download(url: string, params?: any, options: DownloadOptions = {}): Promise<void> {
	const { filename = "download.xlsx", method = "get", ...restOptions } = options;

	const res = await request<AxiosResponse>(url, params, method, {
		responseType: "blob",
		...restOptions,
	});

	// 处理文件名：优先使用响应头中的文件名
	let finalFilename = filename;

	const disposition = res.headers["content-disposition"];
	if (disposition) {
		const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
		if (match && match[1]) {
			// 移除可能的引号并解码
			finalFilename = decodeURIComponent(match[1].replace(/['"]/g, ""));
		}
	}

	saveAs(res.data, finalFilename);
}
