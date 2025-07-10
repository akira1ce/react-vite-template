import { usePermission } from '@/hooks/usePermission';
import { Navigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import Loading from './loading';

interface ProtectedRouteProps {
  codes: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ codes = [], children }: ProtectedRouteProps) => {
  const { isAccess, loading } = usePermission(codes);
  const { isAuth } = useAuth();

  if (loading) return <Loading />;

  if (!isAuth) return <Navigate to="/login" />;
  else if (!isAccess) return <Navigate to="/403" />;

  return children;
};

export default ProtectedRoute;
