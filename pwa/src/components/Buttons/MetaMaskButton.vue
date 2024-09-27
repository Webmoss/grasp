<template>
  <button
    v-if="!account || !loggedIn"
    :class="btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'"
    @click="connectWallet()"
  >
    <img src="@/assets/svgs/MetaMask.svg" /> Connect
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
const { account, loggedIn } = storeToRefs(store);

async function connectWallet() {
  store.setLoading(true);
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please connect 🦊 Metamask to continue!");
      return;
    }

    const [accountAddress] = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("accountAddress", accountAddress);

    if (accountAddress) {
      store.setAccount(accountAddress);
      store.setLoggedIn(true);
      router.push({ name: "dashboard" });
    }
    store.setLoading(false);
  } catch (error) {
    console.log("Error", error);
    store.setLoading(false);
  }
}
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
  color: $white;
  background-color: $grasp-blue;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid $white;
  border-radius: 30px;
  padding-left: 60px;
  padding-right: 60px;
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
  padding-left: 11px;
  padding-right: 11px;
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
