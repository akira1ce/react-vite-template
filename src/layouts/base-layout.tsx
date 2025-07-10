import { useAuth } from '@/hooks/useAuth';
import { Github, LogOut } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router';

const BaseLayout: React.FC = () => {
  const { logout, isAuth } = useAuth();
  console.log('isAuth :>> ', isAuth);

  return (
    <div className="relative h-screen w-screen">
      {isAuth && (
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <LogOut className="cursor-pointer" onClick={logout} />
          <a
            className="cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-gray-200"
            target="_blank"
            href="https://github.com/akira1ce/react-vite-template"
          >
            <Github />
          </a>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default BaseLayout;
