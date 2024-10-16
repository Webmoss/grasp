<template>
  <section id="nft">
    <div class="main">
      <MarketplacesBanner />
      <section id="page">
        <div class="left">
          <MarketplaceSidebarIntro :collection="collection" />
          <section id="footer">
            <SidebarSponsors />
            <SidebarCollections />
            <SidebarIntro />
          </section>
        </div>
        <div class="right">
          <NFTView />
        </div>
        <section id="mobile-footer">
          <SidebarSponsors />
          <SidebarCollections />
          <SidebarIntro />
        </section>
      </section>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { collectionObject } from "src/models/collection";

/* Components */
import MarketplacesBanner from "@/components/Marketplace/MarketplacesBanner.vue";
import MarketplaceSidebarIntro from "@/components/Marketplace/MarketplaceSidebarIntro.vue";
import SidebarIntro from "@/components/Sidebar/SidebarIntro.vue";
import SidebarCollections from "@/components/Sidebar/SidebarCollections.vue";
import SidebarSponsors from "@/components/Sidebar/SidebarSponsors.vue";
import NFTView from "@/components/NFT/NFTView.vue";

/* Init Pinia Store Values and Methods */
const route = useRoute();
const store = useStore();

const { pagination } = storeToRefs(store);

/* Open Campus Education NFT Contract Addresses */
const tinytapAddress = process.env.VUE_APP_TINYTAP_CONTRACT_ADDRESS;
/* Open Campus Season 2 Publisher NFT */
const publisherAddress = process.env.VUE_APP_PUBLISHER_SEASON_2_CONTRACT_ADDRESS;

const tinytapContractAddress = tinytapAddress?.toLowerCase();
const publisherContractAddress = publisherAddress?.toLowerCase();

const collection = ref();
const contract = ref();

/* Get Collection Data */
async function fetchCollections() {
  try {
    const collectionData = await store.retrieveCollections(
      contract.value,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "false",
      "false",
      "false",
      "false",
      "false",
      pagination.value.sortBy,
      pagination.value.limit,
      pagination.value.continuation ? pagination.value.continuation : null,
      null
    );
    collection.value = collectionData.collection as collectionObject;
  } catch (error) {
    console.log("Error :", error);
  }
}

/* Get Polygon Collection Data */
async function fetchPolygonCollections() {
  try {
    const collectionData = await store.retrievePolygonCollections(contract.value);
    collection.value = collectionData.collection as collectionObject;
  } catch (error) {
    console.log("Error fetching Polygon Collection :", error);
  }
}

onMounted(async () => {
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
  /* 2. Query by Contract with Sanity check for a Route Param Name */
  if (route.params.collection === "publisher") {
    await fetchPolygonCollections();
  } else {
    await fetchCollections();
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#nft {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $white;

  .main {
    max-width: $max-width;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;

    section#page {
      width: 100%;
      height: calc(100vh - 40px);
      display: flex;
      flex-direction: row;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: space-between;
      margin: 0;
      padding: 0;

      @include breakpoint($break-sm) {
        height: auto;
        flex-direction: column;
        justify-content: flex-start;
        overflow: visible;
      }

      .left {
        width: 20%;
        min-width: 280px;
        height: inherit;
        display: flex;
        flex-direction: column;
        align-content: center;
        padding: 10px 20px 0 0;

        @include breakpoint($break-sm) {
          width: 96%;
          height: auto;
          padding: 2%;
          overflow: visible;
        }
      }

      section#footer {
        display: flex;
        height: inherit;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        @include breakpoint($break-sm) {
          display: none !important;
        }
      }

      .right {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        justify-content: flex-start;
        padding: 0 1% 1% 1%;

        @include breakpoint($break-sm) {
          width: 96%;
          padding: 2%;
          height: auto;
          justify-content: flex-start;
          align-content: flex-start;
          align-items: flex-start;
        }
      }
    }
    section#mobile-footer {
      display: none;
      @include breakpoint($break-sm) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 96%;
        padding: 2%;
        overflow: visible;
      }
    }
  }
}
</style>
