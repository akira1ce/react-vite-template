import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import Loading from "@/components/loading";
import { useAuth } from "@/hooks/use-auth";
import { appActions, appEffects, useApp } from "@/stores/use-app";

export const AuthGuard = () => {
	const { isAuth } = useAuth();
	const { loading } = useApp();

	useEffect(() => {
		if (!isAuth) return;

		const init = async () => {
			appActions.setLoading(true);
			try {
				await Promise.all([appEffects.initRoutes(), appEffects.initPermissions()]);
			} catch (err) {
				console.error(err);
			} finally {
				appActions.setLoading(false);
			}
		};
		init();
	}, [isAuth]);

	if (!isAuth) return <Navigate to="/login" replace />;
	if (loading) return <Loading />;

	return <Outlet />;
};
