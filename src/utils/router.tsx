import { cloneDeep } from "lodash";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router";
import ProtectedRoute from "@/components/protected-route";
import { baseRoutes } from "@/configs/router";
import ErrorBoundary from "@/pages/error-boundary";
import type { Route } from "@/stores/useApp";
import { buildTree } from "./transfer";

export interface DynamicRoute extends Route {
	children?: DynamicRoute[];
}

/* 导入所有页面组件 */
const modules = import.meta.glob("../pages/**/index.tsx");

/* 转换路由配置 */
export const transferRoutes = (routes: DynamicRoute[]): RouteObject[] => {
	return routes.map((route) => {
		let lazy: RouteObject["lazy"];

		if (route.component) {
			lazy = async () => {
				const path = `../pages${route.component}.tsx`;
				const loader = modules[path];

				if (!loader) {
					console.error(`[Router] No matching module found for path: ${path}`);
					throw new Error(`Page component not found: ${path}`);
				}

				try {
					const { default: Comp }: any = await loader();
					return {
						element: <ProtectedRoute codes={route.permissions}>{<Comp />}</ProtectedRoute>,
					};
				} catch (err) {
					console.error(`[Router] Failed to load module: ${path}`, err);
					return { element: <ErrorBoundary /> };
				}
			};
		}

		const children = route.children ? transferRoutes(route.children) : [];

		/* 如果子路由存在，则将第一个子路由设置为默认路由 */
		if (children.length > 0) {
			children.unshift({ index: true, lazy: children[0].lazy });
		}

		return {
			path: route.path,
			lazy,
			children,
		};
	});
};

/* 创建路由 */
export const createRouter = (dynamicRoutes: DynamicRoute[]) => {
	const _routes = transferRoutes(buildTree(dynamicRoutes));

	const rootIndexRoute: RouteObject = { index: true };

	/* 如果存在根路由，则设置根路由的默认路由 */
	if (_routes.length) {
		const indexPath = _routes[0].path;
		if (!indexPath) {
			console.error("[Router] No matching index path found");
			return;
		}
		rootIndexRoute.Component = () => <Navigate to={indexPath} />;
	}

	/* 合并路由 */
	const baseRouter = cloneDeep(baseRoutes);
	baseRouter[0].children?.splice(-1, 0, rootIndexRoute, ..._routes);

	return createBrowserRouter(baseRouter);
};
