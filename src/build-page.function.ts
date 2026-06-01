import { Archiver, create } from 'archiver';
import { relative } from 'path';

import { listPageFiles, optimizeFile } from './helpers';
import {
  BuildPageResult,
  FileOptimizationResult,
  InMemoryWriteStream,
} from './types';

export async function buildPage(
  pageRootPath: string,
): Promise<BuildPageResult> {
  const originalFilesPaths: string[] = listPageFiles(pageRootPath);

  const zipFile: Archiver = create('zip', {
    zlib: { level: 9 },
  });

  const zipFileStream: InMemoryWriteStream = new InMemoryWriteStream();

  const builtPageFiles: Record<string, FileOptimizationResult> = {};

  for (const curOriginalFilePath of originalFilesPaths) {
    const relativePath: string = relative(pageRootPath, curOriginalFilePath);

    const optimizationResult: FileOptimizationResult =
      await optimizeFile(curOriginalFilePath);

    builtPageFiles[relativePath] = optimizationResult;
  }

  await new Promise(
    (resolve: (value: unknown) => void, reject: (reason: unknown) => void) => {
      zipFileStream.on('close', resolve);

      zipFile.on('error', reject);

      zipFile.pipe(zipFileStream);

      for (const [path, result] of Object.entries(builtPageFiles)) {
        zipFile.append(result.optimizedFileBuffer, {
          name: path,
        });
      }

      zipFile.finalize().catch(reject);
    },
  );

  return {
    builtPageFiles,
    builtPageFileBuffer: zipFileStream.toBuffer(),
  };
}
