import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { DefaultCommentService } from './default-comment.service.js';
import { CommentEntity, CommentModel, CommentService } from './index.js';
import { Component } from '../../types/index.js';
import { Controller } from '../../../rest/libs/index.js';
import CommentController from './comment.controller.js';

export function createCommentContainer() {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  container.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();

  return container;
}
