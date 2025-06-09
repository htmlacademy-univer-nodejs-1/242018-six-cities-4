import { IsNotEmpty, MinLength, MaxLength, ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsBoolean, IsInt, Max, Min, IsMongoId } from 'class-validator';
import {
  City,
  Amenity,
  HouseType,
  Coordinates,
  User,
} from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsNotEmpty()
  @MinLength(20, {
    message: CreateOfferValidationMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferValidationMessage.description.maxLength,
  })
  public description: string;

  @IsNotEmpty({ message: CreateOfferValidationMessage.image.empty })
  public image: string;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsNotEmpty()
  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.count })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.images.count })
  @IsNotEmpty({ each: true })
  public images: string[];

  @IsNotEmpty()
  @IsBoolean()
  public isPremium: boolean;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  public rating: number;

  @IsNotEmpty()
  @IsEnum(HouseType, { message: CreateOfferValidationMessage.type.invalid })
  public type: HouseType;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public roomCount: number;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public guestCount: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsEnum(Amenity, {
    each: true,
    message: CreateOfferValidationMessage.amenities.invalidValue,
  })
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.amenities.minSize })
  public amenities: Amenity[];

  @IsNotEmpty()
  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public user: string;

  @IsNotEmpty()
  @IsInt()
  public commentsCount: number;

  @IsNotEmpty()
  public coordinates: Coordinates;
}
