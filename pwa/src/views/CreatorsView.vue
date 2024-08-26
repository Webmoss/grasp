<template>
  <section id="creators">
    <div class="main">
      <CreatorsBanner />
      <CreatorsSearch />
      <CreatorsList :creators="creators" />
      <CreatorsPagination
        :pagination="pagination"
        :total="total"
        :last-page="lastPage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { creatorObject } from "src/models/creator";

/* Components */
import CreatorsBanner from "../components/CreatorsComponents/CreatorsBanner.vue";
import CreatorsSearch from "../components/CreatorsComponents/CreatorsSearch.vue";
import CreatorsList from "../components/CreatorsComponents/CreatorsList.vue";
import CreatorsPagination from "../components/CreatorsComponents/CreatorsPagination.vue";

/* All Posts stored in a JSON */
import testCreators from "../data/creators.json";

const store = useStore();
const { creators, pagination, filter } = storeToRefs(store);

const lastPage = ref(1);
const lastSearchTerm = ref("");

const newSearchTerm = computed(() => {
  return filter.value.search_term;
});

const shouldGetData = computed(() => {
  return newSearchTerm.value !== lastSearchTerm.value;
});

const total = computed(() => {
  return creators.value ? creators.value.length : 0;
});

async function fetchCreators() {
  if(filter.value.search_term !== '') {
    let filteredCreators = testCreators.data.filter((creator) => {
      return creator.name.toLowerCase().includes(filter.value.search_term.toLowerCase());
    });
    store.setCreators((filteredCreators as unknown) as creatorObject[]);
  } else {
    store.setCreators((testCreators.data as unknown) as creatorObject[]);
  }
}

watch(shouldGetData, (newValue) => {
  if (newValue) {
    fetchCreators();
  }
  lastSearchTerm.value = newSearchTerm.value as string;
});

onBeforeMount(async () => {
  await fetchCreators();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#creators {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $white;

  .main {
    max-width: $max-width;
    width: 100%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 0;

    h1 {
      color: $grasp-blue;
      font-size: 34px;
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
  .creators {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
