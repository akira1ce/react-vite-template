import { groupBy } from "lodash";

interface FlatItem {
	[key: string]: any;
}

interface BuildTreeOptions {
	/* 主键 */
	idKey?: string;
	/* 父级主键 */
	parentIdKey?: string;
	/* 子级 */
	childrenKey?: string;
	/* 根节点 */
	rootParentId?: any;
}

/* 构建树 */
export const buildTree = <T extends FlatItem>(list: T[], options: BuildTreeOptions = {}): T[] => {
	const { idKey = "id", parentIdKey = "parentId", childrenKey = "children", rootParentId = null } = options;

	const grouped = groupBy(list, parentIdKey);

	function build(parentId: any): T[] {
		return (grouped[parentId] || []).map((item) => ({
			...item,
			[childrenKey]: build(item[idKey]),
		}));
	}

	return build(rootParentId);
};
