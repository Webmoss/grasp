<template>
  <div class="footer-sponsors-row">
    <!-- <a
      title="Yuga Labs"
      class="sponsor-logo"
      href="https://www.yuga.com/"
      target="_blank"
      rel="nofollow"
      ><img
        src="@/assets/images/logos/YugaLabsWhite.png"
        alt="Yuga Labs"
        height="56"
    /></a> -->
    <a
      title="Animoca Brands"
      class="sponsor-logo"
      href="https://www.animocabrands.com/"
      target="_blank"
      rel="nofollow"
      ><img
        src="@/assets/images/logos/AnimocaBrandsLogoAnimated.gif"
        alt="Animoca Brands"
        height="50"
    /></a>
    <!-- <a
      title="Opensea"
      class="sponsor-logo"
      href="https://docs.opensea.io/"
      target="_blank"
      rel="nofollow"
      ><img
        src="@/assets/images/logos/OpenseaWhite.png"
        alt="Opensea"
        height="34"
    /></a> -->
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .footer-sponsors-row {
    width: 100%;
    height: inherit;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    padding: 4px 0 0 0;
    margin: 0 auto;
  }
</style>
