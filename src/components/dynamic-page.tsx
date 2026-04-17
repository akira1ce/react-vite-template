import { intersection } from "lodash";
import type React from "react";
import { lazy, Suspense, useMemo } from "react";
import { Navigate, useParams } from "react-router";
import Loading from "@/components/loading";
import NotFound from "@/pages/not-found";
import type { Route } from "@/stores/use-app";
import { useApp } from "@/stores/use-app";
import { buildTree } from "@/utils/transfer";

interface DynamicRoute extends Route {
	children?: DynamicRoute[];
}

interface PageModule {
	default: React.ComponentType;
}

const modules = import.meta.glob("../pages/**/index.tsx");

const lazyCache = new Map<string, React.LazyExoticComponent<React.ComponentType>>();

const getLazyComponent = (componentPath: string) => {
	const cached = lazyCache.get(componentPath);
	if (cached) return cached;

	const path = `../pages${componentPath}.tsx`;
	const loader = modules[path];
	if (!loader) {
		console.error(`[Router] No matching module found for path: ${path}`);
		return null;
	}

	const component = lazy(() => loader() as Promise<PageModule>);
	lazyCache.set(componentPath, component);
	return component;
};

const findRoute = (tree: DynamicRoute[], targetPath: string): Route | null => {
	for (const node of tree) {
		if (node.component && node.path === targetPath) return node;
		if (node.children?.length) {
			const found = findRoute(node.children, targetPath);
			if (found) return found;
		}
	}
	return null;
};

export const DynamicPage = () => {
	const { "*": splat = "" } = useParams();
	const currentPath = `/${splat}`;

	const { routes, permissions } = useApp();
	const routeTree = useMemo(() => buildTree(routes), [routes]);
	const matched = useMemo(() => findRoute(routeTree, currentPath), [routeTree, currentPath]);

	if (!matched) return <NotFound />;

	if (matched.permissions.length > 0) {
		const hasPermission = intersection(permissions, matched.permissions).length === matched.permissions.length;
		if (!hasPermission) return <Navigate to="/403" replace />;
	}

	const LazyComponent = matched.component ? getLazyComponent(matched.component) : null;
	if (!LazyComponent) return <NotFound />;

	return (
		<Suspense key={currentPath} fallback={<Loading />}>
			<LazyComponent />
		</Suspense>
	);
};
