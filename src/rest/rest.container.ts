import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import { Logger, PinoLogger } from '../shared/core/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/core/config/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../shared/core/database-client/index.js';
import { AppExceptionFilter, ExceptionFilter } from './libs/index.js';

export function createRestApplicationContainer() {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();

  return container;
}
