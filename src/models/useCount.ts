import { create } from 'zustand';

export interface State {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCount = create<State>((set) => ({
  count: 1,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCount;
