import BaseLayout from '@/layouts/base-layout';
import ErrorBoundary from '@/pages/error-boundary';
import Forbidden from '@/pages/forbidden';
import Login from '@/pages/login';
import NotFound from '@/pages/not-found';
import { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/403', element: <Forbidden /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
