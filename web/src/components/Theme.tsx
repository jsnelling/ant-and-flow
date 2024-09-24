import { ConfigProvider, ConfigProviderProps, theme as antTheme } from 'antd';
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ThemeContext = {
  dark: boolean;
};

const Context = createContext<ThemeContext | undefined>(undefined);

export function Theme({ children }: PropsWithChildren) {
  const [dark, setDark] = useState(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event: MediaQueryListEvent) => {
        setDark(event.matches);
      });
  }, []);

  const theme = useMemo<ConfigProviderProps['theme']>(
    () => ({
      algorithm: dark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      components: {
        Layout: {
          headerBg: '#090909',
          siderBg: '#090909',
        },
      },
    }),
    [dark],
  );

  const value = useMemo<ThemeContext>(() => ({ dark }), [dark]);

  return (
    <Context.Provider value={value}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </Context.Provider>
  );
}
