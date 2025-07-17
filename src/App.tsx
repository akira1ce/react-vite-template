import { RouterProvider } from "react-router";
import "./App.css";
import { useCallback, useEffect, useMemo } from "react";
import { MOCK_ROUTES } from "./constants/routes";
import { apiGetPermissions } from "./pages/login/service";
import { appActions, useApp } from "./stores/useApp";
import { createRouter } from "./utils/router";

function App() {
	const { routers } = useApp();

	const getPermissions = useCallback(async () => {
		try {
			appActions.setLoading(true);
			const { res } = await apiGetPermissions();
			appActions.setPermissions(res.permissions);
			appActions.setLoading(false);
		} catch (err) {
			appActions.setLoading(false);
			console.error(err);
		}
	}, []);

	useEffect(() => {
		appActions.setRouters(MOCK_ROUTES);
		getPermissions();
	}, [getPermissions]);

	const router = useMemo(() => {
		if (!routers.length) return;
		const router = createRouter(routers);
		return router;
	}, [routers]);

	return <>{router && <RouterProvider router={router} />}</>;
}

export default App;
