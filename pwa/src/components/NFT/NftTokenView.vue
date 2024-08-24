<template>
  <div class="row nft-header">
    <div class="column width-50">
      <div v-if="token.token && token.token.image" class="nft-view-image">
        <img :src="getUrlProtocol(token.token.image)" />
        <NftChain :chain-id="token.token.chainId" />
      </div>
    </div>
    <div class="column width-50">
      <div class="nft-details">
        <div class="nft-view-row">
          <div class="nft-column-start">
            <div v-if="token.token && token.token.name" class="nft-title">
              {{ token.token.name }}
            </div>
            <div v-else-if="token.token && token.token.tokenId" class="nft-title">
              #{{ token.token.tokenId }}
            </div>
          </div>
          <div class="nft-column-end">
            <div v-if="token.market && token.market.floorAsk.price" class="nft-floor">
              <div class="nft-floor-amount">
                {{
                  token.market.floorAsk.price.amount
                    ? token.market.floorAsk.price.amount.decimal.toFixed(2)
                    : ""
                }}
                <div
                  v-if="token.market && token.market.floorAsk.price.currency"
                  class="nft-floor-amount-icon"
                >
                  <img
                    v-if="token.market.floorAsk.price.currency.symbol === 'EDU'"
                    src="@/assets/svgs/EduCoin.svg"
                  />
                  <img
                    v-else-if="token.market.floorAsk.price.currency.symbol === 'WETH'"
                    src="@/assets/images/logos/WETH.png"
                  />
                  <img
                    v-else
                    src="@/assets/images/logos/eth-diamond-black.png"
                    width="12"
                  />
                </div>
              </div>
              <div
                v-if="token.market && token.market.floorAsk.source"
                class="nft-floor-source"
              >
                <img
                  :src="token.market.floorAsk.source.icon"
                  :alt="token.market.floorAsk.source.name"
                  width="20px"
                />
              </div>
            </div>
            <div v-if="token.token && token.token.rarity" class="nft-ranking">
              <div v-if="token.token && token.token.rarityRank" class="nft-rarityRank">
                <span class="grey-label">Rank</span>
                <span class="rarity-indicator">{{ token.token.rarityRank }}</span>
              </div>
              <div class="nft-rarity">
                <span class="grey-label">Rarity</span>
                <span class="rarity-indicator">{{ token.token.rarity }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="token.token && token.token.description" class="nft-description">
          {{ token.token.description }}
        </div>
        <!-- Tabs Switcher -->
        <div class="nft-tab-row">
          <div
            class="nft-tab-switcher"
            :class="nftTab === 'traits' ? 'active' : ''"
            @click="switchTab('traits')"
          >
            Traits
          </div>
          <div
            class="nft-tab-switcher"
            :class="nftTab === 'info' ? 'active' : ''"
            @click="switchTab('info')"
          >
            Info
          </div>
          <div
            class="nft-tab-switcher"
            :class="nftTab === 'activity' ? 'active' : ''"
            @click="switchTab('activity')"
          >
            Activity
          </div>
          <div
            class="nft-tab-switcher"
            :class="nftTab === 'offers' ? 'active' : ''"
            @click="switchTab('offers')"
          >
            Offers
          </div>
        </div>
        <NftTokenTraits
          v-if="nftTab === 'traits'"
          :attributes="token.token.attributes"
          :token="token"
        />
        <NftTokenInfo v-if="nftTab === 'info'" :token="token" />
        <NftTokenActivity v-if="nftTab === 'activity'" :token="token" />
        <NftTokenOffers v-if="nftTab === 'offers'" :token="token" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, PropType } from "vue";
import { tokenWrapperObject } from "@/models/tokenWrapper";
import { getUrlProtocol } from "@/services/helpers";

/* Components */
import NftChain from "@/components/NFT/NftChain.vue";
import NftTokenInfo from "@/components/NFT/NftTokenInfo.vue";
import NftTokenTraits from "@/components/NFT/NftTokenTraits.vue";
import NftTokenActivity from "@/components/NFT/NftTokenActivity.vue";
import NftTokenOffers from "@/components/NFT/NftTokenOffers.vue";

export interface Props {
  token: tokenWrapperObject;
}

