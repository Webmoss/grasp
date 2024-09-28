<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">Overview</div>
          <div class="title-actions">
            <OCIDButton btnSize="large" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="left">
          <div class="tab-switcher">
            <div
              :class="tab === 'courses' ? 'active' : ''"
              class="tab-button"
              @click="loadTab('courses')"
            >
              Courses
            </div>
            <div
              :class="tab === 'lessons' ? 'active' : ''"
              class="tab-button"
              @click="loadTab('lessons')"
            >
              Lessons
            </div>
          </div>

          <!-- Courses Tab  -->
          <div v-if="tab === 'courses'" class="tab-box">
            <div class="my-courses-box">
              <template v-for="(course, index) in courses" :key="index">
                <div class="list-item">
                  <div class="course-copy">
                    <div class="course-title">
                      <span class="course-index">{{ index + 1 }}.</span>
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
            <div class="my-totals">
              <span class="my-totals-label">Total</span>
              <span class="my-totals-value">
                <img src="../assets/svgs/EduCoin.svg" /><span class="my-totals-amount">
                  {{ coursesTotal ? coursesTotal : 0.0 }}</span
                >
              </span>
            </div>
          </div>
          <!-- END Courses Tab  -->

          <!-- Lessons Tab  -->
          <div v-if="tab === 'lessons'" class="tab-box">
            <div class="my-lessons-box">
              <template v-for="(course, index) in courses" :key="index">
                <div class="list-item">
                  <div class="course-copy">
                    <div class="course-title">
                      <span class="course-index">{{ index + 1 }}.</span>
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
            <div class="my-totals">
              <span class="my-totals-label">Total</span>
              <span class="my-totals-value">
                <img src="../assets/svgs/EduCoin.svg" /><span class="my-totals-amount">
                  {{ lessonTotal ? lessonTotal : 0.0 }}</span
                >
              </span>
            </div>
          </div>
        </div>
        <!-- END Lessons Tab  -->

        <div class="right">
          <div class="my-wallet-box">
            <div class="open-campus">
              <h2>OCID</h2>
              <div class="campus-id">{{ eduUsername ? eduUsername : "" }}</div>
            </div>
            <div class="my-account">
              <div class="account-address">
                {{ eduEthAddress ? formatAddress(eduEthAddress) : "0x000" }}
              </div>
              <button class="copy-button" @click="copyClipboard(eduEthAddress)">
                <img src="../assets/svgs/ContentCopy.svg" />
              </button>
            </div>
          </div>

          <div class="my-balance-box">
            <h2>Account</h2>
            <div class="my-account">
              <div class="account-address">
                {{ account ? formatAddress(account) : "0x000" }}
              </div>
              <button class="copy-button" @click="copyClipboard(account)">
                <img src="../assets/svgs/ContentCopy-White.svg" />
              </button>
            </div>
            <div class="my-wallet">
              <div class="my-wallet-amount">
                <img src="../assets/svgs/EduCoin.svg" /><span class="">
                  {{ balance ? truncate(balance, 10) : "0.00" }}</span
                >
              </div>
              <button class="refresh-button" @click="checkEDUBalance(account)">
                <img src="../assets/svgs/Refresh.svg" />
              </button>
            </div>
          </div>

          <div class="my-sales-box">
            <h2>Total Income</h2>
            <div class="my-sales">
              <div class="my-sales-amount">
                <img src="../assets/svgs/EduCoin.svg" /><span class="">
                  {{ salesTotal ? salesTotal : "0.00" }}</span
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
import { ref, computed, provide, watch, onMounted, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
// import { userObject } from "src/models/user";
import { courseObject } from "src/models/course";
import { lessonObject } from "src/models/lesson";
import { ethers } from "ethers";

// import { Web3Auth } from "@web3auth/modal";
// import {
//   CHAIN_NAMESPACES,
//   IProvider,
//   WEB3AUTH_NETWORK,
//   CustomChainConfig,
//   OPENLOGIN_NETWORK_TYPE,
// } from "@web3auth/base";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// import { MetamaskAdapter } from "@web3auth/metamask-adapter";
// import Web3 from "web3";

/* Components */
import SidebarView from "@/components/SidebarView.vue";
import OCIDButton from "@/components/Buttons/OCIDButton.vue";
import ViewNFTButton from "@/components/Buttons/ViewNFTButton.vue";

/* All Data stored in a JSON for now */
import testCourses from "../data/courses.json";
import testLessons from "../data/lessons.json";
// import nfts from "../data/nfts.json";

// interface BaseAdapterSettings {
//   clientId?: string;
//   sessionTime?: number;
//   chainConfig?: CustomChainConfig;
//   web3AuthNetwork?: OPENLOGIN_NETWORK_TYPE;
// }

const store = useStore();
const route = useRoute();
const router = useRouter();
const { loggedIn, account, balance, eduUsername, eduEthAddress, courses } = storeToRefs(store);

// let provider = <IProvider | null>null;

const tab = ref("courses");
const sales = ref(0);
const percentage = ref(0);

/* Get from https://dashboard.web3auth.io */
// const clientId = process.env.VUE_APP_WEB3AUTH_CLIENTID
//   ? process.env.VUE_APP_WEB3AUTH_CLIENTID
//   : "BCBiVM2Lq64l2CrPepvXIYpGFgRYScs4V4pURqood6-0QNL2rnfL685dIemTQAZY5AUMIJBdPXUEijLORlSAfZA";

// const metamaskAdapter = new MetamaskAdapter({
//   clientId,
//   sessionTime: 3600, // 1 hour in seconds
//   chainConfig: {
//     chainNamespace: CHAIN_NAMESPACES.EIP155 ? CHAIN_NAMESPACES.EIP155 : "eip155",
//     chainId: "0xA045C",
//     rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
//     blockExplorerUrl: "https://opencampus-codex.blockscout.com/",
//   },
//   web3AuthNetwork: "sapphire_devnet",
// });

/* You can change the adapter settings by calling the setAdapterSettings() function on the adapter instance. */
// metamaskAdapter.setAdapterSettings({
//   sessionTime: 86400, // 1 day in seconds
//   chainConfig: {
//     chainNamespace: CHAIN_NAMESPACES.EIP155 ? CHAIN_NAMESPACES.EIP155 : "eip155",
//     chainId: "0xA045C",
//     rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
//     blockExplorerUrl: "https://opencampus-codex.blockscout.com/",
//   },
//   web3AuthNetwork: "sapphire_devnet",
// });

// const chainConfig = {
//   chainId: "0xA045C", // Chain Id 656476 in hex
//   chainNamespace: CHAIN_NAMESPACES.EIP155 ? CHAIN_NAMESPACES.EIP155 : "eip155",
//   rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
//   displayName: "Open Campus Codex",
//   blockExplorer: "https://opencampus-codex.blockscout.com/",
//   ticker: "EDU",
//   tickerName: "EDU",
//   logo: "https://cryptologos.cc/logos/open-campus-edu-logo.png",
// };

// const privateKeyProvider = new EthereumPrivateKeyProvider({
//   config: { chainConfig: chainConfig },
// });

// const web3auth = new Web3Auth({
//   clientId,
//   web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
//   privateKeyProvider: privateKeyProvider,
// });

// it will add/update  the metamask adapter in to web3auth class
// web3auth.configureAdapter(metamaskAdapter);

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
};

