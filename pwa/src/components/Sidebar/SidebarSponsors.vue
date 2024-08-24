<template>
  <div class="footer-sponsors">
    <a
      title="Open Campus"
      class="sponsor-logo"
      href="https://www.opencampus.xyz/"
      target="_blank"
      rel="nofollow"
      ><img src="@/assets/images/Open-Campus-Logo.png" alt="Open Campus" height="56"
    /></a>
    <a
      title="Edu Chain"
      class="sponsor-logo"
      href="https://www.opencampus.xyz/"
      target="_blank"
      rel="nofollow"
      ><img src="@/assets/svgs/EduChain-Black.svg" alt="Edu Chain" height="69"
    /></a>
    <!-- <a
      title="Animoca Brands"
      class="sponsor-logo"
      href="https://www.animocabrands.com/"
      target="_blank"
      rel="nofollow"
      ><img
        src="@/assets/images/logos/AnimocaBrandsLogoAnimated.gif"
        alt="Animoca Brands"
        height="100"
    /></a> -->
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.footer-sponsors {
  width: 100%;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding: 4px 0 0 0;
  margin: 0 auto;

  a {
    margin: 0 0 30px 0;
  }
}
</style>
