<template>
  <div class="marketplace-page">
    <div :class="`${gridView}-nft-list`">
      <template v-for="(token, i) in tokens" :key="i">
        <NftCard :token="token" :collection="collection" :grid-view="gridView" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { tokenWrapperObject } from "@/models/tokenWrapper";
import NftCard from "../NFT/NftCard.vue";

const store = useStore();
const { gridView } = storeToRefs(store);

export interface Props {
  tokens?: [];
}

defineProps({
  tokens: {
    type: Array<tokenWrapperObject>,
    default: null,
  },
  collection: {
    type: String,
    default: null,
    required: false
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.marketplace-page {
  position: relative;
  height: auto;
  overflow: visible;

  @include breakpoint($break-sm) {
    width: 98%;
    padding: 0 1%;
  }
}

.list-nft-list {
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

.grid-nft-list {
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

.full-nft-list {
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
