<template>
  <div class="course-page">
    <div class="courses-list"></div>
    <div :class="`${gridView}-course-list`">
      <template v-for="(course, i) in courses" :key="i">
        <CourseCard :course="course" :grid-view="gridView" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { courseObject } from "src/models/course";
import CourseCard from "../CoursesComponents/CourseCard.vue";

const store = useStore();
const { gridView } = storeToRefs(store);

export interface Props {
  courses?: [];
}

defineProps({
  courses: {
    type: Array<courseObject>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.course-page {
  position: relative;
  height: 100%;
  overflow: scroll;
}

.list-course-list {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 20px auto 0;
  @include breakpoint($break-lg) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-md) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-sm) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-xs) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(1, 1fr);
  }
}

.grid-course-list {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  @include breakpoint($break-lg) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(3, 1fr);
  }
  @include breakpoint($break-md) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-sm) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-xs) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
}

.full-course-list {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 20px auto 0;

  @include breakpoint($break-lg) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-md) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-sm) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-xs) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
}

.course-list {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  align-content: flex-start;
  justify-content: center;
  align-items: flex-start;
  margin: 20px auto 0;

  @include breakpoint($break-lg) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-md) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-sm) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-xs) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(1, 1fr);
  }
}

.course-grid {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  @include breakpoint($break-lg) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(3, 1fr);
  }
  @include breakpoint($break-md) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-sm) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-xs) {
    width: 100%;
    margin: 20px auto 0;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
