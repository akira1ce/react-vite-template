import { MOCK_ROUTES } from "@/constants/routes";
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
	console.log("akira.apiGetPermissions");
	await sleep(1000);
	return { code: 0, res: { permissions: [] } };
};

/* 获取用户路由 */
export const apiGetRoutes = async () => {
	console.log("akira.apiGetRoutes");
	await sleep(1000);
	return { code: 0, res: { routes: MOCK_ROUTES } };
};
