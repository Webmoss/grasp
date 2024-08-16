<template>
  <div class="row margin-top-20 margin-bottom-20">
    <div class="column width-100">
      <h2 class="width-100 padding-left-10">Pairs</h2>
      <div class="matched-items">
        <!-- BAYC PAIRED NFT Shown for BAKC -->
        <div v-if="baycPairedNft" class="match-box">
          <div class="matched-nft">
            <div
              v-if="baycPairedNft.metadata && baycPairedNft.metadata.image"
              class="matched-nft-image"
            >
              <img :src="getUrlProtocol(baycPairedNft.metadata.image)" />
              <NftChain :chain="baycPairedNft.chain" />
            </div>
            <div
              v-else-if="baycPairedNft && baycPairedNft.cached_file_url"
              class="matched-nft-image"
            >
              <img :src="getUrlProtocol(baycPairedNft.cached_file_url)" />
              <NftChain :chain="baycPairedNft.chain" />
            </div>
            <div
              v-else-if="baycPairedNft.file_url && baycPairedNft.file_url"
              class="matched-nft-image"
            >
              <img :src="getUrlProtocol(baycPairedNft.file_url)" />
              <NftChain :chain="baycPairedNft.chain" />
            </div>
            <div v-if="baycPairedNft.token_id" class="matched-nft-title">
              BAYC #{{ baycPairedNft.token_id }}&nbsp;{{
                baycPairedNft.metadata.name
                  ? baycPairedNft.metadata.name
                  : baycPairedNft.metadata.title
                  ? baycPairedNft.metadata.title
                  : ""
              }}
            </div>
          </div>
        </div>
        <!-- MAYC PAIRED NFT for BAKC -->
        <div v-if="maycPairedNft" class="match-box">
          <div class="matched-nft">
            <div
              v-if="maycPairedNft.metadata && maycPairedNft.metadata.image"
              class="matched-nft-image"
            >
              <img :src="getUrlProtocol(maycPairedNft.metadata.image)" />
              <NftChain :chain="maycPairedNft.chain" />
            </div>
            <div
              v-else-if="maycPairedNft && maycPairedNft.cached_file_url"
              class="matched-nft-image"
            >
              <img :src="getUrlProtocol(maycPairedNft.cached_file_url)" />
              <NftChain :chain="maycPairedNft.chain" />
            </div>
            <div
              v-else-if="maycPairedNft.file_url && maycPairedNft.file_url"
              class="matched-nft-image"
            >
              <img :src="getUrlProtocol(maycPairedNft.file_url)" />
              <NftChain :chain="maycPairedNft.chain" />
            </div>
            <div v-if="maycPairedNft.token_id" class="matched-nft-title">
              MAYC #{{ maycPairedNft.token_id }}&nbsp;{{
                maycPairedNft.metadata.name
                  ? maycPairedNft.metadata.name
                  : maycPairedNft.metadata.title
                  ? maycPairedNft.metadata.title
                  : ""
              }}
            </div>
          </div>
        </div>
        <!-- BAKC PAIRED NFT Shown for BAYC & MAYC -->
        <div v-if="bakcPairedNft" class="match-box">
          <div class="matched-nft">
            <div
              v-if="bakcPairedNft.metadata && bakcPairedNft.metadata.image"
              class="matched-nft-image"
            >
              <img :src="getUrlProtocol(bakcPairedNft.metadata.image)" />
              <NftChain :chain="bakcPairedNft.chain" />
            </div>
            <div
              v-else-if="bakcPairedNft && bakcPairedNft.cached_file_url"
              class="matched-nft-image"
            >
              <img :src="getUrlProtocol(bakcPairedNft.cached_file_url)" />
              <NftChain :chain="bakcPairedNft.chain" />
            </div>
            <div
              v-else-if="bakcPairedNft.file_url && bakcPairedNft.file_url"
              class="matched-nft-image"
            >
              <img :src="getUrlProtocol(bakcPairedNft.file_url)" />
              <NftChain :chain="bakcPairedNft.chain" />
            </div>
            <div v-if="bakcPairedNft.token_id" class="matched-nft-title">
              BAKC #{{ bakcPairedNft.token_id }}&nbsp;{{
                bakcPairedNft.metadata.name
                  ? bakcPairedNft.metadata.name
                  : bakcPairedNft.metadata.title
                  ? bakcPairedNft.metadata.title
                  : ""
              }}
            </div>
          </div>
        </div>
        <!-- END BAKC PAIRED NFTs -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from "vue";
  import { tokenObject } from "@/models/token";
  import { getUrlProtocol } from "@/services/helpers";

  import NftChain from "../NFT/NftChain.vue";

  export interface Props {
    baycPairedNft?: tokenObject;
    maycPairedNft?: tokenObject;
    bakcPairedNft?: tokenObject;
  }

  defineProps({
    baycPairedNft: {
      type: Object as PropType<tokenObject>,
      default: null,
    },
    maycPairedNft: {
      type: Object as PropType<tokenObject>,
      default: null,
    },
    bakcPairedNft: {
      type: Object as PropType<tokenObject>,
      default: null,
    },
  });
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .matched-items {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    padding: 0;

    @include breakpoint($break-sm) {
      flex-direction: column;
    }

    .match-box {
      // width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-start;

      @include breakpoint($break-sm) {
        width: 80%;
        margin: 10px auto;
      }

      h3,
      h4 {
        color: $black;
        width: 100%;
        text-align: center;
        font-size: 20px;
      }

      h4 {
        font-size: 18px;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
      }

      .matched-nft {
        display: inline;
        float: left;
        box-sizing: border-box;
        width: 340px;
        background: #f4f4f4;
        border: 2px solid #f4f4f4;
        border-radius: 12px;
        margin: 0 20px 0 10px;
        padding: 0 0 4px 0;
        transition: all 0.5s linear;
        cursor: pointer;
        overflow: hidden;

        @include breakpoint($break-md) {
          width: 340px;
        }
        @include breakpoint($break-sm) {
          width: 100%;
        }
        @include breakpoint($break-xs) {
          width: 100%;
          margin: 0 auto 20px;
        }

        .matched-nft-image {
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
            @include breakpoint($break-md) {
              width: 340px;
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
            top: 8px;
            left: 8px;

            img,
            svg {
              width: 12px !important;
              height: auto;
              background: transparent;
              object-fit: contain;
              overflow: hidden;
            }
          }
        }

        .matched-nft-title {
          color: $black;
          width: 100%;
          font-size: 14px;
          font-weight: normal;
          text-transform: uppercase;
          text-align: center;
          margin: 10px 0 0 0;
        }

        .matched-nft-description {
          color: $black;
          width: 100%;
          font-size: 12px;
          font-weight: normal;
          text-align: center;
          margin: 0;
        }
      }

      img {
        display: block;
        object-fit: cover;
        background: $black;
        border-radius: 12px;
        padding: 0;
        margin: 0 auto;
      }
    }
  }
</style>
