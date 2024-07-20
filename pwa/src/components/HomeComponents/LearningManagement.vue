<template>
  <section id="lms">
    <h1>Learning Management Solutions</h1>
    <div class="subtitle">
      The Grasp web3 dApp is ideal for delivering and managing educational courses and
      training programs. It facilitates onboarding for learners, staff, and web3 community
      members, offering structured educational tracks for various learning purposes.
    </div>
    <div class="slogan">
      Grasp Academy is built on the innovative EDU Chain and powered by Open Campus
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#lms {

  background-image: url("../../assets/images/hexBG.png"), url("../../assets/images/EduChain.png");
  background-repeat: no-repeat, no-repeat;
  background-size: 100%, 40%;
  background-position: top left, right;

  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: flex-start;
  justify-content: space-between;
  padding: 80px 0 80px 60px;

  @include breakpoint($break-sm) {
    background-image: url("../../assets/images/hexBG.png"), url("../../assets/images/EduChain.png");
    background-position: top 10px left 10%, top left;
    background-size: 100%, 100%;
    padding: 150px 0 30px;
  }

  h1 {
    width: 60%;
    color: $white;
    font-size: 38px;
    text-align: center;
    margin-bottom: 20px;
    z-index: 999;
    
    @include breakpoint($break-sm) {
      width: 100%;
      font-size: 32px;
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
    font-size: 17px;
    line-height: 1.7;
    text-align: center;
    margin: 0 0 30px 0;

    @include breakpoint($break-sm) {
      width: 90%;
      font-size: 16px;
      padding: 20px 5%;
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
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
    margin: 0 0 20px 20px;

    @include breakpoint($break-sm) {
      width: 90%;
      font-size: 18px;
      padding: 20px 5%;
      margin: 0;
    }
  }
}
</style>
