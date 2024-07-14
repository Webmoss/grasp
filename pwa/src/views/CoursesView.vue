<template>
  <section id="courses">
    <div class="main">
      <!-- <CoursesBanner /> -->
      <CourseSearch />
      <CoursesList />
    </div>
  </section>
</template>

<script setup lang="ts">
// import CoursesBanner from "../components/CoursesComponents/CoursesBanner.vue";
import CourseSearch from "../components/CoursesComponents/CourseSearch.vue";
import CoursesList from "../components/CoursesComponents/CoursesList.vue";
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#courses {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $grey-20;

  .main {
    max-width: $max-width;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
  }
}

@media (min-width: 1024px) {
  .courses {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
