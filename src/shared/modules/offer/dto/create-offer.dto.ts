import { IsNotEmpty, MinLength, MaxLength, ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsBoolean, IsInt, Max, Min, IsString } from 'class-validator';
import {
  City,
  Amenity,
  HouseType,
  Coordinates,
} from '../../../types/index.js';
import { CreateOfferMessages } from './create-offer.messages.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @MinLength(10, { message: CreateOfferMessages.title.minLength })
  @MaxLength(100, { message: CreateOfferMessages.title.maxLength })
  public title: string;

  @IsNotEmpty()
  @MinLength(20, {
    message: CreateOfferMessages.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferMessages.description.maxLength,
  })
  public description: string;

  @IsNotEmpty({ message: CreateOfferMessages.image.empty })
  public image: string;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessages.price.invalidFormat })
  @Min(100, { message: CreateOfferMessages.price.minValue })
  @Max(100000, { message: CreateOfferMessages.price.maxValue })
  public price: number;

  @IsNotEmpty()
  @IsEnum(City, { message: CreateOfferMessages.city.invalid })
  public city: City;

  @IsArray({ message: CreateOfferMessages.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferMessages.images.count })
  @ArrayMaxSize(6, { message: CreateOfferMessages.images.count })
  @IsNotEmpty({ each: true })
  public images: string[];

  @IsNotEmpty()
  @IsBoolean()
  public isPremium: boolean;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessages.rating.invalidFormat })
  @Min(1, { message: CreateOfferMessages.rating.minValue })
  @Max(5, { message: CreateOfferMessages.rating.maxValue })
  public rating: number;

  @IsNotEmpty()
  @IsEnum(HouseType, { message: CreateOfferMessages.type.invalid })
  public type: HouseType;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessages.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferMessages.bedrooms.minValue })
  @Max(8, { message: CreateOfferMessages.bedrooms.maxValue })
  public roomCount: number;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessages.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferMessages.maxAdults.minValue })
  @Max(10, { message: CreateOfferMessages.maxAdults.maxValue })
  public guestCount: number;

  @IsArray({ message: CreateOfferMessages.amenities.invalidFormat })
  @IsEnum(Amenity, {
    each: true,
    message: CreateOfferMessages.amenities.invalidValue,
  })
  @ArrayMinSize(1, { message: CreateOfferMessages.amenities.minSize })
  public amenities: Amenity[];

  @IsString()
  public user: string = '';

  @IsInt()
  public commentsCount: number = 0;

  @IsNotEmpty()
  public coordinates: Coordinates;
}
