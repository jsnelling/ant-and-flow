import { Handle, Node, NodeProps, Position } from '@xyflow/react';

import { useStringUpdatingInput } from '@/lib/hooks';
import { BaseNodeCard } from './BaseNodeCard';

export type RawInputGeneratorProps = Node<
  {
    label: string;
  },
  'RawInputGenerator'
>;

export function RawInputGenerator({
  data,
  selected,
}: NodeProps<RawInputGeneratorProps>) {
  const [label, handleLabelChange] = useStringUpdatingInput(data, 'label');

  return (
    <>
      <Handle type='target' position={Position.Top} />

      <BaseNodeCard data={data} selected={selected} title='Raw Input Generator'>
        <label htmlFor='text'>Text:</label>
        <input
          id='text'
          name='text'
          onChange={handleLabelChange}
          value={label}
          className='nodrag'
        />
      </BaseNodeCard>

      <Handle type='source' position={Position.Bottom} />
    </>
  );
}
