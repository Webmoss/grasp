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
        btnSize === 'large' ? 'profile-wallet-button' : 'profile-wallet-small-button'
      "
    >
      Dashboard
    </button>
    <button
      v-if="loggedIn && $route.name !== 'home'"
      @click="$router.push('/')"
      :class="
        btnSize === 'large' ? 'profile-wallet-button' : 'profile-wallet-small-button'
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
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { userObject } from 'src/models/user';
import { useRouter } from "vue-router";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import Web3 from "web3";

defineProps({
  btnSize: {
    type: String,
    required: false,
  },
});

const router = useRouter();
const store = useStore();
const { account, loggedIn } = storeToRefs(store);

let provider = <IProvider | null>null;
// const loggedIn = ref<boolean>(false);

// IMP START - SDK Initialization
// IMP START - Dashboard Registration
const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

const chainConfig = {
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/eth.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProvider,
});
// IMP END - SDK Initialization

async function connect() {
  store.setLoading(true);
  try {
    provider = await web3auth.connect();
    if (web3auth.connected) {
      store.setLoggedIn(true);
      getUserInfo();
      getBalance();
      store.setLoading(false);
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
  uiConsole(user);
};

const getBalance = async () => {
  if (!provider) {
    uiConsole("Provider not initialized yet");
    return;
  }
  const web3 = new Web3(provider as any);
  /* Get user's Ethereum public address */
  const address = (await web3.eth.getAccounts())[0];
  /* Get user's balance in ether */
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(address), // Balance is in wei
    "ether"
  );
  store.setBalance(balance);
  uiConsole(balance);
};

const logout = async () => {
  await web3auth.logout();
  provider = null;
  store.setLoggedIn(false);
  router.push({ name: "home" });
  // uiConsole("Logged out");
};

// IMP START - Blockchain Calls
const getAccounts = async () => {
  if (!provider) {
    uiConsole("Provider not initialized yet");
    return;
  }
  const web3 = new Web3(provider as any);
  // Get user's Ethereum public address
  const address = await web3.eth.getAccounts();
  uiConsole(address);
};

const signMessage = async () => {
  if (!provider) {
    uiConsole("provider not initialized yet");
    return;
  }
  const web3 = new Web3(provider as any);

  // Get user's Ethereum public address
  const fromAddress = (await web3.eth.getAccounts())[0];

  const originalMessage = "YOUR_MESSAGE";

  // Sign the message
  const signedMessage = await web3.eth.personal.sign(
    originalMessage,
    fromAddress,
    "test password!" // configure your own password here.
  );
  uiConsole(signedMessage);
};
// IMP END - Blockchain Calls

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
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.connect-wallet-container {
  display: flex;
  flex-direction: row;
  margin: 0;
  max-width: 550px;
  img {
    padding-bottom: 20px;
  }
}

.connect-wallet-button {
  color: $white;
  background-color: $grasp-blue;
  font-size: 18px;
  font-weight: bold;
  width: auto;
  height: 55px;
  border: 1px solid $white;
  border-radius: 30px;
  padding-left: 60px;
  padding-right: 60px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $grasp-cyan;
    border: 1px solid $grasp-cyan;
  }
}

.connect-wallet-small-button {
  color: $white;
  background-color: $grasp-blue;
  font-size: 15px;
  font-weight: bold;
  width: auto;
  height: 35px;
  border: 1px solid $white;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 10px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $grasp-cyan;
    border: 1px solid $grasp-cyan;
  }
}

.profile-wallet-button {
  color: $grasp-cyan;
  background-color: $grasp-blue;
  font-size: 18px;
  font-weight: bold;
  width: auto;
  height: 55px;
  border: 1px solid $grasp-cyan;
  border-radius: 30px;
  padding-left: 60px;
  padding-right: 60px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $white;
    border: 1px solid $white;
  }
  svg {
    margin-bottom: -3px;
  }
}

.profile-wallet-small-button {
  color: $grasp-cyan;
  background-color: $grasp-blue;
  font-size: 15px;
  font-weight: bold;
  width: auto;
  height: 35px;
  border: 1px solid $grasp-cyan;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 10px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $white;
    border: 1px solid $white;
  }

  svg {
    margin-bottom: -3px;
  }
}
</style>
