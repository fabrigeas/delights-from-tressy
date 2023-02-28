<script lang="ts">
import { CartItem, CartType } from '../../types';
import CustomButton from '../../components/CustomButton';
import OfferCard from '../../components/OfferCard';

export default {
  components: {
    CustomButton,
    OfferCard,
  },
  data() {
    return {
      cartType: this.$route.params.cart as CartType,
      isModalOpen: false,
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters.itemsByType(this.cartType);
    },
    items(): Array<CartItem> {
      const { cartItems } = this;
      return cartItems === undefined ? [] : Object.values(cartItems);
    },
    total() {
      return this.items.reduce(
        (total, { offer, quantity }) =>
          (total += parseInt(offer.price) * quantity),
        0
      );
    },
    showPaymentButton() {
      return this.total && this.items.length > 1;
    },
    quantity() {
      return this.items.reduce((total, { quantity }) => (total += quantity), 0);
    },
  },
  watch: {
    '$route.params.cart'(cartType: CartType) {
      this.cartType = cartType;
    },
  },
};
</script>

<template>
  <div class="cart-view">
    <h2>Items in you {{ cartType }} ({{ quantity }})</h2>
    <hr />
    <section class="cart-container">
      <OfferCard v-for="i of cartItems" :key="i.offer.id" :data="i" />
    </section>
    <CustomButton
      v-if="showPaymentButton"
      button-type="success"
      class="action"
      @click="isModalOpen = true"
      >Pay total: {{ total }} FCFA
    </CustomButton>
  </div>
</template>

<style scoped lang="scss">
@import '../../global.scss';
.action {
  width: 100%;
  margin: $large 0;
  text-align: end;
  font-weight: 800;
  font-size: large;
}
</style>
