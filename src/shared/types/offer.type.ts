import { City } from './city.enum.js';
import { HouseType } from './house-type.enum.js';
import { Amenity } from './facilities.type.js';
import { User } from './user.type.js';
import { Coordinates } from './coordinates.js';

export type Offer = {
  title: string;
  description: string;
  image: string;
  date: Date;
  price: number;
  city: City;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: HouseType;
  roomCount: number;
  guestCount: number;
  amenities: Amenity[];
  user: User;
  commentsCount: number;
  coordinates: Coordinates;
}

