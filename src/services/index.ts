import { MOCK_ROUTES } from "@/constants/routes";

const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/* 获取用户权限 */
export const apiGetPermissions = async () => {
	console.log("akira.apiGetPermissions");
	await sleep(200);
	return { code: 0, res: { permissions: ["test"] } };
};

/* 获取用户路由 */
export const apiGetRoutes = async () => {
	console.log("akira.apiGetRoutes");
	await sleep(200);
	return { code: 0, res: { routes: MOCK_ROUTES } };
};
