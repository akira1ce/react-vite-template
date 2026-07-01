import { Link } from "react-router";

const NotFound = () => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-6">
			<div className="text-[120px] leading-none font-light tracking-tight text-gray-200 select-none">404</div>
			<p className="text-sm text-gray-400">Page not found</p>
			<Link
				to="/"
				className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
			>
				Back home
			</Link>
		</div>
	);
};

export default NotFound;
