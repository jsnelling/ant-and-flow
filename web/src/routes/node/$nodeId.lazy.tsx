import { createLazyFileRoute, useParams } from '@tanstack/react-router';

import { NodeMapPage } from '@/pages/NodeMapPage';

export const Route = createLazyFileRoute('/node/$nodeId')({
  component: function Component() {
    const { nodeId } = useParams({ from: '/node/$nodeId' });

    return <NodeMapPage saveId={nodeId ? parseInt(nodeId, 10) : undefined} />;
  },
});
