import { Minus, Plus } from "lucide-react";
import { AnimateNumber } from "@/components/animate-number";
import { counterActions, useCounter } from "@/stores/use-counter";

export default function Test() {
	const count = useCounter((state) => state.count);

	return (
		<div className="flex h-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-200">
			<div className="flex items-center gap-6 rounded-2xl bg-white px-8 py-6 shadow-lg">
				<div
					className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200"
					onClick={() => counterActions.decrement()}
				>
					<Minus className="h-5 w-5" />
				</div>

				<AnimateNumber value={count} />

				<div
					className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200"
					onClick={() => counterActions.increment()}
				>
					<Plus className="h-5 w-5" />
				</div>
			</div>
		</div>
	);
}
