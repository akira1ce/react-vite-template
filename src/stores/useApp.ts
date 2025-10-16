import { localStorageHelper as ls } from "@/utils/localstorage-helper";
import { createWithImmer } from "@/utils/zustand";

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
	routes: Route[];
	permissions: string[];
	loading: boolean;
}

export const APP_STORAGE_KEYS = {
	USER: "user",
	PERMISSIONS: "permissions",
	ROUTES: "routes",
} as const;

const getInitialState = (): AppStore => ({
	user: ls.getItem<User | null>(APP_STORAGE_KEYS.USER, null),
	routes: ls.getItem<Route[]>(APP_STORAGE_KEYS.ROUTES, []),
	permissions: ls.getItem<string[]>(APP_STORAGE_KEYS.PERMISSIONS, []),
	loading: false,
});

export const useApp = createWithImmer(getInitialState);

const set = useApp.setState;

export const appActions = {
	setRoutes(routes: Route[]) {
		set((state) => {
			state.routes = routes;
		});
		ls.setItem(APP_STORAGE_KEYS.ROUTES, routes);
	},

	setUser(user: User | null) {
		set((state) => {
			state.user = user;
		});
		ls.setItem(APP_STORAGE_KEYS.USER, user);
	},

	setPermissions(permissions: string[]) {
		set((state) => {
			state.permissions = permissions;
		});
		ls.setItem(APP_STORAGE_KEYS.PERMISSIONS, permissions);
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
			state.routes = [];
		});
		ls.removeItem(APP_STORAGE_KEYS.USER);
		ls.removeItem(APP_STORAGE_KEYS.PERMISSIONS);
	},
};
