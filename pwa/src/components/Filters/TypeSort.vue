<template>
  <select
    :value="selected"
    class="type-sort-by"
    name="type"
    @change="sortByHandle($event)"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["type-change", "update:selected"]);

defineProps<{
  selected: string;
}>();

const options = ref([
  { value: "", label: "Choose Type" },
  { value: "guest", label: "Guest" },
  { value: "creator", label: "Creator" },
  { value: "educator", label: "Educator" },
  { value: "professor", label: "Professor" },
  { value: "student", label: "Student" },
  { value: "other", label: "Other" },
]);

/**
 * * Update our User Type and Pagination in Store
 */
function sortByHandle(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  emit("update:selected", value);
  emit("type-change", value);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

select.type-sort-by {
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
    min-width: 130px;
  }
}
</style>
