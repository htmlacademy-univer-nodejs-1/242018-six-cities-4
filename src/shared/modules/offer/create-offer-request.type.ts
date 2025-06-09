import { Request } from 'express';
import { CreateOfferDto } from './index.js';
import { RequestParams, RequestBody } from '../../../rest/libs/index.js';

export type CreateOfferRequest = Request<
  RequestParams,
  RequestBody,
  CreateOfferDto
>;
