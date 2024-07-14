<template>
  <section id="courses-search-bar">
    <CoursesSortBy />
    <CoursesSearchInput />
    <div class="grid-buttons">
      <ListViewButton />
      <GridViewButton />
      <FullViewButton />
    </div>
  </section>
</template>

<script setup lang="ts">
import CoursesFilterButton from "../CoursesComponents/CoursesFilterButton.vue";
import CoursesSearchInput from "../CoursesComponents/CoursesSearchInput.vue";
import CoursesSortBy from "../CoursesComponents/CoursesSortBy.vue";
import ListViewButton from "../Buttons/ListViewButton.vue";
import GridViewButton from "../Buttons/GridViewButton.vue";
import FullViewButton from "../Buttons/FullViewButton.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

section#courses-search-bar {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: $max-width;
  height: auto;
  margin: 30px auto 10px;
  padding: 0;

  .grid-buttons {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;
    height: 35px;
    margin: 0 0 0 10px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 0;
    transition: all 0.5s linear;
    cursor: pointer;
  }
}
</style>
