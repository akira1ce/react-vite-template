import { localStorageHelper } from '@/utils/localstorage-helper';
import { createWithImmer } from '@/utils/zustand';

export interface User {
  id: number;
  username: string;
}

export interface Route {
  id: number;
  path: string;
  label: string;
  parentId: number | null;
  icon?: string;
  /* 组件路径 - 约定路由不需要后缀.tsx */
  component?: string;
  /* 是否为布局组件 */
  layout: boolean;
  sort: number;
  /* 权限 */
  permissions: string[];
}

export interface AppStore {
  user: User | null;
  routers: Route[];
  permissions: string[];
  loading: boolean;
}

const STORAGE_KEYS = {
  USER: 'user',
  PERMISSIONS: 'permissions',
} as const;

const getInitialState = (): AppStore => ({
  user: localStorageHelper.getItem<User | null>(STORAGE_KEYS.USER, null),
  routers: [],
  permissions: localStorageHelper.getItem<string[]>(STORAGE_KEYS.PERMISSIONS, []),
  loading: false,
});

export const useApp = createWithImmer(getInitialState);

const set = useApp.setState;

export const appActions = {
  setRouters(routers: Route[]) {
    set((state) => {
      state.routers = routers;
    });
  },

  setUser(user: User | null) {
    set((state) => {
      state.user = user;
    });
    localStorageHelper.setItem(STORAGE_KEYS.USER, user);
  },

  setPermissions(permissions: string[]) {
    set((state) => {
      state.permissions = permissions;
    });
    localStorageHelper.setItem(STORAGE_KEYS.PERMISSIONS, permissions);
  },

  setLoading(loading: boolean) {
    set((state) => {
      state.loading = loading;
    });
  },

  // 清除用户相关数据
  clearUserData() {
    set((state) => {
      state.user = null;
      state.permissions = [];
      state.routers = [];
    });
    localStorageHelper.removeItem(STORAGE_KEYS.USER);
    localStorageHelper.removeItem(STORAGE_KEYS.PERMISSIONS);
  },
};
