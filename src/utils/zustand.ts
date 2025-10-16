import { create } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const createWithImmer = <T>(fn: () => T) => create(immer(fn));

export const createWithPersist = <T>(fn: () => T, options: PersistOptions<T>) => create(persist(immer(fn), options));
