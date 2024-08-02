<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">Overview</div>
          <div class="title-actions"></div>
        </div>
      </div>

      <div class="row">
        <div class="left">
          <h2>Top Courses</h2>
          <div class="my-courses-box">
            <template v-for="(course, i) in courses" :key="i">
              <div class="list-item">
                <div class="course-copy">
                  <div class="course-title">
                    {{ course.title ? course.title : "" }}
                  </div>
                </div>
                <div class="course-list-buttons">
                  <div v-if="course && course.category" class="course-category">
                    <span class="category-indicator">{{
                      course.category ? course.category : ""
                    }}</span>
                  </div>
                  <div class="sales">
                    <img src="../assets/svgs/EduCoin.svg" /><span class="sales-amount">
                      {{ course.sales ? course.sales : "0.00" }}</span
                    >
                  </div>
                </div>
              </div>
            </template>
          </div>
          <h2>Top Lessons</h2>
          <div class="my-lessons-box">
            <template v-for="(course, i) in courses" :key="i">
              <div class="list-item">
                <div class="course-copy">
                  <div class="course-title">
                    {{ course.title ? course.title : "" }}
                  </div>
                </div>
                <div class="course-list-buttons">
                  <div v-if="course && course.category" class="course-category">
                    <span class="category-indicator">{{
                      course.category ? course.category : ""
                    }}</span>
                  </div>
                  <div class="sales">
                    <img src="../assets/svgs/EduCoin.svg" /><span class="sales-amount">
                      {{ course.sales ? course.sales : "0.00" }}</span
                    >
                  </div>
                </div>
              </div>
            </template>
          </div>
          <h2>Top Publisher NFTS</h2>
          <div class="my-nfts-box">
            <template v-for="(nft, i) in nfts" :key="i">
              <div class="publisher-nft-item">
                <div class="nft-image">
                  <img :src="nft.image" />
                </div>
                <div class="nft-title">
                  {{ nft.title ? nft.title : "" }}
                </div>
                <div class="nft-list-buttons">
                  <div v-if="nft && nft.category" class="nft-category">
                    <span class="category-indicator">{{
                      nft.category ? nft.category : ""
                    }}</span>
                  </div>
                  <div class="view">
                    <ViewNFTButton :nft-id="nft.id" />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="right">
          <div class="my-wallet-box">
            <div class="open-campus">
              <h2>Open Campus ID</h2>
              <div class="campus-id">{{ user.campusId ? user.campusId : "#1" }}</div>
            </div>
            <div class="my-account">
              <div class="account-address">
                {{ account ? truncate(account, 6) : "0x000" }}
              </div>
              <button class="copy-button" @click="copyClipboard(account)">
                <img src="../assets/svgs/ContentCopy.svg" />
              </button>
            </div>
          </div>

          <div class="my-balance-box">
            <h2>Balance</h2>
            <div class="my-wallet">
              <div class="my-wallet-amount">
                <img src="../assets/svgs/EduCoin.svg" /><span class="">
                  {{ balance ? balance : "0.00" }}</span
                >
              </div>
              <button class="refresh-button" @click="getBalance">
                <img src="../assets/svgs/Refresh.svg" />
              </button>
            </div>
          </div>

          <div class="my-sales-box">
            <h2>Total Income</h2>
            <div class="my-sales">
              <div class="my-sales-amount">
                <img src="../assets/svgs/EduCoin.svg" /><span class="">
                  {{ sales ? sales : "0.00" }}</span
                >
              </div>
              <div class="my-sales-percentage">
                {{ percentage ? percentage + " %" : 0.0 + " %" }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="row">
        <div v-if="loggedIn">
          <div class="flex-container">
            <div>
              <button class="card" @click="signMessage" style="cursor: pointer">
                Sign Message
              </button>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { userObject } from "src/models/user";
import { courseObject } from "src/models/course";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import Web3 from "web3";

/* Components */
import SidebarView from "@/components/SidebarView.vue";
import ViewNFTButton from "@/components/Buttons/ViewNFTButton.vue";

const store = useStore();
const { loggedIn, account, balance, user, courses } = storeToRefs(store);

let provider = <IProvider | null>null;
const sales = ref(0);
const percentage = ref(0);

/* Get from https://dashboard.web3auth.io */
const clientId = process.env.VUE_APP_WEB3AUTH_CLIENTID
  ? process.env.VUE_APP_WEB3AUTH_CLIENTID
  : "";
// console.log("clientId", clientId);

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

const testCourses = [
  {
    name: "introduction",
    type: "article",
    category: "educhain",
    title: "Introduction",
    excerpt:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    description: "",
    banner: "",
    image: "",
    created_date: "30/03/2023",
    updated_date: "",
    price: 10,
    sales: 1000,
  },
  {
    name: "open-campus-id",
    type: "article",
    category: "educhain",
    title: "What is Open Campus ID",
    excerpt:
      "Open Campus ID is a Soulbound Token, a non-transferable NFT that are virtual representations of learners' online personas.",
    description:
      "Open Campus ID is Open Campus' blockchain protocol that issues Decentralized Identifiers (DIDs) in the form of Soulbound Tokens (SBTs), non-transferable NFTs that are virtual representations of learners' online personas. The primary benefit for learners is they have control over what information is associated with their OC IDs. They can decide which pieces of information they want to share and when they want to share them, including their learning profile.",
    banner: "",
    image: "",
    created_date: "01/06/2024",
    updated_date: "",
    price: 10,
    links: [
      { url: "https://id.opencampus.xyz/", title: "open Campus ID" },
      { url: "https://x.com/opencampus_xyz", title: "Twitter" },
    ],
    sales: 1000,
  },
  {
    name: "quote",
    type: "quote",
    category: "collections",
    title: "Time and Energy",
    excerpt:
      "Software is like a pebble in a river...it only get's smoother with time and energy",
    description:
      "Software is like a pebble in a river...it only get's smoother with time and energy",
    banner: "",
    image: "",
    created_date: "06/07/2023",
    updated_date: "",
    price: 10,
    sales: 1000,
  },
];

const nfts = [
  {
    id: 1,
    type: "article",
    category: "educhain",
    title: "Publisher NFT",
    excerpt: "",
    description:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    image: "Grasp-Icon.png",
  },
  {
    id: 2,
    type: "article",
    category: "educhain",
    title: "Publisher NFT",
    excerpt: "",
    description:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    image: "Grasp-Icon.png",
  },
  {
    id: 3,
    type: "article",
    category: "educhain",
    title: "Publisher NFT",
    excerpt: "",
    description:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    image: "Grasp-Icon.png",
  },
  {
    id: 4,
    type: "article",
    category: "educhain",
    title: "Publisher NFT",
    excerpt: "",
    description:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    image: "Grasp-Icon.png",
  },
  {
    id: 5,
    type: "article",
    category: "educhain",
    title: "Publisher NFT",
    excerpt: "",
    description:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    image: "Grasp-Icon.png",
  },
  {
    id: 6,
    type: "article",
    category: "educhain",
    title: "Publisher NFT",
    excerpt: "",
    description:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    image: "Grasp-Icon.png",
  },
];

/**
 * Copy to Clipboard function
 */
const copyClipboard = (value: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  // NotfyProvider.success("Copied to clipboard!");
};

const truncate = (data: string, num: number) => {
  const reqdString = data.split("").slice(0, num).join("");
  return reqdString;
};

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
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(address), // Balance is in wei
    "ether"
  );
  store.setBalance(balance);
};

