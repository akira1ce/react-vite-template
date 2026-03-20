import { createWithImmer } from "@/utils/zustand";

export const useCounter = createWithImmer(() => ({
	count: 1,
}));

const set = useCounter.setState;

export const counterActions = {
	increment: () =>
		set((state) => {
			state.count += 1;
			return state;
		}),
	decrement: () =>
		set((state) => {
			state.count -= 1;
			return state;
		}),
};
