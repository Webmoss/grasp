<template>
  <div class="search-collection-input">
    <div class="search-icon">
      <img src="../../assets/svgs/SearchIcon.svg" height="24" />
    </div>
    <input
      v-model="filter.search_term"
      name="searchCollectionInput"
      type="text"
      class="search-input"
      placeholder="Search NFTs"
      @input="searchHandle($event)"
    />
    <button class="search-clear-button" title="Clear search" @click="clearSearchTerm()">
      <img src="../../assets/svgs/DeleteIcon.svg" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { filter } = storeToRefs(store);

/**
 * Update our Filter Search Term in Store
 */
function searchHandle(event: Event) {
  store.setSearchTerm((event.target as HTMLInputElement).value);
}

/**
 *  Clear our Search Results in Store
 */
function clearSearchTerm() {
  store.setSearchTerm("");
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.search-collection-input {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  background: $white;
  margin-left: 0;
  margin-right: 10px;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  padding: 0 0 0 8px;
  transition: all 0.5s linear;
  overflow: hidden;
  cursor: pointer;

  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    border-color: rgb(69, 73, 77);
    outline: -webkit-focus-ring-color auto 0px;
  }

  .search-icon {
    width: 32px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
    img,
    svg {
      color: $grey-50;
      background: transparent;
      object-fit: contain;
      overflow: hidden;
      margin-bottom: -2px;
      margin-right: 8px;
    }
  }

  input.search-input {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    color: $grey-90;
    font-size: 14px;
    font-weight: 500;
    background: $white;
    margin-right: 10px;
    text-decoration: none;
    border: none;
    border-radius: 12px;
    padding: 8px 0 7px;
    transition: all 0.5s linear;
    cursor: pointer;

    &::placeholder {
      color: $grey-60;
    }

    &:hover,
    &:focus,
    &:focus-visible,
    &:active {
      outline: 0;
      background: $white;
    }
  }

  .search-clear-button {
    width: 24px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
    background: $white;
    border: 0;
    padding: 7px 0 6px;
    margin-right: 4px;
    cursor: pointer;

    img,
    svg {
      width: 20px;
      background: $white;
      object-fit: contain;
      overflow: hidden;
    }
  }
}
</style>
