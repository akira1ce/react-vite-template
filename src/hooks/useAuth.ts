import { isEmpty } from 'lodash';
import { useCallback } from 'react';
import { apiLogin, apiLogout } from '@/pages/login/service';
import { ApiLoginReq } from '@/pages/login/type';
import { removeToken, setToken } from '@/utils/auth';
import { appActions, useApp } from '@/stores/useApp';

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
