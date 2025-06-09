import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Logger } from '../shared/core/logger/index.js';
import { Config, RestSchema } from '../shared/core/config/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/core/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/utils/database.js';
import { Controller, ExceptionFilter } from './libs/index.js';
import { ParseTokenMiddleware } from './libs/middleware/parse-token.middleware.js';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from './rest.constant.js';
import cors from 'cors';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,

    @inject(Component.Config)
    private readonly config: Config<RestSchema>,

    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient,

    @inject(Component.OfferController)
    private readonly offerController: Controller,

    @inject(Component.CommentController)
    private readonly commentController: Controller,

    @inject(Component.UserController)
    private readonly userController: Controller,

    @inject(Component.ExceptionFilter)
    private readonly appExceptionFilter: ExceptionFilter,

    @inject(Component.AuthExceptionFilter)
    private readonly authExceptionFilter: ExceptionFilter
  ) {
    this.server = express();
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this._initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization completed');

    this.logger.info('Try to init server');
    await this._initServer();
    this.logger.info(
      `Server started on http://localhost:${this.config.get('PORT')}`
    );
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initMiddleware() {
    this.server.use(express.json());
    this.server.use(
      STATIC_UPLOAD_ROUTE,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(
      STATIC_FILES_ROUTE,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    const authenticateMiddleware = new ParseTokenMiddleware(
      this.config.get('JWT_SECRET')
    );
    this.server.use(
      authenticateMiddleware.execute.bind(authenticateMiddleware)
    );
    this.server.use(cors());
  }

  private async _initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async _initExceptionFilters() {
    this.server.use(
      this.appExceptionFilter.catch.bind(this.appExceptionFilter)
    );
    this.server.use(
      this.authExceptionFilter.catch.bind(this.authExceptionFilter)
    );
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_HOST'),
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }
}
