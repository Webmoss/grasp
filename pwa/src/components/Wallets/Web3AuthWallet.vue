<template>
  <div class="my-balance-box">
    <h2>
      <span><img src="@/assets/svgs/Web3Auth-Dark.svg" /> Account</span>
      <button class="refresh-button" @click="getBalance()">
        <img src="../../assets/svgs/Refresh.svg" />
      </button>
    </h2>
    <div class="my-account">
      <div class="account-address">
        {{ formattedWeb3AuthAccount }}
      </div>
      <button class="copy-button" @click="copyClipboard(web3AuthAccount)">
        <img src="../../assets/svgs/ContentCopy-White.svg" />
      </button>
    </div>
    <div class="my-wallet">
      <div class="my-wallet-amount">
        <div class="tooltip">
          <img src="../../assets/svgs/EduCoin.svg" />
          <span class="tooltiptext">EDU</span>
        </div>
        <span class="token-balance"> {{ truncatedWeb3AuthBalance }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, onMounted } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { userObject } from "src/models/user";
import { copyClipboard } from "@/services/copyClipboard";
import { formatAddress } from "@/services/formatAddress";
import { truncateAddress } from "@/services/truncateAddress";

import { Web3Auth } from "@web3auth/modal";
import {
  CHAIN_NAMESPACES,
  IProvider,
  WEB3AUTH_NETWORK,
  CustomChainConfig,
  OPENLOGIN_NETWORK_TYPE,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import Web3 from "web3";

interface BaseAdapterSettings {
  clientId?: string;
  sessionTime?: number;
  chainConfig?: CustomChainConfig;
  web3AuthNetwork?: OPENLOGIN_NETWORK_TYPE;
}

const store = useStore();
const { web3AuthLoggedIn, web3AuthAccount, web3AuthBalance } = storeToRefs(store);

/* Get from https://dashboard.web3auth.io */
const clientId = process.env.VUE_APP_WEB3AUTH_CLIENTID
  ? process.env.VUE_APP_WEB3AUTH_CLIENTID
  : "";

/* Open Campus Codex RPC EDU Chain */
const rpcTarget = process.env.VUE_APP_PUBLIC_RPC_OPEN_CAMPUS
  ? process.env.VUE_APP_PUBLIC_RPC_OPEN_CAMPUS
  : "";

const blockExplorerUrl = process.env.VUE_APP_PUBLIC_BROWSER_URL_OPEN_CAMPUS
  ? process.env.VUE_APP_PUBLIC_BROWSER_URL_OPEN_CAMPUS
  : "";
const metamaskAdapter = new MetamaskAdapter({
  clientId,
  sessionTime: 3600, // 1 hour in seconds
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155 ? CHAIN_NAMESPACES.EIP155 : "eip155",
    chainId: "0xA045C",
    rpcTarget: rpcTarget,
    blockExplorerUrl: blockExplorerUrl,
  },
  web3AuthNetwork: "sapphire_devnet",
});

/* You can change the adapter settings by calling the setAdapterSettings() function on the adapter instance. */
metamaskAdapter.setAdapterSettings({
  sessionTime: 86400, // 1 day in seconds
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155 ? CHAIN_NAMESPACES.EIP155 : "eip155",
    chainId: "0xA045C",
    rpcTarget: rpcTarget,
    blockExplorerUrl: blockExplorerUrl,
  },
  web3AuthNetwork: "sapphire_devnet",
});

const chainConfig = {
  chainId: "0xA045C", // Chain Id 656476 in hex
  chainNamespace: CHAIN_NAMESPACES.EIP155 ? CHAIN_NAMESPACES.EIP155 : "eip155",
  rpcTarget: rpcTarget,
  displayName: "Open Campus Codex",
  blockExplorer: blockExplorerUrl,
  ticker: "EDU",
  tickerName: "EDU",
  logo: "https://cryptologos.cc/logos/open-campus-edu-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
});

/* It will add/update  the metamask adapter in to web3auth class */
web3auth.configureAdapter(metamaskAdapter);

const NotfyProvider = new Notyf({
  duration: 2000,
  position: {
    x: "center",
    y: "bottom",
  },
  types: [
    {
      type: "loading",
      background: "orange",
      duration: 0,
      dismissible: true,
      icon: {
        className: "icon icon-loading",
        tagName: "i",
      },
    },
    {
      type: "success",
      background: "green",
      duration: 20000,
      dismissible: true,
      icon: {
        className: "icon icon-success",
        tagName: "i",
      },
    },
    {
      type: "error",
      background: "indianred",
      duration: 10000,
      dismissible: true,
      icon: {
        className: "icon icon-error",
        tagName: "i",
      },
    },
  ],
});
provide("notyf", NotfyProvider);

let provider = <IProvider | null>null;

const formattedWeb3AuthAccount = computed(() => formatAddress(web3AuthAccount.value));
const truncatedWeb3AuthBalance = computed(() =>
  truncateAddress(web3AuthBalance.value, 10)
);

/**
 * Web3 Auth Method to get Account and Balance
 */
const getBalance = async () => {
  if (!provider) {
    NotfyProvider.error("Provider not initialized yet!");
    return;
  }
  const web3 = new Web3(provider as any);
  const address = (await web3.eth.getAccounts())[0];
  store.setWeb3AuthAccount(address);

  /* Get user's balance in EDU Token */
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(address), // Balance is in wei
    "ether"
  );
  store.setWeb3AuthBalance(balance);
};

const getUserInfo = async () => {
  const user = await web3auth.getUserInfo();
  store.setUser(user as userObject);
};

onMounted(async () => {
  const init = async () => {
    try {
      /* Check if Web3Auth Wallet is connected */
      if (web3AuthLoggedIn.value) {
        await web3auth.initModal();
        provider = web3auth.provider;

        if (web3auth.connected) {
          console.log("Dashboard Web3Auth Connected", web3auth.connected);
          store.setLoggedIn(true);
          await getUserInfo();
          await getBalance();
        }
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

    span {
      img,
      svg {
        width: 20px;
        background: transparent;
        object-fit: contain;
        overflow: hidden;
        margin: 0 4px -2px 0;
      }
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
        width: 22px;
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
        width: 22px;
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
      width: 22px;
      background: transparent;
      object-fit: contain;
      overflow: hidden;
      margin-right: 8px;
    }

    .token-balance {
      color: $white;
      font-size: 15px;
      font-weight: 500;
      margin-left: 4px;
    }
  }
}
</style>
