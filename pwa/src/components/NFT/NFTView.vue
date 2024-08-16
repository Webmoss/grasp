<template>
  <div class="card">
    <NftTokenView v-if="nftView.token" :token="nftView" :collection="collection" />
    <NftViewNoResults v-else-if="!nftView.token && !loading" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { tokenWrapperObject } from "@/models/tokenWrapper";

/* Components */
import NftTokenView from "@/components/NFT/NftTokenView.vue";
import NftViewNoResults from "@/components/NFT/NftViewNoResults.vue";

const route = useRoute();
const store = useStore();

const { account, nftView, loading } = storeToRefs(store);

/* Open Campus Education NFT Contract Addresses */
const tinytapAddress = process.env.VUE_APP_TINYTAP_CONTRACT_ADDRESS;
const tinytapGoerliAddress = process.env.VUE_APP_TINYTAP_CONTRACT_GOERLIS_ADDRESS;

/* Open Campus Season 2 Publisher NFT */
const publisherAddress = process.env.VUE_APP_PUBLISHER_SEASON_2_CONTRACT_ADDRESS;
const publisherMumbaiAddress =
  process.env.VUE_APP_PUBLISHER_SEASON_2_MUMBAI_CONTRACT_ADDRESS;

/* DEV NOTE: This will switch our call to Goerli or Mumbai testnets for dev */
const tinytapContractAddress = process.env.VUE_APP_TINYTAP_CONTRACT_ADDRESS;
// process.env.VUE_APP_NODE_ENV === "development"
//   ? tinytapGoerliAddress?.toLowerCase()
//   : tinytapAddress?.toLowerCase();

const publisherContractAddress = process.env.VUE_APP_TINYTAP_CONTRACT_GOERLIS_ADDRESS;
// process.env.VUE_APP_NODE_ENV === "development"
//   ? publisherMumbaiAddress?.toLowerCase()
//   : publisherAddress?.toLowerCase();

const chainName = "ethereum";
// process.env.VUE_APP_NODE_ENV === "development" ? "goerli" : "ethereum";

const contract = ref();
const collection = ref("");
const tokenId = ref();
const tokenPoller = ref();

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

    console.log("Token", tokenResult.nfts[0].token);
    console.log("Market", tokenResult.nfts[0].market);
    console.log("Updated", tokenResult.nfts[0].updatedAt);

    if (tokenResult && tokenResult.nfts) {
      store.addNftView(tokenResult.nfts[0] as tokenWrapperObject);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

const polling = () =>
  (tokenPoller.value = setInterval(async () => {
    try {
      if (tokenId.value && contract.value) {
        console.log("Polling Now!");
        await fetchNft();
      }
    } catch (error) {
      console.log(error);
    }
  }, 30000));

onMounted(async () => {
  polling();
});

onBeforeMount(async () => {
  store.setLoading(true);
  tokenId.value = route.params.id;
  collection.value = route.params.collection as string;

  console.log("Token Id: ", tokenId.value);
  console.log("Collection: ", collection.value);

  /* 1. Load our Contract to Query */
  switch (collection.value) {
    case "tinytap":
      contract.value = tinytapContractAddress;
      break;
    case "publisher":
      contract.value = publisherContractAddress;
      break;
    default:
      contract.value = "";
      break;
  }

  store.setLoading(false);
});

onBeforeUnmount(() => {
  clearInterval(tokenPoller.value);
});
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.card {
  width: 94%;
  height: 94%;
  padding: 3% 3% 2% 3%;
  background: $black;
  border: 1px solid rgb(69, 73, 77, 0.4);
  border-radius: 12px;
  margin: 0 auto;
  overflow: scroll;

  @include breakpoint($break-sm) {
    height: auto;
    overflow: visible;
  }
}
</style>
