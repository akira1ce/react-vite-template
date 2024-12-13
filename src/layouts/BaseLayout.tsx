import React from 'react';
import { Outlet } from 'react-router-dom';

const BaseLayout: React.FC = () => {
  return (
    <>
      <div className="text-center text-xl font-bold">Vite-React-Temp</div>
      <Outlet />
    </>
  );
};

export default BaseLayout;
