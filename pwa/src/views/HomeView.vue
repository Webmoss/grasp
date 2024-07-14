<template>
  <section id="content">
    <div class="main">
      <IntroSection />
      <EarnLearn />
      <LearningManagement />
      <OpenCampus />
      <EduChain />
      <FooterSection />
    </div>
  </section>
</template>

<script setup lang="ts">
import IntroSection from "../components/HomeComponents/IntroSection.vue";
import EarnLearn from "../components/HomeComponents/EarnLearn.vue";
import LearningManagement from "../components/HomeComponents/LearningManagement.vue";
import OpenCampus from "../components/HomeComponents/OpenCampus.vue";
import EduChain from "../components/HomeComponents/EduChain.vue";
import FooterSection from "../components/HomeComponents/FooterSection.vue";
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#content {
  position: relative;
  height: 100%;
  overflow: scroll;

  .main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
  }
}

@media (min-width: 1024px) {
  .home {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
