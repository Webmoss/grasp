<template>
  <section id="home">
    <div class="left">
      <GraspLogo />
      <p>
        Grasp is the go-to content platform where creators can share their work and earn
        on EDU Chain. Powered by Open Campus, the Grasp web3 platform integrates EduFi,
        enabling users to learn, earn, and be rewarded for excellence.
      </p>
      <p>
        We prioritize education and facilitate onboarding for users, students, staff, and
        web3 community members, including DAOs. Grasp Academy, our Learning Management
        System (LMS), is built on the innovative EDU Chain, providing a robust foundation
        for educational advancement.
      </p>
      <p>
        <span @click="scrolltoId('solutions')" class="scroll-link"
          >Learn &amp; Earn
          <img src="../../assets/svgs/Right.svg" class="link-icon" /></span
        ><br />
        <span @click="scrolltoId('campus')" class="scroll-link"
          >Open Campus <img src="../../assets/svgs/Right.svg" class="link-icon" /></span
        ><br />
        <span @click="scrolltoId('goplus')" class="scroll-link"
          >Grasp Plus <img src="../../assets/svgs/Right.svg" class="link-icon" /></span
        ><br />
        <span @click="scrolltoId('educhain')" class="scroll-link"
          >EduChain <img src="../../assets/svgs/Right.svg" class="link-icon"
        /></span>
      </p>
    </div>
    <div class="right">
      <div class="home-graphic">
        <img src="../../assets/svgs/Open-Campus-ID.svg" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import GraspLogo from '../Logo/GraspLogo.vue';

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
      padding: 20px 40px 0 40px;

      .grasp-logo {
        padding-left: 30px;
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
      img,
      svg {
        width: 90%;
        object-fit: cover;
        overflow: hidden;
        margin-left: 10%;
      }
    }
  }
}
</style>
