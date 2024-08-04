<template>
  <section id="footer">
    <div class="footer-menu">
      <nav class="footer-navbar">
        <a
          href="https://dorahacks.io/buidl/14231"
          alt="Open Campus Hackathon"
          target="_blank"
          rel="noopener"
          >showcase</a
        >
        <a href="https://x.com/GraspAcademy" alt="Twitter" target="_blank" rel="noopener"
          >twitter</a
        >
        <a
          href="https://github.com/Webmoss/grasp"
          alt="GitHub"
          target="_blank"
          rel="noopener"
          >github</a
        >
      </nav>
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 44px;
  color: $white;
  background: $grasp-blue;

  @include breakpoint($break-sm) {
    padding: 10px 0;
  }

  .footer-menu {
    display: flex;
    align-items: center;

    .footer-navbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 0;
      padding: 0.3em;

      @include breakpoint($break-sm) {
        justify-content: center;
        padding: 0.1em;
      }

      a {
        color: $white;
        font-size: 16px;
        margin-right: 14px;
        padding-bottom: 1px;
        text-decoration: none;
        border-bottom: 0.5px solid transparent;
        transition: 0.6s;
        cursor: pointer;

        @include breakpoint($break-sm) {
          font-size: 14px;
        }

        &:hover,
        &:active,
        &:focus,
        &:focus-visible {
          border-bottom: 0.5px solid $grasp-cyan;
        }
      }

      svg {
        cursor: pointer;
        font-size: 2em;
      }
    }
  }
}
</style>
