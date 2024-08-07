<template>
  <section id="courses">
    <div class="main">
      <MarketplacesBanner />
      <MarketplaceSearch />
      <MarketplacesList :marketplace="marketplace" />
      <MarketplacesPagination
        :pagination="pagination"
        :total="total"
        :last-page="lastPage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { metadataObject } from "src/models/metadata";

/* Components */
import MarketplacesBanner from "@/components/MarketplaceComponents/MarketplacesBanner.vue";
import MarketplaceSearch from "@/components/MarketplaceComponents/MarketplaceSearch.vue";
import MarketplacesList from "@/components/MarketplaceComponents/MarketplacesList.vue";
import MarketplacesPagination from "@/components/MarketplaceComponents/MarketplacesPagination.vue";

/* All Posts stored in a JSON */
import testNfts from "../data/nfts.json";

const store = useStore();
const { marketplace, pagination } = storeToRefs(store);

const lastPage = ref(1);

const total = computed(() => {
  return marketplace.value ? marketplace.value.length : 0;
});

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

section#courses {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $cream;

  .main {
    max-width: $max-width;
    width: 100%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 0;

    h1 {
      color: $grasp-blue;
      font-size: 38px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      margin: 0 0 10px 10px;

      img {
        width: 40px;
        margin-right: 8px;
        @include breakpoint($break-sm) {
          width: 40px;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .courses {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