const loadTab = (value: string) => {
  tab.value = value;
};

const truncate = (data: string, num: number) => {
  const reqdString = data.split("").slice(0, num).join("");
  return reqdString;
};

/* Display a readable user address */
const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
}

// const getUserInfo = async () => {
//   const user = await web3auth.getUserInfo();
//   store.setUser(user as userObject);
// };

/* Web3 Auth Method to get Balance */
// const getBalance = async () => {
//   if (!provider) {
//     NotfyProvider.error("Provider not initialized yet!");
//     return;
//   }
//   const web3 = new Web3(provider as any);
//   const address = (await web3.eth.getAccounts())[0];
//   store.setAccount(address);

//   /* Get user's balance in EDU Token */
//   const balance = web3.utils.fromWei(
//     await web3.eth.getBalance(address), // Balance is in wei
//     "ether"
//   );
//   store.setBalance(balance);
// };

// const signMessage = async () => {
//   provider = web3auth.provider;
//   if (!provider) {
//     NotfyProvider.error("Provider not initialized yet!");
//     return;
//   }
//   const web3 = new Web3(provider as any);

//   // Get user's Ethereum public address
//   const fromAddress = (await web3.eth.getAccounts())[0];

//   const originalMessage = "YOUR_MESSAGE";

//   // Sign the message
//   const signedMessage = await web3.eth.personal.sign(
//     originalMessage,
//     fromAddress,
//     "test password!" // configure your own password here.
//   );
//   NotfyProvider.success(`"Message signed:" ${signedMessage}`);
// };

