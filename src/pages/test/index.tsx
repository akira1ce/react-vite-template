import { useState } from "react";
import { del, get, post, put } from "@/utils/request";

interface ApiObject {
	id: string;
	name: string;
	data?: {
		color?: string;
		capacity?: string;
		[key: string]: any;
	};
}

export default function Test() {
	const [result, setResult] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const apiBaseUrl = "https://api.restful-api.dev/objects";

	const handleRequest = async (requestFn: () => Promise<any>, description: string) => {
		setLoading(true);
		setError(null);
		setResult(null);
		console.log(`🚀 ${description}...`);

		try {
			const res = await requestFn();
			console.log(`✅ ${description} 成功:`, res);
			setResult(res);
		} catch (err: any) {
			console.error(`❌ ${description} 失败:`, err);
			setError(err.message || "请求失败");
		} finally {
			setLoading(false);
		}
	};

	// GET - 获取所有对象列表
	const testGetAll = () => {
		handleRequest(() => get<ApiObject[]>(`${apiBaseUrl}`), "GET 请求 - 获取所有对象");
	};

	// GET - 获取单个对象
	const testGetOne = () => {
		handleRequest(() => get<ApiObject>(`${apiBaseUrl}/7`), "GET 请求 - 获取单个对象 (ID: 7)");
	};

	// GET - 使用查询参数
	const testGetWithParams = () => {
		handleRequest(() => get<ApiObject[]>(`${apiBaseUrl}`, { id: [3, 5, 10] }), "GET 请求 - 带查询参数 (id=3,5,10)");
	};

	// POST - 创建新对象
	const testPost = () => {
		const newObject = {
			name: "测试手机",
			data: {
				year: 2024,
				price: 7999,
				"CPU model": "Snapdragon 8 Gen 3",
				"Hard disk size": "512GB",
			},
		};

		handleRequest(() => post<ApiObject>(`${apiBaseUrl}`, newObject), "POST 请求 - 创建新对象");
	};

	// PUT - 更新对象
	const testPut = () => {
		const updateData = {
			name: "更新的手机名称",
			data: {
				year: 2024,
				price: 8999,
				color: "钛灰色",
			},
		};

		handleRequest(() => put<ApiObject>(`${apiBaseUrl}/7`, updateData), "PUT 请求 - 更新对象 (ID: 7)");
	};

	// DELETE - 删除对象
	const testDelete = () => {
		handleRequest(() => del<{ message: string }>(`${apiBaseUrl}/6`), "DELETE 请求 - 删除对象 (ID: 6)");
	};

	// 测试错误处理 - 404
	const testError404 = () => {
		handleRequest(() => get<ApiObject>(`${apiBaseUrl}/9999999999`), "测试 404 错误处理");
	};

	// 测试错误处理 - 无效 URL
	const testErrorInvalid = () => {
		handleRequest(() => get<any>("https://api.restful-api.dev/invalid-endpoint"), "测试无效端点错误处理");
	};

	return (
		<div className="min-h-full p-8">
			<div className="mx-auto max-w-6xl">
				<h1 className="mb-8 text-3xl font-bold">Axios 封装测试页面</h1>

				{/* API 测试按钮组 */}
				<div className="mb-8 space-y-4">
					<div className="rounded-lg bg-gray-50 p-4">
						<h2 className="mb-3 text-lg font-semibold text-gray-700">GET 请求测试</h2>
						<div className="flex flex-wrap gap-2">
							<button
								onClick={testGetAll}
								disabled={loading}
								className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
							>
								获取所有对象
							</button>
							<button
								onClick={testGetOne}
								disabled={loading}
								className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
							>
								获取单个对象 (ID: 7)
							</button>
							<button
								onClick={testGetWithParams}
								disabled={loading}
								className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
							>
								带查询参数 (id=3,5,10)
							</button>
						</div>
					</div>

					<div className="rounded-lg bg-gray-50 p-4">
						<h2 className="mb-3 text-lg font-semibold text-gray-700">POST / PUT / DELETE 测试</h2>
						<div className="flex flex-wrap gap-2">
							<button
								onClick={testPost}
								disabled={loading}
								className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
							>
								POST - 创建对象
							</button>
						</div>
					</div>

					<div className="rounded-lg bg-gray-50 p-4">
						<h2 className="mb-3 text-lg font-semibold text-gray-700">错误处理测试</h2>
						<div className="flex flex-wrap gap-2">
							<button
								onClick={testError404}
								disabled={loading}
								className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:opacity-50"
							>
								测试 404 错误
							</button>
							<button
								onClick={testErrorInvalid}
								disabled={loading}
								className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:opacity-50"
							>
								测试无效端点
							</button>
						</div>
					</div>
				</div>

				{/* 状态显示 */}
				{loading && (
					<div className="mb-4 rounded-lg bg-blue-50 p-4 text-blue-700">
						<p className="font-semibold">⏳ 请求中...</p>
					</div>
				)}

				{/* 错误显示 */}
				{error && (
					<div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
						<h3 className="mb-2 font-semibold">❌ 错误信息:</h3>
						<p className="font-mono text-sm">{error}</p>
					</div>
				)}

				{/* 结果显示 */}
				{result && (
					<div className="rounded-lg bg-green-50 p-4 text-green-700">
						<h3 className="mb-2 font-semibold">✅ 响应结果:</h3>
						<pre className="overflow-auto rounded bg-white p-4 text-sm">{JSON.stringify(result, null, 2)}</pre>
					</div>
				)}

				{/* 使用说明 */}
				<div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
					<h2 className="mb-4 text-xl font-semibold">测试说明</h2>
					<ul className="space-y-2 text-gray-600">
						<li>• 所有请求会在控制台输出详细日志</li>
						<li>• 使用 restful-api.dev 提供的公共测试 API</li>
						<li>• 测试包含 GET、POST、PUT、DELETE 四种方法</li>
						<li>• 测试包含查询参数序列化（qs 库的 arrayFormat: repeat）</li>
						<li>• 测试包含错误处理和异常情况</li>
						<li>• 打开浏览器控制台查看完整的请求/响应日志</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
