import { animate } from "motion";
import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const HEIGHT = 32;

const Digit = ({ value }: { value: number }) => {
	const y = useMotionValue(0);

	useEffect(() => {
		const target = value * HEIGHT;

		animate(y, -target, {
			duration: 0.3,
			ease: "easeInOut",
		});
	}, [value]);

	return (
		<div className="relative overflow-hidden" style={{ height: HEIGHT, width: "0.7em" }}>
			<motion.div style={{ y }}>
				{[...DIGITS, ...DIGITS].map((n, i) => (
					<div key={i} className="flex items-center justify-center" style={{ height: HEIGHT }}>
						{n}
					</div>
				))}
			</motion.div>
		</div>
	);
};

export const AnimateNumber = ({ value }: { value: number }) => {
	const digits = String(value).split("");

	return (
		<div className="flex items-center justify-center text-3xl font-semibold [font-variant-numeric:tabular-nums]">
			{digits.map((d, i) => (
				<Digit key={i} value={Number(d)} />
			))}
		</div>
	);
};
