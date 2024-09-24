import { AxiosError } from 'axios';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Edge, useEdgesState, useNodesState } from '@xyflow/react';

import { getPipeline, PipelineBrief } from '@/lib/api';
import { initialEdges, initialNodes, NewNode, newNode } from '@/lib/data';

import { OurNodeProps } from './nodes';
import { message } from 'antd';
import { useNavigate } from '@tanstack/react-router';

type BriefState = ReturnType<typeof useState<PipelineBrief>>;
type NodeState = ReturnType<typeof useNodesState<OurNodeProps>>;
type EdgeState = ReturnType<typeof useEdgesState>;

type AddNode = (...props: Parameters<NewNode>) => Promise<void>;

type NodeMapContext = {
  briefState: BriefState;
  edgeState: EdgeState;
  nodeState: NodeState;

  addNode: AddNode;
};

const Context = createContext<NodeMapContext | undefined>(undefined);

export type NodeMapProviderProps = {
  saveId?: number;
};

export function NodeMapProvider({
  children,
  saveId,
}: PropsWithChildren<NodeMapProviderProps>) {
  const navigate = useNavigate();

  const briefState = useState<PipelineBrief>();
  const nodeState = useNodesState<OurNodeProps>([]);
  const edgeState = useEdgesState<Edge>([]);

  const [, setBrief] = briefState;
  const [, setNodes] = nodeState;
  const [, setEdges] = edgeState;

  useEffect(() => {
    if (saveId) {
      getPipeline(saveId)
        .then(
          ({
            data: {
              save: { edges, nodes },
              ...brief
            },
          }) => {
            setBrief(brief);
            setEdges(edges);
            setNodes(nodes);
          },
        )
        .catch((e: AxiosError) => {
          if (e.status === 404) {
            message.error(`Can't find Pipeline ${saveId}`);
            navigate({ to: '/' });
          }
        });
    } else {
      setBrief(undefined);
      setEdges(initialEdges);
      setNodes(initialNodes);
    }
  }, [navigate, saveId, setBrief, setEdges, setNodes]);

  const addNode = useCallback<AddNode>(
    async (props) => {
      const node = await newNode(props);

      setNodes((nodes) => {
        node.data.label = `Node ${nodes.length}`;

        return [...nodes, node];
      });
    },
    [setNodes],
  );

  const value = useMemo(
    () => ({
      briefState,
      edgeState,
      nodeState,

      addNode,
    }),
    [briefState, edgeState, nodeState, addNode],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

NodeMapProvider.useContext = function useNodeMapContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('missing NodeMapContext');
  }

  return context;
};
