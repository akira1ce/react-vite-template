import { useState } from "react";
import { AnimateNumber } from "@/components/animate-number";

const TestPage = () => {
	const [value, setValue] = useState(0);

	const handleDecrement = () => {
		setValue((prev) => prev - 1);
	};

	const handleIncrement = () => {
		setValue((prev) => prev + 1);
	};

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-6">
			<div className="flex cursor-pointer items-center gap-2 text-2xl select-none">
				<div onClick={handleDecrement}>Decrement</div>
				<AnimateNumber value={value} />
				<div onClick={handleIncrement}>Increment</div>
			</div>
		</div>
	);
};

export default TestPage;
