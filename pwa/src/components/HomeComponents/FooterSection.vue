<template>
  <section id="footer">
    <div class="footer-menu">
      <nav class="footer-navbar">
        <a
          href="https://x.com/GraspAcademy"
          alt="Grasp Twitter"
          target="_blank"
          rel="noopener"
        >
          <img src="../../assets/svgs/Twitter.svg" height="20px" class="footer-logo" />
        </a>
        <a
          href="https://discord.com/channels/1088034981814738995/1263413496079450153"
          alt="Grasp Discord"
          target="_blank"
          rel="noopener"
        >
          <img
            src="../../assets/svgs/Discord-White.svg"
            height="20px"
            class="footer-logo"
          />
        </a>
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
      padding: 1em;

      @include breakpoint($break-sm) {
        justify-content: center;
        padding: 0.1em;
      }

      a {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: flex-start;
        color: $white;
        font-size: 20px;
        margin: 0 16px 0 0;
        padding-bottom: 1px;
        text-decoration: none;
        border-bottom: 0.5px solid transparent;
        transition: 0.6s;
        cursor: pointer;

        @include breakpoint($break-sm) {
          font-size: 14px;
        }

        img.footer-logo {
          margin: 0;
        }

        // &:hover,
        // &:active,
        // &:focus,
        // &:focus-visible {
        //   border-bottom: 0.5px solid $grasp-cyan;
        // }
      }
    }
  }
}
</style>
