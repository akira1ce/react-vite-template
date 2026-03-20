import { Navigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { usePermission } from "@/hooks/use-permission";

interface ProtectedRouteProps {
	codes: string[];
	children: React.ReactNode;
}

const ProtectedRoute = ({ codes = [], children }: ProtectedRouteProps) => {
	const { isAccess } = usePermission(codes);
	const { isAuth } = useAuth();

	if (!isAuth) return <Navigate to="/login" />;
	if (!isAccess) return <Navigate to="/403" />;

	return children;
};

export default ProtectedRoute;
