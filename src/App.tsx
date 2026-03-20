import { useEffect, useMemo } from "react";
import { RouterProvider } from "react-router";
import Loading from "./components/loading";
import { MOCK_ROUTES } from "./constants/routes";
import { apiGetPermissions } from "./pages/login/service";
import { appActions, useApp } from "./stores/use-app";
import { createRouter } from "./utils/router";

function App() {
	const { routes, loading } = useApp();

	const init = async () => {
		try {
			appActions.setLoading(true);
			appActions.setRoutes(MOCK_ROUTES);
			const user = useApp.getState().user;
			if (user) {
				const { res } = await apiGetPermissions();
				appActions.setPermissions(res.permissions);
			}
		} catch (err) {
			console.error(err);
		} finally {
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
