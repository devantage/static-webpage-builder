import { FileOptimizationReduction } from './file-optimization-reduction.type';

export type FileOptimizationResult = {
  optimizedFileBuffer: Buffer;
} & FileOptimizationReduction;
