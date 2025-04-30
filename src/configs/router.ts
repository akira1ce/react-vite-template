import BaseLayout from '@/layouts/BaseLayout';
import ErrorBoundary from '@/pages/ErrorBoundary';
import Forbidden from '@/pages/Forbidden';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/home';
import { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, Component: Home },
      { path: '/403', Component: Forbidden },
      { path: '*', Component: NotFound },
    ],
  },
];
