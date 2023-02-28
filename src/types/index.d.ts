export interface Offer {
  id?: string;
  title: string;
  date?: Date;
  description: string;
  price: string;
  offerType: OfferType;
  images: string[];
  daysOfTheWeek: string[];
}

export interface CartItem {
  offer: Offer;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
}

export type OfferType = 'drink' | 'fruit' | 'food' | 'salad' | 'today';
export type CartType = 'cart' | 'favorites' | 'wishlist' | 'orders';
