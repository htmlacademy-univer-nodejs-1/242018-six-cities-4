#!/usr/bin/env node

import chalk from 'chalk';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

type PackageJSONConfig = {
  version: string;
}

function getVersion(): string {
  const packageJsonPath = resolve(__dirname, '../package.json');
  const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent) as PackageJSONConfig;

  return packageJson.version;
}

function printHelp(): void {
  console.log(chalk.green(`
    Программа для подготовки данных для REST API сервера.
    
    Пример: cli.js --<command> [--arguments]
    
    Команды:
    
     --version:                   # выводит номер версии
     --help:                      # печатает этот текст
     --import <path>:             # импортирует данные из TSV
     --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
  `));
}

function printVersion(): void {
  const version = getVersion();
  console.log(chalk.yellow(version));
}

function importTSV(filePath: string): void {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');
    const headers = lines[0].split('\t');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split('\t');
      const entry: Record<string, string> = {};

      headers.forEach((header, index) => {
        entry[header] = values[index];
      });

      data.push(entry);
    }

    console.log(chalk.green(`Imported ${data.length} offers from ${filePath}`));
    console.log(chalk.cyan('Data structure:'));
    console.log(data);
  } catch (error) {
    console.error(chalk.red(`Failed to import data from ${filePath}`));
    console.error(chalk.red((error as Error).message));
  }
}

function parseArgs(args: string[]): void {
  const commands = args.slice(2);
  const command = commands[0];

  switch(command) {
    case '--version':
      printVersion();
      break;
    case '--help':
      printHelp();
      break;
    case '--import':
      if (commands.length < 2) {
        console.error(chalk.red('Error: Missing file path for import command'));
        printHelp();
        break;
      }
      importTSV(commands[1]);
      break;
    default:
      printHelp();
      break;
  }
}

parseArgs(process.argv);
