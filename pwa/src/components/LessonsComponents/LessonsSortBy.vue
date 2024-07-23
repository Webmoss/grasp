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
  { value: "all", label: "All Courses" },
]);

/**
 * Update our Pagination in Store
 */
function sortByHandle(event: Event) {
  store.setSortSelect((event.target as HTMLInputElement).value);
  store.setSortBy((event.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

select.pagination-sort-by {
  color: $grey-90;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  min-width: 220px;
  padding: 7px 8px;
  margin: 0;
  text-align: left;
  transition: all 0.5s linear;
  cursor: pointer;

  &::placeholder {
    color: $grey-50;
  }
  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    border: 0.5px solid $grey-50;
    outline: -webkit-focus-ring-color auto 0px;
  }
}
</style>
