import { createStore } from '.';

export interface Counter {
  count: number;
}

export const useCounter = createStore<Counter>('counter', {
  count: 1,
});
