<template>
  <div v-if="collection" class="collection-intro">
    <div class="collection-header">
      <div class="collection-image">
        <img :src="collection.image" />
      </div>
      <div class="collection-header-text">
        <div class="collection-name">
          {{ collection.name }}
        </div>
        <div class="collection-floor-total">
          <span class="collection-floor-total-on-sale">On Sale</span>
          {{ collection.onSaleCount }}
        </div>
        <div class="collection-floor-total">
          <span class="collection-floor-total-on-sale">Owners</span>
          {{ collection.ownerCount }}
        </div>
        <div class="collection-floor-total">
          <span class="collection-floor-total-on-sale">Total</span>
          {{ collection.tokenCount.toLocaleString() }}
        </div>
        <div class="collection-social">
          <a
            v-if="collection.externalUrl"
            :href="collection.externalUrl"
            target="_blank"
            rel="nofollow"
            :alt="collection.name"
            ><img src="@/assets/svgs/link.svg" width="24"
          /></a>
          <a
            v-if="collection.twitterUsername"
            :href="`https://twitter.com/${collection.twitterUsername}`"
            target="_blank"
            rel="nofollow"
            :alt="collection.name"
            ><img src="@/assets/svgs/socials/twitter.svg" width="20"
          /></a>
          <a
            v-if="collection.discordUrl"
            :href="collection.discordUrl"
            target="_blank"
            rel="nofollow"
            :alt="collection.name"
            ><img src="@/assets/svgs/Discord.svg" width="24"
          /></a>
          <a
            v-if="collection.id"
            :href="`https://etherscan.io/address/${collection.id}`"
            target="_blank"
            rel="nofollow"
            :alt="collection.name"
            ><img src="@/assets/svgs/Etherscan.svg" width="19"
          /></a>
        </div>
        <div class="collection-trait-prices">
          <div class="collection-trait-floor">
            <div class="collection-trait-floor-amount">
              {{
                collection.floorAsk.price
                  ? collection.floorAsk.price?.amount.decimal.toFixed(2)
                  : 0
              }}
              <div class="collection-trait-floor-amount-icon">
                <img
                  v-if="collection.floorAsk.price?.currency.symbol === 'EDU'"
                  src="@/assets/svgs/EduCoin.svg"
                />
                <img
                  v-else-if="collection.floorAsk.price?.currency.symbol === 'WETH'"
                  src="@/assets/images/logos/WETH.png"
                />
                <img v-else src="@/assets/images/logos/eth-diamond-black.png" />
              </div>
            </div>
            <div class="collection-trait-floor-title">
              Floor
              <span
                :class="
                  collection.floorSaleChange['1day'] > 0
                    ? 'percent-green'
                    : 'percent-green'
                "
                >%{{ collection.floorSaleChange["1day"].toFixed(2) }}</span
              >
            </div>
          </div>
          <div class="collection-trait-volume">
            <div class="collection-trait-volume-amount">
              {{ (collection.volume["1day"] / 1000).toFixed(1) }}K
              <div class="collection-trait-volume-amount-icon">
                <img
                  v-if="collection.floorAsk.price?.currency.symbol === 'EDU'"
                  src="@/assets/svgs/EduCoin.svg"
                />
                <img
                  v-else-if="collection.floorAsk.price?.currency.symbol === 'WETH'"
                  src="@/assets/images/logos/WETH.png"
                />
                <img v-else src="@/assets/images/logos/eth-diamond-black.png" />
              </div>
            </div>
            <div class="collection-trait-volume-title">
              Sales
              <span
                :class="
                  collection.floorSaleChange['1day'] > 0
                    ? 'percent-green'
                    : 'percent-green'
                "
                >%{{ collection.volumeChange["1day"].toFixed(2) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="collection-description">
      {{ collection.description }}
    </div> -->

    <!-- <div class="collection-total">
      Floor 7 day {{ collection.floorSale["7day"] }}<br />
      Change {{ collection.floorSaleChange["7day"].toLocaleString() }}
    </div>
    <div class="collection-total">
      Floor 30 day {{ collection.floorSale["30day"] }}
      <div class="currency-icon">
        <img
          v-if="collection.floorAsk.price?.currency.symbol === 'EDU'"
          src="@/assets/svgs/EduCoin.svg"
        />
        <img
          v-else-if="collection.floorAsk.price?.currency.symbol === 'WETH'"
          src="@/assets/images/logos/WETH.png"
        />
        <img v-else src="@/assets/images/logos/eth-diamond-black.png" />
      </div>
      <br />
      Change {{ collection.floorSaleChange["30day"].toLocaleString() }}
    </div>
    <div class="collection-total">
      Volume 7 day {{ collection.volume["7day"].toLocaleString() }}
      <div class="currency-icon">
        <img
          v-if="collection.floorAsk.price?.currency.symbol === 'EDU'"
          src="@/assets/svgs/EduCoin.svg"
        />
        <img
          v-else-if="collection.floorAsk.price?.currency.symbol === 'WETH'"
          src="@/assets/images/logos/WETH.png"
        />
        <img v-else src="@/assets/images/logos/eth-diamond-black.png" />
      </div>
      <br />
      Change {{ collection.volumeChange["7day"].toLocaleString() }}
    </div>
    <div class="collection-total">
      Volume 30 day {{ collection.volume["30day"].toLocaleString() }}
      <div class="currency-icon">
        <img
          v-if="collection.floorAsk.price?.currency.symbol === 'EDU'"
          src="@/assets/svgs/EduCoin.svg"
        />
        <img
          v-else-if="collection.floorAsk.price?.currency.symbol === 'WETH'"
          src="@/assets/images/logos/WETH.png"
        />
        <img v-else src="@/assets/images/logos/eth-diamond-black.png" />
      </div>
      <br />
      Change {{ collection.volumeChange["30day"].toLocaleString() }}
    </div> -->
  </div>
</template>
<script lang="ts" setup>
defineProps({
  collection: {
    type: Object,
    default: null,
    required: false,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.collection-intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  margin: 0;
  padding: 0;

  .collection-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    margin: 0;
    padding: 0;

    .collection-image {
      width: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;
      overflow: hidden;
      img {
        display: block;
        width: 90px;
        height: 90px;
        object-fit: cover;
        background: $black;
        border-radius: 50%;
        margin: 0 auto;
        padding: 0;
      }
    }

    .collection-header-text {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: flex-start;
      align-items: center;
      .collection-name {
        width: 100%;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $black;
        font-size: 16px;
        line-height: 22px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 5px;
      }

      .collection-floor-total {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $black;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 5px;

        .collection-floor-total-on-sale {
          color: $grey-60;
          text-transform: uppercase;
          margin-right: 4px;
        }
      }

      .collection-social {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;

        img,
        svg {
          margin: 0 6px;
          background: transparent;
          object-fit: contain;
          overflow: hidden;
        }
      }

      .collection-trait-prices {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin-bottom: 10px;

        .collection-trait-floor {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          align-items: center;

          .collection-trait-floor-amount {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
            align-items: center;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
              sans-serif;
            color: $black;
            font-size: 22px;
            font-weight: 600;
            text-decoration: none;

            .collection-trait-floor-amount-icon {
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
                margin-bottom: -1px;
              }
            }
          }
          .collection-trait-floor-title {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
            align-items: flex-end;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
              sans-serif;
            color: $grey-60;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            text-transform: uppercase;
            padding: 4px 0 0;
          }
        }
        .collection-trait-volume {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          align-items: center;

          .collection-trait-volume-amount {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
            align-items: center;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
              sans-serif;
            color: $black;
            font-size: 22px;
            font-weight: 600;
            text-decoration: none;

            .collection-trait-volume-amount-icon {
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
                margin-bottom: -1px;
              }
            }
          }
          .collection-trait-volume-title {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
            align-items: flex-end;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
              sans-serif;
            color: $grey-60;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            text-transform: uppercase;
            padding: 4px 0 0;
          }
        }
        .percent-green {
          color: $grasp-blue;
          font-size: 12px;
          font-weight: 600;
          margin-left: 4px;
          margin-bottom: 1px;
        }
        .percent-red {
          color: $grasp-orange;
          font-size: 12px;
          font-weight: 600;
          margin-left: 4px;
          margin-bottom: 1px;
        }
      }
    }
  }

  .collection-total {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: $black;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
  }

  .collection-description {
    color: $black;
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 5px;
  }

  .currency-icon {
    width: 12px;
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
</style>
