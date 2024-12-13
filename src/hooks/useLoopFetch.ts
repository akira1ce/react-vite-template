import { useRef, useState } from 'react';

interface IUseLoopFetchOptions {
  pollingInterval?: number;
  pollingOvertimes?: number;
}

type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;

function useLoopFetch<TData, TParams extends any[]>(
  api: Service<TData, TParams>,
  options: IUseLoopFetchOptions = {}
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TData>();
  const [isOvertime, setIsOvertime] = useState(false);

  const timer = useRef<any>(null);
  const times = useRef(0);

  const { pollingInterval, pollingOvertimes } = options;

  const runAsync = async (...params: TParams) => {
    try {
      times.current++;

      /* 超时 */
      if (pollingOvertimes && times.current > pollingOvertimes) {
        cancel();
        setIsOvertime(true);
        throw new Error('超时');
      }

      setLoading(true);
      setIsOvertime(false);

      const res = await api(...params);

      /* 轮训 */
      if (pollingInterval) {
        timer.current = setTimeout(async () => {
          await runAsync(...params);
        }, pollingInterval);
      }

      !timer.current && setLoading(false);
      setData(res);

      return res;
    } catch (err) {
      cancel();
      console.error(err);
    }
  };

  const run = (...params: TParams) => {
    try {
      runAsync(...params);
    } catch (err) {
      cancel();
      console.error(err);
    }
  };

  const cancel = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      times.current = 0;
      setLoading(false);
      setIsOvertime(false);
    }
  };

  return { data, loading, run, runAsync, cancel, isOvertime };
}

export default useLoopFetch;