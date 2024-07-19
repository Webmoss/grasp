<template>
  <div class="course-banner">
    <div class="course-banner-column left">
      <img src="../../assets/svgs/EduChain-Green.svg" />
    </div>
    <div class="course-banner-column center">
      <div class="course-banner-title"><img src="../../assets/svgs/owl-blue.svg" /> Latest Courses</div>
      <div class="course-banner-slogan">Learn, earn and be rewarded for excellence</div>
      <div class="course-banner-description">
        Vote for your favourite creator to earn OC Points
      </div>
    </div>
    <div class="course-banner-column right">
      <VoteButton :course-id="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import VoteButton from "../Buttons/VoteButton.vue";
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.course-banner {
  width: 96%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: $grasp-cyan;
  background-image: url("../../assets/images/hexBG.png"),url("../../assets/images/EduChain.png");
  background-repeat: no-repeat, no-repeat;
  background-size: 100%, 300px;
  background-position: top left, right 160px top 0;
  border: 0.5px solid $grey-60;
  border-radius: 12px;
  margin: 30px auto 20px;
  padding: 1% 2%;
  transition: all 0.5s linear;
  overflow: hidden;

  @include breakpoint($break-sm) {
    width: 90%;
    flex-direction: column;
    background-image: url("../../assets/images/hexBG.png"),url("../../assets/images/EduChain.png");
    background-repeat: no-repeat, no-repeat;
    background-size: 100%, 100%;
    background-position: top left, bottom -41px left;
    border: 0.5px solid $grey-60;
    border-radius: 0;
    margin: 0 auto 20px;
    padding: 2% 5%;
  }

  .course-banner-column {
    min-width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;

    @include breakpoint($break-sm) {
      min-width: 100%;
    }

    img,
    svg {
      width: 220px;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
  }
  .left {
    justify-content: center;
    align-content: center;
    align-items: flex-start;
    @include breakpoint($break-sm) {
      align-items: center;
      padding-top: 20px;
    }
  }
  .center {
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .right {
    justify-content: center;
    align-content: center;
    align-items: flex-end;
    @include breakpoint($break-sm) {
      align-items: center;
    }
  }

  .course-banner-title {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    font-family: "Poppins", sans-serif;
    color: $black;
    font-size: 24px;
    font-weight: 600;
    text-align: left;
    margin: 0 0 5px 0;

    @include breakpoint($break-sm) {
      justify-content: center;
      margin: 10px 0 0 0;
    }

    img,
    svg {
      width: 30px;
      // object-fit: cover;
      overflow: hidden;
      margin-right: 8px;
      padding: 0;
    }
  }
  .course-banner-slogan {
    font-family: "Poppins", sans-serif;
    color: $black;
    width: 100%;
    font-size: 17px;
    font-weight: 600;
    text-align: left;
    margin: 0 0 5px 0;

    @include breakpoint($break-sm) {
      width: 90%;
      font-size: 18px;
      text-align: center;
      padding: 0 5%;
      margin: 0 0 5px 0;
    }
  }
  .course-banner-description {
    color: $black;
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    text-align: left;
    margin: 0 0 10px 0;

    @include breakpoint($break-sm) {
      width: 90%;
      text-align: center;
      padding: 0 5%;
      margin: 10px 0 20px 0;
    }
  }
}
</style>
