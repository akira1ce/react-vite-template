import { useCounter, counterActions } from '@/models/useCount';
import React from 'react';

const { increment, decrement } = counterActions;

const Counter1: React.FC = () => {
  const counter = useCounter((state) => state);
  return (
    <>
      <h1>Counter1</h1>
      <h1>{counter.count}</h1>
      <div className="cursor-pointer text-xl" onClick={increment}>
        +
      </div>
      <div className="cursor-pointer text-xl" onClick={decrement}>
        -
      </div>
    </>
  );
};

export default Counter1;
