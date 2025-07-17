import { intersection } from "lodash";
import { useMemo } from "react";
import { useApp } from "@/stores/useApp";

/**
 * 检查权限码是否全部满足
 * @param codes 权限码数组
 * @returns 是否有权限
 */
export const checkPermission = (codes: string[]): boolean => {
	if (!codes.length) return true;
	const { permissions } = useApp.getState();
	return intersection(permissions, codes).length === codes.length;
};

/**
 * 权限检查 Hook
 * @param codes 权限码数组
 * @returns 权限检查结果
 */
export const usePermission = (codes: string[] = []) => {
	const { permissions, loading } = useApp();

	const isAccess = useMemo(() => {
		if (!codes.length) return true;
		return intersection(permissions, codes).length === codes.length;
	}, [permissions, codes]);

	return { isAccess, permissions, loading };
};
