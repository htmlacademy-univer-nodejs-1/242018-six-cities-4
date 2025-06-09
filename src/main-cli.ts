#!/usr/bin/env node

import 'reflect-metadata';
import { CLIApplication } from './cli/index.js';

(async () => {
  const cliApp = new CLIApplication();
  const commands = await cliApp.loadCommands();
  cliApp.registerCommands(commands);
  cliApp.processCommand(process.argv);
})();
