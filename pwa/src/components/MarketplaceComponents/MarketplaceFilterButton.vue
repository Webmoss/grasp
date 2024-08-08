<template>
  <button
    :active="showFilter ? 'active' : ''"
    :class="showFilter ? 'filter-button activeBtn' : 'filter-button'"
    @click="filterHandle(showFilter)"
  >
    <div class="filter-icon">
      <img src="@/assets/svgs/FilterIcon.svg" />
    </div>
    <!-- <div class="filter-label">Filter</div> -->
  </button>
</template>
<script lang="ts" setup>
  import { useStore } from "@/store";
  import { storeToRefs } from "pinia";

  const store = useStore();
  const { showFilter } = storeToRefs(store);

  /**
   * Update our Filter Show value in Store
   */
  function filterHandle(show: boolean) {
    store.setShowFilter(!show);
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .filter-button {
    width: 36px;
    height: 35px;
    background: $grasp-blue;
    color: $white;
    margin: 0 10px 0 0;
    padding: 5px 6px 4px 6px;
    border: 1px solid transparent;
    border-radius: 8px;
    transition: all 0.3s linear;
    cursor: pointer;

    &:hover,
    &:active {
      background: $grasp-cyan;
    }

    .filter-icon {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      align-items: center;
      img,
      svg {
        width: 22px;
        background: transparent;
        object-fit: contain;
        overflow: hidden;
        margin: 0;
      }
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
