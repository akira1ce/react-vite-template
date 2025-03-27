import { useApp } from '@/stores/useApp';
import { intersection } from 'lodash';
import { useMemo } from 'react';

export function useAuth(codes: string[]) {
  const { permissions } = useApp();

  const isAccess = useMemo(() => {
    return intersection(permissions, codes).length === codes.length;
  }, [permissions, codes]);

  return { isAccess };
}
