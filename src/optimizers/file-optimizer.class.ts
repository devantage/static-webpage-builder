import { FileOptimizationReduction, FileOptimizationResult } from '../types';

export abstract class FileOptimizer {
  public async optimize(
    originalFileBuffer: Buffer,
  ): Promise<FileOptimizationResult> {
    const optimizedFileBuffer: Buffer =
      await this._applyOptimizations(originalFileBuffer);

    return {
      optimizedFileBuffer,
      ...this._calculateReduction(originalFileBuffer, optimizedFileBuffer),
    };
  }

  protected abstract _applyOptimizations(
    originalFileBuffer: Buffer,
  ): Promise<Buffer>;

  private _calculateReduction(
    originalFileBuffer: Buffer,
    optimizedFileBuffer: Buffer,
  ): FileOptimizationReduction {
    const reductionPercentage: number =
      originalFileBuffer.length > 0
        ? Math.round(
            (1 - optimizedFileBuffer.length / originalFileBuffer.length) * 100,
          )
        : 0;

    const reductionInBytes: number =
      originalFileBuffer.length - optimizedFileBuffer.length;

    return {
      reductionPercentage,
      reductionInBytes,
    };
  }
}
