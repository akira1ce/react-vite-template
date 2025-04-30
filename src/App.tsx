import { RouterProvider } from 'react-router';
import './App.css';
import { createRouter } from './utils/router';
import { useEffect, useMemo } from 'react';
import { appActions, useApp } from './stores/useApp';
import { MOCK_ROUTES } from './constants/routes';

function App() {
  const { routers } = useApp();

  useEffect(() => {
    appActions.setRouters(MOCK_ROUTES);
  }, []);

  const router = useMemo(() => {
    if (!routers.length) return;
    const router = createRouter(routers);
    return router;
  }, [routers]);

  return <>{router && <RouterProvider router={router} />}</>;
}

export default App;