const signMessage = async () => {
  provider = web3auth.provider;
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

async function fetchCourses() {
  store.setCourses((testCourses as unknown) as courseObject[]);
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

onBeforeMount(async () => {
  await fetchCourses();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.left {
  padding-top: 30px;

  h2 {
    width: 100%;
    color: $black;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    font-style: normal;
    text-align: left;
    margin-block-start: 0;
    margin-block-end: 0;
    margin: 0 0 14px 0;
  }

  .my-courses-box {
    width: 90%;
    margin: 0 0 30px 0;
  }
  .my-lessons-box {
    width: 90%;
    margin: 0 0 30px 0;
  }
  .list-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    background: $white;
    border: 0.5px solid $grey-50;
    border-radius: 8px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    margin: 0 0 8px 0;
    padding: 6px 0 6px 8px;
    transition: all 0.5s linear;

    .course-copy {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: flex-start;
      align-items: flex-start;
      padding: 0;

      .course-title {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: center;
        align-items: center;

        font-family: "Poppins", sans-serif;
        color: $grasp-blue;
        width: 100%;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        margin: 0;
      }
    }

    .course-list-buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;
      padding: 0 8px;

      .course-category {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;

        color: $black;
        font-size: 13px;
        font-weight: 500;
        text-transform: uppercase;
        margin: 0;

        .category-indicator {
          width: auto;
          outline: transparent solid 2px;
          outline-offset: 2px;
          border-radius: 9999px;
          transition: background-color 0.2s ease-out 0s;
          background: $grasp-cyan;
          font-size: 12px;
          text-align: center;
          padding-inline: 8px;
          padding-top: 1px;
          padding-bottom: 1px;
          --badge-color: $grey-40;
          color: $grey-90;
          box-shadow: none;
          border-width: 1.5px;
          border-style: solid;
          border-image: initial;
          border-color: #4d5358;
        }
      }
      .sales {
        width: 100%;
        min-width: 120px;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: flex-end;
        padding: 4px 0;

        .sales-amount {
          display: flex;
          flex-direction: row;
          align-content: center;
          align-items: center;
          justify-content: center;
          color: $black;
          font-size: 18px;
          font-weight: 600;
        }

        img,
        svg {
          width: 22px;
          background: transparent;
          object-fit: contain;
          overflow: hidden;
          margin-right: 0;
          margin-left: 8px;
        }
      }
    }
  }

  .my-nfts-box {
    width: 92%;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-content: center;
    justify-content: center;
    align-items: flex-start;
    margin: 10px 0;

    @include breakpoint($break-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
    @include breakpoint($break-md) {
      grid-template-columns: repeat(3, 1fr);
    }
    @include breakpoint($break-sm) {
      grid-template-columns: repeat(1, 1fr);
    }
    @include breakpoint($break-xs) {
      grid-template-columns: repeat(1, 1fr);
    }

    .publisher-nft-item {
      width: 94%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      background: $white;
      border: 0.5px solid $grey-50;
      border-radius: 8px;
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
      margin: 0 0 16px 0;
      padding: 3%;
      transition: all 0.5s linear;
      .nft-image {
        img,
        svg {
          width: 100%;
          background: transparent;
          object-fit: contain;
          overflow: hidden;
        }
      }

      .nft-title {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: center;
        align-items: center;

        font-family: "Poppins", sans-serif;
        color: $black;
        width: 100%;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        margin: 0;
      }

      .nft-list-buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
        padding: 0;

        .nft-category {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-content: center;
          align-items: center;

          color: $black;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          margin: 0;

          .category-indicator {
            width: auto;
            outline: transparent solid 2px;
            outline-offset: 2px;
            border-radius: 9999px;
            transition: background-color 0.2s ease-out 0s;
            background: $grasp-cyan;
            font-size: 12px;
            text-align: center;
            padding-inline: 8px;
            padding-top: 1px;
            padding-bottom: 1px;
            --badge-color: $grey-40;
            color: $grey-90;
            box-shadow: none;
            border-width: 1.5px;
            border-style: solid;
            border-image: initial;
            border-color: #4d5358;
          }
        }
        .view {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-content: center;
          align-items: center;
          justify-content: flex-end;
          padding: 4px 0;
        }
      }
    }
  }
}

.right {
  padding-top: 70px;

  .my-wallet-box {
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: flex-start;
    justify-content: center;
    background: $white;
    border-radius: 8px;
    border: 0.5px solid $grey-50;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    padding: 16px;
    margin: 0 30px 20px 0;

    .open-campus {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 8px 0;

      h2 {
        width: auto;
        color: $grasp-blue;
        font-size: 19px;
        font-weight: 600;
        line-height: 26px;
        font-style: normal;
        text-align: left;
        margin-block-start: 0;
        margin-block-end: 0;
      }
      .campus-id {
        color: $black;
        font-size: 20px;
        font-weight: 600;
        line-height: 26px;
        font-style: normal;
        text-align: right;
      }
    }

    .my-account {
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

      .account-address {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: flex-start;
        color: $black;
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
  }

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
    margin: 0 30px 20px 0;

    h2 {
      width: 100%;
      color: $white;
      font-size: 19px;
      font-weight: 600;
      line-height: 26px;
      font-style: normal;
      text-align: left;
      margin-block-start: 0;
      margin-block-end: 0;
      margin: 0 0 8px 0;
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
          width: 24px;
          background: transparent;
          object-fit: contain;
          overflow: hidden;
          margin-right: 0;
          margin-left: 4px;
        }
      }
    }
  }

  .my-sales-box {
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
    margin: 0 30px 20px 0;

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

    .my-sales {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;

      .my-sales-amount {
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
    .my-sales-percentage {
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
}
</style>
