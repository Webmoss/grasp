<template>
  <select
    v-model="selected"
    class="pagination-sort-by"
    name="category"
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

const store = useStore();
const selected = ref("");

const options = ref([
  { value: "", label: "Choose Category" },
  { value: "animation", label: "Animation" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "architecture", label: "Architecture & Spaces" },
  { value: "craft", label: "Craft" },
  { value: "fashion", label: "Fashion" },
  { value: "illustration", label: "Illustration" },
  { value: "marketing", label: "Marketing & Business" },
  { value: "music", label: "Music & Audio" },
  { value: "photography", label: "Photography" },
  { value: "video", label: "Video" },
  { value: "web", label: "Web" },
  { value: "writing", label: "Writing" },
  { value: "daos", label: "DAOS" },
  { value: "onboarding", label: "Onboarding" },
]);

/**
 * * Update our NFT Category and Pagination in Store
 */
function sortByHandle(event: Event) {
  selected.value = (event.target as HTMLInputElement).value;
  store.setSortSelect((event.target as HTMLInputElement).value);
  store.setSortBy((event.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

select.pagination-sort-by {
  color: $grey-60;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  min-width: 220px;
  padding: 8px;
  margin: 0;
  text-align: left;
  transition: all 0.5s linear;
  cursor: pointer;

  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    color: $grey-90;
    border: 0.5px solid $grey-50;
    outline: -webkit-focus-ring-color auto 0px;
  }

  @include breakpoint($break-sm) {
    width: 100%;
    min-width: 280px;
  }
}
</style>
