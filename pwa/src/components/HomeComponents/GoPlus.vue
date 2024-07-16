<template>
  <section id="goplus">
    <h1>
      <img src="../../assets/svgs/owl-blue.svg" class="intro-logo" />Grasp
      <span class="white"> Plus</span>
    </h1>
    <div class="subtitle">Enjoy all our courses FREE and get rewarded for learning</div>
    <div class="slogan">
      Watch courses for free on Illustration, Photography, Crafts, Marketing,<br />
      Design, Architecture, Web &amp; App Design, and more.
      <button class="buy-button">Get Plus Now</button>
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#goplus {
  background: $grasp-cyan;
  background-image: url("../../assets/svgs/goPlus.svg");
  background-repeat: no-repeat;
  background-position: top 50px left 100px;
  background-size: 35%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: flex-end;
  justify-content: space-between;
  padding: 100px 0 100px 60px;

  @include breakpoint($break-sm) {
    width: 100%;
    background-position: bottom;
    background-size: 80%;
    padding: 0;
  }

  h1 {
    width: 70%;
    color: $white;
    font-size: 38px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: flex-end;
    align-items: center;
    margin: 0 0 10px 10px;

    @include breakpoint($break-sm) {
      width: 100%;
      align-content: center;
      margin: 50px auto 10px;
    }

    span.white {
      color: $grasp-blue;
    }

    img {
      width: 40px;
      margin-right: 8px;
      @include breakpoint($break-sm) {
        width: 35px;
      }
    }
  }

  .subtitle {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: $grasp-blue;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.7;
    text-align: center;
    margin: 0 0 20px 20px;

    @include breakpoint($break-sm) {
      width: 90%;
      padding: 20px 5%;
      margin-bottom: 0;
    }
  }
  .slogan {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: $grasp-blue;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
    margin: 0 0 20px 20px;

    @include breakpoint($break-sm) {
      width: 84%;
      padding: 30px 8%;
      margin-bottom: 0;
    }
  }
  .buy-button {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: $white;
    background-color: $grasp-blue;
    font-size: 16px;
    font-weight: bold;
    width: auto;
    height: 50px;
    border: 2px solid $grasp-blue;
    border-radius: 30px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 40px;
    margin-bottom: 27px;
    transition: 0.6s;
    cursor: pointer;
    .icon-color {
      margin: 0 5px 0 0;
    }

    &:hover {
      border: 2px solid $white;
    }
  }
}
</style>
