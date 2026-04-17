import { useMemo } from "react";
import { Navigate } from "react-router";
import NotFound from "@/pages/not-found";
import type { Route } from "@/stores/use-app";
import { useApp } from "@/stores/use-app";
import { buildTree } from "@/utils/transfer";

interface TreeRoute extends Route {
	children?: TreeRoute[];
}

const findFirstLeaf = (tree: TreeRoute[]): Route | null => {
	for (const node of tree) {
		if (node.component) return node;
		if (node.children?.length) {
			const found = findFirstLeaf(node.children);
			if (found) return found;
		}
	}
	return null;
};

export const DefaultRedirect = () => {
	const { routes } = useApp();
	const tree = useMemo(() => buildTree(routes), [routes]);
	const firstLeaf = useMemo(() => findFirstLeaf(tree), [tree]);

	if (!firstLeaf) return <NotFound />;

	return <Navigate to={firstLeaf.path} replace />;
};
