import type { ApiLoginReq } from "./type";

const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const apiLogin = async (params: ApiLoginReq) => {
	await sleep(1000);
	return { code: 0, res: { user: { id: 1, name: "admin" } as any, token: "123456" } };
};

export const apiLogout = async () => {
	await sleep(1000);
	return { code: 0, res: { message: "success" } };
};

/* 获取用户权限 */
export const apiGetPermissions = async () => {
	await sleep(1000);
	return { code: 0, res: { permissions: [] } };
};
