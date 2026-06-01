import { Dirent, readdirSync } from 'node:fs';
import { join } from 'node:path';

export function listPageFiles(rootPageDirPath: string): string[] {
  const pageFiles: Dirent[] = readdirSync(rootPageDirPath, {
    withFileTypes: true,
  });

  const files: string[] = [];

  for (const curPageFile of pageFiles) {
    const curPageFilePath: string = join(rootPageDirPath, curPageFile.name);

    if (curPageFile.isDirectory()) {
      files.push(...listPageFiles(curPageFilePath));
    } else {
      files.push(curPageFilePath);
    }
  }

  return files;
}
