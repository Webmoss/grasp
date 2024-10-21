<template>
  <div class="my-staking-box">
    <div class="tab-switcher">
      <button :class="{ active: activeTab === 'edu' }" @click="activeTab = 'edu'">
        Stake EDU
      </button>
      <button :class="{ active: activeTab === 'grasp' }" @click="activeTab = 'grasp'">
        Stake Grasp
      </button>
    </div>

    <div class="staking-content">
      <div class="stake-input">
        <img v-if="activeTab === 'edu'" src="../../assets/svgs/EduCoin.svg" />
        <img v-else src="../../assets/svgs/owl-blue.svg" />
        <input
          name="stake-input"
          type="text"
          :placeholder="`Enter ${activeTab === 'edu' ? 'EDU' : 'Grasp'} amount`"
          v-model="stakeAmount"
        />
      </div>

      <div class="token-price">
        <span
          >1 {{ activeTab === "edu" ? "EDU" : "Grasp" }} = ${{
            activeTab === "edu" ? eduPrice.toFixed(2) : graspPrice.toFixed(2)
          }}</span
        >
      </div>

      <button class="connect-wallet" v-if="!loggedIn" @click="connectWallet">
        Connect Wallet
      </button>
      <button class="stake-button" v-else @click="stake">
        Stake {{ activeTab === "edu" ? "EDU" : "Grasp" }}
      </button>

      <!-- Add new buttons for withdraw and claim rewards -->
      <button class="withdraw-button" v-if="loggedIn" @click="withdraw">
        Withdraw {{ activeTab === "edu" ? "EDU" : "Grasp" }}
      </button>
      <button class="claim-button" v-if="loggedIn" @click="claimRewards">
        Claim Rewards
      </button>

      <div class="staking-info">
        <div class="info-row">
          <span class="info-label">Stake Amount</span>
          <span class="info-value">${{ stakeAmountUSD }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Staking Type</span>
          <span class="info-value">Liquid Staking ></span>
        </div>
        <div class="info-row">
          <span class="info-label">Provider</span>
          <span class="info-value"
            >{{ activeTab === "edu" ? "EDU Finance" : "Grasp Finance" }} ></span
          >
        </div>
        <div class="info-row">
          <span class="info-label">Transaction Fee</span>
          <span class="info-value"
            >{{ transactionFee }} {{ activeTab === "edu" ? "EDU" : "Grasp" }}</span
          >
        </div>
        <div class="info-row">
          <span class="info-label">Transaction Fee</span>
          <span class="info-value">${{ transactionFeeUSD }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Staked Balance</span>
          <span class="info-value"
            >{{ stakedBalance }} {{ activeTab === "edu" ? "EDU" : "Grasp" }}</span
          >
        </div>
        <div class="info-row">
          <span class="info-label">Earned Rewards</span>
          <span class="info-value"
            >{{ earnedRewards }} {{ activeTab === "edu" ? "EDU" : "Grasp" }}</span
          >
        </div>
      </div>

      <div class="staking-summary">
        <div class="summary-row">
          <span>Receive</span>
          <span>{{ stakeAmount }} {{ activeTab === "edu" ? "EDU" : "Grasp" }}</span>
        </div>
        <div class="summary-row">
          <span>Reward</span>
          <span>{{ calculatedReward }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { ethers } from "ethers";
import GraspTokenStakingABI from "@/contracts/GraspTokenStaking/GraspTokenStaking.json"; // Make sure to create this ABI file

const stakingContractAddress = process.env.VUE_APP_GRASP_TOKEN_STAKING_CONTRACT
  ? process.env.VUE_APP_GRASP_TOKEN_STAKING_CONTRACT
  : "0x7E1b9c7E32Ce56B6035AEf77633dD27834B93080";

const store = useStore();
const { loggedIn, account, balance } = storeToRefs(store);

const activeTab = ref("edu");
const stakeAmount = ref("");
const transactionFeePercentage = 0.1; // 0.1% transaction fee
const eduPrice = 1; // Assuming 1 EDU = $1 USD
const graspPrice = 0.5; // Assuming 1 Grasp = $0.5 USD
const rewardPercentageEdu = 3.09;
const rewardPercentageGrasp = 2.75;
const stakedBalance = ref("0");
const earnedRewards = ref("0");

const stakeAmountUSD = computed(() => {
  const amount = parseFloat(stakeAmount.value) || 0;
  return (amount * (activeTab.value === "edu" ? 1 : 0.5)).toFixed(2);
});

const transactionFee = computed(() => {
  const amount = parseFloat(stakeAmount.value) || 0;
  const fee = (amount * transactionFeePercentage) / 100;
  return fee.toFixed(4);
});

const transactionFeeUSD = computed(() => {
  const fee = parseFloat(transactionFee.value);
  const price = activeTab.value === "edu" ? eduPrice : graspPrice;
  return (fee * price).toFixed(2);
});

const calculatedReward = computed(() => {
  const amount = parseFloat(stakeAmount.value) || 0;
  const percentage =
    activeTab.value === "edu" ? rewardPercentageEdu : rewardPercentageGrasp;
  const reward = (amount * percentage) / 100;
  return `${reward.toFixed(2)} ${
    activeTab.value === "edu" ? "EDU" : "Grasp"
  } (${percentage}%)`;
});

const getStakingContract = () => {
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(stakingContractAddress, GraspTokenStakingABI.abi, signer);
  }
  return null;
};

const updateStakingInfo = async () => {
  if (!loggedIn.value || !account.value) return;

  const contract = getStakingContract();
  if (contract) {
    try {
      const staked = await contract.balanceOf(account.value);
      const earned = await contract.earned(account.value);
      stakedBalance.value = ethers.utils.formatEther(staked);
      earnedRewards.value = ethers.utils.formatEther(earned);
    } catch (error) {
      console.error("Error updating staking info:", error);
    }
  }
};

const stake = async () => {
  if (!loggedIn.value) return;

  const contract = getStakingContract();
  if (contract) {
    try {
      const amount = ethers.utils.parseEther(stakeAmount.value);
      const tx = await contract.stake(amount);
      await tx.wait();
      await updateStakingInfo();
      stakeAmount.value = "";
    } catch (error) {
      console.error("Error staking:", error);
      alert("Failed to stake. Please try again.");
    }
  }
};

const withdraw = async () => {
  if (!loggedIn.value) return;

  const contract = getStakingContract();
  if (contract) {
    try {
      const amount = ethers.utils.parseEther(stakeAmount.value);
      const tx = await contract.withdraw(amount);
      await tx.wait();
      await updateStakingInfo();
      stakeAmount.value = "";
    } catch (error) {
      console.error("Error withdrawing:", error);
      alert("Failed to withdraw. Please try again.");
    }
  }
};

const claimRewards = async () => {
  if (!loggedIn.value) return;

  const contract = getStakingContract();
  if (contract) {
    try {
      const tx = await contract.getReward();
      await tx.wait();
      await updateStakingInfo();
    } catch (error) {
      console.error("Error claiming rewards:", error);
      alert("Failed to claim rewards. Please try again.");
    }
  }
};

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

      console.warn("No account selected in MetaMask");
    }
  } catch (error) {
    console.error("MetaMask connection error:", error);
    alert("Failed to connect to MetaMask. Please try again.");
  } finally {
    store.setLoading(false);
  }
};

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
  await updateStakingInfo();
});

