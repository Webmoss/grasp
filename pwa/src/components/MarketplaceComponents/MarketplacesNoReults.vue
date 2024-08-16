<template>
  <div class="no-token-list">
    <div class="no-results">
      <div class="no-results-img">
        <img src="@/assets/svgs/SearchIcon.svg" width="48" />
      </div>
      <div class="no-results-title">No results found!</div>
      <div class="no-results-text">There are no results found for this collection.</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.no-token-list {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  .no-results {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    .no-results-img {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      img,
      svg {
        background: transparent;
        object-fit: contain;
        overflow: hidden;
      }
    }

    .no-results-title {
      width: 100%;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $white;
      font-size: 23px;
      line-height: 28px;
      font-weight: 900;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    .no-results-text {
      color: $white;
      width: 100%;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
