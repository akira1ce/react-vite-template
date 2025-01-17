import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const createWithImmer = <T>(fn: () => T) => create(immer(fn));
