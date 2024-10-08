<template>
  <div class="nft">
    <div v-if="token.token && token.token.image" class="nft-image">
      <img :src="getUrlProtocol(token.token.image)" />
      <NftChain :chain-id="token.token.chainId" />
      <NftSource
        v-if="token.market.floorAsk.source"
        :source="token.market.floorAsk.source"
      />
    </div>
    <div class="nft-row">
      <div v-if="token.token && token.token.name" class="nft-title">
        {{ token.token.name }}
      </div>
      <div v-else-if="token.token && token.token.tokenId" class="nft-title">
        # {{ token.token.tokenId }}
      </div>
      <div v-if="token.market && token.market.floorAsk" class="nft-floor">
        <div class="nft-floor-amount">
          {{ token.market.floorAsk.price?.amount.decimal.toFixed(2) }}
          <div class="nft-floor-amount-icon">
            <img
              v-if="token.market.floorAsk.price?.currency.symbol === 'EDU'"
              src="@/assets/svgs/EduCoin.svg"
            />
            <img
              v-else-if="token.market.floorAsk.price?.currency.symbol === 'WETH'"
              src="@/assets/images/logos/WETH.png"
              size="24px"
            />
            <img v-else src="@/assets/images/logos/eth-diamond-black.png" width="10" />
          </div>
        </div>
      </div>
    </div>
    <div class="nft-card-row">
      <div class="button-column">
        <ViewNFTButton
          :btn-size="'small'"
          :color="'blue'"
          :token-id="token.token.tokenId"
        />
      </div>
      <div class="nft-column">
        <div v-if="token.token && token.token.rarityRank" class="nft-rarityRank">
          <span class="grey-label">Rank</span>
          <span class="rarity-indicator">{{ token.token.rarityRank }}</span>
        </div>
        <div v-if="token.token && token.token.rarity" class="nft-rarity">
          <span class="grey-label">Rarity</span>
          <span class="rarity-indicator">{{ token.token.rarity }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { tokenWrapperObject } from "@/models/tokenWrapper";
import { getUrlProtocol } from "@/services/helpers";
import NftChain from "../NFT/NftChain.vue";
import NftSource from "../NFT/NftSource.vue";
import ViewNFTButton from "../Buttons/ViewNFTButton.vue";

defineProps<{
  token: tokenWrapperObject;
}>();
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.nft-card-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 4px 8px;
}
.nft-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  align-items: flex-start;
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
  background: $white;
  border: 0.5px solid $grey-60;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  border-radius: 12px;
  margin: 0 auto;
  padding: 0 0 4px 0;
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

    .nft-chain-icon {
      position: absolute;
      top: 10px;
      left: 6px;

      img,
      svg {
        width: 16px !important;
        height: auto;
        background: transparent;
        object-fit: contain;
        overflow: hidden;
      }
    }
  }

  .nft-title {
    width: 75%;
    min-width: 210px;
    height: auto;
    min-height: 40px;
    text-wrap: wrap;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: $black;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    margin: 0;
  }

  .nft-description {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    color: $black;
    font-size: 12px;
    font-weight: normal;
    text-align: center;
    margin: 0;
  }

  .nft-rarity {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    color: $black;
    width: 100%;
    font-size: 16px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0;

    .grey-label {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $black;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      margin-right: 8px;
    }

    .rarity-indicator {
      outline: transparent solid 2px;
      outline-offset: 2px;
      border-radius: 9999px;
      transition: background-color 0.2s ease-out 0s;
      background: transparent;
      font-size: 14px;
      padding-inline: 8px;
      padding-top: 1px;
      padding-bottom: 1px;
      --badge-color: $grey-40;
      color: $black;
      box-shadow: none;
      border-width: 1.5px;
      border-style: solid;
      border-image: initial;
      border-color: #4d5358;
    }
  }

  .nft-rarityRank {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;
    align-items: center;

    color: $black;
    font-size: 16px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0 0 6px 0;

    .grey-label {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $black;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      margin-right: 8px;
    }

    .rarity-indicator {
      outline: transparent solid 2px;
      outline-offset: 2px;
      border-radius: 9999px;
      transition: background-color 0.2s ease-out 0s;
      background: transparent;
      font-size: 14px;
      padding-inline: 8px;
      padding-top: 1px;
      padding-bottom: 1px;
      --badge-color: $grey-40;
      color: $black;
      box-shadow: none;
      border-width: 1.5px;
      border-style: solid;
      border-image: initial;
      border-color: #4d5358;
    }
  }

  .nft-floor {
    width: 25%;
    min-width: 80px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;

    .nft-floor-amount {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-content: center;
      align-items: center;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $black;
      font-size: 18px;
      font-weight: 600;

      .nft-floor-amount-icon {
        width: 24px;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin-left: 2px;
        img,
        svg {
          background: transparent;
          object-fit: contain;
          overflow: hidden;
          margin-bottom: -1px;
        }
      }
    }
  }
  .button-column {
    width: 50%;
    height: 51px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: flex-end;
    padding: 0;
    margin: 0;
  }
}
</style>
