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
      <div class="get-plus-button" @click="showHideModal()">
        Get&nbsp;<img
          src="../../assets/svgs/owl-cyan.svg"
          class="grasp-logo"
        />&nbsp;Grasp<span class="cyan">Plus</span>
      </div>
    </div>
    <GoPlusModal :showModal="showModal" @close="showHideModal" />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GoPlusModal from "@/components/Modals/GoPlusModal.vue";

const showModal = ref(false);

const showHideModal = () => {
  showModal.value = !showModal.value;
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#goplus {
  background: $grasp-cyan;
  background-image: url("../../assets/svgs/goPlus.svg"),
    url("../../assets/images/hexBG.png");
  background-repeat: no-repeat, no-repeat;
  background-position: top 50px left 100px, top left;
  background-size: 35%, 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: flex-end;
  justify-content: space-between;
  padding: 100px 0 100px 60px;

  @include breakpoint($break-sm) {
    width: 100%;
    background-position: bottom 20px left 40px;
    background-size: 85%;
    padding: 0 0 150px 0;
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
      width: 90%;
      font-size: 16px;
      padding: 10px 5% 30px;
      margin: 0 0 20px 0;
    }
  }

  .get-plus-button {
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: $white;
    background: $grasp-blue;
    border: 0.5px solid $grey-50;
    border-radius: 12px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    font-size: 26px;
    font-weight: 600;
    text-align: left;
    margin: 30px auto 0;
    padding: 20px 30px;
    cursor: pointer;

    @include breakpoint($break-sm) {
      padding: 10px 5%;
      margin: 0 0 20px;
    }

    .grasp-logo {
      width: 32px;
      height: 32px;
      object-fit: contain;
      overflow: hidden;
      background: transparent;
      margin: 0 -2px 0 0;
    }

    .cyan {
      color: $grasp-cyan;
    }

    img,
    svg {
      color: $grasp-blue;
      width: 40px;
      height: 40px;
      object-fit: contain;
      overflow: hidden;
      background: transparent;
    }
  }
}
</style>
