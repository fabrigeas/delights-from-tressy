<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Offer } from '../../types';
import { API_BASE_URL } from '../../constants';
import ListView from '../../components/ListView';

export default defineComponent({
  components: {
    ListView,
  },
  data() {
    const { query } = this.$route;

    return {
      items: [] as Offer[],
      query,
      title: query.title,
    };
  },
  computed: {},
  watch: {
    '$route.query'(query) {
      this.query = query;
      this.fetchOffers();
    },
  },
  created() {
    this.fetchOffers();
  },
  methods: {
    fetchOffers() {
      const { query, title } = this;

      if (title) {
        query.title = title;
      }

      const url = `${API_BASE_URL}/offers?${new URLSearchParams(
        query as Record<string, string>
      ).toString()}`;

      axios.get(url).then(({ data }) => {
        this.items = data.offers;
      });
    },
  },
});
</script>
<template>
  <div class="home">
    <hr />
    <form @submit.prevent="fetchOffers">
      <div class="searchbox">
        <input v-model="title" placeholder="Search by title" />
        <span class="search-icon"> &#128269; </span>
      </div>
    </form>
    <ListView :items="items" />
    <div class="actions">
      <router-link to="/my/cart">Checkout my orders</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/global.scss';
.actions {
  position: fixed;
  bottom: $small;
  right: $small;
  gap: $medium;
  display: flex;
  & > * {
    background: $success;
    padding: $small $large;
    border-radius: $small;
    color: white;
    text-decoration: none;
    &:hover {
      background: lighten($success, 10%);
    }
  }
}
.searchbox {
  display: flex;
  border: solid $x-small darkgray;
  width: 50%;
  margin: auto;
  border-radius: $medium;
  padding: $x-small;
  margin-top: $small;
  margin-bottom: $medium;

  & input {
    padding: $medium;
    margin-right: auto;
    flex: 5;
    border: none;
    outline: none;
  }
  .search-icon {
    font-weight: bold;
    padding: 0 0.4rem;
    margin: auto;
    font-size: xx-large;
  }
}
@media (max-width: $tablet) {
  form {
    padding: $x-small;
  }
  .searchbox {
    width: 100%;
  }
  .actions {
    right: $small;
  }
}
</style>
