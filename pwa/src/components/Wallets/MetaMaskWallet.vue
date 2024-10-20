<template>
  <div class="my-balance-box">
    <h2>
      Account
      <button class="refresh-button" @click="refreshBalances()">
        <img src="../../assets/svgs/Refresh.svg" alt="Refresh" />
      </button>
    </h2>
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
        <div class="tooltip">
          <img src="../../assets/svgs/EduCoin.svg" />
          <span class="tooltiptext">EDU</span>
        </div>
        <span class="token-balance"> {{ truncatedBalance }}</span>
      </div>
    </div>
    <div class="token-list">
      <div class="token-list">
        <div v-for="token in filteredTokens" :key="token.address" class="token-item">
          <div class="tooltip">
            <img :src="`${token.icon}`" :alt="token.symbol" />
            <span class="tooltiptext">{{ token.symbol }}</span>
          </div>
          <span class="token-balance">{{ token.balance }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { copyClipboard } from "@/services/copyClipboard";
import { formatAddress } from "@/services/formatAddress";
import { truncateAddress } from "@/services/truncateAddress";
import { ethers } from "ethers";

const store = useStore();
const { loggedIn, account, balance } = storeToRefs(store);

interface Token {
  balance: string;
  address: string;
  symbol: string;
  decimals: number;
  icon: string;
}

const tokens: Ref<Token[]> = ref([]);

const filteredTokens = computed(() =>
  tokens.value.filter((token) => parseFloat(token.balance) > 0)
);
const formattedAccount = computed(() => formatAddress(account.value));
const truncatedBalance = computed(() => truncateAddress(balance.value, 10));

/**
 * Get Account EDU Balance
 */
const checkEDUBalance = async (account: string) => {
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
 * Get EDU Chain Tokens & Balance
 */
const getTokenBalances = async (account: string) => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.log(`Please connect 🦊 Metamask to continue!`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);

    const tokenList = [
      {
        address: "0x3eB2Eb8E2a0E26BEf3Dc3E78289Be7343355FeBC",
        symbol: "GRASP",
        decimals: 18,
        icon: new URL("../../assets/images/Grasp-Icon.png", import.meta.url).href,
      },
      {
        address: "0x06D837C1a3D8A86E82B676ACE6BDFAf4A51CD77D",
        symbol: "Sail",
        decimals: 18,
        icon: new URL("../../assets/svgs/educhain-tokens/sail.svg", import.meta.url).href,
      },
      {
        address: "0x2c2800995F2a8137EB9dd3Bfe88FABbBAe8b4958",
        symbol: "veSail",
        decimals: 18,
        icon: new URL("../../assets/svgs/educhain-tokens/vesail.svg", import.meta.url)
          .href,
      },
      {
        address: "0x77721D19BDfc67fe8cc46ddaa3cc4C94e6826E3C",
        symbol: "USDC",
        decimals: 18,
        icon: new URL("../../assets/svgs/educhain-tokens/usdc.svg", import.meta.url).href,
      },
      {
        address: "0xeDFa3e28953bA25173baF11160D4aD435ec002b5",
        symbol: "USDT",
        decimals: 18,
        icon: new URL("../../assets/svgs/educhain-tokens/usdt.svg", import.meta.url).href,
      },
      // { address: '0xCef966528A867176BF3a575c9951f695e8eB77a3', symbol: 'ESD', decimals: 18, icon: new URL('../../assets/images/esd.webp', import.meta.url).href },
      // {
      //   address: "0x81962760B26D4c2C6eD373F615310633abFd47c1",
      //   symbol: "ADEX",
      //   decimals: 18,
      //   icon: new URL("../../assets/images/adexIcon.webp", import.meta.url).href,
      // },
    ];

    const tokenBalances = await Promise.all(
      tokenList.map(async (token) => {
        const contract = new ethers.Contract(
          token.address,
          ["function balanceOf(address) view returns (uint256)"],
          provider
        );
        const balance = await contract.balanceOf(account);
        const formattedBalance = ethers.utils.formatUnits(balance, token.decimals);
        return {
          ...token,
          balance:
            parseFloat(formattedBalance) > 0.000001
              ? parseFloat(formattedBalance).toFixed(6)
              : "0",
        };
      })
    );

    tokens.value = tokenBalances;
  } catch (error) {
    console.error("Error fetching token balances:", error);
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
    }
  } catch (error) {
    console.log(error);
  }
};

const refreshBalances = async () => {
  if (account.value) {
    await checkEDUBalance(account.value);
    await getTokenBalances(account.value);
  }
};

onMounted(async () => {
  const init = async () => {
    try {
      /* Check if MetaMask is connected */
      if (loggedIn.value) {
        // console.log("MetaMask Connected", loggedIn.value);
        await checkIfWalletIsConnected();
        await refreshBalances();
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
  margin: 0 0 10px 0;

  h2 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $white;
    font-size: 19px;
    font-weight: 600;
    line-height: 26px;
    font-style: normal;
    text-align: left;
    margin-block-start: 0;
    margin-block-end: 0;
    margin: 0 0 8px 0;

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
      font-size: 14px;
      font-weight: 500;
    }

    img,
    svg {
      width: 26px;
      background: transparent;
      object-fit: contain;
      overflow: hidden;
      margin-right: 8px;
    }
  }

  .token-balance {
    color: $white;
    font-size: 15px;
    font-weight: 500;
    margin-left: 4px;
  }
}

.token-list {
  width: 100%;
}

.token-item {
  display: flex;
  align-items: center;
  color: $white;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border-radius: 50%;
    background: $white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    object-fit: cover;
    cursor: pointer;
  }
}
</style>
