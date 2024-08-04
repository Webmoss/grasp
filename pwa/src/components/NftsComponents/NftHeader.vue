<template>
  <div class="nft-header">
    <div class="nft-banner">
      <img v-if="nft.image" :src="`../${nft.image}`" />
      <div v-if="nft.type" class="category-indicator">
        {{ nft.type }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { metadataObject } from "src/models/metadata";

defineProps<{ nft: metadataObject }>();
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.nft-header {
  width: 100%;
  height: 220px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: $grey-60;
  border-bottom: 0.5px solid $grey-50;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: 0 auto 20px;
  padding: 0;
  transition: all 0.5s linear;
  overflow: hidden;

  .nft-banner {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999989;

    img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      object-position: center;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  }

  .category-indicator {
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
