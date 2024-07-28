<template>
  <div class="creator-page">
    <div :class="`${gridView}-creator-list`">
      <template v-for="(creator, i) in creators" :key="i">
        <CreatorCard :creator="creator" :grid-view="gridView" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { creatorObject } from "src/models/creator";
import CreatorCard from "../CreatorsComponents/CreatorCard.vue";

const store = useStore();
const { gridView } = storeToRefs(store);

export interface Props {
  creators?: [];
}

defineProps({
  creators: {
    type: Array<creatorObject>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.creator-page {
  position: relative;
  height: auto;
  overflow: scroll;

  @include breakpoint($break-sm) {
    width: 94%;
    padding: 0 3%;
  }
}

.list-creator-list {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 10px auto;

  @include breakpoint($break-lg) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-md) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-sm) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-xs) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.grid-creator-list {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 10px auto;

  @include breakpoint($break-lg) {
    grid-template-columns: repeat(3, 1fr);
  }
  @include breakpoint($break-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-sm) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-xs) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.full-creator-list {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 10px auto;

  @include breakpoint($break-lg) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-sm) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-xs) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
