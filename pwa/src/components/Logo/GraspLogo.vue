<template>
  <div class="grasp-logo">
    <div class="grasp-column">
      <img src="../../assets/svgs/owl-white.svg" class="intro-logo" />
    </div>
    <div class="grasp-column">
      <div class="grasp-row"><h1>Grasp</h1></div>
      <div class="grasp-row"><span class="cyan">Academy</span></div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.grasp-logo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;

  @include breakpoint($break-sm) {
    padding-left: 10px;
  }

  .grasp-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;

    h1 {
      width: 100%;
      color: $white;
      font-size: 44px;
      line-height: 46px;
      text-align: left;
      margin-block-start: 0;
      margin-block-end: 0;
    }

    span.cyan {
      width: 100%;
      font-family: "Maven Pro", sans-serif;
      font-optical-sizing: auto;
      color: $grasp-cyan;
      font-size: 28px;
      letter-spacing: 0.10786em;
      text-align: left;
      text-transform: uppercase;
    }
  }
  .grasp-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    align-items: center;

    img {
      width: 75px;
      margin: 0 10px;      
    }
  }
}
</style>
