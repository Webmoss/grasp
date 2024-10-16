<template>
  <section id="creators">
    <div class="main">
      <CreatorsBanner />
      <CreatorsSearch />
      <CreatorsList :creators="paginatedCreators" />
      <Pagination
        :current-page="pagination.page"
        :last-page="lastPage"
        @page-changed="handlePageChange"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { userObject } from "@/models/user";
import { initialPagination } from "@/models/initialPagination";

/* Components */
import CreatorsBanner from "@/components/Creators/CreatorsBanner.vue";
import CreatorsSearch from "@/components/Creators/CreatorsSearch.vue";
import CreatorsList from "@/components/Creators/CreatorsList.vue";
import Pagination from "@/components/Filters/Pagination.vue";

/* All Posts stored in a JSON */
import testUsers from "../data/users.json";

const store = useStore();
const { pagination, filter } = storeToRefs(store);

const creators = ref(testUsers.data as unknown as userObject[]);

// Initialize pagination if not already set
if (!pagination.value.page) {
  pagination.value = initialPagination();
}

const filteredCreators = computed(() => {
  let result = creators.value;

  if (filter.value.search_term && filter.value.search_term !== '') {
    result = result.filter((creator) =>
      creator.name?.toLowerCase().includes(filter.value.search_term.toLowerCase())
    );
  }

  if (filter.value.search_types && filter.value.search_types.length > 0) {
    console.log("Search User Type", filter.value.search_types);
    result = result.filter((user) =>
      filter.value.search_types.includes(user.type)
    );
  }
  // Add more filters here if needed

  return result;
});

const lastPage = computed(() => Math.ceil(total.value / pagination.value.pageSize));
const total = computed(() => filteredCreators.value.length);

const paginatedCreators = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return filteredCreators.value.slice(start, end);
});

function handlePageChange(page: number) {
  pagination.value.page = page;
}

watch([filter, pagination], () => {
  pagination.value.page = 1;
}, { deep: true });

onMounted(() => {
  store.setCreators(creators.value);
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
