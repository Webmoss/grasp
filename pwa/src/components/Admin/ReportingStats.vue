<template>
  <div class="tab-box">
    <div class="box-header">Reporting</div>
    <div class="box">
      <div class="box-value">
        <span class="box-label">From Date</span>
        <input type="date" v-model="fromDate" @change="updateCharts" />
      </div>
      <div class="box-value">
        <span class="box-label">To Date</span>
        <input type="date" v-model="toDate" @change="updateCharts" />
      </div>
      <div class="box-value">
        <span class="box-label">Transaction Type</span>
        <select v-model="selectedTransactionType" @change="updateCharts">
          <option value="">All Transaction Types</option>
          <option v-for="type in transactionTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>
    <AdminSearch @search="updateCharts" />
    <div class="charts-container">
      <div class="chart-box">
        <h3>Transactions by Date</h3>
        <canvas ref="transactionsByDateChart"></canvas>
      </div>
      <div class="chart-box">
        <h3>Transactions by Category</h3>
        <canvas ref="transactionsByCategoryChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { transactionObject } from "src/models/transaction";
import { Chart, ChartConfiguration, ChartData, ChartType } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  PieController,
} from "chart.js";
import AdminSearch from "@/components/Admin/AdminSearch.vue";

/* All Transactions stored in a JSON */
import testTransactions from "../../data/transactions.json";

// Register the required Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  PieController
);

const store = useStore();
const { transactions, filter } = storeToRefs(store);

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

const lastSearchTerm = ref("");
const fromDate = ref("");
const toDate = ref("");
const selectedTransactionType = ref("");
const transactionTypes = ref<string[]>([]);

const transactionsByDateChart = ref<HTMLCanvasElement | null>(null);
const transactionsByCategoryChart = ref<HTMLCanvasElement | null>(null);

let dateChart: Chart | null = null;
let categoryChart: Chart | null = null;

const newSearchTerm = computed(() => {
  return filter.value.search_term;
});

const filterTransactions = () => {
  let filteredTransactions = testTransactions.data;

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

  if (fromDate.value) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => new Date(transaction.date) >= new Date(fromDate.value)
    );
  }

  if (toDate.value) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => new Date(transaction.date) <= new Date(toDate.value)
    );
  }

  if (selectedTransactionType.value) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.transactionType === selectedTransactionType.value
    );
  }

  if (filter.value.search_term) {
    filteredTransactions = filteredTransactions.filter((transaction) =>
      transaction.userName.toLowerCase().includes(filter.value.search_term.toLowerCase())
    );
  }
  store.setTransactions((filteredTransactions as unknown) as transactionObject[]);
};

const updateCharts = () => {
  filterTransactions();
  renderTransactionsByDateChart();
  renderTransactionsByTypeChart();
};

const renderTransactionsByDateChart = () => {
  if (!transactionsByDateChart.value) return;

  const ctx = transactionsByDateChart.value.getContext("2d");
  if (!ctx) return;
  const transactionsByDate = transactions.value.reduce((acc, transaction) => {
    if (transaction.date) {
      const date = new Date(transaction.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  if (dateChart) {
    dateChart.destroy();
  }

  dateChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(transactionsByDate),
      datasets: [
        {
          label: "Transactions",
          data: Object.values(transactionsByDate),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: "category",
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const renderTransactionsByTypeChart = () => {
  if (!transactionsByCategoryChart.value) return;

  const ctx = transactionsByCategoryChart.value.getContext("2d");
  if (!ctx) return;

  const transactionsByType = transactions.value.reduce((acc, transaction) => {
    acc[transaction.transactionType] = (acc[transaction.transactionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const config: ChartConfiguration<ChartType, number[], string> = {
    type: "pie",
    data: {
      labels: Object.keys(transactionsByType),
      datasets: [
        {
          data: Object.values(transactionsByType),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
    },
  };

  if (categoryChart) {
    categoryChart.destroy();
  }

  categoryChart = new Chart(ctx, config);
};

onMounted(() => {
  filterTransactions();
  transactionTypes.value = [
    ...new Set(testTransactions.data.map((t) => t.transactionType)),
  ];
  renderTransactionsByDateChart();
  renderTransactionsByTypeChart();
});

watch([fromDate, toDate, selectedTransactionType, filter], updateCharts);
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

.charts-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
  overflow-x: auto;
  padding-bottom: 16px;
}

.chart-box {
  flex: 0 0 calc(50% - 10px);
  width: calc(50% - 10px);
  min-width: 300px;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  padding: 16px;

  h3 {
    font-family: "Poppins", sans-serif;
    color: $grey-100;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    text-align: center;
  }

  canvas {
    max-width: 100%;
    height: auto;
  }
}

// Media query for smaller screens
@media (max-width: 768px) {
  .charts-container {
    flex-wrap: wrap;
  }

  .chart-box {
    flex: 0 0 100%;
    width: 100%;
  }
}
</style>
