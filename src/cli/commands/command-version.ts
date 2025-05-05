import { Command } from './interface.js';
import fs from 'node:fs';
import path from 'node:path';

export default class VersionCommand implements Command {
  constructor(private readonly filePath: string = './package.json') {}

  private readVersion(): string {
    try {
      const jsonContent = fs.readFileSync(path.resolve(this.filePath), 'utf-8');
      const { version }: { version?: string } = JSON.parse(jsonContent);
      if (!version) {
        throw new Error('Version not found in package.json');
      }
      return version;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      throw new Error(`Failed to read version from ${this.filePath}`);
    }
  }

  public getName(): string {
    return '--version';
  }

  public execute(_parameters: string[]) {
    try {
      console.info(this.readVersion());
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
