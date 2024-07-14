<template>
  <section id="lms">
    <h1>Learning Management Solutions</h1>
    <div class="subtitle">
      The Grasp web3 dApp is perfect for delivering and managing educational courses and
      training programs. It facilitates onboarding for learners, staff, and web3 community
      members, offering structured educational tracks for education and learning.
    </div>
    <div class="slogan">
      Grasp is built on the innovative EDU Chain and powered by Open Campus
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#lms {
  background-image: url("../../assets/images/EduChain.png");
  background-repeat: no-repeat;
  background-position: right;
  background-size: 35%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: flex-start;
  justify-content: space-between;
  padding: 100px 0 100px 60px;

  h1 {
    width: 60%;
    color: $white;
    font-size: 42px;
    text-align: center;
    margin-bottom: 20px;
    z-index: 999;
    @include breakpoint($break-ssm) {
      font-size: 2.75rem;
      margin-bottom: 0;
    }
  }

  .subtitle {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: $white;
    font-size: 18px;
    line-height: 1.7;
    text-align: center;
    margin: 0 0 20px 20px;

    @include breakpoint($break-ssm) {
      width: 60%;
      padding: 30px 5%;
      margin-bottom: 0;
    }
  }
  .slogan {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: $grasp-cyan;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
    margin: 0 0 20px 20px;

    @include breakpoint($break-ssm) {
      width: 60%;
      padding: 30px 5%;
      margin-bottom: 0;
    }
  }
}
</style>
