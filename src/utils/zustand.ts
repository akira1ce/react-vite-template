import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, PersistOptions } from 'zustand/middleware';

export const createWithImmer = <T>(fn: () => T) => create(immer(fn));

export const createWithPersist = <T>(fn: () => T, options: PersistOptions<T>) => create(persist(immer(fn), options));
