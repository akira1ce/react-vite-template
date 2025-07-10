import { get, post } from '@/utils/request';
import { ApiGetPermissionsRes, ApiLoginReq, ApiLoginRes, ApiLogoutRes } from './type';
import { mockApi } from '@/constants/mock';

export const apiLogin = (params: ApiLoginReq) => {
  return post<ApiLoginRes>(`${mockApi}/login`, params);
};

export const apiLogout = () => {
  return post<ApiLogoutRes>(`${mockApi}/logout`);
};

/* 获取用户权限 */
export const apiGetPermissions = () => {
  return get<ApiGetPermissionsRes>(`${mockApi}/getPermissions`);
};
