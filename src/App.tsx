import "./App.css";
import { useCallback, useEffect, useMemo } from "react";
import { RouterProvider } from "react-router";
import Loading from "./components/loading";
import { MOCK_ROUTES } from "./constants/routes";
import { appActions, useApp } from "./stores/useApp";
import { createRouter } from "./utils/router";

function App() {
  const { routes, loading } = useApp();

  const init = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      appActions.setRoutes(MOCK_ROUTES);
      appActions.setLoading(false);
    } catch (err) {
      appActions.setLoading(false);
      console.error(err);
    }
  }, []);

  useEffect(() => {
    console.log("akira.1231", 1231);
    if (window.location.pathname === "/login") {
      appActions.setLoading(false);
      return;
    }
    init();
  }, []);

  const router = useMemo(() => {
    const router = createRouter(routes);
    return router;
  }, [routes]);

  if (loading) return <Loading />;

  return <>{router && <RouterProvider router={router} />}</>;
}

export default App;
