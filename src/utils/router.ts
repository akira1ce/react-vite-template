import { createBrowserRouter, RouteObject } from 'react-router';
import { routes } from '@/configs/router';

interface DynamicRoute {
  path: string;
  component: string;
  children?: DynamicRoute[];
}

/* 转换路由配置 */
const transferRoutes = (routes: DynamicRoute[]): RouteObject[] => {
  return routes.map((route) => ({
    path: route.path,
    lazy: async () => {
      const Component = (await import(`../pages${route.component}`)).default;
      return { Component };
    },
    children: route.children ? transferRoutes(route.children) : [],
  }));
};

/* 获取动态路由配置 */
const getDynamicRoutes = async () => {
  const routes = [
    {
      path: '/test',
      component: '/test/test.tsx',
      children: [],
    },
  ];

  return transferRoutes(routes);
};

/* 异步创建路由 */
async function createRouter() {
  /* 创建初始路由 */
  const baseRouter = [...routes];

  try {
    const dynamicRoutes = await getDynamicRoutes();
    // 将动态路由添加到根路由的 children 中
    baseRouter[0].children!.splice(-1, 0, ...dynamicRoutes);
    // console.log('baseRouter :>> ', baseRouter);
    return createBrowserRouter(baseRouter);
  } catch (error) {
    console.error('Failed to fetch dynamic routes:', error);
    return createBrowserRouter(baseRouter);
  }
}

export default createRouter;
