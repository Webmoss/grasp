<template>
  <section id="admin-search-bar">
    <AdminSearchInput />
    <AdminSortBy />
  </section>
</template>

<script setup lang="ts">
import AdminSortBy from "../Admin/AdminSortBy.vue";
import AdminSearchInput from "../Admin/AdminSearchInput.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

section#admin-search-bar {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: $max-width;
  height: auto;
  margin: 10px auto;
  padding: 0;

  @include breakpoint($break-sm) {
    flex-direction: column;
    width: 94%;
    margin: 0 3% 16px;
  }
}
</style>
