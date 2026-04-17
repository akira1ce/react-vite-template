import type React from "react";
import { Link } from "react-router";

const ErrorBoundary: React.FC = () => {
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="text-center text-4xl font-bold text-red-600">An unexpected error has occurred</div>
				<Link className="text-gray-400 underline" to={"/"}>
					Back home
				</Link>
			</div>
		</div>
	);
};

export default ErrorBoundary;
