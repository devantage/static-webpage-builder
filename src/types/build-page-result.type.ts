import { FileOptimizationReduction } from './file-optimization-reduction.type';

export type BuildPageResult = {
  builtPageFiles: Record<string, FileOptimizationReduction>;

  builtPageFileBuffer: Buffer;
};
