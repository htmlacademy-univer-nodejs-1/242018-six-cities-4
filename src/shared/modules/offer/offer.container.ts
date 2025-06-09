import { Container } from 'inversify';
import {
  DefaultOfferService,
  OfferController,
  OfferEntity,
  OfferModel,
  OfferService,
} from './index.js';

import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { Controller } from '../../../rest/libs/index.js';

export function createOfferContainer() {
  const container = new Container();
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  return container;
}
