<template>
  <div class="connect-wallet-container">
    <button
      v-if="!loggedIn"
      @click="connect()"
      :class="
        btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'
      "
    >
      Connect
    </button>
    <button
      v-else
      @click="logout()"
      :class="
        btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'
      "
    >
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Web3Auth } from "@web3auth/modal";
// import type { Web3AuthOptions } from "@web3auth/modal";
import {
  CHAIN_NAMESPACES,
  IProvider,
  WEB3AUTH_NETWORK,
  CustomChainConfig,
  OPENLOGIN_NETWORK_TYPE,
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
const { loggedIn } = storeToRefs(store);

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
  web3AuthNetwork: "sapphire_devnet",
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
  web3AuthNetwork: "sapphire_devnet",
});

const chainConfig = {
  chainId: "0xA045C", // Chain Id 656476 in hex
  chainNamespace: CHAIN_NAMESPACES.EIP155 ? CHAIN_NAMESPACES.EIP155 : "eip155",
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

// it will add/update  the metamask adapter in to web3auth class
web3auth.configureAdapter(metamaskAdapter);

async function connect() {
  store.setLoading(true);
  try {
    provider = await web3auth.connect();
    if (web3auth.connected) {
      store.setLoggedIn(true);
      store.setLoading(false);
      router.push({ name: "dashboard" });
    }
  } catch (error) {
    console.log("Error", error);
    store.setLoading(false);
  }
}

const logout = async () => {
  if (web3auth.connected) {
    await web3auth.logout();
  }
  provider = null;
  store.setLoggedIn(false);
  router.push({ name: "home" });
};

onMounted(async () => {
  const init = async () => {
    try {
      await web3auth.initModal();
      provider = web3auth.provider;

      if (web3auth.connected) {
        store.setLoggedIn(true);
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
}

.connect-wallet-small-button {
  width: auto;
  height: 35px;
  color: $white;
  background-color: $grasp-blue;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid $white;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 15px;
  transition: all 0.5s linear;
  cursor: pointer;

  &:hover {
    color: $grasp-cyan;
  }
}
</style>
