import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { FavoriteEntity, FavoriteModel } from './index.js';

export function createFavoriteContainer() {
  const container = new Container();

  container.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel).toConstantValue(FavoriteModel);

  return container;
}
