import { Card, Divider } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { NodeTypes } from '@xyflow/react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';

import { InputNodes, OutputNodes, StepNodes } from '@/components';

const groups = {
  Inputs: InputNodes,
  Steps: StepNodes,
  Outputs: OutputNodes,
};

export function Sidebar() {
  return (
    <div className='flex flex-col gap-2 mx-4'>
      {Object.entries(groups).map(([label, nodes]) => (
        <Fragment key={label}>
          <Divider>{label}</Divider>
          {Object.entries(nodes).map(([id, func]) => (
            <SidebarCell func={func} key={id} id={id} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

type SidebarCellProps = {
  func: NodeTypes[string];
  id: string;
};

function SidebarCell({ id }: SidebarCellProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: id,
    item: { id },
    collect: (it) => ({ isDragging: it.isDragging() }),
  }));

  return (
    <Card
      className={classNames('grow cursor-move', isDragging && 'opacity-20')}
      ref={dragRef}
      size='small'
    >
      {id
        .replace(/Node$/, '')
        .replaceAll(/([A-Z])/g, (_, b) => ` ${b}`)
        .replace(/^ /, '')}
    </Card>
  );
}
