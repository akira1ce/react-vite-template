import { intersection } from "lodash";
import { useApp } from "@/stores/use-app";

/**
 * 检查权限码是否全部满足（非 Hook，可在组件外使用）
 * @param codes 权限码数组
 * @returns 是否有权限
 */
export const checkPermission = (codes: string[]): boolean => {
	if (!codes.length) return true;
	const { permissions } = useApp.getState();
	return intersection(permissions, codes).length === codes.length;
};
