import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

import {
  CssFileOptimizer,
  HtmlFileOptimizer,
  JsFileOptimizer,
} from '../optimizers';
import { FileOptimizer } from '../optimizers/file-optimizer.class';
import { FileOptimizationResult } from '../types';

const htmlFileOptimizer: FileOptimizer = new HtmlFileOptimizer();

const cssFileOptimizer: FileOptimizer = new CssFileOptimizer();

const jsFileOptimizer: FileOptimizer = new JsFileOptimizer();

export async function optimizeFile(
  filePath: string,
): Promise<FileOptimizationResult> {
  const fileExtension: string = extname(filePath);

  const fileBuffer: Buffer = readFileSync(filePath);

  switch (fileExtension) {
    case '.html':
      return await htmlFileOptimizer.optimize(fileBuffer);
    case '.css':
      return await cssFileOptimizer.optimize(fileBuffer);
    case '.js':
      return await jsFileOptimizer.optimize(fileBuffer);
    default:
      return {
        optimizedFileBuffer: fileBuffer,
        reductionPercentage: 0,
        reductionInBytes: 0,
      };
  }
}
