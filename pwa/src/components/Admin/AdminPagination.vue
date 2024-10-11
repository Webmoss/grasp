<template>
  <div v-if="pagination" class="admin-pagination">
    <button class="admin-pagination-button" @click="setFirstPage(pagination.page)">
      <img src="../../assets/svgs/FirstPage.svg" />
    </button>
    <button class="admin-pagination-button" @click="setPreviuosPage(pagination.page)">
      <img src="../../assets/svgs/Left.svg" />
    </button>
    <div class="admin-pagination-page">
      {{ pagination.page }}
    </div>
    <button class="admin-pagination-button" @click="setNextPage(pagination.page)">
      <img src="../../assets/svgs/Right.svg" />
    </button>
    <button class="admin-pagination-button" @click="setLlastPage(pagination.page)">
      <img src="../../assets/svgs/LastPage.svg" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { useStore } from "@/store";
import { paginationObject } from "src/models/pagination";

const store = useStore();

export interface Props {
  pagination?: paginationObject;
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
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.admin-pagination {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 20px 0;
  padding: 0 0 10px 0;

  .admin-pagination-page {
    width: 24px;
    height: 100%;
    display: flex;
    flex-direction: row nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    color: $grey-90;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
  .admin-pagination-button {
    display: flex;
    flex-direction: row nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    color: $white;
    background-color: $grasp-blue;
    border-radius: 6px;
    border: 0.5px solid $grasp-blue;
    padding: 2px;
    margin: 0 2px;
    transition: all 0.5s linear;
    cursor: pointer;

    img {
      width: 24px;
      margin: 0 auto;
      @include breakpoint($break-sm) {
        width: 22px;
        margin: 0 auto;
      }
    }

    &:hover,
    &:active,
    &:focus,
    &:focus-visible {
      color: $grasp-cyan;
      border: 0.5px solid $white;
    }
  }
}
</style>
