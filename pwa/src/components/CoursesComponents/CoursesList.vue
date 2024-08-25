<template>
  <div class="course-page">
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
  height: auto;
  overflow: scroll;

  @include breakpoint($break-sm) {
    width: 94%;
    padding: 0 3%;
  }
}

.list-course-list {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 10px auto;

  @include breakpoint($break-lg) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-md) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-sm) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-xs) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.grid-course-list {
  width: 100%;
  max-width: $max-width;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 10px auto;

  @include breakpoint($break-lg) {
    grid-template-columns: repeat(3, 1fr);
  }
  @include breakpoint($break-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-sm) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-xs) {
    grid-template-columns: repeat(1, 1fr);
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
  margin: 10px auto;

  @include breakpoint($break-lg) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include breakpoint($break-sm) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include breakpoint($break-xs) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
