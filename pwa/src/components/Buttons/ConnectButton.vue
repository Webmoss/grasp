<template>
  <div class="connect-wallet-container">
    <button
      v-if="!web3AuthLoggedIn"
      @click="connect()"
      :class="
        btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'
      "
    >
      <img src="@/assets/svgs/Web3Auth-Dark.svg" /> Connect
    </button>
    <button
      v-else
      @click="logout()"
      :class="
        btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'
      "
    >
      <img src="@/assets/svgs/Web3Auth-Dark.svg" /> Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Web3Auth } from "@web3auth/modal";
import {
  CHAIN_NAMESPACES,
  IProvider,
  WEB3AUTH_NETWORK,
  CustomChainConfig,
  OPENLOGIN_NETWORK_TYPE,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

defineProps({
  btnSize: {
    type: String,
    required: false,
  },
});

interface BaseAdapterSettings {
  clientId?: string;
  sessionTime?: number;
  chainConfig?: CustomChainConfig;
  web3AuthNetwork?: OPENLOGIN_NETWORK_TYPE;
}

// type CustomChainConfig = {
//   chainNamespace: ChainNamespaceType;
//   /**
//    * The chain id of the chain
//    */
//   chainId: string;
//   /**
//    * RPC target Url for the chain
//    */
//   rpcTarget: string;
//   /**
//    * Display Name for the chain
//    */
//   displayName: string;
//   /**
//    * Url of the block explorer
//    */
//   blockExplorerUrl: string;
//   /**
//    * Default currency ticker of the network (e.g: ETH)
//    */
//   ticker: string;
//   /**
//    * Name for currency ticker (e.g: `Ethereum`)
//    */
//   tickerName: string;

//   /**
//    * Logo of the chain
//    */
//   logo: string;
// };

const router = useRouter();
const store = useStore();
const { web3AuthLoggedIn } = storeToRefs(store);

let provider = <IProvider | null>null;

/* Get from https://dashboard.web3auth.io */
const clientId = process.env.VUE_APP_WEB3AUTH_CLIENTID
  ? process.env.VUE_APP_WEB3AUTH_CLIENTID
  : "BCBiVM2Lq64l2CrPepvXIYpGFgRYScs4V4pURqood6-0QNL2rnfL685dIemTQAZY5AUMIJBdPXUEijLORlSAfZA";

const metamaskAdapter = new MetamaskAdapter({
  clientId,
  sessionTime: 3600, // 1 hour in seconds
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155 ? CHAIN_NAMESPACES.EIP155 : "eip155",
    chainId: "0xA045C",
    rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
    blockExplorerUrl: "https://opencampus-codex.blockscout.com/",
  },
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
});

/* You can change the adapter settings by calling the setAdapterSettings() function on the adapter instance. */
metamaskAdapter.setAdapterSettings({
  sessionTime: 86400, // 1 day in seconds
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155 ? CHAIN_NAMESPACES.EIP155 : "eip155",
    chainId: "0xA045C",
    rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
    blockExplorerUrl: "https://opencampus-codex.blockscout.com/",
  },
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
});

const chainConfig = {
  chainId: "0xA045C", // Chain Id 656476 in hex
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
  displayName: "Open Campus Codex",
  blockExplorer: "https://opencampus-codex.blockscout.com/",
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

async function connect() {
  store.setLoading(true);
  try {
    provider = await web3auth.connect();
    if (web3auth.connected) {
      store.setWeb3AuthLoggedIn(true);
      store.setLoading(false);
      router.push({ name: "dashboard" });
    } else {
      throw new Error("Failed to connect");
    }
  } catch (error) {
    console.log("Connection Error", error);
    store.setLoading(false);
  }
}

const logout = async () => {
  try {
    if (web3auth.connected) {
      await web3auth.logout();
    }
    provider = null;
    store.setWeb3AuthLoggedIn(false);
    router.push({ name: "home" });
  } catch (error) {
    console.error("Logout error", error);
  }
};

onMounted(async () => {
  const init = async () => {
    try {
      await web3auth.initModal();
      provider = web3auth.provider;

      if (web3auth.connected) {
        store.setWeb3AuthLoggedIn(true);
      }
    } catch (error) {
      console.error("Error connecting to Web3Auth", error);
    }
  };
  init();
});
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
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 15px;
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