const props = defineProps({
  token: {
    type: Object as PropType<tokenWrapperObject>,
    default: null,
  },
});

const nftTab = ref("traits");

const switchTab = (value: string) => {
  nftTab.value = value;
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.nft-header {
  border-radius: 12px;
  margin: 0;
}
.nft-details {
  width: 100%;
  padding: 30px 0 0 0;

  .nft-view-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: flex-start;
  }
  .nft-column-start {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    align-items: flex-start;
    padding: 0;
  }
  .nft-column-end {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    padding: 0;
  }
}

.nft-view-image {
  position: relative;
  width: 500px;
  height: 500px;
  border: 0px solid transparent;
  border-radius: 12px;
  margin: 0;
  padding: 0;
  overflow: hidden;

  @include breakpoint($break-sm) {
    width: 100%;
    height: auto;
  }

  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1.05);
    background: transparent;
    overflow: hidden;
    @include breakpoint($break-md) {
      width: 360px;
      height: 360px;
    }
    @include breakpoint($break-sm) {
      width: 100%;
    }
    @include breakpoint($break-xs) {
      width: 100%;
    }
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
  width: 100%;
  font-size: 22px;
  font-weight: 600;
  text-align: left;
  margin: 0;

  @include breakpoint($break-sm) {
    width: 99%;
    font-size: 20px;
    margin-left: 1%;
  }
}

.nft-description {
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: left;
  margin: 20px 0;

  @include breakpoint($break-sm) {
    width: 99%;
    font-size: 20px;
    margin-left: 1%;
  }
}

.nft-floor {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  margin-bottom: 8px;

  .nft-floor-source {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    width: 30px;
    height: 30px;
    background: $black;
    border-radius: 50%;

    img,
    svg {
      width: 22px;
      height: auto;
      background: transparent;
      object-fit: contain;
      overflow: hidden;
    }
  }

  .nft-floor-amount {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 24px;
    font-weight: 600;

    .nft-floor-amount-icon {
      width: 20px;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      align-items: center;
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

.nft-ranking {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  align-items: flex-end;

  .nft-rarity {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: normal;
    text-transform: uppercase;
    margin-bottom: 6px;

    .grey-label {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
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
      background: transparent;
      font-size: 14px;
      font-weight: bold;
      padding-inline: 8px;
      padding-top: 1px;
      padding-bottom: 1px;
      --badge-color: $grey-40;
      box-shadow: none;
      border: 1.5px solid $black;
      border-image: initial;
      transition: background-color 0.2s ease-out 0s;
    }
  }

  .nft-rarityRank {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 6px 12px 6px 0;

    .grey-label {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
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
      font-weight: bold;
      padding-inline: 8px;
      padding-top: 1px;
      padding-bottom: 1px;
      --badge-color: $grey-40;
      box-shadow: none;
      border: 1.5px solid $black;
      border-image: initial;
    }
  }
}

.nft-tab-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: flex-start;
  margin: 8px 0 0 0;
  padding: 0;

  @include breakpoint($break-sm) {
    justify-content: center;
  }

  .nft-tab-switcher {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0 12px 0 0;
    padding: 4px 4px 2px;
    border-bottom: 2px solid transparent;
    transition: all 0.5s linear;
    cursor: pointer;

    &:hover,
    &:focus,
    &:focus-visible,
    &:active {
      border-bottom: 2px solid $grasp-cyan;
    }

    @include breakpoint($break-sm) {
      margin: 0 4px;
    }
  }
  .nft-tab-switcher.active {
    border-bottom: 2px solid $grasp-cyan;
  }
}

.token-details {
  width: 96%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: flex-start;
  color: $black;
  background: $white;
  border-radius: 12px;
  border: 1px solid rgb(69, 73, 77);
  font-size: 14px;
  font-weight: normal;
  padding: 20px;
  margin: 20px 0 8px;

  h4 {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
}

.nft-token-detail {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: flex-start;

  .grey-label {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: $black;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
    text-align: left;
  }

  .nft-token-detail-value {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: $grey-100;
    font-size: 14px;
    font-weight: 500;
    text-align: right;
    text-decoration: none;
    margin-right: 8px;
  }
}
.nft-token-detail-bold {
  font-weight: 600;
}
</style>
