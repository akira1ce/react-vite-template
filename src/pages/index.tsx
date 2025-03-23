import { useCounter, counterActions } from '@/stores/useCounter';
import clsx from 'clsx';
import React from 'react';

const { increment, decrement } = counterActions;

const Counter1: React.FC = () => {
  const counter = useCounter((state) => state);

  const btnCls = clsx('w-10 cursor-pointer rounded-md bg-gray-100 text-center text-xl');

  return (
    <div className="flex flex-col items-center gap-2">
      <div>counter: {counter.count}</div>
      <div className={btnCls} onClick={increment}>
        +
      </div>
      <div className={btnCls} onClick={decrement}>
        -
      </div>
    </div>
  );
};

export default Counter1;
