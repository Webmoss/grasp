<template>
  <section id="home">
    <div class="left">
      <h1>
        <img src="../../assets/svgs/owl-white.svg" class="intro-logo" />Grasp Academy
      </h1>
      <p>
        Grasp Academy is a Learning Management System (LMS) built on the innovative EDU
        Chain and powered by Open Campus. The Grasp web3 platform integrates EduFi
        allowing users to learn, earn, and be rewarded for excellence.
      </p>
      <p>
        Grasp is a content platform where creators share their work and earn on EDU Chain.
        We prioritize education and facilitate onboarding for users, students, staff, and
        web3 community members including DAOs.
      </p>
      <p>
        <a href="/#campus" title="Learn More" class="link-button">Open Campus</a>
        <a href="/#about" title="Learn More" class="link-button">Education Solutions</a>
        <a href="/#educhain" title="Learn More" class="link-button">EduChain</a>
      </p>
    </div>
    <div class="right">
      <div class="home-graphic">
        <img src="../../assets/svgs/intro.svg" />
      </div>
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#home {
  color: $white;
  background: $grasp-blue;
  border-bottom: 1px solid $grasp-blue;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0 60px 80px;
  overflow: hidden;

  @include breakpoint($break-sm) {
    flex-direction: column;
    justify-content: center;
    padding: 20px;
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
    }

    h1 {
      color: $white;
      font-size: 38px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      margin: 0 0 10px 10px;

      img {
        width: 40px;
        margin-right: 8px;
        @include breakpoint($break-sm) {
          width: 35px;
        }
      }
    }

    p {
      color: $white;
      line-height: 1.7;
      margin-bottom: 20px;
      padding: 0 0 0 20px;
      @include breakpoint($break-sm) {
        padding: 0 0 0 10px;
      }
    }

    .link-button {
      color: $white;
      margin-right: 10px;
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
    width: 500px;
    padding: 0;

    img,
    svg {
      width: 100%;
      object-fit: cover;
      overflow: hidden;
    }

    @include breakpoint($break-sm) {
      width: 100%;
    }
  }
}
</style>
