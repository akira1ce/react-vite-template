import { Loader } from "lucide-react";

const Loading = () => {
	return (
		<div className="absolute top-0 left-0 z-10 flex h-screen w-screen bg-white/50">
			<Loader className="m-auto animate-spin text-gray-600" />
		</div>
	);
};

export default Loading;
