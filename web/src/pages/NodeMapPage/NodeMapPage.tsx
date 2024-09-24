import { Layout } from 'antd';

import { DefaultLayout } from '@/pages/DefaultLayout';
import { NodeMap, NodeMapProvider, NodeMapProviderProps } from '@/components';

import { NewFlowButton, OpenFlowButton, SaveFlowButton } from './buttons';
import { Sidebar } from './Sidebar';

export function NodeMapPage({ saveId }: NodeMapProviderProps) {
  return (
    <NodeMapProvider saveId={saveId}>
      <DefaultLayout
        additionalHeaders={
          <>
            <NewFlowButton />
            <OpenFlowButton />
            <SaveFlowButton isNew={!saveId} />
          </>
        }
      >
        <Layout>
          <Layout.Sider width='20%'>
            <Sidebar />
          </Layout.Sider>

          <Layout.Content>
            <NodeMap />
          </Layout.Content>
        </Layout>
      </DefaultLayout>
    </NodeMapProvider>
  );
}
