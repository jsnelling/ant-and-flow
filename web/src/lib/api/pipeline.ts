import { OurNodeProps } from '@/components';

import { client } from './client';

export type Pipeline = {
  id?: number | undefined;
  name: string;
  save: {
    edges: Array<{
      id: string;
      source: string;
      target: string;
    }>;
    nodes: Array<OurNodeProps>;
  };
};

export type PipelineBrief = Omit<Pipeline, 'save'>;

export const getPipeline = (id: number) => client.get<Pipeline>(`/${id}`);

export const listPipelines = () => client.get<PipelineBrief[]>('/');

export const savePipeline = (pipeline: Pipeline) =>
  pipeline.id ?
    client.put(`/${pipeline.id}`, pipeline)
  : client.post('/', pipeline);
