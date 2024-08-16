<template>
  <div class="no-nft-list">
    <div class="no-nft-results">
      <div class="no-nft-results-img">
        <img src="@/assets/svgs/SearchIcon.svg" width="48" />
      </div>
      <div class="no-nft-results-title">No Token Found!</div>
      <div class="no-nft-results-text">
        There are no results found for this NFT.<br />
        Please reload and try again!
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.no-nft-list {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  .no-nft-results {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    .no-nft-results-img {
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

    .no-nft-results-title {
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

    .no-nft-results-text {
      color: $white;
      width: 100%;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
