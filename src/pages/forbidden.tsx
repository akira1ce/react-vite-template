import { Link } from "react-router";

const Forbidden = () => {
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
			<div className="text-center text-4xl font-bold text-gray-500">Forbidden</div>
			<Link className="text-gray-400 underline" to={"/"}>
				Back home
			</Link>
		</div>
	);
};

export default Forbidden;
