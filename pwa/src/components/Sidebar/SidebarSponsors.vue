<template>
  <div class="sidebar-sponsors">
    <a
      alt="Open Campus"
      class="sponsor-logo"
      href="https://www.opencampus.xyz/"
      target="_blank"
      ><img src="@/assets/images/Open-Campus-Logo.png" alt="Open Campus" height="56"
    /></a>
    <!-- <a alt="EDU Chain" class="sponsor-logo" href="https://educhain.xyz/" target="_blank"
      ><img src="@/assets/svgs/EduChain-Black.svg" alt="Edu Chain" height="69"
    /></a>
    <a
      title="Animoca Brands"
      class="sponsor-logo"
      href="https://www.animocabrands.com/"
      target="_blank"
      ><img
        src="@/assets/images/logos/AnimocaBrandsLogoAnimated.gif"
        alt="Animoca Brands"
        height="120"
    /></a> -->
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.sidebar-sponsors {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding: 4px 0 0 0;
  margin: 20px auto 0;

  a {
    margin: 0;
  }
}
</style>
