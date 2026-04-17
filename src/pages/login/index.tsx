import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { appActions, appEffects } from "@/stores/use-app";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { t } = useTranslation("login");
	const { login } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = async () => {
		await login({ username, password });
		appActions.setLoading(true);
		await appEffects.initRoutes();
		await appEffects.initPermissions();
		appActions.setLoading(false);
		navigate("/");
	};

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center">
			<div className="mb-20 text-2xl">{t("title")}</div>
			<div className="w-full max-w-md space-y-4">
				<div className="space-y-2">
					<label htmlFor="username" className="block text-sm font-medium text-gray-700">
						{t("username")}
					</label>
					<input
						type="text"
						id="username"
						name="username"
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="password" className="block text-sm font-medium text-gray-700">
						{t("password")}
					</label>
					<input
						type="password"
						id="password"
						name="password"
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="pt-2">
					<button
						type="button"
						className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						onClick={handleSubmit}
					>
						{t("submit")}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
