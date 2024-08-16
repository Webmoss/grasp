<template>
  <div class="nft-view-row">
    <div
      v-if="attributes"
      class="column width-100 flex-start justify-start align-start"
    >
      <div class="nft-attributes">
        <template v-for="attr in attributes" :key="attr.key">
          <div v-if="attr.key !== 'ApeCoin Staked'" class="nft-attribute-card">
            <div class="nft-attribute-card-trait">
              <span class="nft-attribute-card-trait-label">{{ attr.key }}</span>
              <span class="nft-attribute-card-trait-value">
                {{ attr.value }}</span
              >
            </div>
            <div class="nft-attribute-card-trait">
              <span class="nft-attribute-card-trait-label">Count</span>
              <span class="nft-attribute-card-trait-value"
                >{{ attr.tokenCount / 1000 }}%</span
              >
            </div>
            <div v-if="attr.floorAskPrice" class="nft-attribute-card-trait">
              <span class="nft-attribute-card-trait-label">Floor</span>
              <div class="nft-attribute-card-floor">
                {{ attr.floorAskPrice ? attr.floorAskPrice : "" }}
                <div v-if="market" class="currency-icon">
                  <img
                    v-if="market.floorAsk.price.currency.symbol === 'EDU'"
                    src="@/assets/svgs/EduCoin.svg"
                  />
                  <img
                    v-else-if="market.floorAsk.price.currency.symbol === 'WETH'"
                    src="@/assets/images/logos/WETH.png"
                  />
                  <img
                    v-else
                    src="@/assets/images/logos/eth-diamond-white.svg"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="nft-attribute-card-trait">
              <strong>Top Bid Value: {{ attr.topBidValue }}</strong>
            </div> -->
            <!-- <div class="nft-attribute-card-trait">
              <strong>Created At: {{ attr.createdAt }}</strong>
            </div> -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from "vue";
  import { attributeObject } from "@/models/attribute";
  import { tokenMarketObject } from "@/models/tokenMarket";
  defineProps({
    attributes: {
      type: Array<attributeObject>,
      default: null,
      required: false,
    },
    market: {
      type: Object as PropType<tokenMarketObject>,
      default: null,
    },
  });
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .nft-attributes {
    width: 97%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    align-content: center;
    justify-content: center;
    align-items: flex-start;
    margin: 20px 0 0 0;

    .nft-attribute-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: center;
      align-items: flex-start;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
      color: $white;
      background: $black;
      border-radius: 12px;
      border: 1px solid rgb(69, 73, 77);
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      padding: 10px 15px;

      .nft-attribute-card-trait {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        align-items: flex-start;
        margin-bottom: 2px;

        .nft-attribute-card-trait-label {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          align-items: center;
          color: $grey-50;
          font-size: 12px;
          text-transform: uppercase;
        }
        .nft-attribute-card-trait-value {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          align-items: center;
          text-align: right;
        }

        .nft-attribute-card-floor {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          align-items: center;

          .currency-icon {
            width: 14px;
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
            }
          }
        }
      }
    }
  }
</style>
