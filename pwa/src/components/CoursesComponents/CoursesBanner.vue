<template>
  <div class="course-banner">
    <img src="../../assets/images/Grasp-Banner.png" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.course-banner {
  width: 100%;
  padding: 0;
  z-index: 998;
  overflow: hidden;

  img,
  svg {
    width: 100%;
    object-fit: cover;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
}
</style>
