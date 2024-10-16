<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">My NFTs</div>
          <div class="title-actions">
            <!-- <button class="create-button" @click="showHideModal()">Create NFT</button> -->
            <!-- <button class="back-button">Back</button> -->
          </div>
        </div>
        <p>View a list of all your Education NFTs.</p>
      </div>
      <div class="main">
        <NftSearch />
        <NftsList :nfts="paginatedNfts" />
        <Pagination
          :current-page="pagination.page"
          :last-page="lastPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
    <!-- <NftModal :showModal="showModal" :lesson="{}" @close="showHideModal" /> -->
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, provide } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { metadataObject } from "src/models/metadata";
import { initialPagination } from "@/models/initialPagination";

/* Components */
import SidebarView from "@/components/SidebarView.vue";
import NftSearch from "@/components/Nfts/NftSearch.vue";
import NftsList from "@/components/Nfts/NftsList.vue";
import Pagination from "@/components/Filters/Pagination.vue";
// import NftModal from "@/components/Nfts/NftModal.vue";

/* All Posts stored in a JSON */
import testNfts from "../data/nfts.json";

const NotfyProvider = new Notyf({
  duration: 2000,
  position: {
    x: "center",
    y: "bottom",
  },
  types: [
    {
      type: "loading",
      background: "orange",
      duration: 0,
      dismissible: true,
      icon: {
        className: "icon icon-loading",
        tagName: "i",
      },
    },
    {
      type: "success",
      background: "green",
      duration: 20000,
      dismissible: true,
      icon: {
        className: "icon icon-success",
        tagName: "i",
      },
    },
    {
      type: "error",
      background: "indianred",
      duration: 10000,
      dismissible: true,
      icon: {
        className: "icon icon-error",
        tagName: "i",
      },
    },
  ],
});
provide("notyf", NotfyProvider);

const store = useStore();
const { pagination, filter } = storeToRefs(store);

const nfts = ref(testNfts.data as unknown as metadataObject[]);

// Initialize pagination if not already set
if (!pagination.value.page) {
  pagination.value = initialPagination();
}

const filteredNfts = computed(() => {
  let result = nfts.value;

  if (filter.value.search_term && filter.value.search_term !== '') {
    result = result.filter((nft) =>
      nft.name.toLowerCase().includes(filter.value.search_term.toLowerCase())
    );
  }

  // Add more filters here if needed

  return result;
});

const lastPage = computed(() => Math.ceil(total.value / pagination.value.pageSize));
const total = computed(() => filteredNfts.value.length);

const paginatedNfts = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return filteredNfts.value.slice(start, end);
});

function handlePageChange(page: number) {
  pagination.value.page = page;
}

watch([filter, pagination], () => {
  pagination.value.page = 1;
}, { deep: true });

onMounted(() => {
  store.setNfts(nfts.value);
});

</script>
