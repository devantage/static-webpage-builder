# Static Webpage Builder

A Node.js library for optimizing and packaging static webpages into a ready-to-deploy ZIP archive. It minifies HTML, CSS, and JavaScript files, reports size reduction metrics, and bundles everything into an in-memory buffer — no temporary files needed.

## Features

- Minifies `.html` files via [html-minifier-terser](https://github.com/terser/html-minifier-terser)
- Minifies `.css` files via [clean-css](https://github.com/clean-css/clean-css)
- Minifies `.js` files via [terser](https://github.com/terser/terser)
- Passes through any other file type untouched
- Produces a ZIP archive (compression level 9) as an in-memory `Buffer`
- Returns per-file size reduction metrics (bytes saved and percentage)

## Installation

```bash
npm install @devantage/static-webpage-builder
```

## Usage

```typescript
import { buildPage } from '@devantage/static-webpage-builder';

const result = await buildPage('/path/to/your/page');

// Write the ZIP to disk
import { writeFileSync } from 'node:fs';

writeFileSync('page.zip', result.builtPageFileBuffer);

// Inspect per-file optimization results
for (const [filePath, metrics] of Object.entries(result.builtPageFiles)) {
  console.log(`${filePath}: saved ${metrics.reductionInBytes} bytes (${metrics.reductionPercentage}% reduction)`);
}
```

### `buildPage(pageRootPath: string): Promise<BuildPageResult>`

Recursively reads all files under `pageRootPath`, optimizes them, and bundles them into a ZIP archive.

| Parameter      | Type     | Description                                          |
| -------------- | -------- | ---------------------------------------------------- |
| `pageRootPath` | `string` | Absolute or relative path to the page root directory |

## Return type

```typescript
type BuildPageResult = {
  // ZIP archive of all optimized files as an in-memory buffer
  builtPageFileBuffer: Buffer;

  // Map of relative file path → optimization metrics
  builtPageFiles: Record<string, FileOptimizationReduction>;
};

type FileOptimizationReduction = {
  reductionInBytes: number; // bytes removed by minification
  reductionPercentage: number; // percentage of original size removed (0–100)
};
```

## Supported file types

| Extension | Optimizer            |
| --------- | -------------------- |
| `.html`   | html-minifier-terser |
| `.css`    | clean-css            |
| `.js`     | terser               |
| other     | copied as-is         |

## Requirements

- Node.js >= 18

## License

MIT
