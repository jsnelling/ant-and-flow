import { CSSProperties, PropsWithChildren } from 'react';
import { Layout } from 'antd';

import {
  DefaultLayoutContext,
  DefaultLayoutContextProps,
} from './DefaultLayoutContext';
import { Header } from './Header';

const fullScreen: CSSProperties = { width: '100vw', height: '100vh' };

export type DefaultLayoutProps = Pick<
  DefaultLayoutContextProps,
  'additionalHeaders'
> & {};

export function DefaultLayout({
  additionalHeaders,
  children,
}: PropsWithChildren<DefaultLayoutProps>) {
  return (
    <DefaultLayoutContext additionalHeaders={additionalHeaders}>
      <Layout style={fullScreen}>
        <Layout.Header>
          <Header />
        </Layout.Header>

        {children}
      </Layout>
    </DefaultLayoutContext>
  );
}
