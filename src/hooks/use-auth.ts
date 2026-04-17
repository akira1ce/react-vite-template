import { apiLogin, apiLogout } from "@/pages/login/service";
import type { ApiLoginReq } from "@/pages/login/type";
import { appActions } from "@/stores/use-app";
import { getToken, removeToken, setToken } from "@/utils/auth";

export function useAuth() {
	const token = getToken();
	const isAuth = !!token;

	const login = async (params: ApiLoginReq) => {
		const { res } = await apiLogin(params);
		const { user, token } = res;
		setToken(token);
		appActions.setUser(user);
	};

	const logout = async () => {
		await apiLogout();
		appActions.clearUserData();
		removeToken();
	};

	return { isAuth, login, logout };
}
