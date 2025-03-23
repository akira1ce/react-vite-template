import { createWithImmer } from '@/utils/zustand';

export interface UserInfo {
  id: number;
  username: string;
  role: string;
}

export interface UserStore {
  userInfo: Partial<UserInfo>;
  permissions: string[];
}

export const useUser = createWithImmer<UserStore>(() => ({
  userInfo: {},
  permissions: [],
}));

const set = useUser.setState;

export const appActions = {
  setPermisstions(permissions: string[]) {
    set((state) => {
      state.permissions = permissions;
      return state;
    });
  },
};
