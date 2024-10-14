<template>
  <div class="my-balance-box">
    <h2>Account</h2>
    <div class="my-account">
      <div class="account-address">
        {{ formattedAccount }}
      </div>
      <button class="copy-button" @click="copyClipboard(account)">
        <img src="../../assets/svgs/ContentCopy-White.svg" />
      </button>
    </div>
    <div class="my-wallet">
      <div class="my-wallet-amount">
        <img src="../../assets/svgs/EduCoin.svg" /><span class="">
          {{ truncatedBalance }}</span
        >
      </div>
      <button class="refresh-button" @click="checkEDUBalance(account)">
        <img src="../../assets/svgs/Refresh.svg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { copyClipboard } from "@/services/copyClipboard";
import { formatAddress } from "@/services/formatAddress";
import { truncateAddress } from "@/services/truncateAddress";
import { ethers } from "ethers";

const store = useStore();

const { loggedIn, account, balance } = storeToRefs(store);

const formattedAccount = computed(() => formatAddress(account.value));
const truncatedBalance = computed(() => truncateAddress(balance.value, 10));

/**
 * Get Account EDU Balance
 */
const checkEDUBalance = async (account: string) => {
  console.log("checkEDUBalance", account);
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.log(`Please connect 🦊 Metamask to continue!`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const wei = await provider.getBalance(account);
    const eduBalance = ethers.utils.formatEther(wei);
    store.setBalance(eduBalance);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Check if our Wallet is Connected to 🦊 Metamask
 */
const checkIfWalletIsConnected = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.log(`Please connect 🦊 Metamask to continue!`);
      return;
    }
    /* Get our Current Account */
    const accounts = await ethereum.request({ method: "eth_accounts" });

    /* Update our Current Account in the Store */
    if (accounts.length !== 0) {
      store.setAccount(accounts[0]);
      /* Get our Account EDU Balance */
      await checkEDUBalance(accounts[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const init = async () => {
    try {
      /* Check if MetaMask is connected */
      if (loggedIn.value) {
        console.log("MetaMask Connected", loggedIn.value);
        await checkIfWalletIsConnected();
      }
    } catch (error) {
      console.error(error);
    }
  };
  init();
});
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.my-balance-box {
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  background: $grasp-blue;
  border-radius: 8px;
  border: 0.5px solid $grey-50;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  padding: 16px;
  margin: 0 0 20px 0;

  h2 {
    width: 100%;
    color: $white;
    font-size: 19px;
    font-weight: 600;
    line-height: 26px;
    font-style: normal;
    text-align: left;
    margin-block-start: 0;
    margin-block-end: 0;
    margin: 0 0 8px 0;
  }

  .my-account {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    color: $white;
    font-size: 16px;
    font-weight: 600;
    padding: 4px 0;
    transition: all 0.5s linear;

    .account-address {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: flex-start;
      color: $white;
      font-size: 16px;
      font-weight: 600;
      padding: 4px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }

    .copy-button {
      width: auto;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: center;
      color: $white;
      background: transparent;
      border: none;
      font-size: 14px;
      font-weight: 600;
      margin-right: -6px;
      margin-left: 4px;
      margin-bottom: 0;
      cursor: pointer;

      img,
      svg {
        width: 24px;
        background: transparent;
        object-fit: contain;
        overflow: hidden;
        margin-right: 0;
        margin-left: 4px;
      }
    }
  }

  .my-wallet {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    color: $black;
    font-size: 16px;
    font-weight: 600;
    padding: 4px 0;
    transition: all 0.5s linear;

    .my-wallet-amount {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: center;
      color: $white;
      font-size: 19px;
      font-weight: 600;
    }

    img,
    svg {
      width: 26px;
      background: transparent;
      object-fit: contain;
      overflow: hidden;
      margin-right: 8px;
    }

    .refresh-button {
      width: auto;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: center;
      color: $grasp-blue;
      background: transparent;
      border: none;
      font-size: 14px;
      font-weight: 600;
      margin-right: -6px;
      margin-left: 4px;
      margin-bottom: 0;
      cursor: pointer;

      img,
      svg {
        width: 24px;
        background: transparent;
        object-fit: contain;
        overflow: hidden;
        margin-right: 0;
        margin-left: 4px;
      }
    }
  }
}
</style>
