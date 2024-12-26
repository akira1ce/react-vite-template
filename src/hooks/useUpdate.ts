import { useState, useCallback } from 'react';

/**
 * 强制更新
 * @example const update = useUpdate();
 */
export default function useUpdate() {
  const [_, update] = useState({});
  return useCallback(() => update({}), []);
}
