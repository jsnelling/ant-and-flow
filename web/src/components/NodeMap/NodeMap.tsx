import {
  addEdge,
  Background,
  Connection,
  ControlButton,
  ControlButtonProps,
  Controls,
  MiniMap,
  ReactFlow,
} from '@xyflow/react';
import { ChangeEventHandler, useCallback, useRef } from 'react';
import { ConnectableElement, useDrop } from 'react-dnd';
import { GroupOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import { useDefaultLayoutContext } from '@/pages/DefaultLayout';
import { useNodeMapContext } from '@/lib/context';
import { useToggle } from '@/lib/hooks';

import { NodeDebugger } from './NodeDebugger';
import { OurNodes, OurNodeTypes } from './nodes';

export function NodeMap() {
  const { useAdditionalHeader } = useDefaultLayoutContext();
  const context = useNodeMapContext();

  const [showMiniMap, toggleMinimap] = useToggle();
  const ref = useRef<HTMLElement>();

  const {
    addNode,
    nodeState: [nodes, , onNodesChange],
    edgeState: [edges, setEdges, onEdgesChange],
  } = context;

  const [, dropRef] = useDrop<{ id: string }>(
    () => ({
      accept: Object.keys(OurNodes),
      drop({ id }, monitor) {
        const anchor = ref?.current?.getBoundingClientRect();
        const offset = monitor.getSourceClientOffset();
        const position = {
          x: (offset?.x ?? 0) - (anchor?.x ?? 0),
          y: (offset?.y ?? 0) - (anchor?.y ?? 0),
        };

        addNode({
          type: id as OurNodeTypes | undefined,
          position,
        });
      },
    }),
    [ref],
  );

  const combineRef = useCallback(
    (elem: ConnectableElement) => {
      dropRef(elem);
      if (elem && elem instanceof HTMLElement) {
        ref.current = elem;
      }
    },
    [dropRef],
  );

  const handleConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  useAdditionalHeader(<EditNameInput />, []);

  return (
    <ReactFlow
      className={'border-gray-700 border-t border-l rounded-tl-md'}
      colorMode='system'
      edges={edges}
      nodes={nodes}
      nodeTypes={OurNodes}
      onConnect={handleConnect}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      ref={combineRef}
    >
      <Background />

      <Controls>
        <ToggleMinimapButton onClick={toggleMinimap} />
        <NodeDebugger />
      </Controls>

      {showMiniMap && <MiniMap position='top-right' />}
    </ReactFlow>
  );
}

function EditNameInput() {
  const {
    briefState: [brief, setBrief],
  } = useNodeMapContext();

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setBrief((brief) => ({ ...brief, name: e.target.value }));
    },
    [setBrief],
  );

  return (
    <Form.Item label='Name'>
      <Input onChange={handleChange} value={brief?.name} />
    </Form.Item>
  );
}

function ToggleMinimapButton(props: ControlButtonProps) {
  return (
    <ControlButton {...props}>
      <GroupOutlined />
    </ControlButton>
  );
}
