import { Command } from './interface.js';
import { TsvFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { Logger } from '../../shared/libs/logger/logger.interface.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultOfferService } from '../../shared/modules/offer/default-offer.service.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo.database-client.js';
import { Offer } from '../../shared/types/index.js';
import { CommentModel } from '../../shared/modules/comment/comment.entity.js';
import { FavoriteModel } from '../../shared/modules/favorite/favorite.entity.js';
import { OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DEFAULT_USER_PASSWORD } from './command.constant.js';

export default class ImportCommand implements Command {
  private userService: UserService;
  private databaseClient: DatabaseClient;
  private offerService: OfferService;
  private logger: Logger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel, FavoriteModel, CommentModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async saveOffer(offer: Offer) {
    console.info(`Importing offer ${offer.title}...`);

    const user = await this.userService.findOrCreate(
      {
        ...offer.user,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({ ...offer, user: user });
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(_parameters: string[]) {
    const [filename, login, password, port, dbname, salt] = _parameters;
    const uri = getMongoURI(login, password, port, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      console.error('Cant import from this file');
      console.error(getErrorMessage(err));
    }
  }
}
