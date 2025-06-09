import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { Logger } from '../../libs/logger/index.js';
import { City, Component } from '../../types/index.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { BaseController, CheckOwnerMiddleware, DocumentExistsMiddleware, HttpMethod, PrivateRouteMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../../rest/libs/index.js';
import { CreateOfferDto, OfferRdo, OfferService } from './index.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { fillDTO } from '../../helpers/common.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { CommentService } from '../comment/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ParamCity } from './types/param-city.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger)
    protected readonly logger: Logger,

    @inject(Component.OfferService)
    private readonly offerService: OfferService,

    @inject(Component.CommentService)
    private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()],
    });

    this.addRoute({
      path: '/:city/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new CheckOwnerMiddleware(this.offerService),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new CheckOwnerMiddleware(this.offerService),
      ],
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const limit = parseInt(req.query.limit as string, 10) || DEFAULT_OFFER_COUNT;
    const offers = await this.offerService.findAll(limit, req.body?.userId);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({
      ...body,
      user: tokenPayload.id,
    });
    this.created(res, fillDTO(OfferRdo, result));
  }

  async show({ params, tokenPayload }: Request<ParamOfferId>, res: Response) {
    const offer = await this.offerService.findById(params.offerId, tokenPayload?.id);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async update(req: Request, res: Response) {
    const updatedOffer = await this.offerService.updateById(
      req.params.offerId,
      req.body
    );

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  async delete({ params }: Request<ParamOfferId>, res: Response) {
    const offer = await this.offerService.deleteById(params.offerId);
    await this.commentService.deleteByOfferId(params.offerId);
    this.noContent(res, offer);
  }

  async getPremium(
    { params, tokenPayload }: Request<ParamCity>,
    res: Response
  ) {
    const offers = await this.offerService.findPremiumOffersByCity(
      params.city as City,
      tokenPayload?.id
    );
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async getFavorites({ tokenPayload }: Request, res: Response) {
    const offers = await this.offerService.getUserFavorites(tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async addFavorite({ params, tokenPayload }: Request, res: Response) {
    const offer = await this.offerService.addFavorite(
      tokenPayload.id,
      params.offerId
    );
    this.created(res, fillDTO(OfferRdo, offer));
  }

  async removeFavorite({ params, tokenPayload }: Request, res: Response) {
    await this.offerService.deleteFavorite(
      tokenPayload.id,
      params.offerId
    );
    this.noContent(res, {});
  }
}
