import { RouterProvider, RouterProviderProps } from 'react-router-dom';
import './App.css';
import createRouter from '@/configs/router.config.ts';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

function App() {
  const [routes, setRoutes] = useState<RouterProviderProps['router']>();

  useEffect(() => {
    createRouter().then((res) => setRoutes(res));
  }, []);

  if (!routes) return <Loading />;
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
