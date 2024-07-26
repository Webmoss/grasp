<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">

      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            <h1>Dashboard</h1>
          </div>
          <div class="title-actions">

            <div class="my-wallet">

              <img src="../assets/svgs/EduCoin.svg" /><span class=""> {{ balance ? balance : "0.00" }}</span>
              <button class="refresh-button"><img src="../assets/svgs/Refresh.svg" /></button>
            </div>
            <div class=""><code class="account-address">{{ account }}</code></div>
          </div>
        </div>
        <p>Update your account settings and details.</p>
      </div>

      <div class="row">
        <h2>More coming soon!!!</h2>
      </div>

      <div class="row">
        <div v-if="loggedIn">
          <div class="flex-container">
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { provide, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { userObject } from "src/models/user";
import { Notyf } from "notyf";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import Web3 from "web3";

/* Components */
import SidebarView from "@/components/SidebarView.vue";

const store = useStore();
const { loggedIn, account, balance, user } = storeToRefs(store);

let provider = <IProvider | null>null;

/* Get from https://dashboard.web3auth.io */
const clientId = process.env.VUE_APP_WEB3AUTH_CLIENTID ? process.env.VUE_APP_WEB3AUTH_CLIENTID : '';
// console.log("clientId", clientId);

const  chainConfig = {
  chainId: "0xA045C",// Cahin Id 656476 in hex
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

const getUserInfo = async () => {
  const user = await web3auth.getUserInfo();
  store.setUser(user as userObject);
};

const getAccounts = async () => {
  if (!provider) {
    NotfyProvider.error("Provider not initialized yet!");
    return;
  }
  const web3 = new Web3(provider as any);
  /* Get user's public address */
  const address = await web3.eth.getAccounts();
  // store.setAccount(address);
  // uiConsole(address);
};

const getBalance = async () => {
  if (!provider) {
    NotfyProvider.error("Provider not initialized yet!");
    return;
  }
  const web3 = new Web3(provider as any);
  const address = (await web3.eth.getAccounts())[0];

  /* Get user's balance in EDU Token */
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(address), // Balance is in wei
    "ether"
  );
  store.setBalance(balance);
};

const signMessage = async () => {
  if (!provider) {
    NotfyProvider.error("Provider not initialized yet!");
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
  NotfyProvider.success(`"Message signed:" ${signedMessage}`);
};

onMounted(async () => {
  const init = async () => {
    try {
      // await web3auth.initModal();
      provider = web3auth.provider;

      if (web3auth.connected) {
        loggedIn.value = true;
        store.setLoggedIn(true);
        getUserInfo();
        getBalance();
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
.my-wallet {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: $black;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid $grasp-blue;
  border-radius: 30px;
  padding: 4px 0;
  transition: all 0.5s linear;

  img,
  svg {
    width: 22px;
    background: transparent;
    object-fit: contain;
    overflow: hidden;
    margin-right: 8px;
    margin-left: 4px;
    margin-bottom: -1px;
  }

  .refresh-button {
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
    margin-right: 0;
    margin-left: 8px;
    margin-bottom: 0;
    cursor: pointer;
  }
}
.account-address {
  width: 100%;
  color: $black;
  font-size: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
