import React from 'react';
import { Outlet } from 'react-router';

const BaseLayout: React.FC = () => {
  return (
    <>
      <div className="text-center text-xl font-bold p-2">Vite-React-Temp</div>
      <Outlet />
    </>
  );
};

export default BaseLayout;
