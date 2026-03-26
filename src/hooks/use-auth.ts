import { isEmpty } from "lodash";
import { useNavigate } from "react-router";
import { apiLogin, apiLogout } from "@/pages/login/service";
import type { ApiLoginReq } from "@/pages/login/type";
import { apiGetPermissions } from "@/services";
import { appActions, useApp } from "@/stores/use-app";
import { removeToken, setToken } from "@/utils/auth";

export function useAuth() {
	const { user } = useApp();
	const navigate = useNavigate();

	const isAuth = !isEmpty(user);

	const login = async (params: ApiLoginReq) => {
		const { res } = await apiLogin(params);
		const { user, token } = res;
		appActions.setUser(user);
		setToken(token);
		const { res: permRes } = await apiGetPermissions();
		appActions.setPermissions(permRes.permissions);
	};

	const logout = async () => {
		await apiLogout();
		appActions.clearUserData();
		removeToken();
		navigate("/login");
	};

	return { user, isAuth, login, logout };
}
