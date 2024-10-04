<template>
  <section id="home">
    <div class="left">
      <GraspLogo />
      <p>
        Grasp is the premier educational content platform where educators and creators can
        share their work and earn on EDU Chain. Powered by Open Campus, the Grasp web3
        platform integrates EduFi, enabling users to learn, earn, and be rewarded for
        academic excellence.
      </p>
      <p>
        We prioritize education and facilitate onboarding for users, students, educators,
        and web3 community members, including DAOs. Grasp Academy, our Learning Management
        System (LMS), is built on the innovative EDU Chain, providing a robust foundation
        for educational advancement
      </p>
      <div class="educhain-row">
        <div class="educhain-links">
          <div @click="scrolltoId('solutions')" class="scroll-link">
            Learn &amp; Earn <img src="../../assets/svgs/Right.svg" class="link-icon" />
          </div>
          <div @click="scrolltoId('campus')" class="scroll-link">
            Open Campus <img src="../../assets/svgs/Right.svg" class="link-icon" />
          </div>
          <div @click="scrolltoId('goplus')" class="scroll-link">
            Grasp Plus <img src="../../assets/svgs/Right.svg" class="link-icon" />
          </div>
          <div @click="scrolltoId('educhain')" class="scroll-link">
            EduChain <img src="../../assets/svgs/Right.svg" class="link-icon" />
          </div>
          <div @click="scrolltoId('roadmap')" class="scroll-link">
            Roadmap <img src="../../assets/svgs/Right.svg" class="link-icon" />
          </div>
        </div>
        <div class="educhain-banner">
          <img src="../../assets/svgs/EduChain-White.svg" class="educhain-logo" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="home-graphic">
        <!-- <img src="../../assets/svgs/Open-Campus-ID.svg" /> -->
        <img src="../../assets/images/IntroBanner.png" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import GraspLogo from "../Logo/GraspLogo.vue";

function scrolltoId(to: string) {
  var access = document.getElementById(to);
  if (access) {
    access.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#home {
  color: $white;
  background: $grasp-blue;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 40px 80px;
  overflow: hidden;

  @include breakpoint($break-sm) {
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
  }

  .left {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: center;
    padding: 40px 40px 0 40px;

    @include breakpoint($break-sm) {
      width: 100%;
      padding: 40px 40px 0 40px;

      .grasp-logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin: 10px 0 10px -40px;
      }
    }

    p {
      color: $white;
      line-height: 1.7;
      margin-bottom: 20px;
      padding: 10px 0 0 20px;

      @include breakpoint($break-sm) {
        padding: 10px 0 0 10px;
        text-align: center;
      }
    }

    .educhain-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;
      margin-top: 20px;

      @include breakpoint($break-md) {
        flex-direction: column-reverse;
        margin-top: 0;
        margin-bottom: 20px;
      }
      @include breakpoint($break-sm) {
        flex-direction: column-reverse;
        margin-top: 0;
        margin-bottom: 20px;
      }

      .educhain-links {
        width: calc(100% - 220px);
        min-width: 140px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: flex-start;
        padding: 0 0 0 20px;

        @include breakpoint($break-sm) {
          width: 220px;
          margin: 30px auto;
        }

        .scroll-link {
          width: auto;
          color: $white;
          font-size: 15px;
          line-height: normal;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.3s linear;
          margin-bottom: 6px;
          padding-bottom: 1px;
          cursor: pointer;

          &:hover,
          &:active,
          &:focus,
          &:focus-visible {
            border-bottom: 1px solid $grasp-cyan;
          }

          img,
          svg {
            width: 16px;
            margin-bottom: -3px;
          }
        }
      }

      .educhain-banner {
        width: 260px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: center;
        align-items: center;

        @include breakpoint($break-sm) {
          width: 220px;
          margin: 30px auto;
        }

        .educhain-logo {
          width: 260px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          align-items: flex-start;
          margin: 0;

          @include breakpoint($break-sm) {
            width: 220px;
          }
        }
      }
    }
  }

  .right {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    padding: 0;

    @include breakpoint($break-sm) {
      width: 100%;
      align-content: center;
      justify-content: center;
    }
  }

  .home-graphic {
    width: 100%;
    padding: 0;

    img,
    svg {
      width: 100%;
      object-fit: cover;
      overflow: hidden;
    }

    @include breakpoint($break-sm) {
      width: 110%;
      img,
      svg {
        width: 100%;
        object-fit: cover;
        overflow: hidden;
        margin: 0;
      }
    }
  }
}
</style>
