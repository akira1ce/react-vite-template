import { AxiosRequestConfig } from 'axios';
import instance from './interceptor';
import { Response } from '@/services/type';

export type ExtraOptions = Pick<AxiosRequestConfig, 'timeout' | 'headers' | 'responseType'>;

function request<T>(url: string, params: any, method: string, options = {}) {
  return new Promise<Response<T>>(async (resolve, reject) => {
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
        /* custom code to success or failed */
        if (res.code === 0) resolve(res);
        else reject(res);
      })
      .catch((err) => {
        reject(err);
        console.error(err);
      });
  });
}

export function get<T, K = any>(url: string, params?: K, options?: ExtraOptions) {
  return request<T>(url, params, 'get', options);
}

export function post<T, K = any>(url: string, params?: K, options?: ExtraOptions) {
  console.log('params :>> ', params);
  return request<T>(url, params, 'post', options);
}

export function put<T, K = any>(url: string, params?: K, options?: ExtraOptions) {
  return request<T>(url, params, 'put', options);
}

export function del<T, K = any>(url: string, params?: K, options?: ExtraOptions) {
  return request<T>(url, params, 'delete', options);
}
