<template>
  <select
    v-model="selected"
    class="date-sort-by"
    name="date-sort"
    @change="sortByHandle($event)"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(['sort-change']);
const selected = ref("top-rated");

const options = ref([
  { value: "top-rated", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "all", label: "All" },
]);

/**
 * * Update our Date Search filter in Store
 */
function sortByHandle(event: Event) {
  selected.value = (event.target as HTMLInputElement).value;
  emit('sort-change', selected.value);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

select.date-sort-by {
  color: $grey-60;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  min-width: 200px;
  padding: 8px;
  margin: 0 10px 0 0;
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
    min-width: 220px;
  }
}
</style>
