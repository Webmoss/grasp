<template>
  <section id="marketplace-search-bar">
    <div class="search-left">
      <MarketplaceFilterButton />
      <MarketplacesSearchInput />
      <MarketplacesSortBy class="hide-mobile" />
    </div>
    <div class="search-right">
      <MarketplacesSortBy class="show-mobile" />
      <div class="grid-buttons">
        <ListViewButton />
        <GridViewButton />
        <FullViewButton />
      </div>
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

  @include breakpoint($break-sm) {
    flex-direction: column;
  }

  .search-left {
    width: 88%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;

    @include breakpoint($break-sm) {
      width: 98%;
      margin: 0 1% 16px;
    }
  }

  .search-right {
    width: 12%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;

    @include breakpoint($break-sm) {
      width: 98%;
      margin: 0 1%;
      justify-content: space-between;
    }
  }

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