const salesTotal = computed(() => {
  let total = 0;
  total = coursesTotal.value + lessonTotal.value;
  // console.log(" Sales Total", total);
  return total;
});

const coursesTotal = computed(() => {
  let total = 0;
  testCourses.data.forEach((val) => {
    total += Number(val.price) * Number(val.sales); // or if you pass float numbers , use parseFloat()
  });
  // console.log("Courses Total", total);
  return total;
});

const lessonTotal = computed(() => {
  let total = 0;
  testLessons.data.forEach((val) => {
    total += Number(val.price) * Number(val.sales); // or if you pass float numbers , use parseFloat()
  });
  // console.log("Lessons Total", total);
  return total;
});

async function fetchCourses() {
  store.setCourses((testCourses.data as unknown) as courseObject[]);
}

async function fetchLessons() {
  store.setLessons((testLessons.data as unknown) as lessonObject[]);
}

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
    const store = useStore();
    store.setBalance(eduBalance);
  } catch (error) {
    console.log(error);
  }
}

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
      const store = useStore();
      store.setAccount(accounts[0]);

      /* Get our Account EDU Balance */
      await checkEDUBalance(accounts[0]);
    }
  } catch (error) {
    console.log(error);
  }
}

// onMounted(async () => {
//   const init = async () => {
//     try {
//       await web3auth.initModal();
//       provider = web3auth.provider;

//       if (web3auth.connected) {
//         console.log("Dashboard Web3Auth Connected", web3auth.connected);
//         store.setLoggedIn(true);
//         await getUserInfo();
//         await getBalance();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   init();
// });

watch(
  () => route.query.code,
  (newCode, oldCode) => {
    /* React to route changes */
    console.log("Code", route.query.code);
    console.log("State", route.query.state);
  }
)

onBeforeRouteUpdate(async (to, from) => {
  /* React to route changes */
  await checkIfWalletIsConnected();
  // userData.value = await fetchUser(to.params.id)
})

onMounted(async () => {

  const init = async () => {
    try {
      if (loggedIn.value) {
        console.log("MetaMask Connected", loggedIn.value);
        await checkIfWalletIsConnected();
      } else {
        router.push({ name: "home" });
      }
    } catch (error) {
      console.error(error);
    }
  };
  init();
});

onBeforeMount(async () => {
  sales.value = 0;
  percentage.value = 0;
  await fetchCourses();
  await fetchLessons();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.left {
  padding-top: 12px;

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

  .tab-switcher {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0 auto 20px;

    .tab-button {
      font-family: "Poppins", sans-serif;
      color: $black;
      font-size: 18px;
      font-weight: 600;
      line-height: 20px;
      margin-right: 16px;
      padding-bottom: 2px;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: 0.4s all linear;
      cursor: pointer;

      @include breakpoint($break-sm) {
        font-size: 16px !important;
      }

      &:hover,
      &:active,
      &:focus,
      &:focus-visible {
        border-bottom: 2px solid $grasp-blue;
      }
    }
    .tab-button.active {
      padding-bottom: 2px;
      border-bottom: 2px solid $grasp-blue;
    }
  }
  .tab-box {
    width: 90%;
    margin: 0;
  }
  .my-courses-box,
  .my-lessons-box {
    width: 100%;
    margin: 0;
  }
  .my-totals {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    margin: 8px 0 30px 0;

    .my-totals-label {
      font-family: "Poppins", sans-serif;
      color: $black;
      font-size: 18px;
      font-weight: 600;
      text-align: right;
      padding: 0 8px 0 0;
    }
    .my-totals-value {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: center;

      margin: 0;
      padding: 0;

      .my-totals-amount {
        font-family: "Poppins", sans-serif;
        color: $black;
        font-size: 18px;
        font-weight: 600;
        text-align: right;
      }
      img,
      svg {
        width: 22px;
        background: transparent;
        object-fit: contain;
        overflow: hidden;
        border-bottom: 1px solid transparent;
      }
    }
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

        .course-index {
          color: $black;
          padding-right: 8px;
        }
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
          text-wrap: nowrap;
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
        min-width: 180px;
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
            text-wrap: nowrap;
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
  padding: 60px 0 0 0;

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
    margin: 0 0 20px 0;

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
        color: $black;
        font-size: 19px;
        font-weight: 600;
        line-height: 26px;
        font-style: normal;
        text-align: left;
        margin-block-start: 0;
        margin-block-end: 0;
      }
      .campus-id {
        color: $grasp-blue;
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
    margin: 0 0 20px 0;

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
    margin: 0 0 20px 0;

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
