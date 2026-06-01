import { minify_sync, MinifyOutput } from 'terser';

import { FileOptimizer } from './file-optimizer.class';

export class JsFileOptimizer extends FileOptimizer {
  private _optimizer: (fileBuffer: Buffer) => MinifyOutput = (
    fileBuffer: Buffer,
  ) =>
    minify_sync(fileBuffer.toString('utf-8'), {
      compress: true,
      mangle: true,
      format: { comments: false },
    });

  protected async _applyOptimizations(
    originalFileBuffer: Buffer,
  ): Promise<Buffer> {
    return new Promise(
      (resolve: (value: Buffer) => void, reject: (reason: unknown) => void) => {
        const result: MinifyOutput = this._optimizer(originalFileBuffer);

        if (result.code) {
          resolve(Buffer.from(result.code, 'utf8'));
        }

        reject(new Error('Could not optimize file'));
      },
    );
  }
}
