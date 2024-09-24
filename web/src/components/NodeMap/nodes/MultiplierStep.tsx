import { Form, Input } from 'antd';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';

import { useNumberUpdatingInput } from '@/lib/hooks';

import { BaseNodeCard } from './BaseNodeCard';

export type MultiplierStepNodeProps = Node<
  {
    label: string;
    byAmount: number | undefined;
  },
  'MultiplierStepNode'
>;

export function MultiplierStepNode({
  data,
  selected,
}: NodeProps<MultiplierStepNodeProps>) {
  const [byAmount, handleByAmountChange] = useNumberUpdatingInput(
    data,
    'byAmount',
  );

  return (
    <>
      <Handle type='target' position={Position.Top} />

      <BaseNodeCard data={data} selected={selected} title='Multiplier Step'>
        <Form>
          <Form.Item label='By Amount'>
            <Input value={byAmount} onChange={handleByAmountChange} />
          </Form.Item>
        </Form>
      </BaseNodeCard>

      <Handle position={Position.Bottom} type='source' />
    </>
  );
}
