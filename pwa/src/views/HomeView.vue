<template>
  <section id="content">
    <div class="main">
      <IntroSection />
      <EarnLearn />
      <LearningManagement />
      <OpenCampus />
      <RoadMap />
      <Tokenomics />
      <GoPlus />
      <EduChain />
      <FooterSection />
    </div>
  </section>
</template>

<script setup lang="ts">
import IntroSection from "@/components/Home/IntroSection.vue";
import EarnLearn from "@/components/Home/EarnLearn.vue";
import LearningManagement from "@/components/Home/LearningManagement.vue";
import OpenCampus from "@/components/Home/OpenCampus.vue";
import GoPlus from "@/components/Home/GoPlus.vue";
import RoadMap from "@/components/Home/RoadMap.vue";
import Tokenomics from "@/components/Home/Tokenomics.vue";
import EduChain from "@/components/Home/EduChain.vue";
import FooterSection from "@/components/Home/FooterSection.vue";
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
