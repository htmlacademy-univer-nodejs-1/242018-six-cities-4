import { Command } from './interface.js';
import {TsvFileReader} from '../../shared/libs/file-reader/index.js';
import {createOffer, getErrorMessage} from '../../shared/helpers/index.js';

export default class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onReadLine(line: string) {
    console.info(createOffer(line));
  }

  private onReadEnd(count: number) {
    console.info(`${count} rows imported`);
  }

  public async execute(parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onReadLine);
    fileReader.on('end', this.onReadEnd);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
