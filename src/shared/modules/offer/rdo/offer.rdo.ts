import { Expose, Type } from 'class-transformer';
import { Amenity, City, Coordinates, HouseType } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose({ name: 'createdAt' })
  public postDate: string;

  @Expose({ name: 'image' })
  public image: string;

  @Expose({ name: 'images' })
  public images: string[];

  @Expose()
  public city: City;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: HouseType;

  @Expose()
  public roomCount: number;

  @Expose()
  public guestCount: number;

  @Expose()
  public price: number;

  @Expose()
  public commentsCount: number;

  @Expose()
  public amenities: Amenity[];

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  @Type(() => Coordinates)
  public coordinates: Coordinates;
}
