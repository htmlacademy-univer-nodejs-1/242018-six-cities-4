import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { fillDTO } from '../../helpers/index.js';
import { BaseController, HttpMethod, ValidateDtoMiddleware, PrivateRouteMiddleware, DocumentExistsMiddleware, ValidateObjectIdMiddleware } from '../../../rest/libs/index.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { ParamOfferId } from '../offer/types/param-offerid.type.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger)
    protected readonly logger: Logger,

    @inject(Component.CommentService)
    private readonly commentService: CommentService,

    @inject(Component.OfferService)
    private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({
      path: '/:offerId/',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async create(
    req: CreateCommentRequest & Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { params, body, tokenPayload } = req;
    const comment = await this.commentService.create(
      {
        ...body,
        userId: tokenPayload.id,
        offerId: params.offerId,
      }
    );
    await this.offerService.incCommentCount(params.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }

  async getComments(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
