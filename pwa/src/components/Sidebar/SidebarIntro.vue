<template>
  <div class="intro">
    <h1>
      <img src="../../assets/svgs/owl-blue.svg" class="intro-logo" />Grasp
      <span class="white"> Plus</span>
    </h1>
    <div class="subtitle">Enjoy all our courses FREE and get rewarded for learning</div>
    <div class="slogan">
      Watch courses for free on Illustration, Photography, Crafts, Marketing,<br />
      Design, Architecture, Web &amp; App Design, and more.
    </div>
    <div class="get-plus-button" @click="showHideModal()">
      Get&nbsp;<img
        src="../../assets/svgs/owl-cyan.svg"
        class="grasp-logo"
      />&nbsp;Grasp<span class="cyan">Plus</span>
    </div>
    <GoPlusModal :showModal="showModal" @close="showHideModal" />
  </div>
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
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.intro {
  max-width: 260px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: flex-end;
  justify-content: space-between;
  background: $grasp-cyan;
  border: 1px solid rgb(69, 73, 77, 0.4);
  border-radius: 12px;
  padding: 8px;
  margin: 10px auto;

  h1 {
    width: 100%;
    color: $white;
    font-size: 30px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: flex-end;
    align-items: center;
    margin: 8px 0 16px 10px;

    @include breakpoint($break-sm) {
      width: 100%;
      align-content: center;
      margin: 50px auto 10px;
    }

    span.white {
      color: $grasp-blue;
    }

    img {
      width: 30px;
      margin-right: 8px;
      @include breakpoint($break-sm) {
        width: 25px;
      }
    }
  }
  .subtitle {
    width: 94%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: $grasp-blue;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    margin: 0 3% 20px;

    @include breakpoint($break-sm) {
      width: 90%;
      margin: 0 5% 20px;
    }
  }

  .slogan {
    width: 94%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: $black;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    margin: 0 3% 20px;

    @include breakpoint($break-sm) {
      width: 90%;
      margin: 0 5% 20px;
    }
  }

  .get-plus-button {
    width: 240px;
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
    margin: 10px auto 0;
    padding: 12px 8px;
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
