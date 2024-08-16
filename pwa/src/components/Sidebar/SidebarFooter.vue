<template>
  <div class="footer-menu">
    <nav class="footer-navbar">
      <a
        href="https://twitter.com/ApeInn_"
        alt="The Ape Inn Twitter"
        target="_blank"
        rel="noopener"
        >@ApeInn_</a
      >
      <a
        href="https://forum.apecoin.com/t/aip-243-the-ape-inn-ethglobal-project/11756?u=0xwebmoss"
        alt="ApeCoin Proposal"
        target="_blank"
        rel="noopener"
        >AIP 243</a
      >
      <a
        href="https://ethglobal.com/showcase/the-ape-inn-1ntf4"
        alt="EthGlobal Showcase"
        target="_blank"
        rel="noopener"
        >EthGlobal</a
      >
      <a
        href="https://twitter.com/webmoss"
        alt="0xWebMoss Twitter"
        target="_blank"
        rel="noopener"
        >WebMoss</a
      >
    </nav>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";
  .footer-menu {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .footer-navbar {
      height: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 15px;

      @include breakpoint($break-sm) {
        padding: 0;
        font-size: 0.8rem;
        justify-content: center;
      }

      a {
        font-size: 14px;
        color: $white;
        margin-right: 14px;
        padding-bottom: 1px;
        text-decoration: none;
        transition: all 0.5s linear;
        cursor: pointer;

        &:hover {
          font-weight: bold;
          border-bottom: 0.5px solid $white;
        }
        &:focus,
        &:focus-visible {
          border-bottom: 0.5px solid $white;
        }
      }
    }
  }
</style>
