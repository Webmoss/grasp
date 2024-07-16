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
  color: $grasp-blue;
  background: $white;
  border: 1px solid $grasp-blue;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  min-width: 220px;
  padding: 6.5px 8px 5px;
  margin: 0;
  text-align: left;
  transition: all 0.5s linear;
  cursor: pointer;

  &::placeholder {
    color: $grasp-blue;
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
