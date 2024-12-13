import React from 'react';

export interface ShowProps<T> {
  when: T;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}

function Show<T>({ when, children, fallback }: ShowProps<T>) {
  return when ? children : fallback;
}

export default Show;
