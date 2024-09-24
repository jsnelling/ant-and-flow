import { Form, Input } from 'antd';
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useUpdateNodeInternals,
} from '@xyflow/react';

import { useNumberUpdatingInput } from '@/lib/hooks';

import { BaseNodeCard } from './BaseNodeCard';
import { CSSProperties, useEffect, useMemo } from 'react';

export type SplitterStepNodeProps = Node<
  {
    label: string;
    splits: number | undefined;
  },
  'SplitterStepNode'
>;

export function SplitterStepNode({
  id,
  data,
  selected,
}: NodeProps<SplitterStepNodeProps>) {
  const [_splits, handleSplitsChange] = useNumberUpdatingInput(data, 'splits');

  const splits = _splits && !isNaN(_splits) ? _splits : 2;

  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, splits, updateNodeInternals]);

  return (
    <>
      <Handle type='target' position={Position.Top} />

      <BaseNodeCard data={data} selected={selected} title='Splitter Step'>
        <Form>
          <Form.Item label='Splits'>
            <Input onChange={handleSplitsChange} value={splits} />
          </Form.Item>
        </Form>
      </BaseNodeCard>

      {[...Array(splits)].map((_, i) => (
        <SplitHandle key={i} i={i} total={splits} />
      ))}
    </>
  );
}

type SplitHandleProps = {
  i: number;
  total: number;
};

function SplitHandle({ i, total }: SplitHandleProps) {
  const style = useMemo<CSSProperties>(
    () => ({ left: `${100 / (total + 1) + (100 * i) / (total + 1)}%` }),
    [i, total],
  );

  return (
    <Handle
      id={`split_${i}`}
      key={`split_${i}`}
      position={Position.Bottom}
      style={style}
      type='source'
    />
  );
}
