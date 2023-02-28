<script lang="ts">
import { defineComponent } from 'vue';
import CustomHeader from './components/CustomHeader';

export default defineComponent({
  components: {
    CustomHeader,
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
