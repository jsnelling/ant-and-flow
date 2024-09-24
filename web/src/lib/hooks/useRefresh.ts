import { useReducer, useCallback } from 'react';

const refreshReducer = <T extends object | string>(_: T, o: T) => o;

export function useRefresh() {
  const [token, dispatch] = useReducer(refreshReducer, {});

  const refresh = useCallback(
    (val: object | string = {}) => {
      dispatch(val);
    },
    [dispatch],
  );

  return {
    token,
    refresh,
  };
}
