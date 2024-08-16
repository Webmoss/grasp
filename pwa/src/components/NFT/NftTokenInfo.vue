<template>
  <div class="nft-view-row">
    <div class="column width-100">
      <div class="token-details">
        <h4>Info</h4>
        <div v-if="token && token.token.collection" class="nft-token-detail">
          <span class="grey-label">Collection</span>
          <span class="nft-token-detail-value">
            {{ token.token.collection.name }}
          </span>
        </div>
        <div v-if="token && token.token.tokenId" class="nft-token-detail">
          <span class="grey-label">Token Id</span>
          <span class="nft-token-detail-value">
            {{ token.token.tokenId }}
          </span>
        </div>
        <div v-if="token && token.token.kind" class="nft-token-detail">
          <span class="grey-label">Token Standard</span>
          <span class="nft-token-detail-value">
            {{ token.token.kind }}
          </span>
        </div>
        <div v-if="token && token.token.contract" class="nft-token-detail">
          <span class="grey-label">Contract</span>
          <span class="nft-token-detail-value">
            {{ token.token.contract }}
          </span>
        </div>
        <div v-if="token && token.token.isFlagged" class="nft-token-detail">
          <span class="grey-label">Is Flagged</span>
          <span class="nft-token-detail-value">
            {{ token.token.isFlagged }}
          </span>
        </div>
        <div
          v-if="token && token.token?.lastSale?.timestamp"
          class="nft-token-detail"
        >
          <span class="grey-label">Last Sale Date</span>
          <span class="nft-token-detail-value">
            {{
              moment(token.token.lastSale.timestamp).format(
                "Do M MMMM, h:mm:ss a"
              )
            }}
          </span>
        </div>
        <div
          v-if="
            token && token.token.lastSale && token.token.lastSale.feeBreakdown
          "
          class="nft-token-detail"
        >
          <span class="grey-label">Royalty</span>
          <span class="nft-token-detail-value">
            {{ token.token.lastSale.feeBreakdown }}
            {{ token.token.lastSale.feeBreakdown[0]?.bps }}<br />
            {{ token.token.lastSale.feeBreakdown[0]?.kind }}<br />
            {{ token.token.lastSale.feeBreakdown[0]?.rawAmount }}<br />
            {{ token.token.lastSale.feeBreakdown[0]?.recipient }}
          </span>
        </div>
        <div v-if="token && token.token.mint_date" class="nft-token-detail">
          <span class="grey-label">Mint Date</span>
          <span class="nft-token-detail-value">
            {{ moment(token.token.mint_date).format("Do M MMMM, h:mm:ss a") }}
          </span>
        </div>
        <div v-if="token && token.token.updated_date" class="nft-token-detail">
          <span class="grey-label">Updated</span>
          <span class="nft-token-detail-value">
            {{
              moment(token.token.updated_date).format("Do M MMMM, h:mm:ss a")
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import moment from "moment";

  defineProps({
    token: {
      type: Object,
      default: null,
      required: false,
    },
  });
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";
</style>
