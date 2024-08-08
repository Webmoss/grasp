<template>
  <button
    :active="gridView === 'full' ? 'active' : ''"
    :class="gridView === 'full' ? 'activeBtn' : ''"
    @click="setGridView()"
  >
    <img src="../../assets/svgs/FullViewIcon.svg" height="24" />
  </button>
</template>
<script lang="ts" setup>
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { gridView } = storeToRefs(store);

/**
 * Set our Collection Grid View
 */
function setGridView() {
  store.setGridView("full");
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

button {
  display: inline-block;
  width: 36px;
  height: 35px;
  background: $grasp-blue;
  border: 0;
  border-radius: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: 0;
  padding: 6px 6px 4px 4px;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover,
  &:active {
    background: $grasp-cyan;
  }
}
button.activeBtn {
  background: $grasp-cyan;
  &:hover,
  &:active {
    background: $grasp-blue;
  }
}
</style>
