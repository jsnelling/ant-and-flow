import { Form, Input } from 'antd';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';

import { useNumberUpdatingInput } from '@/lib/hooks';

import { BaseNodeCard } from './BaseNodeCard';

export type RandomInputGeneratorNodeProps = Node<
  {
    label: string;
    interval: number;
    max: number;
    min: number;
  },
  'RandomInputGeneratorNode'
>;

export function RandomInputGeneratorNode({
  data,
  selected,
}: NodeProps<RandomInputGeneratorNodeProps>) {
  const [min, handleMinChange] = useNumberUpdatingInput(data, 'min');
  const [max, handleMaxChange] = useNumberUpdatingInput(data, 'max');
  const [interval, handleIntervalChange] = useNumberUpdatingInput(
    data,
    'interval',
  );

  return (
    <>
      <BaseNodeCard
        data={data}
        selected={selected}
        title='Random Input Generator'
      >
        <Form>
          <Form.Item label='Min'>
            <Input value={min} onChange={handleMinChange} />
          </Form.Item>
          <Form.Item label='Max'>
            <Input value={max} onChange={handleMaxChange} />
          </Form.Item>
          <Form.Item label='Interval'>
            <Input value={interval} onChange={handleIntervalChange} />
          </Form.Item>
        </Form>
      </BaseNodeCard>

      <Handle position={Position.Bottom} type='source' />
    </>
  );
}
