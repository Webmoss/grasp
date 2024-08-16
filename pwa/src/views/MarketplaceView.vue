<template>
  <section id="marketplace">
    <div class="main">
      <MarketplacesBanner />
      <section id="page">
        <div v-if="showFilter" class="left">
          <MarketplaceSidebarIntro :collection="collection" />
          <MarketplaceSidebar
            :attributes="attributes"
            @update-attribute="updateAttributeSidebar"
          />
        </div>
        <div class="right">
          <MarketplaceSearch />
          <MarketplacesList v-if="tokens && tokens.length > 0" :marketplace="tokens" />
          <MarketplacesNoReults v-else-if="!tokens && !loading" />
          <MarketplacesPagination
            v-if="marketplace && marketplace.length > 0"
            :pagination="pagination"
            :total="tokensTotal"
            :last-page="lastPage"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { tokenWrapperObject } from "@/models/tokenWrapper";
import { attributeSidebarObject } from "src/models/attributeSidebar";

/* Components */
import MarketplacesBanner from "@/components/MarketplaceComponents/MarketplacesBanner.vue";
import MarketplaceSidebarIntro from "@/components/MarketplaceComponents/MarketplaceSidebarIntro.vue";
import MarketplaceSidebar from "@/components/MarketplaceComponents/MarketplaceSidebar.vue";
import MarketplaceSearch from "@/components/MarketplaceComponents/MarketplaceSearch.vue";
import MarketplacesList from "@/components/MarketplaceComponents/MarketplacesList.vue";
import MarketplacesNoReults from "@/components/MarketplaceComponents/MarketplacesNoReults.vue";
import MarketplacesPagination from "@/components/MarketplaceComponents/MarketplacesPagination.vue";

/* Init Pinia Store Values and Methods */
const route = useRoute();
const store = useStore();

const { loading, showFilter, filter, pagination, marketplace } = storeToRefs(store);

const attributes = ref();
const contract = ref();
const collection = ref();
const tokens = ref([]);
const tokensTotal = ref();
const lastPage = ref();

// const total = computed(() => {
//   return marketplace.value ? marketplace.value.length : 0;
// });

/* Get Collection Attributes for Sidebar */
async function fetchAttributes() {
  try {
    const attributesList = await store.retrieveAllAttributes(contract.value);
    const updatedArray = attributesList.map((element: object) => ({
      ...element,
      isDropped: false,
    }));
    attributes.value = updatedArray;
  } catch (error) {
    console.log(error);
  }
}

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
    collection.value = collectionData.collection;
  } catch (error) {
    console.log("Error :", error);
  }
}

/* Get Collection Tokens/NFTs */
async function fetchNfts() {
  try {
    const tokenResults = await store.retrieveTokens(
      contract.value,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      filter.value.rarity_min_input,
      filter.value.rarity_max_input,
      filter.value.price_min_input,
      filter.value.price_max_input,
      0,
      pagination.value.sortBy,
      pagination.value.sortDirection,
      null,
      pagination.value.limit,
      "false",
      "true",
      "false",
      "false",
      "false",
      "false",
      pagination.value.continuation ? pagination.value.continuation : null,
      null
    );

    if (tokenResults && tokenResults.nfts) {
      /* Load our NFT Token results */
      tokens.value = tokenResults.nfts;
      tokensTotal.value = tokenResults.nfts.length;
      lastPage.value = tokenResults.nfts.length / pagination.value.limit;
      console.log("Last Page", lastPage.value);

      /* Set next continuation results */
      if (tokenResults.continuation) {
        store.setContinuation(tokenResults.continuation);
      }

      console.log("route name", route.params.name);
      /* 3. Load our Store Collection */
      switch (route.params.name) {
        case "tinytap":
          store.addTinytapTokens(tokenResults.nfts as tokenWrapperObject[]);
          break;
        case "publisher":
          store.addPublisherTokens(tokenResults.nfts as tokenWrapperObject[]);
          break;
        default:
          break;
      }
    }
    store.setLoading(false);
  } catch (error) {
    console.log("Error :", error);
    store.setLoading(false);
  }
}

/* Find our Object index in Sidebar Attributes Array */
function updateAttributeSidebar(value: string) {
  const index = attributes.value.findIndex((attribute: attributeSidebarObject) => {
    return attribute.key === value;
  });
  attributes.value[index].isDropped = !attributes.value[index].isDropped;
}

onBeforeMount(async () => {
  /* 1. Load our Contract to Query based on Collection param in URL */
  switch (route.params.name) {
    case "tinytap":
      contract.value = process.env.VUE_APP_TINYTAP_CONTRACT_ADDRESS;
      break;
    case "publisher":
      contract.value = process.env.VUE_APP_PUBLISHER_SEASON_2_CONTRACT_ADDRESS;
      break;
    default:
      contract.value = "";
      break;
  }
  /* 2. Query by Contract with Sanity check for a Route Param Name */
  if (contract.value) {
    await fetchCollections();
    await fetchAttributes();
    await fetchNfts();
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#marketplace {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $cream;

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

      .right {
        width: 100%;
        height: 100%;
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
  }
}
</style>
