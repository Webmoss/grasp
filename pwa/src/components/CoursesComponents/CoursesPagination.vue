<template>
  <div v-if="pagination" class="courses-pagination">
    <button
      class="courses-pagination-button"
      @click="setFirstPage(pagination.page)"
    >
      <img src="@/assets/svgs/FirstPage.svg" />
    </button>
    <button
      class="courses-pagination-button"
      @click="setPreviuosPage(pagination.page)"
    >
      <img src="@/assets/svgs/Left.svg" />
    </button>
    <div class="courses-pagination-page">
      {{ pagination.page }}
    </div>
    <button
      class="courses-pagination-button"
      @click="setNextPage(pagination.page)"
    >
      <img src="@/assets/svgs/Right.svg" />
    </button>
    <button
      class="courses-pagination-button"
      @click="setLlastPage(pagination.page)"
    >
      <img src="@/assets/svgs/LastPage.svg" />
    </button>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from "vue";
  import { useStore } from "@/store";
  import { paginationObject } from "@/models/pagination";

  const store = useStore();

  export interface Props {
    pagination?: object;
  }

  const props = defineProps({
    pagination: {
      type: Object as PropType<paginationObject>,
      default: null,
    },
    total: {
      type: Number,
      default: null,
    },
    lastPage: {
      type: Number,
      default: null,
    },
  });

  async function setFirstPage(page: number) {
    if (page !== 1) {
      store.setPage(1);
    }
  }

  async function setPreviuosPage(page: number) {
    const firstPageCheck = page - 1;
    if (firstPageCheck > 1) {
      store.setPage(page - 1);
    }
  }

  async function setNextPage(page: number) {
    const lastPageCheck = page + 1;
    if (lastPageCheck < props.lastPage) {
      store.setPage(page + 1);
    }
  }

  async function setLlastPage(page: number) {
    if (page !== props.lastPage) {
      store.setPage(props.lastPage);
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .courses-pagination {
    width: 100%;
    display: flex;
    flex-direction: row nowrap;
    justify-content: center;
    align-content: center;
    align-items: flex-end;
    margin: 10px 0 0 0;
    padding: 0;
    .courses-pagination-page {
      width: 24px;
      height: 100%;
      display: flex;
      flex-direction: row nowrap;
      justify-content: center;
      align-content: center;
      align-items: center;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
      color: $white;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
    .courses-pagination-button {
      color: $white;
      display: flex;
      flex-direction: row nowrap;
      justify-content: center;
      align-content: center;
      align-items: center;
      padding: 8px 4px;

      img {
        width: 24px;
        margin: 0 auto;
        @include breakpoint($break-ssm) {
          width: 22px;
          margin: 0 auto;
        }
      }
    }
  }
</style>
