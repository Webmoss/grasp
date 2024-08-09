<template>
  <div class="ocid-container">
    <button
      v-if="!ocid && !ocConnected"
      @click="connect()"
      :class="
        btnSize === 'large' ? 'ocid-wallet-button' : 'ocid-wallet-small-button'
      "
    >
      <img src="../../assets/svgs/Open-Campus-Icon.svg" /> {{ loading ? "Loading OCID" : "Connect OCID" }}
    </button>
    <button
      v-else
      @click="logout()"
      :class="
        btnSize === 'large' ? 'ocid-wallet-button' : 'ocid-wallet-small-button'
      "
    >
      <img src="../../assets/svgs/Open-Campus-Icon.svg" /> Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { provide, onMounted } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
// import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import { OCAuthSandbox } from "@opencampus/ocid-connect-js";

defineProps({
  btnSize: {
    type: String,
    required: false,
  },
});

// const router = useRouter();
const store = useStore();
const { loading, ocid, ocConnected } = storeToRefs(store);

const opts = {
  redirectUri: process.env.VUE_APP_AUTH_REDIRECT_URI
  ? process.env.VUE_APP_AUTH_REDIRECT_URI
  : "http://localhost:8080/dashboard",
};

console.log("OCID Opts:", opts);

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
    const authSdk = new OCAuthSandbox(opts);
    await authSdk.signInWithRedirect({
      state: "opencampus",
    });

    if (authSdk) {
      /* Get Auth State from Open Campus ID sdk */
      let authState = authSdk.getAuthState();

      console.log("Auth State:", authState);

      let accessToken = authState.idToken;
      store.setOcAccessToken(accessToken);
      console.log("OC Access Token:", accessToken);

      let idToken = authState.idToken;
      store.setOcid(idToken);
      console.log("OC ID:", idToken);

      let ocConnected = authState.isAuthenticated;
      store.setOcConnected(ocConnected);
      console.log("OC Connected:", ocConnected);

      if(idToken && ocConnected) {
        /* Get Auth Info from Open Campus ID sdk */
        const authInfo = await authSdk.getAuthInfo();

        let eduUsername = authInfo.edu_username;
        store.setEduUsername(eduUsername);
        console.log("Edu Username:", eduUsername);

        let ethAddress = authInfo.eth_address;
        store.setEduEthAddress(ethAddress);
        console.log("Edu Eth Address:", ethAddress);
        // getUserInfo();
      }

      // NotfyProvider.success(`"Open Campus ID connected: " ${idToken}`);
    } else {
      NotfyProvider.error("Error connecting Open Campus ID!");
    }
    store.setLoading(false);
  } catch (error) {
    console.log("Error", error);
    store.setLoading(false);
  }
}

// const getUserInfo = async () => {
//   try {
//     const authSdk = new OCAuthSandbox(opts);
//     const authInfo = await authSdk.getAuthInfo();

//     let eduUsername = authInfo.edu_username;
//     store.setEduUsername(eduUsername);
//     console.log("Edu Username:", eduUsername);

//     let ethAddress = authInfo.eth_address;
//     store.setEduEthAddress(ethAddress);
//     console.log("Edu Eth Address:", ethAddress);

//     store.setLoading(false);
//   } catch (error) {
//     console.log("Error", error);
//     store.setLoading(false);
//   }
// };

// const getBalance = async () => {
//   if (!provider) {
//     NotfyProvider.error("Provider not initialized yet!");
//     return;
//   }
//   const web3 = new Web3(provider as any);
//   const address = (await web3.eth.getAccounts())[0];
//   store.setAccount(address);

//   /* Get user's balance in EDU Token */
//   const balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
//   store.setBalance(balance);
// };

const logout = async () => {
  const authSdk = new OCAuthSandbox();
  await authSdk.logout();
  store.setOcid("");
  store.setOcConnected(false);
  store.setOcAccessToken("");
  // router.push({ name: "home" });
};

onMounted(async () => {
  const init = async () => {
    try {
      // const { ocAuth } = useOCAuth();

      // let authInfo = ocAuth.getAuthInfo();

      // let eduUsername = authInfo.edu_username;
      // store.setEduUsername(eduUsername);
      // console.log("Edu Username:", eduUsername);

      // let ethAddress = authInfo.eth_address;
      // store.setEduEthAddress(ethAddress);
      // console.log("Edu Eth Address:", ethAddress);

      // const authSdk = new OCAuthSandbox(opts);

      // let authState = authSdk.getAuthState();

      // let accessToken = authState.idToken;
      // store.setOcAccessToken(accessToken);
      // console.log("OC Access Token:", accessToken);

      // let idToken = authState.idToken;
      // store.setOcid(idToken);
      // console.log("OC ID:", idToken);

      // let ocConnected = authState.isAuthenticated;
      // store.setOcConnected(ocConnected);
      // console.log("OC Connected:", ocConnected);

      // const authInfo = await authSdk.getAuthInfo();

      // let eduUsername = authInfo.edu_username;
      // store.setEduUsername(eduUsername);
      // console.log("Edu Username:", eduUsername);

      // let ethAddress = authInfo.eth_address;
      // store.setEduEthAddress(ethAddress);
      // console.log("Edu Eth Address:", ethAddress);

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

.ocid-container {
  display: flex;
  flex-direction: row;
  margin: 0;
  max-width: 550px;
}

.ocid-wallet-button {
  width: auto;
  height: 42px;

  display: flex;
  flex-direction: row nowrap;
  align-content: center;
  align-items: center;
  justify-content: center;

  color: $white;
  background-color: $black;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid $black;
  border-radius: 30px;
  padding-left: 11px;
  padding-right: 11px;

  transition: all 0.5s linear;
  cursor: pointer;

  &:hover {
    color: $grasp-cyan;
  }

  img,
  svg {
    width: 24px;
    background: transparent;
    object-fit: contain;
    overflow: hidden;
    margin-right: 10px;
  }
}

.ocid-wallet-small-button {
  width: auto;
  height: 34px;

  display: flex nowrap;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;

  color: $white;
  background-color: $black;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid $black;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
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
    margin-right: 10px;
  }
}
</style>
