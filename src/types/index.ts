export type User = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: 'normal' | 'pro';
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type City = {
  name: string;
  location: Location;
};

export type HousingType = 'apartment' | 'house' | 'room' | 'hotel';

export type Amenity = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomCount: number;
  guestCount: number;
  price: number;
  amenities: Amenity[];
  author: User;
  commentsCount: number;
  location: Location;
};

export type Comment = {
  text: string;
  publicationDate: Date;
  rating: number;
  author: User;
};

export const Cities: Record<string, City> = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499
    }
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974
    }
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697
    }
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.370216,
      longitude: 4.895168
    }
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654
    }
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314
    }
  }
};
