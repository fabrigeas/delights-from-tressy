import { type CartItem, type Offer, type OfferType, type User } from './types';
import { faker } from '@faker-js/faker';
import { OFFER_TYPES } from './constants';

interface FakeOfferProps {
  title?: string;
  date?: Date;
  offerType?: OfferType;
  daysOfTheWeek?: string[];
}

export interface FakeCartItemProps extends FakeOfferProps {
  quantity?: number;
}

interface FakeUserProps {
  email?: string;
  password?: string;
}

export const fakeOffer = (props?: FakeOfferProps): Offer => ({
  id: faker.database.mongodbObjectId(),
  title: props?.title ?? faker.commerce.productName(),
  date: props?.date ?? faker.date.future(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  offerType:
    props?.offerType ?? faker.helpers.arrayElement<OfferType>(OFFER_TYPES),
  images: [...Array(3)].map(() => faker.image.image()),
  daysOfTheWeek:
    props?.daysOfTheWeek ??
    faker.helpers.arrayElements(['Mon', 'Tues', 'Wed', 'Thurs', 'Frid', 'Sat']),
});

export const fakeUsersList = (count: number) =>
  [...Array(count)].map(() => fakeUser());

export const fakeOfferList = (count: number, props?: FakeOfferProps) =>
  [...Array(count)].map(() => fakeOffer(props));

export const fakeUser = (props?: FakeUserProps): User => ({
  id: faker.database.mongodbObjectId(),
  email: props?.email ?? faker.internet.email(),
  password: props?.password ?? faker.internet.password(),
});

export const fakeCartItem = (props?: number | FakeCartItemProps): CartItem => {
  if (typeof props === 'undefined') {
    return {
      quantity: 2,
      offer: fakeOffer(),
    };
  }

  if (typeof props === 'number')
    return {
      quantity: 3,
      offer: fakeOffer(),
    };

  return {
    quantity: 7,
    offer: fakeOffer(props),
  };
};

export const fakeCartItemList = (
  count?: number,
  props?: FakeCartItemProps
): CartItem[] => [...Array(count ?? 2)].map(() => fakeCartItem(props));
