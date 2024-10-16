<template>
  <button class="clear-search-button" @click="clearSearch">
    <img src="../../assets/svgs/DeleteIcon-White.svg" />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["clear-search"]);

const clearSearch = () => {
  emit("clear-search");
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.clear-search-button {
  width: 36px;
  height: 36px;
  color: $white;
  background: $grasp-blue;
  border: 1px solid transparent;
  border-radius: 8px;
  margin: 0 0 0 10px;
  padding: 6px 6px 4px 6px;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover,
  &:active {
    background: $grasp-cyan;
  }

  img,
  svg {
    width: 20px;
    object-fit: contain;
    overflow: hidden;
  }
}
</style>
