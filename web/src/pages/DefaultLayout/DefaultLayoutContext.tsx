import {
  AdditionalHeaders,
  createUseAdditionalHeader,
} from './additionalHeaders';
import {
  createContext,
  JSX,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

export type LayoutContextProps = {
  additionalHeaders: AdditionalHeaders;
  useAdditionalHeader: ReturnType<typeof createUseAdditionalHeader>;
};

const HeaderLayoutContext = createContext<LayoutContextProps | undefined>(
  undefined,
);

export type DefaultLayoutContextProps = {
  additionalHeaders?: JSX.Element;
};

export function DefaultLayoutContext({
  additionalHeaders: headers,
  children,
}: PropsWithChildren<DefaultLayoutContextProps>) {
  const topId = useMemo(() => crypto.randomUUID(), []);

  const [additionalHeaders, setAdditionalHeaders] = useState<AdditionalHeaders>(
    headers ? { [topId]: headers } : {},
  );

  const useAdditionalHeader = createUseAdditionalHeader(setAdditionalHeaders);

  const value = useMemo(
    () => ({
      additionalHeaders,
      useAdditionalHeader,
    }),
    [additionalHeaders, useAdditionalHeader],
  );

  useAdditionalHeader(headers, [headers], topId);

  return (
    <HeaderLayoutContext.Provider value={value}>
      {children}
    </HeaderLayoutContext.Provider>
  );
}

DefaultLayoutContext.hook = function useDefaultLayoutContext() {
  const context = useContext(HeaderLayoutContext);

  if (!context) {
    throw new Error('missing DefaultLayoutContextProvider');
  }

  return context;
};
