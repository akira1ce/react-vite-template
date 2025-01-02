import { createBrowserRouter } from 'react-router-dom';
import Index from '../pages/index.tsx';
import BaseLayout from '../layouts/BaseLayout.tsx';
import ErrorPage from '../pages/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    /* Component/element: 路由组件 */
    Component: BaseLayout,
    /* ErrorBoundary/errorElement: 错误路由 */
    ErrorBoundary: ErrorPage,
    /* 子路由 */
    children: [
      /* index 类似默认子路由 */
      { index: true, Component: Index },
    ],
  },
]);

export default router;
