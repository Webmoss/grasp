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
        <NftsList :nfts="nfts" />
        <NftsPagination
          :pagination="pagination"
          :total="total"
          :last-page="lastPage"
        />
      </div>
    </div>
    <!-- <NftModal :showModal="showModal" :lesson="{}" @close="showHideModal" /> -->
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, provide } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { metadataObject } from "src/models/metadata";

/* Components */
import SidebarView from "@/components/SidebarView.vue";
import NftSearch from "@/components/NftsComponents/NftSearch.vue";
import NftsList from "@/components/NftsComponents/NftsList.vue";
import NftsPagination from "@/components/NftsComponents/NftsPagination.vue";
// import NftModal from "@/components/NftsComponents/NftModal.vue";

/* All Posts stored in a JSON */
import testNfts from "../data/nfts.json";

const store = useStore();
const { nfts, pagination } = storeToRefs(store);

// const showModal = ref(false);
const lastPage = ref(0);

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

const total = computed(() => {
  return nfts.value ? nfts.value.length : 0;
});

// const showHideModal = () => {
//   showModal.value = !showModal.value;
// };

async function fetchNfts() {
  store.setNfts((testNfts.data as unknown) as metadataObject[]);
}

onBeforeMount(async () => {
  await fetchNfts();
});
</script>
