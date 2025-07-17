import { create } from "zustand";
import { type PersistOptions, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const createWithImmer = <T>(fn: () => T) => create(immer(fn));

export const createWithPersist = <T>(fn: () => T, options: PersistOptions<T>) =>
	create(persist(immer(fn), options));
