<template>
  <section id="marketplace">
    <div class="main">
      <MarketplacesBanner />
      <section id="page">
        <div v-if="showFilter" class="left">
          <MarketplaceSidebar
            :attributes="attributes"
            @update-attribute="updateAttributeSidebar"
          />
        </div>
        <div class="right">
          <MarketplaceSearch />
          <MarketplacesList :marketplace="marketplace" />
          <MarketplacesPagination
            v-if="marketplace && marketplace.length > 0"
            :pagination="pagination"
            :total="total"
            :last-page="lastPage"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { metadataObject } from "src/models/metadata";
import { attributeSidebarObject } from "src/models/attributeSidebar";

/* Components */
import MarketplacesBanner from "@/components/MarketplaceComponents/MarketplacesBanner.vue";
import MarketplaceSidebar from "@/components/MarketplaceComponents/MarketplaceSidebar.vue";
import MarketplaceSearch from "@/components/MarketplaceComponents/MarketplaceSearch.vue";
import MarketplacesList from "@/components/MarketplaceComponents/MarketplacesList.vue";
import MarketplacesPagination from "@/components/MarketplaceComponents/MarketplacesPagination.vue";

/* All Posts stored in a JSON */
import testNfts from "../data/nfts.json";

const store = useStore();
const { showFilter, marketplace, pagination } = storeToRefs(store);

const lastPage = ref(1);
const attributes = ref();

const total = computed(() => {
  return marketplace.value ? marketplace.value.length : 0;
});

/* Find our Object index in Sidebar Attributes Array */
function updateAttributeSidebar(value: string) {
  console.log("updateAttributeSidebar", value);

  const index = attributes.value.findIndex((attribute: attributeSidebarObject) => {
    return attribute.key === value;
  });
  attributes.value[index].isDropped = !attributes.value[index].isDropped;
}

async function fetchNfts() {
  store.setMarketplace((testNfts.data as unknown) as metadataObject[]);
}

onBeforeMount(async () => {
  await fetchNfts();
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
