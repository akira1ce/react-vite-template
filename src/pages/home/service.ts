/*
 *「service」
 * 应该与服务端提供的接口文档严格保持一致
 */
import { MOCK_USERS } from "./constant";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getUsersInfo() {
	await sleep(300);
	return MOCK_USERS;
}
