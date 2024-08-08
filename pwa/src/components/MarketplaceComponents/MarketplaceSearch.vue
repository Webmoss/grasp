<template>
  <section id="marketplace-search-bar">
    <MarketplaceFilterButton />
    <MarketplacesSearchInput />
    <MarketplacesSortBy />
    <div class="grid-buttons">
      <ListViewButton />
      <GridViewButton />
      <FullViewButton />
    </div>
  </section>
</template>

<script setup lang="ts">
import MarketplaceFilterButton from "../MarketplaceComponents/MarketplaceFilterButton.vue";
import MarketplacesSortBy from "../MarketplaceComponents/MarketplacesSortBy.vue";
import MarketplacesSearchInput from "../MarketplaceComponents/MarketplacesSearchInput.vue";
import ListViewButton from "../Buttons/ListViewButton.vue";
import GridViewButton from "../Buttons/GridViewButton.vue";
import FullViewButton from "../Buttons/FullViewButton.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

section#marketplace-search-bar {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: $max-width;
  height: auto;
  margin: 10px auto;
  padding: 0;

  .grid-buttons {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;
    height: 33px;
    margin: 0 0 0 10px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 0;
    transition: all 0.5s linear;
    cursor: pointer;
  }
}
</style>
