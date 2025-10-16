/**
 * 定义数据类型
 * 统一管理类型，避免业务代码中过多的类型定义，造成污染
 */

/* 「controller-type」 */

export interface OverUserInfo {
	id: string;
	email: string;
	gender: string;
	name: string;
	nat: string;
	thumbnail: string;
	desc: string;
}

/* 「service-type」 */

export interface UserInfo {
	email: string;
	gender: string;
	name: {
		first: string;
		last: string;
	};
	nat: string;
	picture: {
		thumbnail: string;
	};
}

export interface UserInfoResult {
	results: UserInfo[];
}