watch(loggedIn, async (newValue) => {
  if (newValue) {
    await updateStakingInfo();
  }
});

watch(account, async (newValue) => {
  if (newValue) {
    await updateStakingInfo();
  }
});
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.my-staking-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  background: $grasp-cyan;
  border-radius: 8px;
  border: 0.5px solid $grey-50;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  padding: 0 0 16px 0;
  margin: 0 0 20px 0;

  .tab-switcher {
    width: 100%;
    display: flex;
    border-bottom: 2px solid transparent;

    button {
      flex: 1;
      padding: 12px;
      background: none;
      border: none;
      font-size: 16px;
      font-weight: 600;
      transition: 0.3s all linear;
      cursor: pointer;

      &.active {
        color: $grasp-blue;
        border-bottom: 2px solid $grasp-blue;
      }
    }
  }

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

  .staking-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    box-sizing: border-box;

    h2 {
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 600;
    }

    .token-price {
      width: 100%;
      text-align: center;
      font-size: 16px;
      color: $black;
      margin-bottom: 16px;
    }

    .stake-input {
      width: calc(100% - 16px);
      display: flex;
      align-items: center;
      background: $white;
      border: 1px solid $grey-50;
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 16px;

      img {
        width: 22px;
        height: 22px;
        margin-right: 4px;
      }

      input {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
        color: $grey-90;
        font-size: 14px;
        font-weight: 500;
        background: $white;
        text-decoration: none;
        border: none;
        border-radius: 12px;
        padding: 4px 0;
        transition: all 0.5s linear;

        &::placeholder {
          color: $grey-60;
        }

        &:hover,
        &:focus,
        &:focus-visible,
        &:active {
          outline: 0;
          background: $white;
        }
      }
    }

    button {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      margin: 10px auto;
      cursor: pointer;

      &.connect-wallet {
        background-color: $grasp-blue;
        color: $white;
      }

      &.stake-button {
        background-color: $grasp-blue;
        color: $white;
      }
    }

    .staking-info {
      width: 100%;
      margin: 20px 0;

      .info-row {
        display: flex;
        justify-content: space-between;
        color: $black;
        font-size: 14px;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }

        .info-label {
          font-weight: 600;
        }

        .info-value {
          font-weight: 400;
        }
      }
    }

    .staking-summary {
      width: calc(100% - 24px);
      background-color: $grasp-blue;
      border-radius: 8px;
      padding: 12px;

      .summary-row {
        display: flex;
        justify-content: space-between;
        color: $white;
        font-size: 14px;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }

        .info-label {
          font-weight: 600;
        }

        .info-value {
          font-weight: 400;
        }
      }
    }
  }
}

.withdraw-button,
.claim-button {
  // Add styles similar to .stake-button
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  margin: 10px auto;
  cursor: pointer;
  background-color: $grasp-blue;
  color: $white;
}
</style>
