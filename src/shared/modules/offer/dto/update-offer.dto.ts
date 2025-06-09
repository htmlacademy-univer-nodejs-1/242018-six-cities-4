import { IsNotEmpty, MinLength, MaxLength, ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsBoolean, IsInt, Max, Min, IsString, IsOptional } from 'class-validator';
import {
  City,
  Amenity,
  HouseType,
  Coordinates,
} from '../../../types/index.js';
import { CreateOfferMessages } from './create-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateOfferMessages.title.minLength })
  @MaxLength(100, { message: CreateOfferMessages.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, {
    message: CreateOfferMessages.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferMessages.description.maxLength,
  })
  public description?: string;

  @IsOptional()
  public image?: string;

  @IsOptional()
  @IsInt({ message: CreateOfferMessages.price.invalidFormat })
  @Min(100, { message: CreateOfferMessages.price.minValue })
  @Max(100000, { message: CreateOfferMessages.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsEnum(City, { message: CreateOfferMessages.city.invalid })
  public city?: City;

  @IsOptional()
  @IsArray({ message: CreateOfferMessages.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferMessages.images.count })
  @ArrayMaxSize(6, { message: CreateOfferMessages.images.count })
  @IsNotEmpty({ each: true })
  public images?: string[];

  @IsOptional()
  @IsBoolean()
  public isPremium?: boolean;

  @IsOptional()
  @IsInt({ message: CreateOfferMessages.rating.invalidFormat })
  @Min(1, { message: CreateOfferMessages.rating.minValue })
  @Max(5, { message: CreateOfferMessages.rating.maxValue })
  public rating?: number;

  @IsOptional()
  @IsEnum(HouseType, { message: CreateOfferMessages.type.invalid })
  public type?: HouseType;

  @IsOptional()
  @IsInt({ message: CreateOfferMessages.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferMessages.bedrooms.minValue })
  @Max(8, { message: CreateOfferMessages.bedrooms.maxValue })
  public roomCount?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferMessages.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferMessages.maxAdults.minValue })
  @Max(10, { message: CreateOfferMessages.maxAdults.maxValue })
  public guestCount?: number;

  @IsOptional()
  @IsArray({ message: CreateOfferMessages.amenities.invalidFormat })
  @IsEnum(Amenity, {
    each: true,
    message: CreateOfferMessages.amenities.invalidValue,
  })
  @ArrayMinSize(1, { message: CreateOfferMessages.amenities.minSize })
  public amenities?: Amenity[];

  @IsString()
  public user: string = '';

  @IsOptional()
  public coordinates?: Coordinates;
}
