import useCount from '@/models/useCount';
import React from 'react';

const Counter1: React.FC = () => {
  const counter = useCount((state) => state);
  return (
    <>
      <h1>Counter1</h1>
      <h1 onClick={counter.increment}>{counter.count}</h1>
    </>
  );
};

export default Counter1;
