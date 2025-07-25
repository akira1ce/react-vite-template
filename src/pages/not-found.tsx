import { CircleDashed } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4">
			<CircleDashed className="mb-10 size-32 font-bold text-blue-500" />
			<div className="text-center text-2xl text-gray-500">Page not found</div>
			<Link className="text-gray-400 underline" to={"/"}>
				Back home
			</Link>
		</div>
	);
};

export default NotFound;
