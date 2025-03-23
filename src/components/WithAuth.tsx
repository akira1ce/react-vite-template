import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export interface WithAuthProps {
  children?: React.ReactNode;
  codes: string[];
}

const WithAuth = (props: WithAuthProps) => {
  const { children, codes } = props;

  const { isAccess } = useAuth(codes);

  if (!isAccess) return <Navigate to={'/403'} />;
  
  return children;
};

export default WithAuth;
