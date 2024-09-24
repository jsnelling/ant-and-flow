import { createLazyFileRoute } from '@tanstack/react-router';

import { NodeMapPage } from '@/pages/NodeMapPage';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return <NodeMapPage />;
}
