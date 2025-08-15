import { useState } from "react";
import { useNavigate } from "react-router";
import { MOCK_ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { appActions } from "@/stores/useApp";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { login } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = async () => {
		await login({ username, password });
		appActions.setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		appActions.setRoutes(MOCK_ROUTES);
		appActions.setLoading(false);
		navigate("/");
	};

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<div className="mb-20 text-2xl">login</div>
			<div className="w-full max-w-md space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="username"
						className="block font-medium text-gray-700 text-sm"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="password"
						className="block font-medium text-gray-700 text-sm"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="pt-2">
					<button
						type="button"
						className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						onClick={handleSubmit}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
