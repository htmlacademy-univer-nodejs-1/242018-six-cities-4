import { Request } from 'express';
import { CreateCommentDto } from '../dto/create-comment.dto.js';
import { RequestParams, RequestBody } from '../../../../rest/libs/index.js';

export type CreateCommentRequest = Request<
  RequestParams,
  RequestBody,
  CreateCommentDto
>;
