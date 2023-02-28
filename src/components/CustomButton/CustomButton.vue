<script setup lang="ts">
import { computed } from 'vue';

export type CustomButtonType = 'primary' | 'success' | 'danger' | 'warning';
const props = defineProps<{
  buttonType?: CustomButtonType;
}>();

const classList = computed(
  () => `CustomButton ${props.buttonType ?? 'primary'}`
);
</script>

<template>
  <button :class="classList">
    <slot></slot>
  </button>
</template>

<style lang="scss">
@import 'src/global.scss';

@mixin outline($color) {
  outline: solid $x-small $color;
  color: $color;
  &:hover {
    background: none;
    scale: 1.02;
    color: darken($color, 10);
  }
}
.CustomButton {
  cursor: pointer;
  border: transparent;
  padding: $medium;
  border-radius: $small;
  color: white;
  background: $info;

  &:hover {
    background: lighten($info, 10%);
  }
  &.success {
    background: $success;
    &:hover {
      background: lighten($success, 10%);
    }
  }
  &.warning {
    background: $warning;
  }
  &.danger {
    background: $danger;
  }
  &.outlined {
    background: none;

    &.primary {
      @include outline($primary);
    }
    &.success {
      @include outline($success);
    }
    &.warning {
      @include outline($warning);
    }
    &.danger {
      @include outline($danger);
    }
    &.info {
      @include outline($info);
    }
  }
}
</style>
