import {
  DebugLoggerOutputNode,
  DebugLoggerOutputNodeProps,
} from './DebugLoggerOutput';
import { MultiplierStepNode, MultiplierStepNodeProps } from './MultiplierStep';
import {
  RandomInputGeneratorNode,
  RandomInputGeneratorNodeProps,
} from './RandomInputGenerator';
import { RawInputGenerator, RawInputGeneratorProps } from './RawInputGenerator';
import { SplitterStepNode, SplitterStepNodeProps } from './SplitterStep';

export const InputNodes = {
  RawInputGenerator,
  RandomInputGeneratorNode,
};

export const StepNodes = {
  MultiplierStepNode,
  SplitterStepNode,
};

export const OutputNodes = {
  DebugLoggerOutputNode,
};

export const OurNodes = {
  ...InputNodes,
  ...StepNodes,
  ...OutputNodes,
};

export type OurNodeProps =
  | DebugLoggerOutputNodeProps
  | MultiplierStepNodeProps
  | RawInputGeneratorProps
  | RandomInputGeneratorNodeProps
  | SplitterStepNodeProps;

export type OurNodeTypes = OurNodeProps['type'];
