import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getToken } from "./auth";

// 扩展 AxiosRequestConfig 以支持自定义属性
export interface RequestOptions {
	retry?: number; // 重试次数
	retryDelay?: number; // 重试延迟(ms)
	cache?: boolean; // 是否开启缓存
	cacheTime?: number; // 缓存时间(ms)
	cancelPrevious?: boolean; // 是否取消上一次同名请求
	keys?: string[]; // 自定义 key 计算参数，传入后根据数组内容计算 key
	debounce?: number; // 防抖延迟时间(ms)，在指定时间内重复请求只执行最后一次
	debounceKey?: string; // 自定义防抖 key，不传则根据请求参数自动生成
}

// 内部使用的 Config 类型（包含 Axios 内部属性 + 自定义属性 + 内部状态）
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig, RequestOptions {
	__retryCount?: number; // 内部记录当前重试次数
	__requestId?: number; // 内部记录请求 ID，用于避免竞态条件
}

// 缓存数据结构
interface CacheItem {
	data: any;
	expire: number;
}

// 存储取消函数和请求 ID
interface PendingItem {
	cancel: (reason?: string) => void;
	requestId: number;
}

const pendingMap = new Map<string, PendingItem>(); // 存储取消函数
const cacheMap = new Map<string, CacheItem>(); // 存储缓存数据

// 防抖相关数据结构
interface DebounceItem {
	timer: ReturnType<typeof setTimeout>;
	resolvers: Array<{ resolve: (value: any) => void; reject: (reason: any) => void }>;
}
const debounceMap = new Map<string, DebounceItem>(); // 存储防抖定时器

// 全局请求 ID 计数器
let requestIdCounter = 0;

// 生成唯一的 Request Key
const generateReqKey = (config: InternalAxiosRequestConfig | AxiosRequestConfig, keys?: string[]): string => {
	// 如果传入了自定义 keys，根据数组内容计算 key
	if (keys && keys.length > 0) {
		const { method, url, params, data } = config;
		const keyParts: string[] = [method || "", url || ""];

		keys.forEach((key) => {
			// 优先从 params 中取值，再从 data 中取值
			const paramValue = params?.[key];
			const dataValue = data?.[key];
			const value = paramValue !== undefined ? paramValue : dataValue;
			keyParts.push(`${key}:${JSON.stringify(value)}`);
		});

		return keyParts.join("&");
	}

	// 默认计算方式
	const { method, url, params, data } = config;
	return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
};

const service: AxiosInstance = axios.create({
	// baseURL: '/api',
	timeout: 10000,
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 强制转换为我们自定义的 Config 类型以便访问自定义属性
		const customConfig = config as CustomInternalAxiosRequestConfig;
		const requestKey = generateReqKey(customConfig, customConfig.keys);

		// === A. 先处理缓存 (仅 GET) ===
		// 缓存检查应该在取消逻辑之前，避免不必要的取消
		if (customConfig.cache && customConfig.method === "get") {
			const cachedItem = cacheMap.get(requestKey);

			if (cachedItem) {
				const { data, expire } = cachedItem;
				if (expire > Date.now()) {
					// 缓存命中，清除可能存在的 pending 状态
					pendingMap.delete(requestKey);

					// 使用 adapter 模拟响应，阻断实际网络请求
					customConfig.adapter = (): Promise<AxiosResponse> => {
						return Promise.resolve({
							data,
							status: 200,
							statusText: "OK",
							headers: {},
							config: config,
							request: {},
						});
					};

					return customConfig;
				}
			}
		}

		// === B. 处理竞态和取消 ===
		// 默认为 false，需要取消时主动传入 true（避免不同组件实例调用相同 API 时互相取消）
		const shouldCancelPrevious = customConfig.cancelPrevious ?? false;

		// 生成当前请求的唯一 ID
		const currentRequestId = ++requestIdCounter;
		customConfig.__requestId = currentRequestId;

		// 检查是否有正在发送的相同请求
		const existingPending = pendingMap.get(requestKey);

		if (shouldCancelPrevious && existingPending) {
			if (existingPending.requestId < currentRequestId) {
				// 存在更旧的请求，取消它
				existingPending.cancel("Canceled due to newer request");
			} else if (existingPending.requestId > currentRequestId) {
				// 存在更新的请求，当前请求（旧请求）应该自己取消
				// 直接抛出取消错误，阻止发送请求
				return Promise.reject({ isCanceled: true, message: "Canceled because newer request exists" }) as any;
			}
		}

		// 创建新的 AbortController
		const controller = new AbortController();
		customConfig.signal = controller.signal;

		// 更新 pendingMap（只有当前请求是最新的时候）
		if (!existingPending || existingPending.requestId < currentRequestId) {
			pendingMap.set(requestKey, {
				cancel: (msg) => controller.abort(msg),
				requestId: currentRequestId,
			});
		}

		/* 添加 Authorization 头部 */
		const token = getToken();
		if (token) {
			customConfig.headers.Authorization = `Bearer ${token}`;
		}

		/* akira：额外的处理...（如添加自定义头部等） */

		return customConfig;
	},
	(error: AxiosError) => Promise.reject(error)
);

