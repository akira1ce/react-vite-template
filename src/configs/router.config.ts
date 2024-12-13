import { createBrowserRouter } from 'react-router-dom';
import Counter1 from '../pages/Counter1.tsx';
import Counter2 from '../pages/Counter2.tsx';
import Counter3 from '../pages/Counter3.tsx';
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
      { index: true, Component: Counter1 },
      { path: 'counter2', Component: Counter2 },
      { path: 'counter3', Component: Counter3 },
    ],
  },
]);

export default router;
