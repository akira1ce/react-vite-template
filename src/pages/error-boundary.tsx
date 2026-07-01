import type React from "react";
import { Link } from "react-router";

const ErrorBoundary: React.FC = () => {
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
			<div className="text-[120px] leading-none font-light tracking-tight text-red-200 select-none">500</div>
			<p className="text-sm text-gray-400">Something went wrong</p>
			<Link
				to="/"
				className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
			>
				Back home
			</Link>
		</div>
	);
};

export default ErrorBoundary;
