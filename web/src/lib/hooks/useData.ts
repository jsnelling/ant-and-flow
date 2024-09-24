import { useEffect, useState } from 'react';
import { useRefresh } from './useRefresh';
import { AxiosResponse } from 'axios';

type GetterFunc<Args extends unknown[], Result> = (
  ...args: Args
) => Promise<Result>;

type UseDataProps<Args extends unknown[], Result> = {
  args: Args;
  func: GetterFunc<Args, Result>;
  watch: unknown[];
};

export function useData<Args extends unknown[], Result extends AxiosResponse>({
  args,
  func,
  watch,
}: UseDataProps<Args, Result>) {
  const [data, setData] = useState<Result['data']>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const { refresh, token } = useRefresh();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    func(...args)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        setData(undefined);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, setData, setError, token, ...watch]);

  return {
    data,
    error,
    loading,
    refresh,
  };
}
