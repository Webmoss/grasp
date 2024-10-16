<template>
  <section id="creators-search-bar">
    <div class="search-left">
      <SearchInput label="Creators" />
      <DateSort class="hide-mobile" @sort-change="handleDateSort" />
      <TypeSort
        class="hide-mobile"
        v-model:selected="selectedType"
        @type-change="handleTypeChange"
      />
      <ClearSearchButton class="hide-mobile" @clear-search="handleClearSearch" />
    </div>
    <div class="search-right">
      <DateSort class="show-mobile" @sort-change="handleDateSort" />
      <TypeSort
        class="show-mobile"
        v-model:selected="selectedType"
        @type-change="handleTypeChange"
      />
      <ClearSearchButton class="show-mobile" @clear-search="handleClearSearch" />
      <div class="grid-buttons">
        <ListViewButton />
        <GridViewButton />
        <FullViewButton />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store";
import DateSort from "../Filters/DateSort.vue";
import TypeSort from "../Filters/TypeSort.vue";
import SearchInput from "../Filters/SearchInput.vue";
import ClearSearchButton from "../Buttons/ClearSearchButton.vue";
import ListViewButton from "../Buttons/ListViewButton.vue";
import GridViewButton from "../Buttons/GridViewButton.vue";
import FullViewButton from "../Buttons/FullViewButton.vue";

const store = useStore();

const selectedType = ref("");

const handleDateSort = (value: string) => {
  store.setSearchDate(value);
};

const handleTypeChange = (value: string) => {
  selectedType.value = value;
  store.setSearchTypes(value);
};

const handleClearSearch = () => {
  selectedType.value = "";
  store.resetFilter();
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

section#creators-search-bar {
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
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;

    @include breakpoint($break-sm) {
      width: 94%;
      margin: 0 3% 16px;
    }
  }

  .search-right {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;

    @include breakpoint($break-sm) {
      width: 94%;
      margin: 0 3%;
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
