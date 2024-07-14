<template>
  <section id="content">
    <SidebarView />
    <div class="settings">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            <h1>Dashboard</h1>
          </div>
          <div class="title-actions">
            <button class="back-button">Back</button>
            <button class="create-button">Create</button>
          </div>
        </div>
        <p>Update your account settings and details.</p>
      </div>
      <div class="row">
        <h2>More coming soon!!!</h2>

        <div v-if="loggedIn">
          <div class="flex-container">
            <div>
              <button class="card" @click="getUserInfo" style="cursor: pointer">
                Get User Info
              </button>
            </div>
            <div>
              <button class="card" @click="getAccounts" style="cursor: pointer">
                Get Accounts
              </button>
            </div>
            <div>
              <button class="card" @click="getBalance" style="cursor: pointer">
                Get Balance
              </button>
            </div>
            <div>
              <button class="card" @click="signMessage" style="cursor: pointer">
                Sign Message
              </button>
            </div>
            <!-- <div>
              <button class="card" @click="logout" style="cursor: pointer">Logout</button>
            </div> -->
          </div>
        </div>

        <div id="console" style="white-space: pre-line">
          <p style="white-space: pre-line"></p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { provide, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { Notyf } from "notyf";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import Web3 from "web3";

/* Components */
import SidebarView from "@/components/SidebarView.vue";

const store = useStore();
const { loggedIn } = storeToRefs(store);

let provider = <IProvider | null>null;

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

onMounted(async () => {
  // const init = async () => {
  //   try {
  //     await web3auth.initModal();
  //     provider = web3auth.provider;

  //     if (web3auth.connected) {
  //       loggedIn.value = true;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // init();
});

// const login = async () => {
//   // IMP START - Login
//   provider = await web3auth.connect();
//   // IMP END - Login
//   if (web3auth.connected) {
//     loggedIn.value = true;
//   }
// };

const getUserInfo = async () => {
  // IMP START - Get User Information
  const user = await web3auth.getUserInfo();
  // IMP END - Get User Information
  uiConsole(user);
};

const logout = async () => {
  // IMP START - Logout
  await web3auth.logout();
  // IMP END - Logout
  provider = null;
  loggedIn.value = false;
  uiConsole("logged out");
};

// IMP START - Blockchain Calls
const getAccounts = async () => {
  if (!provider) {
    uiConsole("provider not initialized yet");
    return;
  }
  const web3 = new Web3(provider as any);

  // Get user's Ethereum public address
  const address = await web3.eth.getAccounts();
  uiConsole(address);
};

const getBalance = async () => {
  if (!provider) {
    uiConsole("provider not initialized yet");
    return;
  }
  const web3 = new Web3(provider as any);

  // Get user's Ethereum public address
  const address = (await web3.eth.getAccounts())[0];

  // Get user's balance in ether
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(address), // Balance is in wei
    "ether"
  );
  uiConsole(balance);
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

</script>
<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";
</style>
