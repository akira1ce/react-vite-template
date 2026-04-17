import { createBrowserRouter } from "react-router";
import { AuthGuard } from "@/components/auth-guard";
import { DefaultRedirect } from "@/components/default-redirect";
import { DynamicPage } from "@/components/dynamic-page";
import BaseLayout from "@/layouts/base-layout";
import ErrorBoundary from "@/pages/error-boundary";
import Forbidden from "@/pages/forbidden";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

export const router = createBrowserRouter([
	{ path: "/login", element: <Login /> },
	{
		path: "/",
		element: <AuthGuard />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				element: <BaseLayout />,
				children: [
					{ index: true, element: <DefaultRedirect /> },
					{ path: "*", element: <DynamicPage /> },
				],
			},
		],
	},
	{ path: "/403", element: <Forbidden /> },
	{ path: "*", element: <NotFound /> },
]);
