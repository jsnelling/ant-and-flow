import { Select } from 'antd';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';

import { BaseNodeCard } from './BaseNodeCard';
import { useState } from 'react';

type Format = 'csv' | 'json';

export type DebugLoggerOutputNodeProps = Node<
  {
    format: Format;
    label: string;
  },
  'DebugLoggerOutputNode'
>;

export function DebugLoggerOutputNode({
  data,
  selected,
}: NodeProps<DebugLoggerOutputNodeProps>) {
  const [format, setFormat] = useState<Format>('json');

  return (
    <>
      <Handle type='target' position={Position.Top} />

      <BaseNodeCard data={data} selected={selected} title='Logger Output'>
        <Select<Format>
          className='grow'
          onChange={setFormat}
          value={format}
          options={[
            { value: 'csv', label: <span>CSV</span> },
            { value: 'json', label: <span>JSON</span> },
          ]}
        />
      </BaseNodeCard>
    </>
  );
}
