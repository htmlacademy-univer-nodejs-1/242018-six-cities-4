import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

import {
  City,
  HouseType,
  Amenity,
  Coordinates as CoordinatesType
} from '../../types/index.js';

import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

class Coordinates implements CoordinatesType {
  @prop({ required: true, type: Number })
  public latitude: number;

  @prop({ required: true, type: Number })
  public longitude: number;
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, type: String })
  public title: string;

  @prop({ trim: true, type: String })
  public description: string;

  @prop({ type: String })
  public image: string;

  @prop({ type: Number })
  public price: number;

  @prop({ type: String, enum: City })
  public city: City;

  @prop({ type: [String] })
  public images: string[];

  @prop({ type: Boolean })
  public isPremium: boolean;

  @prop({ type: Boolean })
  public isFavorite!: boolean;

  @prop({ type: Number })
  public rating: number;

  @prop({ type: String, enum: HouseType })
  public type: HouseType;

  @prop({ type: Number })
  public roomsCount: number;

  @prop({ type: Number })
  public guestCount: number;

  @prop({ type: [String], enum: Amenity })
  public amenities: Amenity[];

  @prop({ ref: UserEntity, required: true })
  public user: Ref<UserEntity>;

  @prop({ type: Number, required: true, default: 0 })
  public commentsCount: number;

  @prop({ type: Coordinates, required: true, _id: false })
  public coordinates: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
