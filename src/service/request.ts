import { AxiosInterceptorOptions } from 'axios';
import instance from './interceptor';

function request<T>(url: string, params: any, method: string, options = {}) {
  return new Promise<T>(async (resolve, reject) => {
    let data = {};

    if (method == 'get') data = { params };
    else data = { data: params };

    instance({
      url,
      method,
      ...data,
      ...options,
    })
      .then((res: any) => {
        /* success or failed */
        if (res.code === 0) resolve(res);
        else reject(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function get<T>(url: string, params?: any, options?: AxiosInterceptorOptions) {
  return request<T>(url, params, 'get', options);
}

function post<T>(url: string, params?: any, options?: AxiosInterceptorOptions) {
  return request<T>(url, params, 'post', options);
}

function put<T>(url: string, params?: any, options?: AxiosInterceptorOptions) {
  return request<T>(url, params, 'put', options);
}

// 封装DELETE请求
function del<T>(url: string, params?: any, options?: AxiosInterceptorOptions) {
  return request<T>(url, params, 'delete', options);
}

export default { get, post, put, del };