// --- 响应拦截器 ---
service.interceptors.response.use(
	(response: AxiosResponse) => {
		const config = response.config as CustomInternalAxiosRequestConfig;
		const requestKey = generateReqKey(config, config.keys);

		// 只有当 requestId 匹配时才移除，避免删除新请求的取消函数
		const pending = pendingMap.get(requestKey);
		if (pending && pending.requestId === config.__requestId) {
			pendingMap.delete(requestKey);
		}

		// === C. 写入缓存 (仅 GET) ===
		if (config.cache && config.method === "get") {
			cacheMap.set(requestKey, {
				data: response.data,
				expire: Date.now() + (config.cacheTime || 60000), // 默认 60秒
			});
		}

		/* akira：额外的处理...（如处理业务错误码等） */

		// 注意：这里直接返回 response.data，意味着 request 返回的类型不再是 AxiosResponse
		return response.data;
	},
	async (error: AxiosError) => {
		const config = error.config as CustomInternalAxiosRequestConfig | undefined;

		// 如果没有 config (极少见)，直接抛出
		if (!config) return Promise.reject(error);

		const requestKey = generateReqKey(config, config.keys);

		// 只有当 requestId 匹配时才移除，避免删除新请求的取消函数
		const pending = pendingMap.get(requestKey);
		if (pending && pending.requestId === config.__requestId) {
			pendingMap.delete(requestKey);
		}

		// 如果是取消请求，直接抛出，不重试
		if (axios.isCancel(error)) {
			// console.log('Request canceled:', error.message);
			// 抛出特定的对象以便下游识别
			return Promise.reject({ isCanceled: true, message: error.message });
		}

		// === D. 处理重试 ===
		const retryCount = config.retry || 0;

		// 初始化内部重试计数器
		config.__retryCount = config.__retryCount || 0;

		// 检查是否超过重试次数
		if (config.__retryCount >= retryCount) {
			return Promise.reject(error);
		}

		// 增加重试计数
		config.__retryCount += 1;

		// 创建延时 Promise
		const backoff = new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, config.retryDelay || 1000);
		});

		console.log(`Retrying request... (${config.__retryCount}/${retryCount})`);

		// 延时后重新发起请求
		await backoff;
		return service(config);
	}
);

// 联合类型：AxiosRequestConfig 加上我们的自定义属性
export type RequestConfig = AxiosRequestConfig & RequestOptions;

/**
 * 核心请求函数
 * @param url 请求地址
 * @param config 配置项
 */
export function request<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
	// 1. 构造完整的配置对象
	const finalConfig = {
		url,
		...config,
		// 默认不取消上一次同名请求，需要时主动传入 true
		cancelPrevious: config.cancelPrevious ?? false,
	};

	// 2. 如果配置了防抖，则使用防抖逻辑
	if (config.debounce && config.debounce > 0) {
		// 优先使用自定义 debounceKey，否则根据 url + method 生成（忽略变化的参数）
		const debounceKey = config.debounceKey || `${finalConfig.method || "get"}&${url}`;

		return new Promise<T>((resolve, reject) => {
			const existing = debounceMap.get(debounceKey);

			if (existing) {
				// 清除之前的定时器，但保留之前的 resolvers
				clearTimeout(existing.timer);
				// 把当前请求的 resolve/reject 加入等待队列
				existing.resolvers.push({ resolve, reject });
			} else {
				// 首次请求，创建新的 resolvers 数组
				debounceMap.set(debounceKey, {
					timer: null as any,
					resolvers: [{ resolve, reject }],
				});
			}

			// 获取最新的 item（可能是刚创建的，也可能是已存在的）
			const item = debounceMap.get(debounceKey)!;

			// 设置新的定时器，使用最新的 finalConfig
			item.timer = setTimeout(() => {
				const resolvers = item.resolvers;
				debounceMap.delete(debounceKey);

				// 发起请求，结果分发给所有等待者
				service(finalConfig as AxiosRequestConfig)
					.then((data) => {
						resolvers.forEach((r) => r.resolve(data));
					})
					.catch((err) => {
						resolvers.forEach((r) => r.reject(err));
					});
			}, config.debounce);
		});
	}

	return service(finalConfig as AxiosRequestConfig) as Promise<T>;
}

export function get<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
	return request<T>(url, { ...config, method: "get" });
}

export function del<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
	return request<T>(url, { ...config, method: "delete" });
}

export function post<T = any>(url: string, data: any, config: RequestConfig = {}): Promise<T> {
	return request<T>(url, { ...config, method: "post", data });
}

export function put<T = any>(url: string, data: any, config: RequestConfig = {}): Promise<T> {
	return request<T>(url, { ...config, method: "put", data });
}

/**
 * 手动取消请求
 * @param url 请求地址
 * @param config 配置项 (需要包含 method, params 等以生成正确的 key)
 */
export function cancelRequest(url: string, config: RequestConfig = {}): void {
	// 构造一个临时的 config 对象用于生成 Key
	const tempConfig = { url, ...config };
	const key = generateReqKey(tempConfig as AxiosRequestConfig, config.keys);

	const pending = pendingMap.get(key);
	if (pending) {
		pending.cancel("Manual cancel");
		pendingMap.delete(key);
	}
}
