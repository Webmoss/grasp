<template>
  <div class="nft-page">
    <div :class="`${gridView}-nft-list`">
      <template v-for="(nft, i) in nfts" :key="i">
        <NftCard :nft="nft" :grid-view="gridView" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { metadataObject } from "src/models/metadata";
import NftCard from "../NftsComponents/NftCard.vue";

const store = useStore();
const { gridView } = storeToRefs(store);

export interface Props {
  nfts?: [];
}

defineProps({
  nfts: {
    type: Array<metadataObject>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.nft-page {
  position: relative;
  height: auto;
  overflow: scroll;

  @include breakpoint($break-sm) {
    width: 90%;
    padding: 0 5%;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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
