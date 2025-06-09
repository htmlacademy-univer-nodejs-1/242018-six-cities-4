import { Command } from './interface.js';
import chalk from 'chalk';

export default class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute(_parameters: string[]) {
    console.log(chalk.bold.blue('Программа для подготовки данных для REST API сервера.'));
    console.log(chalk.white(`
Использование: ${chalk.bold('cli [options]')}
Опции:
  ${chalk.green('--version')} ${chalk.gray('вывод номер версии')}
  ${chalk.yellow('--import <filename> <login> <password> <port> <dbname> <salt>')}  ${chalk.gray('импортирует данные из TSV')}
  ${chalk.magenta('--generate <n> <filepath> <url>')} ${chalk.gray('генерирует произвольное количество тестовых данных')}
  ${chalk.cyan('--help')} ${chalk.gray('отобразить справку')}'

    `));
  }
}
