<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue';
import { CartItem, Offer, User } from '../../types';
import CustomButton from '../CustomButton';
import { useStore } from 'vuex';

export interface CardProps {
  data: CartItem | Offer;
}

const props = defineProps<CardProps>();
const isOffer = computed(() => (props.data as CartItem).offer === undefined);
const quantity = ref(isOffer.value ? 0 : (props.data as CartItem).quantity);
const url = computed(() => `/offer/${offer.value.id}`);
const offer = computed(() =>
  isOffer.value ? (props.data as Offer) : (props.data as CartItem).offer
);
const subTotal = computed(() =>
  isOffer.value
    ? undefined
    : quantity.value * parseInt((props.data as CartItem).offer.price) * 2
);
const daysOfTheWeek = computed(() => {
  const { daysOfTheWeek } = offer.value;
  const result: string[] = [];
  [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ].forEach(day => {
    if (daysOfTheWeek.includes(day)) {
      result.push(day);
    }
  });

  return result;
});

// TODO: this type should not be hard coded
const user = inject('user') as { value: User | undefined };
const isAdmin = computed(() =>
  user && user.value
    ? ['mawelle', 'jenny'].includes(user.value.email.split('@')[0])
    : false
);
const className = computed(() => [
  'card',
  isOffer.value ? 'offer' : 'cart-item',
  offer.value.offerType,
]);
const card = ref(null);
const highlight = () => {
  if (card.value) {
    (card.value as HTMLDivElement).classList.add('highlight');
    (card.value as HTMLDivElement).scrollIntoView();
  }
};
const mainImage = computed(() => {
  const { images, id } = offer.value;

  if (!images[0]) {
    return undefined;
  }

  return `offers/${id}/${images?.[0]}`;
});
const store = useStore();

watch(quantity, q => {
  if (q > 0) {
    store.commit('updateItemInCart', {
      offer: offer.value,
      quantity: q,
    });
  } else {
    store.commit('removeFromCart', offer.value);
  }
});
</script>

<template>
  <div
    ref="card"
    :class="className"
    @click="highlight"
    @mouseleave="($refs.card as HTMLDivElement).classList.remove('highlight')"
  >
    <div class="image">
      <img :src="mainImage" :alt="offer.title" />
    </div>
    <div class="content">
      <h2 class="title">{{ offer.title }}</h2>
      <p v-if="isOffer" class="description">{{ offer.description }}</p>
      <div class="offer">
        <span class="price"> {{ offer.price }}FCFA </span>
        <div class="order">
          <template v-if="quantity">
            <CustomButton
              :custom-button-type="'success'"
              class="outlined"
              @click.stop="quantity--"
            >
              -
            </CustomButton>
            <input v-model="quantity" type="number" min="0" />
          </template>
          <CustomButton
            :custom-button-type="'success'"
            class="outlined"
            @click.stop="quantity++"
          >
            +
          </CustomButton>
        </div>
        <CustomButton
          v-if="subTotal"
          class="sub-total"
          custom-button-type="success"
          @click.stop=""
        >
          Pay only this {{ subTotal }}
        </CustomButton>
      </div>
      <router-link
        v-if="isAdmin"
        class="link-to-edit-offer CustomButton primary outlined"
        :to="url"
        >Edit offer</router-link
      >
    </div>
    <div class="tags">
      <span>{{ offer.offerType }}</span>
      <span
        v-for="(day, i) in daysOfTheWeek"
        :key="i"
        :class="{ active: day == 'today' }"
        >{{ day.substring(0, 3) }}</span
      >
    </div>
    <button
      class="close"
      @click.stop="($refs.card as HTMLDivElement).classList.remove('highlight')"
    >
      X
    </button>
  </div>
</template>

<style scoped lang="scss">
@import 'src/global.scss';

.card {
  position: relative;
  display: flex;
  min-height: 15rem;
  border-radius: $small;
  margin: $medium 0;
  color: lighten($color: #000000, $amount: 30);
  box-shadow: inset $x-small $x-small #f1f1f7;
  box-shadow: $x-small $x-small $x-small $x-small darkgrey;
  &:hover {
    scale: 1.02;
    cursor: pointer;
  }

  .close {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    background: black;
    font-size: x-large;
    color: white;
    padding: 0 $medium;
    font-family: auto;
  }
  @media (max-width: $tablet) {
    flex-direction: column !important;
    height: auto;
    .offer {
      flex-direction: column;
    }
    .sub-total {
      margin-top: $medium;
    }
  }
}
.image {
  flex: 3;
  height: 15rem;
  position: relative;
  padding: $x-small;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
.content {
  flex: 6;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding-top: $x-large;
  padding-bottom: $medium;
  padding-left: $large;
  padding-right: $large;
}
.offer {
  margin-top: auto;
  display: flex;
  .order {
    display: flex;
    padding: $x-small;
    & > * {
      padding: 0 $large;
      font-weight: bold;
      margin: 0 $x-small;
      border-radius: $small;
      text-align: center;
      outline: none;
      border: solid $x-small #d9e4ff;
      font-size: x-large;
      background: none;
      &:not(props.data):hover {
        scale: 1.1;
        cursor: pointer;
      }
    }
    input {
      border: none;
      max-width: 3rem;
      padding: 0;
    }
  }
}
.title {
  color: #0073e6;
  font-weight: bold;
  text-transform: capitalize;
}
.description {
  padding: $large 0;
  color: #009eb0;
  max-height: 5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: small;
  text-transform: capitalize;
}
.price {
  font-size: larger;
  font-weight: bold;
  margin-right: auto;
}
.link-to-edit-offer {
  display: block;
  text-decoration: none;
  width: 100%;
  color: white;
  padding: $small;
  border-radius: $small;
  margin-top: $medium;
  & :hover {
    background: lighten($primary, 10);
  }
}
.tags {
  position: absolute;
  top: 0;
  right: $large;
  display: flex;
  gap: $x-small;
  & > * {
    border: solid 0.5px darkgray;
    padding: 0 $x-small;
  }
  .active {
    background: $success;
  }
}
.card.highlight {
  height: 95vh;
  flex-direction: column;

  & > .image {
    height: 60vh;
    flex: unset;
  }
  .close {
    display: block;
  }
}
</style>
