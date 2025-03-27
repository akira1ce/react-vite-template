import { createWithImmer } from '@/utils/zustand';

export interface UserInfo {
  id: number;
  username: string;
  role: string;
}

export interface AppStore {
  userInfo: Partial<UserInfo>;
  permissions: string[];
}

export const useApp = createWithImmer<AppStore>(() => ({
  userInfo: {},
  permissions: [],
}));

const set = useApp.setState;

export const appActions = {
  setPermisstions(permissions: string[]) {
    set((state) => {
      state.permissions = permissions;
      return state;
    });
  },
};
