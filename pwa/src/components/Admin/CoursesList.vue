<template>
  <div class="tab-box">
    <div class="box-header">{{ label }} Course Activity</div>
    <div class="box">
      <div class="box-value">
        <span class="box-label">From Date</span>
        {{ fromDate ? fromDate : "" }}
      </div>
      <div class="box-value">
        <span class="box-label">To Date</span>
        {{ toDate ? toDate : "" }}
      </div>
    </div>
    <AdminSearch />
    <div class="tab-box">
      <div class="list-item">
        <div class="list-item-box">
          <div class="list-item-header-date">Date</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-name">Full Name</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-organisation">Organisation</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-courses">Course</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-categories">Category</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-sales">Price</div>
        </div>
      </div>
      <template v-for="(transaction, index) in transactions" :key="index">
        <div class="list-item">
          <div class="list-item-box">
            <div class="list-item-date">
              <span class="list-item-index">{{ index + 1 }}.</span>
              {{
                transaction.date ? new Date(transaction.date).toLocaleDateString() : "-"
              }}
            </div>
          </div>
          <div class="list-item-box">
            <div class="list-item-name">
              {{ transaction.userName ? transaction.userName : "-" }}
            </div>
          </div>
          <div class="list-item-box">
            <div class="list-item-organisation">
              {{ transaction.orgName ? transaction.orgName : "-" }}
            </div>
          </div>
          <div class="list-item-box">
            <div class="list-item-courses">
              {{ transaction.courseTitle ? transaction.courseTitle : "-" }}
            </div>
          </div>
          <div class="list-item-sales">
            <div class="list-item-category">
              <span class="category-indicator">{{
                transaction.transactionType ? transaction.transactionType : ""
              }}</span>
            </div>
          </div>
          <div class="list-item-sales">
            <div class="sales">
              <span class="list-item-index">Price </span>
              <span class="sales-amount">
                <img src="../../assets/svgs/EduCoin.svg" />
                {{ transaction.price ? transaction.price.toFixed(2) : "0.00" }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <AdminPagination :pagination="pagination" :total="total" :last-page="lastPage" />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import type { Ref } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { transactionObject } from "src/models/transaction";
import AdminSearch from "@/components/Admin/AdminSearch.vue";
import AdminPagination from "@/components/Admin/AdminPagination.vue";

/* All Transactions stored in a JSON */
import testTransactions from "../../data/transactions.json";

const store = useStore();
const { transactions, pagination, filter } = storeToRefs(store);

const props = defineProps({
  label: {
    type: String,
    default: "Transaction",
  },
  orgId: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
    default: "",
  },
});

const lastPage: Ref<number> = ref(1);
const lastSearchTerm: Ref<string> = ref("");
const fromDate: Ref<string> = ref("");
const toDate: Ref<string> = ref("");

const newSearchTerm = computed(() => {
  return filter.value.search_term;
});

const shouldGetData = computed(() => {
  return newSearchTerm.value !== lastSearchTerm.value;
});

const total = computed(() => {
  return transactions.value ? transactions.value.length : 0;
});

const fetchTransactions = () => {
  console.log("filter.value.search_term", filter.value.search_term);

  let filteredTransactions = testTransactions.data.filter(
    (transaction) => transaction.courseTitle
  );

  if (props.orgId) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.orgId === props.orgId
    );
  }

  if (props.userId) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.userId === props.userId
    );
  }

  if (filter.value.search_term !== "") {
    filteredTransactions = filteredTransactions.filter((transaction) =>
      transaction.courseTitle
        .toLowerCase()
        .includes(filter.value.search_term.toLowerCase())
    );
  }
  store.setTransactions(filteredTransactions as transactionObject[]);
};

watchEffect(() => {
  if (filter.value.search_term !== lastSearchTerm.value) {
    fetchTransactions();
    lastSearchTerm.value = filter.value.search_term;
  }
});

onMounted(() => {
  fetchTransactions();
});
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.box-header {
  font-family: "Poppins", sans-serif;
  color: $grey-100;
  width: 99%;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin: 0 0 4px 8px;
}
.box {
  width: 99%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0 0 24px 0;
  padding: 12px 0 4px 12px;
}

.box-value {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;

  .box-label {
    width: 140px;
    display: inline-block;
    color: $grey-90;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
  }
}

.list-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0 0 8px 0;
  padding: 8px 0;
  transition: all 0.5s linear;

  .list-item-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;
    align-items: flex-start;
    padding: 0;

    .list-item-header-date {
      min-width: 96px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-100;
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      margin: 0;
      padding: 0 0 0 24px;
    }
    .list-item-date {
      min-width: 120px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 600;
      text-align: left;
      margin: 0;

      .list-item-index {
        color: $black;
        font-size: 12px;
        font-weight: 600;
        padding: 0 2px 0 12px;
      }
    }

    .list-item-header-name {
      width: 100%;
      min-width: 160px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-100;
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      margin: 0;
    }
    .list-item-name {
      width: 100%;
      min-width: 160px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
      margin: 0;
    }

    .list-item-header-organisation {
      width: 100%;
      min-width: 200px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-100;
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      margin: 0;
    }
    .list-item-organisation {
      width: 100%;
      min-width: 200px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
      margin: 0;
    }

    .list-item-header-courses {
      width: 100%;
      min-width: 120px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-100;
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      margin: 0;
    }
    .list-item-courses {
      width: 100%;
      min-width: 120px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
      margin: 0;
    }
  }

  .list-item-header-categories {
    width: 100%;
    min-width: 160px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    font-family: "Poppins", sans-serif;
    color: $grey-100;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    margin: 0;
  }
  .list-item-header-sales {
    width: 100%;
    min-width: 160px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    font-family: "Poppins", sans-serif;
    color: $grey-100;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    margin: 0;
  }
  .list-item-sales {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 0 8px 0 0;

    .list-item-category {
      width: 100%;
      min-width: 148px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      color: $black;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      margin: 0;
      padding: 0;

      .category-indicator {
        width: auto;
        outline: transparent solid 2px;
        outline-offset: 2px;
        border-radius: 9999px;
        transition: background-color 0.2s ease-out 0s;
        background: $grasp-cyan;
        font-size: 12px;
        text-align: center;
        text-wrap: nowrap;
        padding-inline: 8px;
        --badge-color: $grey-40;
        color: $grey-90;
        box-shadow: none;
        border-width: 1.5px;
        border-style: solid;
        border-image: initial;
        border-color: #4d5358;
      }
    }

    .sales {
      width: 100%;
      min-width: 152px;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
      margin: 0;
      padding: 0;

      .list-item-index {
        color: $black;
        font-size: 12px;
        font-weight: 600;
        padding: 0 6px 0 0;
      }

      .sales-amount {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        font-family: "Poppins", sans-serif;
        color: $black;
        font-size: 12px;
        font-weight: 500;
        text-align: left;

        img,
        svg {
          width: 22px;
          background: transparent;
          object-fit: contain;
          overflow: hidden;
          margin: 0 2px 0 0;
        }
      }
    }
  }
}
</style>
