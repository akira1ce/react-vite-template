import { Github, LogOut } from "lucide-react";
import type React from "react";
import { Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";

const BaseLayout: React.FC = () => {
	const { logout, isAuth } = useAuth();

	return (
		<div className="relative h-screen w-screen">
			{isAuth && (
				<div className="absolute top-4 right-4 flex items-center gap-2">
					<LogOut className="cursor-pointer" onClick={logout} />
					<a
						className="cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-gray-200"
						target="_blank"
						href="https://github.com/akira1ce/react-vite-template"
						rel="noopener"
					>
						<Github />
					</a>
				</div>
			)}
			<Outlet />
		</div>
	);
};

export default BaseLayout;
