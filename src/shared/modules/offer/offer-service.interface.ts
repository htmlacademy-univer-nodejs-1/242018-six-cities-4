import { types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { City } from '../../types/city.enum.js';
import { DocumentExists } from '../../../rest/libs/types/document-exists.interface.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<types.DocumentType<OfferEntity>>;

  findAll(
    count?: number,
    userId?: string
  ): Promise<types.DocumentType<OfferEntity>[]>;

  findById(
    offerId: string,
    userId?: string
  ): Promise<types.DocumentType<OfferEntity> | null>;

  deleteById(offerId: string): Promise<types.DocumentType<OfferEntity> | null>;

  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<types.DocumentType<OfferEntity> | null>;

  incCommentCount(offerId: string): Promise<types.DocumentType<OfferEntity> | null>;

  exists(documentId: string): Promise<boolean>;

  findPremiumOffersByCity(
    city: City,
    userId?: string
  ): Promise<types.DocumentType<OfferEntity>[]>;

  getUserFavorites(userId: string): Promise<types.DocumentType<OfferEntity>[]>;

  addFavorite(
    userId: string,
    offerId: string
  ): Promise<types.DocumentType<OfferEntity>>;

  deleteFavorite(userId: string, offerId: string): Promise<void>;

  updateRating(offerId: string): Promise<types.DocumentType<OfferEntity> | null>;
}
