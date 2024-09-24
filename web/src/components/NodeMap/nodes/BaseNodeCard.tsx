import { Card, Input, Typography } from 'antd';
import { NodeProps } from '@xyflow/react';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { OurNodeProps } from '.';
import { useStringUpdatingInput } from '@/lib/hooks';

export type BaseNodeCardProps = Pick<
  NodeProps<OurNodeProps>,
  'data' | 'selected'
> & {
  title: string;
};

export function BaseNodeCard({
  children,
  data,
  selected,
  title,
}: PropsWithChildren<BaseNodeCardProps>) {
  const [label, handleLabelChange] = useStringUpdatingInput(data, 'label');

  return (
    <Card className={classNames(selected && 'border-teal-400')}>
      <Typography.Title level={3}>
        <Input onChange={handleLabelChange} value={label} />
      </Typography.Title>
      <Typography.Title level={5}>{title}</Typography.Title>
      {children}
    </Card>
  );
}
