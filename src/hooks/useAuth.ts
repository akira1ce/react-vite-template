import { isEmpty } from "lodash";
import { useCallback } from "react";
import { apiLogin, apiLogout } from "@/pages/login/service";
import type { ApiLoginReq } from "@/pages/login/type";
import { appActions, useApp } from "@/stores/useApp";
import { removeToken, setToken } from "@/utils/auth";

export function useAuth() {
  const { user } = useApp();

  const isAuth = !isEmpty(user);

  const login = useCallback(async (params: ApiLoginReq) => {
    const { res } = await apiLogin(params);
    const { user, token } = res;
    appActions.setUser(user);
    setToken(token);
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    appActions.setUser(null);
    removeToken();
  }, []);

  return { user, isAuth, login, logout };
}
