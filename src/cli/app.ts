/* eslint-disable node/no-unsupported-features/es-syntax */

import { Command } from './commands/interface.js';
import { CommandParser } from './commands/parser.js';

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

type CommandCollection = Map<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = new Map();

  constructor(
    private readonly defaultCommand: string = '--help',
    private readonly commandFolder: string = 'commands',
  ) {

  }

  public async loadCommands(): Promise<Command[]> {
    const filename = url.fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    const commandsPath = path.resolve(dirname, this.commandFolder);

    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.startsWith('command-') && file.endsWith('.js'));

    const commands: Command[] = [];

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const fileURL = url.pathToFileURL(filePath);
      const module = await import(fileURL.href);

      if (module.default && typeof module.default === 'function') {
        const commandInstance: Command = new module.default();
        commands.push(commandInstance);
      }
    }

    return commands;
  }

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      const name = command.getName();
      if (this.commands.has(name)) {
        throw new Error(`Command ${name} is already registered`);
      }
      this.commands.set(name, command);
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands.get(commandName) ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    const defaultCommand = this.commands.get(this.defaultCommand);
    if (!defaultCommand) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return defaultCommand;
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName, commandArguments] = Object.entries(parsedCommand)[0] ?? [];
    const command = this.getCommand(commandName);
    command.execute(commandArguments);
  }
}
