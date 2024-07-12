<template>
  <AppHeader />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";

/* Components */
import AppHeader from "./components/AppHeader.vue";

const store = useStore();
const { account, loading } = storeToRefs(store);

/**
 * Check if our Wallet is Connected to 🦊 Metamask and Get Balances
 */
// async function checkIfWalletIsConnected() {
//   if (account.value === "") {
//     const authAccount = new authNFT();
//     await authAccount.checkIfWalletIsConnected();
//   }
// }

onMounted(async () => {
  // await checkIfWalletIsConnected();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
</script>
