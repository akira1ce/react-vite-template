import { createWithImmer } from '@/utils/zustand';
export interface UserInfo {
  id: number;
  username: string;
  role: string;
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
}

export interface AppStore {
  userInfo: Partial<UserInfo>;
  permissions: string[];
  routers: Route[];
}

export const useApp = createWithImmer<AppStore>(() => ({
  userInfo: {},
  permissions: [],
  routers: [],
}));

const set = useApp.setState;

export const appActions = {
  setPermisstions(permissions: string[]) {
    set((state) => {
      state.permissions = permissions;
    });
  },
  setRouters(routers: Route[]) {
    set((state) => {
      state.routers = routers;
    });
  },
};
