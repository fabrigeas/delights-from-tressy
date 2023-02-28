<script lang="ts">
import { computed, defineComponent } from 'vue';
import CustomHeader from './components/CustomHeader';

export default defineComponent({
  components: {
    CustomHeader,
  },
  provide() {
    return {
      user: computed(() => this.$store.state.user),
    };
  },
});
</script>
<template>
  <main>
    <article>
      <CustomHeader />
      <router-view />
    </article>
  </main>
</template>
