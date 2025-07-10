/*
 *「service」
 * 应该与服务端提供的接口文档严格保持一致
 */

import { UserInfo } from './type';

export async function getUpUserInfo() {
  const url = 'https://randomuser.me/api/?results=2&inc=name,gender,email,nat,picture&noinfo';
  return await fetch(url).then((res) => res.json());
}

export async function getDownUserInfo() {
  const url = 'https://randomuser.me/api/?results=2&inc=name,gender,email,nat,picture&noinfo';
  return await fetch(url).then((res) => res.json());
}

/* 多接口合并 */
export async function getUsersInfo() {
  const results = await Promise.all([getUpUserInfo(), getDownUserInfo()]);
  return results.reduce<UserInfo[]>((prev, cur) => {
    return prev.concat(cur.results);
  }, []);
}
