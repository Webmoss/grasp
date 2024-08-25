<template>
  <div class="card">
    <NftTokenView v-if="nftView.token" :token="nftView" />
    <NftViewResultsLoading v-if="!nftView.token && loading" />
    <NftViewNoResults v-else-if="!nftView.token && !loading" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { tokenWrapperObject } from "@/models/tokenWrapper";

/* Components */
import NftTokenView from "@/components/NFT/NftTokenView.vue";
import NftViewNoResults from "@/components/NFT/NftViewNoResults.vue";
import NftViewResultsLoading from "@/components/NFT/NftViewResultsLoading.vue";

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

const lastTokenId = ref(route.params.id);

const tokenIdParam = computed(() => {
  return route.params.id as string;
});

const shouldGetData = computed(() => {
  return tokenIdParam.value !== lastTokenId.value;
});

async function fetchNft() {
  store.setLoading(true);
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

    // if (tokenResult && tokenResult.nfts) {
      store.addNftView(tokenResult.nfts[0] as tokenWrapperObject);
    // }
    store.setLoading(false);
  } catch (error) {
    console.log("Error fetching NFT data", error);
    store.setLoading(false);
  }
}

async function fetchPolygonNft() {
  store.setLoading(true);
  try {
    const tokenResult = await store.retrievePolygonToken(
      contract.value,
      tokenId.value,
    );

    // console.log("Token", tokenResult.nfts[0].token);
    // console.log("Market", tokenResult.nfts[0].market);
    // console.log("Updated", tokenResult.nfts[0].updatedAt);

    // if (tokenResult && tokenResult.nfts) {
      store.addNftView(tokenResult.nfts[0] as tokenWrapperObject);
    // }
    store.setLoading(false);
  } catch (error) {
    console.log("Error fetching NFT data from Polygon", error);
    store.setLoading(false);
  }
}

async function fetchData() {
 /* 1. Load our Contract to Query based on Collection param in URL */
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
  /* 2. Set our NFT Token Id */
  tokenId.value = route.params.id;
  /* 3. Query by Contract with Sanity check for a Route Param Name */
  if (route.params.collection === "publisher") {
    await fetchPolygonNft();
  } else {
    await fetchNft();
  }
}

watch(shouldGetData, (newValue) => {
  if (newValue) {
    fetchData();
  }
  lastTokenId.value = tokenIdParam.value as string;
});

onMounted(async () => {
  await fetchData();
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
