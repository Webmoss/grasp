<template>
  <div class="course-page">
    <h2>Courses available</h2>
    <div class="courses-list"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.course-page {
  position: relative;
  height: 100%;
  overflow: scroll;
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
