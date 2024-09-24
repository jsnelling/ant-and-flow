import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';

export type AdditionalHeaders = { [id: string]: JSX.Element | undefined };

export function createUseAdditionalHeader(
  setAdditionalHeaders: Dispatch<SetStateAction<AdditionalHeaders>>,
) {
  return function useAdditionalHeader(
    element: JSX.Element | undefined,
    watch: unknown[],
    id?: string,
  ) {
    const key = useMemo(() => id ?? crypto.randomUUID(), [id]);

    useEffect(
      () => {
        if (!element) {
          return;
        }

        setAdditionalHeaders((headers) => ({ ...headers, [key]: element }));

        return () => {
          setAdditionalHeaders((headers) => {
            const next = { ...headers };
            // keep the key so we keep same initial order if adding and removing
            next[key] = undefined;
            return next;
          });
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [key, ...watch],
    );
  };
}
