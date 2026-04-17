import { Link } from "react-router";

const NotFound = () => {
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
			<div className="text-center text-4xl font-bold text-gray-500">Page not found</div>
			<Link className="text-gray-400 underline" to={"/"}>
				Back home
			</Link>
		</div>
	);
};

export default NotFound;
