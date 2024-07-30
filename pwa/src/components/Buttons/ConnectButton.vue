<template>
  <div class="connect-wallet-container">
    <!-- Not Connected -->
    <button
      v-if="!loggedIn"
      @click="connect()"
      :class="
        btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'
      "
    >
      Connect
    </button>
    <!-- Connected -->
    <button
      v-if="loggedIn && $route.name === 'home'"
      @click="$router.push('/dashboard')"
      :class="
        btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'
      "
    >
      Dashboard
    </button>
    <button
      v-if="loggedIn && $route.name === 'dashboard'"
      @click="$router.push('/')"
      :class="
        btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'
      "
    >
      Home
    </button>
    <button
      v-if="loggedIn"
      @click="logout()"
      :class="
        btnSize === 'large' ? 'connect-wallet-button' : 'connect-wallet-small-button'
      "
    >
      Logout
    </button>
    <!-- END Connected -->
  </div>
</template>

<script setup lang="ts">
import { provide, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../../store";
import { userObject } from "src/models/user";
import { useRouter } from "vue-router";
import { Web3Auth } from "@web3auth/modal";
import { Notyf } from "notyf";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import Web3 from "web3";

defineProps({
  btnSize: {
    type: String,
    required: false,
  },
});

const router = useRouter();
const store = useStore();
const { loggedIn } = storeToRefs(store);

let provider = <IProvider | null>null;

/* Get from https://dashboard.web3auth.io */
const clientId = process.env.VUE_APP_WEB3AUTH_CLIENTID
  ? process.env.VUE_APP_WEB3AUTH_CLIENTID
  : "";

const metamaskAdapter = new MetamaskAdapter({
  clientId,
  sessionTime: 3600, // 1 hour in seconds
  web3AuthNetwork: "sapphire_devnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xA045C",
    rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
    blockExplorerUrl: "https://opencampus-codex.blockscout.com/",
  },
});

/* You can change the adapter settings by calling the setAdapterSettings() function on the adapter instance. */
metamaskAdapter.setAdapterSettings({
  sessionTime: 86400, // 1 day in seconds
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xA045C",
    rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
    blockExplorerUrl: "https://opencampus-codex.blockscout.com/",
  },
  web3AuthNetwork: "sapphire_devnet",
});

const chainConfig = {
  chainId: "0xA045C", // Cahin Id 656476 in hex
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
  displayName: "Open Campus Codex",
  blockExplorer: "https://opencampus-codex.blockscout.com/",
  ticker: "EDU",
  tickerName: "EDU",
};
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});
const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
});

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

async function connect() {
  store.setLoading(true);
  try {
    provider = await web3auth.connect();
    if (web3auth.connected) {
      store.setLoggedIn(true);
      getUserInfo();
      getBalance();
      router.push({ name: "dashboard" });
    }
    store.setLoading(false);
  } catch (error) {
    console.log("Error", error);
    store.setLoading(false);
  }
}

const getUserInfo = async () => {
  const user = await web3auth.getUserInfo();
  store.setUser(user as userObject);
};

const getBalance = async () => {
  if (!provider) {
    NotfyProvider.error("Provider not initialized yet!");
    return;
  }
  const web3 = new Web3(provider as any);
  const address = (await web3.eth.getAccounts())[0];
  store.setAccount(address);

  /* Get user's balance in EDU Token */
  const balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
  store.setBalance(balance);
};

const logout = async () => {
  await web3auth.logout();
  provider = null;
  store.setLoggedIn(false);
  router.push({ name: "home" });
};

function uiConsole(...args: any[]): void {
  const el = document.querySelector("#console>p");
  if (el) {
    el.innerHTML = JSON.stringify(args || {}, null, 2);
  }
  console.log(...args);
}

onMounted(async () => {
  const init = async () => {
    try {
      // it will add/update  the metamask adapter in to web3auth class
      web3auth.configureAdapter(metamaskAdapter);
      await web3auth.initModal();
      provider = web3auth.provider;

      if (web3auth.connected) {
        loggedIn.value = true;
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
