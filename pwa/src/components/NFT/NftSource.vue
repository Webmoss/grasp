<template>
  <div v-if="source?.icon" class="nft-source">
    <img :src="source?.icon" :alt="source.name" width="20px" />
  </div>
</template>
<script lang="ts" setup>
export interface Props {
  source: object;
}
defineProps({
  source: {
    type: Object,
    default: null,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.nft-source {
  position: absolute;
  top: 5px;
  right: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;

  img,
  svg {
    width: 22px !important;
    height: 22px;
    background: transparent;
    object-fit: contain;
    overflow: hidden;
  }
}
</style>
