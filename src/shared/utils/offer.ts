import {
  City,
  Amenity,
  HouseType,
  Offer,
  User,
  UserType,
  Coordinates
} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewPath,
    imagePaths,
    isPremium,
    rating,
    houseType,
    roomCount,
    guestCount,
    rentalCost,
    amenities,
    username,
    email,
    avatar,
    userType,
    commentsCount,
    rawCoordinates
  ] = offerData.replace('\n', '').split('\t');

  const coordinates: Coordinates = {
    latitude: Number(rawCoordinates.split(';')[0]),
    longitude: Number(rawCoordinates.split(';')[1]),
  };

  const user: User = {
    name: username,
    email,
    avatar,
    type: UserType[userType as keyof typeof UserType] ?? undefined,
  };

  return {
    title,
    description,
    date: new Date(postDate),
    city: City[city as keyof typeof City] ?? City.Paris,
    image: previewPath,
    images: imagePaths.split(','),
    isPremium: isPremium === 'true',
    rating: Number(rating),
    type: HouseType[houseType as keyof typeof HouseType] ?? HouseType.apartment,
    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    price: Number(rentalCost),
    amenities: amenities.split(',') as Amenity[],
    user: user,
    commentsCount: Number(commentsCount),
    coordinates: coordinates
  };
}
