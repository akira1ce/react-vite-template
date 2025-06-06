/*
 *「service」
 * 应该与服务端提供的接口文档严格保持一致
 */

import { get } from '@/utils/request';
import { UserInfo, UserInfoResult } from './type';

export async function getUpUserInfo() {
  const url = 'https://randomuser.me/api/?results=2&inc=name,gender,email,nat,picture&noinfo';
  return await get<UserInfoResult>(url);
}

export async function getDownUserInfo() {
  const url = 'https://randomuser.me/api/?results=2&inc=name,gender,email,nat,picture&noinfo';
  return await get<UserInfoResult>(url);
}

/* 多接口合并 */
export async function getUsersInfo() {
  const results = await Promise.all([getUpUserInfo(), getDownUserInfo()]);
  return results.reduce<UserInfo[]>((prev, cur) => {
    return prev.concat(cur.results);
  }, []);
}
