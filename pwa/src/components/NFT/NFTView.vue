<template>
  <div class="card">
    <NftTokenView v-if="nftView.token" :token="nftView" />
    <NftViewNoResults v-else-if="!nftView.token && !loading" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { tokenWrapperObject } from "@/models/tokenWrapper";

/* Components */
import NftTokenView from "@/components/NFT/NftTokenView.vue";
import NftViewNoResults from "@/components/NFT/NftViewNoResults.vue";

const route = useRoute();
const store = useStore();

const { nftView, loading } = storeToRefs(store);

/* Open Campus Education NFT Contract Addresses */
const tinytapAddress = process.env.VUE_APP_TINYTAP_CONTRACT_ADDRESS;
/* Open Campus Season 2 Publisher NFT */
const publisherAddress = process.env.VUE_APP_PUBLISHER_SEASON_2_CONTRACT_ADDRESS;

const tinytapContractAddress = tinytapAddress?.toLowerCase();
const publisherContractAddress = publisherAddress?.toLowerCase();

const contract = ref();
const tokenId = ref();

async function fetchNft() {
  try {
    const tokenResult = await store.retrieveToken(
      contract.value,
      null,
      null,
      null,
      null,
      tokenId.value,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      0,
      null,
      null,
      null,
      null,
      "true",
      "true",
      "false",
      "true",
      "true",
      "false",
      null,
      null
    );

    // console.log("Token", tokenResult.nfts[0].token);
    // console.log("Market", tokenResult.nfts[0].market);
    // console.log("Updated", tokenResult.nfts[0].updatedAt);

    if (tokenResult && tokenResult.nfts) {
      store.addNftView(tokenResult.nfts[0] as tokenWrapperObject);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

async function fetchPolygonNft() {
  try {
    const tokenResult = await store.retrievePolygonToken(
      contract.value,
      tokenId.value,
    );

    // console.log("Token", tokenResult.nfts[0].token);
    // console.log("Market", tokenResult.nfts[0].market);
    // console.log("Updated", tokenResult.nfts[0].updatedAt);

    if (tokenResult && tokenResult.nfts) {
      store.addNftView(tokenResult.nfts[0] as tokenWrapperObject);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

onBeforeMount(async () => {
  /* 1. Load our Contract to Query based on Collection param in URL */
  console.log("route.params.id", route.params.id);
  tokenId.value = route.params.id;
  console.log("route.params.collection", route.params.collection);
  switch (route.params.collection) {
    case "tinytap":
      contract.value = tinytapContractAddress;
      break;
    case "publisher":
      contract.value = publisherContractAddress;
      break;
    default:
      contract.value = tinytapContractAddress;
      break;
  }
  /* 2. Query by Contract with Sanity check for a Route Param Name */
  if (route.params.collection === "publisher") {
    await fetchPolygonNft();
  } else {
    await fetchNft();
  }
});
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.card {
  width: 94%;
  height: auto;
  padding: 30px;
  background: $black;
  border: 1px solid rgb(69, 73, 77, 0.4);
  border-radius: 12px;
  margin: 0 auto 20px;

  @include breakpoint($break-sm) {
    width: 96%;
    margin: 0 2%;
  }
}
</style>
