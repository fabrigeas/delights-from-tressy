<script lang="ts">
import { defineComponent, PropType } from 'vue';
import OfferCard from '../OfferCard';
import { Offer } from '../../types';

export default defineComponent({
  components: { OfferCard },
  props: {
    items: {
      type: Object as PropType<Offer[]>,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 3,
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.pageSize);
    },
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    end() {
      return this.start + this.pageSize;
    },
    data() {
      return this.items.slice(this.start, this.end);
    },
    shouldRenderPeviousButton() {
      return this.currentPage > this.pageSize;
    },
    shouldRenderNextButton() {
      return this.currentPage + this.pageSize < this.numberOfPages;
    },
  },
  watch: {
    currentPage() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  methods: {},
});
</script>
<template>
  <div class="list-view">
    <OfferCard v-for="item in data" :key="item.id" :data="item" />
  </div>
  <nav v-if="numberOfPages > 1" class="pagination">
    <ul>
      <li v-if="shouldRenderPeviousButton" class="previous-page">
        <button class="previous-page" @click="currentPage--">&#10094;</button>
      </li>
      <li v-for="i in numberOfPages" :key="i">
        <button
          :class="`${currentPage === i ? 'active' : ''} page-${i}`"
          @click="currentPage = i"
        >
          {{ i }}
        </button>
      </li>
      <li v-if="shouldRenderNextButton">
        <button class="next-page" @click="currentPage++">&#10095;</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import 'src/global.scss';
.list-view {
  min-height: 100vh;
}
nav.pagination {
  $scale: 120%;
  width: 100%;
  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    margin: 0 $x-small;
    cursor: pointer;
    padding: $small;
    &.active {
      scale: 1.2;
      font-weight: 900;
      font-size: larger;
      margin: 0 $small;
    }
    &:hover {
      scale: 1.3;
    }
  }
}
</style>
