import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Counter2: React.FC = () => {
  return (
    <>
      <h1>Counter2</h1>
      <Button>
        <Link to={'/counter3'}>Go to Counter3</Link>
      </Button>
    </>
  );
};

export default Counter2;
