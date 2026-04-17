import { Github, Languages, LogOut } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

const BaseLayout: React.FC = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const { i18n } = useTranslation();

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
	};

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<div className="relative h-screen w-screen overflow-auto">
			<div className="absolute top-4 right-4 flex items-center gap-2">
				<button
					onClick={toggleLanguage}
					className="flex cursor-pointer items-center gap-1 rounded-md bg-gray-100 p-2 text-sm hover:bg-gray-200"
				>
					<Languages className="h-4 w-4" />
					{i18n.language === "zh" ? "中" : "EN"}
				</button>
				<LogOut className="cursor-pointer" onClick={handleLogout} />
				<a
					className="cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-gray-200"
					target="_blank"
					href="https://github.com/akira1ce/react-vite-template"
					rel="noopener"
				>
					<Github />
				</a>
			</div>
			<Outlet />
		</div>
	);
};

export default BaseLayout;
