import {City} from './city.enum.js';
import {HouseType} from './house-type.enum.js';
import {Facilities} from './facilities.type.js';
import {User} from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewPath: string;
  imagePaths: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number;
  houseType: HouseType;
  roomsCount: number;
  guestCount: number;
  rentalCost: number;
  facilities: Facilities;
  user: User;
  commentsCount: number;
  coordinates: [number, number];
}
