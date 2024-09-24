import { NodeMapProvider } from '@/components/NodeMap/NodeMapData';
import { Pipeline } from './api';
import { OurNodeProps } from '@/components';

export type NodeMapContext = ReturnType<typeof useNodeMapContext>;
export const useNodeMapContext = NodeMapProvider.useContext;

export function dumpContext(context: NodeMapContext): Pipeline['save'] {
  const nodes = context.nodeState[0].map(
    (node) =>
      ({
        data: node.data,
        id: node.id,
        position: node.position,
        type: node.type,
      }) as OurNodeProps,
  );

  const edges = context.edgeState[0].map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
  }));

  return { edges, nodes };
}
