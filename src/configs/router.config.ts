import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Index from '@/pages/index.tsx';
import BaseLayout from '@/layouts/BaseLayout.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import NotFound from '@/pages/NotFound.tsx';
import { lazy } from 'react';
import ForbiddenPage from '@/pages/ForbiddenPage';

interface DynamicRoute {
  path: string;
  component: string;
  children?: DynamicRoute[];
}

// 转换路由配置
function transferRoutes(routes: DynamicRoute[]): RouteObject[] {
  return routes.map((route) => ({
    path: route.path,
    Component: lazy(() => import(`../pages/${route.component}`)),
    children: route.children ? transferRoutes(route.children) : [],
  }));
}

// 获取动态路由配置
async function getDynamicRoutes() {
  const routes = [
    {
      path: '/test',
      component: 'test.tsx',
      children: [],
    },
  ];

  return transferRoutes(routes);
}

// 创建初始路由
const baseRouter: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: Index },
      { path: '/403', Component: ForbiddenPage },
      { path: '*', Component: NotFound },
    ],
  },
];

// 异步创建路由
async function createRouter() {
  try {
    const dynamicRoutes = await getDynamicRoutes();
    // 将动态路由添加到根路由的 children 中
    baseRouter[0].children!.splice(-1, 0, ...dynamicRoutes);
    return createBrowserRouter(baseRouter);
  } catch (error) {
    console.error('Failed to fetch dynamic routes:', error);
    return createBrowserRouter(baseRouter);
  }
}

export default createRouter;
