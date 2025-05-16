import BaseLayout from '@/layouts/BaseLayout';
import ErrorBoundary from '@/pages/ErrorBoundary';
import Forbidden from '@/pages/Forbidden';
import NotFound from '@/pages/NotFound';
import { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      { path: '/403', Component: Forbidden },
      { path: '*', Component: NotFound },
    ],
  },
];
