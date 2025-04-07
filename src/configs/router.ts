import BaseLayout from '@/layouts/BaseLayout';
import ErrorBoundary from '@/pages/ErrorBoundary';
import Forbidden from '@/pages/Forbidden';
import Home from '@/pages/home';
import NotFound from '@/pages/NotFound';
import Test from '@/pages/test/test';
import { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      // { index: true, Component: Home },
      { path: '/home', Component: Home },
      { path: '/test', Component: Test },
      { path: '/403', Component: Forbidden },
      { path: '*', Component: NotFound },
    ],
  },
];
