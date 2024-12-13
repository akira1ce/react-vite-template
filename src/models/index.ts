import { useState, Dispatch, SetStateAction } from 'react';

interface StoreItem<T> {
  state: T;
  dispatch: Set<Dispatch<SetStateAction<T>>>;
}

interface Store {
  [key: string]: StoreItem<any>;
}

interface KeyMap {
  [key: string]: boolean;
}

const isInitStore: KeyMap = {};
const store: Store = {};

function _setter<T>(key: string, value: T) {
  const storeItem = store[key] as StoreItem<T>;
  storeItem.state = value;
  storeItem.dispatch.forEach((cb) => {
    cb(value);
  });
}

function subscribeStore<T>(key: string): [T, (state: T) => void] {
  const storeItem = store[key] as StoreItem<T>;
  const [state, setState] = useState<T>(storeItem.state);

  if (!storeItem.dispatch.has(setState)) {
    storeItem.dispatch.add(setState);
  }

  return [state, useDispatch<T>(key)];
}

export function useDispatch<T>(key: string) {
  return (value: T) => _setter(key, value);
}

export function createStore<T>(key: string, state: T) {
  if (!isInitStore[key]) {
    store[key] = { state, dispatch: new Set() } as StoreItem<T>;
    isInitStore[key] = true;
  }
  return () => subscribeStore<T>(key);
}
