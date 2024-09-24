import { Node } from '@xyflow/react';

import { OurNodeProps } from '@/components';

export function isOurNode(node: Node): node is OurNodeProps {
  return 'data' in node;
}

export const initialNodes: OurNodeProps[] = [
  {
    id: '1',
    position: { x: 280, y: 40 },
    type: 'RandomInputGeneratorNode',
    data: { label: '2', interval: 1, min: -5, max: 5 },
  },
  {
    data: { label: 'Split', splits: 2 },
    id: '2',
    position: { x: 280, y: 385 },
    type: 'SplitterStepNode',
  },
  {
    data: { format: 'json', label: 'JSON Logger' },
    id: '3',
    position: { x: 444.8046875, y: 648.421875 },
    type: 'DebugLoggerOutputNode',
  },
  {
    data: { format: 'csv', label: 'CSV Logger' },
    id: '4',
    position: { x: 155.8046875, y: 645.421875 },
    type: 'DebugLoggerOutputNode',
  },
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', sourceHandle: 'split_1' },
  { id: 'e2-4', source: '2', target: '4', sourceHandle: 'split_0' },
];

export type NewNode = typeof newNode;

export async function newNode({
  data,
  position = { x: 300, y: 300 },
  type = 'RawInputGenerator',
}: Partial<OurNodeProps>): Promise<OurNodeProps> {
  data ||= {} as OurNodeProps['data'];

  const id = crypto.randomUUID();

  return {
    data: data as OurNodeProps['data'],
    id,
    position,
    type,
  } as OurNodeProps;
}
