import { Github } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router';

const BaseLayout: React.FC = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <a
        className="absolute right-4 top-4 cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-gray-200"
        target="_blank"
        href="https://github.com/akira1ce/react-vite-template"
      >
        <Github />
      </a>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
