import { minify } from 'html-minifier-terser';

import { FileOptimizer } from './file-optimizer.class';

export class HtmlFileOptimizer extends FileOptimizer {
  private _optimizer: (fileBuffer: Buffer) => Promise<string> = async (
    fileBuffer: Buffer,
  ) =>
    minify(fileBuffer.toString('utf-8'), {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    });

  protected async _applyOptimizations(
    originalFileBuffer: Buffer,
  ): Promise<Buffer> {
    const result: string = await this._optimizer(originalFileBuffer);

    return Buffer.from(result, 'utf8');
  }
}
