type ParsedCommand = Record<string, string[]>;

export class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand: string | null = null;

    for (const arg of cliArguments) {
      if (arg.startsWith('--')) {
        currentCommand = arg;
        parsedCommand[currentCommand] = [];
      } else if (currentCommand) {
        parsedCommand[currentCommand].push(arg);
      }
    }

    return parsedCommand;
  }
}
