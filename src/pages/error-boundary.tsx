import { Ban } from "lucide-react";
import type React from "react";
import { Link } from "react-router";

const ErrorBoundary: React.FC = () => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-4">
				<Ban className="mb-10 size-32 font-bold text-red-500" />
				<div className="text-2xl">An unexpected error has occurred</div>
				<Link className="text-gray-400 underline" to={"/"}>
					Back home
				</Link>
			</div>
		</div>
	);
};

export default ErrorBoundary;
