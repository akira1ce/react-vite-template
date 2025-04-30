import React from 'react';
import { Outlet } from 'react-router';

const BaseLayout: React.FC = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <Outlet />
    </div>
  );
};

export default BaseLayout;
