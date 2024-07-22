<template>
  <div class="creator-header">
    <div class="creator-banner">
      <img :src="creator.banner ? creator.banner : ''" class="profile-banner" />
      <img
        :src="creator.image ? creator.image : 'Grasp-Icon.png'"
        class="profile-image"
      />
      <div v-if="creator.title" class="creator-name">{{ creator.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { creatorObject } from "src/models/creator";

defineProps<{ creator: creatorObject }>();
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.creator-header {
  width: 100%;
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: $grasp-blue;
  border-bottom: 0.5px solid $grey-50;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: 0 auto 20px;
  padding: 0;
  transition: all 0.5s linear;
  overflow: hidden;

  .creator-banner {
    width: 100%;
    height: 200px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999989;

    img.profile-banner {
      width: 100%;
      height: 200px;
      object-fit: cover;
      object-position: center;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  }

  img.profile-image {
    width: 120px;
    height: 120px;
    position: absolute;
    bottom: 60px;
    left: 30px;
    border-radius: 50%;
    border: 0.5px solid $grey-60;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    object-fit: contain;
    overflow: hidden;
    background: $grey-50;
  }

  .creator-name {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: auto;
    outline: transparent solid 2px;
    outline-offset: 2px;
    border-radius: 9999px;
    transition: background-color 0.2s ease-out 0s;
    background: $grasp-cyan;
    font-size: 20px;
    text-align: center;
    padding-inline: 16px;
    padding-top: 2px;
    padding-bottom: 2px;
    --badge-color: $grey-40;
    color: $black;
    box-shadow: none;
    border-width: 1.5px;
    border-style: solid;
    border-image: initial;
    border-color: #4d5358;
    z-index: 999999;
  }
}
</style>
