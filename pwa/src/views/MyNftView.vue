<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">NFT Title: {{ nft.title ? nft.title : "" }}</div>
          <div class="title-actions">
            <button class="back-button">Back</button>
            <button class="create-button">Edit</button>
          </div>
        </div>
        <p>Update your NFT content, details and settings.</p>
      </div>
      <div class="line-divider"></div>
      <div class="nft-date">
        <span class="nft-date-label">Date:</span>
        {{ nft.mint_date ? nft.mint_date : "" }}
      </div>
      <div class="nft-description">
        {{ nft.description ? nft.description : "" }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

/* Components */
import SidebarView from "@/components/SidebarView.vue";

/* All Posts stored in a JSON */
import testNfts from "../data/nfts.json";

const store = useStore();
const route = useRoute();
const { nft } = storeToRefs(store);

async function fetchNft() {
  let filteredNft = testNfts.data.filter((nft) => {
    return nft.id === route.params.id;
  });
  store.setCourse(filteredNft[0] as any);
}

onBeforeMount(async () => {
  await fetchNft();
});
</script>

<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.nft-date {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  margin: 0 0 16px 0;

  .nft-date-label {
    color: $grey-90;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
  }
}

.nft-description {
  width: 100%;
  color: $black;
  font-size: 15px;
  font-weight: normal;
  text-align: left;
  margin: 0;
}

.line-divider {
  width: 99%;
  margin: 16px auto;
  border-bottom: 1px solid $grey-30;
}
</style>
