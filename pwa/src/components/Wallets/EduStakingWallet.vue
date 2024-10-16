<template>
  <div class="my-staking-box">
    <h2>Staking</h2>
    <div class="my-staking">
      <div class="stake-box">
        <div class="staking-amount">
          <img src="../../assets/svgs/EduCoin.svg" /><span class="">
            {{ stakingEduTotal ? stakingEduTotal : "0.00" }}</span
          >
        </div>
        <div class="my-staking-percentage">
          {{ percentageEdu ? percentageEdu + " %" : 0.0 + " %" }}
        </div>
      </div>
      <div class="stake-box">
        <div class="staking-amount">
          <img src="../../assets/svgs/owl-blue.svg" /><span class="">
            {{ stakingGraspTotal ? stakingGraspTotal : "0.00" }}</span
          >
        </div>
        <div class="my-staking-percentage">
          {{ percentageGrasp ? percentageGrasp + " %" : 0.0 + " %" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
// import { copyClipboard } from "@/services/copyClipboard";
// import { formatAddress } from "@/services/formatAddress";
// import { truncateAddress } from "@/services/truncateAddress";
import { ethers } from "ethers";

const store = useStore();

const { loggedIn, account, balance } = storeToRefs(store);
const percentageEdu = ref(0);
const percentageGrasp = ref(0);

const stakingEduTotal = computed(() => {
  let total = 0;
  return total;
});

const stakingGraspTotal = computed(() => {
  let total = 0;
  return total;
});

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

.my-staking-box {
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  background: $grasp-cyan;
  border-radius: 8px;
  border: 0.5px solid $grey-50;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  padding: 16px;
  margin: 0 0 20px 0;

  h2 {
    width: 100%;
    color: $black;
    font-size: 19px;
    font-weight: 600;
    line-height: 26px;
    font-style: normal;
    text-align: left;
    margin-block-start: 0;
    margin-block-end: 0;
    margin: 0 0 8px 0;
  }

  .my-staking {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;

    .stake-box {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;

      .staking-amount {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        color: $black;
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
        margin-left: 4px;
      }
    }
  }
  .my-staking-percentage {
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: $white;
    background: #2039fd;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 12px;
    border-radius: 8px;
  }
}
</style>
