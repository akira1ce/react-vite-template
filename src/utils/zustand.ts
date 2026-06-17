import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const createWithImmer = <T>(fn: () => T) => create(immer(fn));

export const createWithPersist = <T>(fn: () => T, options: PersistOptions<T>) => create(persist(immer(fn), options));

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
	const store = _store as WithSelectors<typeof _store>;
	store.use = {};

	for (const k of Object.keys(store.getState())) {
		(store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
	}

	return store;
};
