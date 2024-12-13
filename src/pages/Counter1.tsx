import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Counter1: React.FC = () => {
  return (
    <>
      <h1>Counter1</h1>
      <Button>
        <Link to={'/counter2'}>Go to Counter2</Link>
      </Button>
    </>
  );
};

export default Counter1;
