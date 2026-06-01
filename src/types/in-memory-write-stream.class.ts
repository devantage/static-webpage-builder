import { Writable, WritableOptions } from 'stream';

export class InMemoryWriteStream extends Writable {
  private _chunks: Buffer[] = [];

  public constructor(options?: WritableOptions) {
    super(options);

    this._chunks = [];
  }

  public override _write(
    chunk: string | Buffer,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    try {
      const buffer: Buffer = Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(chunk, encoding);

      this._chunks.push(buffer);

      callback(null);
    } catch (error) {
      callback(error instanceof Error ? error : new Error(String(error)));
    }
  }

  public override _writev(
    chunks: Array<{ chunk: Buffer; encoding: BufferEncoding }>,
    callback: (error?: Error | null) => void,
  ): void {
    try {
      for (const entry of chunks) {
        const buffer: Buffer = Buffer.isBuffer(entry.chunk)
          ? entry.chunk
          : Buffer.from(entry.chunk, entry.encoding);

        this._chunks.push(buffer);
      }

      callback(null);
    } catch (error) {
      callback(error instanceof Error ? error : new Error(String(error)));
    }
  }

  public toBuffer(): Buffer {
    return Buffer.concat(this._chunks);
  }

  public toString(encoding: BufferEncoding = 'utf8'): string {
    return this.toBuffer().toString(encoding);
  }
}
