<template>
  <button
    v-if="loading"
    :class="btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'"
    @click="connectWallet()"
  >
    <img src="@/assets/svgs/MetaMask.svg" /> Connect
  </button>
  <button
    v-else-if="!account || !loggedIn"
    :class="btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'"
    @click="connectWallet()"
  >
    <img src="@/assets/svgs/MetaMask.svg" /> Connect
  </button>
  <button
    v-else
    @click="logout()"
    :class="btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'"
  >
    <img src="@/assets/svgs/MetaMask.svg" /> Logout
  </button>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

export interface Props {
  btnSize?: string;
  color?: string;
}

defineProps({
  btnSize: {
    type: String,
    default: "large",
    required: false,
  },
  color: {
    type: String,
    default: "blue",
    required: false,
  },
});

const store = useStore();
const router = useRouter();
const { loading, account, loggedIn } = storeToRefs(store);

const connectWallet = async () => {
  store.setLoading(true);
  try {
    const { ethereum } = window;
    if (!ethereum || !ethereum.isMetaMask) {
      alert("Please install or enable MetaMask to continue!");
      store.setLoading(false);
      return;
    }

    const [accountAddress] = await ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accountAddress) {
      store.setAccount(accountAddress);
      store.setLoggedIn(true);
      await router.push({ name: "dashboard" });
    } else {
      console.warn("No account selected in MetaMask");
    }
  } catch (error) {
    console.error("MetaMask connection error:", error);
    alert("Failed to connect to MetaMask. Please try again.");
  } finally {
    store.setLoading(false);
  }
};

const logout = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum || !ethereum.isMetaMask) {
      console.warn("MetaMask is not detected");
    } else {
      /* Clear the selected account */
      await ethereum.request({
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }],
      });
    }

    /* Clear local state */
    store.setAccount("");
    store.setLoggedIn(false);
    router.push({ name: "home" });
  } catch (error) {
    console.error("Logout Error", error);
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.connect-wallet-container {
  display: flex;
  flex-direction: row;
  margin: 0;
  max-width: 550px;
}

.connect-wallet-button {
  width: auto;
  height: 55px;
  display: flex;
  flex-direction: row nowrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: $white;
  background-color: $grasp-blue;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid $white;
  border-radius: 30px;
  padding-left: 10px;
  padding-right: 10px;
  transition: all 0.5s linear;
  cursor: pointer;

  &:hover {
    color: $grasp-cyan;
  }

  img {
    width: 24px;
    margin: 0 auto;
    @include breakpoint($break-sm) {
      width: 22px;
      margin: 0 auto;
    }
  }
}

.connect-wallet-small-button {
  width: auto;
  height: 35px;
  display: flex;
  flex-direction: row nowrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: $white;
  background-color: $grasp-blue;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid $white;
  border-radius: 30px;
  margin-right: 15px;
  padding-left: 10px;
  padding-right: 10px;
  transition: all 0.5s linear;
  cursor: pointer;

  &:hover {
    color: $grasp-cyan;
  }

  img,
  svg {
    width: 20px;
    background: transparent;
    object-fit: contain;
    overflow: hidden;
    margin-right: 6px;
  }
}
</style>
