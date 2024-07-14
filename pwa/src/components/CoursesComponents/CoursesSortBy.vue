<template>
  <select
    v-model="pagination.sortSelect"
    class="pagination-sort-by"
    @change="sortByHandle($event)"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { pagination } = storeToRefs(store);

const options = ref([
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "rarity-rare-common", label: "Rarity: Rare to Common" },
  { value: "rarity-common-rare", label: "Rarity: Common to Rare" },
  { value: "tokenId-low-high", label: "Token Id: Low to High" },
  { value: "tokenId-high-low", label: "Token Id: High to Low" },
]);

/**
 * Update our Pagination in Store
 */
function sortByHandle(event: Event) {
  store.setSortSelect((event.target as HTMLInputElement).value);

  switch ((event.target as HTMLInputElement).value) {
    case "price-low-high":
      store.setSortBy("floorAskPrice");
      store.setSortDirection("asc");
      break;
    case "price-high-low":
      store.setSortBy("floorAskPrice");
      store.setSortDirection("desc");
      break;
    case "rarity-rare-common":
      store.setSortBy("rarity");
      store.setSortDirection("asc");
      break;
    case "rarity-common-rare":
      store.setSortBy("rarity");
      store.setSortDirection("desc");
      break;
    case "tokenId-low-high":
      store.setSortBy("tokenId");
      store.setSortDirection("asc");
      break;
    case "tokenId-high-low":
      store.setSortBy("tokenId");
      store.setSortDirection("desc");
      break;
    default:
      store.setSortBy("floorAskPrice");
      store.setSortDirection("asc");
      break;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

select.pagination-sort-by {
  color: $white;
  background: $grasp-blue;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  min-width: 220px;
  padding: 6.5px 6px 5px;
  margin: 0;
  text-align: left;
  transition: all 0.5s linear;
  cursor: pointer;

  &::placeholder {
    color: $white;
  }

  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    border-color: rgb(69, 73, 77);
    outline: -webkit-focus-ring-color auto 0px;
  }
}
</style>
