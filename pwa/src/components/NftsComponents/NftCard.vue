<template>
  <div v-if="nft && gridView === 'list'" class="nft-list-item">
    <div class="nft-image">
      <img :src="nft.image ? nft.image : 'rectangle.svg'" />
    </div>
    <div class="nft-copy">
      <div class="nft-title">
        {{ nft.title ? nft.title : "" }}
      </div>
      <div class="nft-description">
        {{ nft.description ? nft.description : "" }}
      </div>
    </div>
    <div class="nft-list-buttons">
      <div class="nft-category">
        <div class="nft-date">
          {{ nft.mint_date ? nft.mint_date : "" }}
        </div>
        <span class="category-indicator">{{ nft.type ? nft.type : "" }}</span>
      </div>
      <div class="button-row">
        <BuyButton
          :btn-size="'small'"
          :color="'blue'"
          :nft-id="nft.id"
          :price="nft.price"
        />
      </div>
    </div>
  </div>

  <div v-else class="nft">
    <div class="nft-image">
      <img :src="nft.image ? nft.image : 'rectangle.svg'" />
    </div>
    <div class="nft-column">
      <div class="nft-title">
        {{ nft.title ? nft.title : "" }}
      </div>
      <div class="nft-description">
        {{ nft.description ? nft.description : "" }}
      </div>
    </div>
    <div class="nft-card-row">
      <div class="nft-category">
        <div class="nft-date">
          {{ nft.mint_date ? nft.mint_date : "" }}
        </div>
        <!-- <div class="category-indicator">{{ nft.category ? nft.category : "" }}</div> -->
      </div>
      <div class="button-column">
        <BuyButton
          :btn-size="'small'"
          :color="'blue'"
          :nft-id="nft.id"
          :price="nft.price"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { metadataObject } from "src/models/metadata";
import BuyButton from "../Buttons/BuyButton.vue";

defineProps<{ nft: metadataObject; gridView: string }>();
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.nft-card-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: flex-end;
}
.nft-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  padding: 4px 8px;
}
.nft-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: flex-end;
  padding: 0;
}

.nft {
  display: inline;
  float: left;
  box-sizing: border-box;
  width: 100%;
  background: $cream;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0 auto;
  padding: 16px;
  transition: all 0.5s linear;
  overflow: hidden;

  .nft-image {
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    background: transparent;

    img,
    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      overflow: hidden;
      background: transparent;
    }
  }

  .nft-title {
    font-family: "Poppins", sans-serif;
    color: $grasp-blue;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    margin: 0 0 5px 0;
  }

  .nft-description {
    width: 100%;
    min-height: 77.5px;
    color: $black;
    font-size: 13px;
    font-weight: normal;
    text-align: left;
    margin: 0 0 16px;
  }

  .nft-category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    color: $black;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;

    .nft-date {
      font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $grey-60;
      font-size: 12px;
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      margin: 0 0 4px 0;
    }

    .category-indicator {
      width: 80%;
      outline: transparent solid 2px;
      outline-offset: 2px;
      border-radius: 9999px;
      transition: background-color 0.2s ease-out 0s;
      background: $grasp-cyan;
      font-size: 12px;
      text-align: center;
      padding-inline: 8px;
      padding-top: 1px;
      padding-bottom: 1px;
      --badge-color: $grey-40;
      color: $grey-90;
      box-shadow: none;
      border-width: 1.5px;
      border-style: solid;
      border-image: initial;
      border-color: #4d5358;
    }
  }
  .button-column {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }
}

.nft-list-item {
  width: 99%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0;
  padding: 0;
  transition: all 0.5s linear;

  .nft-image {
    width: auto;
    position: relative;
    margin: 0;
    padding: 6px 6px 2px 6px;
    background: transparent;

    img,
    svg {
      width: 180px;
      height: inherit;
      object-fit: contain;
      overflow: hidden;
      background: transparent;
    }
  }

  .nft-copy {
    width: 96%;
    height: 100%;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    padding: 0 1%;

    .nft-title {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;

      font-family: "Poppins", sans-serif;
      color: $grasp-blue;
      width: 100%;
      font-size: 16px;
      font-weight: 600;
      text-align: left;
      margin: 0 0 5px 0;
    }

    .nft-description {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;

      width: 100%;
      color: $black;
      font-size: 13px;
      font-weight: normal;
      text-align: left;
      margin: 0;
    }
  }

  .nft-list-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: flex-end;
    padding: 0 8px;

    .nft-category {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;

      color: $black;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      margin: 0;

      .nft-date {
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grey-60;
        font-size: 12px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        margin: 0 0 4px 0;
      }

      .category-indicator {
        width: 70%;
        outline: transparent solid 2px;
        outline-offset: 2px;
        border-radius: 9999px;
        transition: background-color 0.2s ease-out 0s;
        background: $grasp-cyan;
        font-size: 12px;
        text-align: center;
        padding-inline: 8px;
        padding-top: 1px;
        padding-bottom: 1px;
        --badge-color: $grey-40;
        color: $grey-90;
        box-shadow: none;
        border-width: 1.5px;
        border-style: solid;
        border-image: initial;
        border-color: #4d5358;
      }
    }
    .button-row {
      width: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;
      padding: 0;
      margin: 8px auto 0;
    }
  }
}
</style>
