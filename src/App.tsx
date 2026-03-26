import { useEffect, useMemo } from "react";
import { RouterProvider } from "react-router";
import Loading from "./components/loading";
import { appActions, appEffects, useApp } from "./stores/use-app";
import { createRouter } from "./utils/router";

function App() {
	const { routes, loading } = useApp();

	const init = async () => {
		try {
			appActions.setLoading(true);
			await appEffects.initRoutes();
			await appEffects.initPermissions();
			appActions.setLoading(false);
		} catch (err) {
			console.error(err);
			appActions.setLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	const router = useMemo(() => createRouter(routes), [routes]);

	if (loading) return <Loading />;

	return <>{router && <RouterProvider router={router} />}</>;
}

export default App;
