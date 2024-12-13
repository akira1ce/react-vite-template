import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Counter3: React.FC = () => {
  return (
    <>
      <h1>Counter3</h1>
      <Button>
        <Link to={'/'}>Go to Counter1</Link>
      </Button>
    </>
  );
};

export default Counter3;
