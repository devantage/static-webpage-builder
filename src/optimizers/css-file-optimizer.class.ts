import CleanCSS, { Output } from 'clean-css';

import { FileOptimizer } from './file-optimizer.class';

export class CssFileOptimizer extends FileOptimizer {
  private _optimizer: CleanCSS.MinifierOutput = new CleanCSS({
    level: 2,
    returnPromise: false,
  });

  protected async _applyOptimizations(
    originalFileBuffer: Buffer,
  ): Promise<Buffer> {
    return new Promise(
      (resolve: (value: Buffer) => void, reject: (reason: unknown) => void) => {
        const result: Output = this._optimizer.minify(originalFileBuffer);

        if (result.errors.length) {
          reject(new Error(result.errors[0]));
        }

        resolve(Buffer.from(result.styles, 'utf8'));
      },
    );
  }
}
