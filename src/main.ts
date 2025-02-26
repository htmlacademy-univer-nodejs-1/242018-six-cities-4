#!/usr/bin/env node

function printInfo(): void {
  console.log(`
    Программа для создания и управления объявлениями.
    Пример:
        main.js --help
    `);
}

function printHelp(): void {
  console.log(`
    Программа для создания и управления объявлениями.
    
    Пример:
        main.js --help          # печатает этот текст
        main.js --version       # печатает версию программы
        
    Больше информации:
    https://github.com/htmlacademy/six-cities
    `);
}

function printVersion(): void {
  const version = '1.0.0';
  console.log(version);
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
    default:
      printInfo();
      break;
  }
}

parseArgs(process.argv);
