<template>
  <div class="ocid-container">
    <button
      v-if="loading"
      :class="btnSize === 'large' ? 'ocid-wallet-button' : 'ocid-wallet-small-button'"
    >
      <img src="../../assets/svgs/Open-Campus-Icon.svg" /> Loading<span class="bolder"
        >...</span
      >
    </button>
    <button
      v-else-if="!ocConnected"
      @click="connect()"
      :class="btnSize === 'large' ? 'ocid-wallet-button' : 'ocid-wallet-small-button'"
    >
      <img src="../../assets/svgs/Open-Campus-Icon.svg" /> Connect&nbsp;<span
        class="bolder"
        >OCID</span
      >
    </button>
    <button
      v-else-if="eduUsername && ocConnected"
      @click="fetchOCID()"
      :class="btnSize === 'large' ? 'ocid-wallet-button' : 'ocid-wallet-small-button'"
    >
      <img src="../../assets/svgs/Open-Campus-Icon.svg" /> Open Campus
    </button>
    <!-- <button
      v-else="ocid && ocConnected"
      @click="logout()"
      :class="btnSize === 'large' ? 'ocid-wallet-button' : 'ocid-wallet-small-button'"
    >
      <img src="../../assets/svgs/Open-Campus-Icon.svg" /> Logout
    </button> -->
  </div>
</template>

<script setup lang="ts">
import { provide, onMounted } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { Notyf } from "notyf";
import { OCAuthSandbox } from "@opencampus/ocid-connect-js";

defineProps({
  btnSize: {
    type: String,
    required: false,
  },
});

const store = useStore();
const { loading, eduUsername, ocConnected } = storeToRefs(store);

const opts = {
  redirectUri: process.env.VUE_APP_AUTH_REDIRECT_URI
    ? process.env.VUE_APP_AUTH_REDIRECT_URI
    : "https://grasp.academy/dashboard",
  referralCode: "GRASP",
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

const connect = async () => {
  console.log("Connect OCID");

  store.setLoading(true);
  try {
    const authSdk = new OCAuthSandbox(opts);

    /* This returns code and state as query params BREAKS Netlify currently */
    // await authSdk.signInWithRedirect({
    //   state: "opencampus",
    // });

    await authSdk.handleLoginRedirect({
      state: "opencampus",
    });

    if (authSdk) {
      /* Get Auth State from Open Campus ID sdk */
      let authState = await authSdk.getAuthState();
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

      if (idToken) {
        /* Get Auth Info from Open Campus ID sdk */
        const authInfo = await authSdk.getAuthInfo();

        let eduUsername = authInfo.edu_username;
        store.setEduUsername(eduUsername);
        console.log("Edu Username:", eduUsername);

        let ethAddress = authInfo.eth_address;
        store.setEduEthAddress(ethAddress);
        console.log("Edu Eth Address:", ethAddress);
      }
    } else {
      NotfyProvider.error("Error connecting Open Campus ID!");
    }
    store.setLoading(false);
  } catch (error) {
    console.log("Error", error);
    store.setLoading(false);
  }
};

const fetchOCID = async () => {
  console.log("Fetch OCID");

  try {
    const authSdk = new OCAuthSandbox(opts);

    /* Get Auth State from Open Campus ID sdk */
    let authState = await authSdk.getAuthState();

    let accessToken = authState.idToken;
    store.setOcAccessToken(accessToken);
    console.log("OC Access Token:", accessToken);

    let idToken = authState.idToken;
    store.setOcid(idToken);
    console.log("OC ID:", idToken);

    let ocConnected = authState.isAuthenticated;
    store.setOcConnected(ocConnected);
    console.log("OC Connected:", ocConnected);

    if (ocConnected) {
      /* Get Auth Info from Open Campus ID sdk */
      const authInfo = await authSdk.getAuthInfo();
      console.log("OC authInfo:", authInfo);

      let eduUsername = authInfo.edu_username;
      store.setEduUsername(eduUsername);
      console.log("EDU Username:", eduUsername);

      let ethAddress = authInfo.eth_address;
      store.setEduEthAddress(ethAddress);
      console.log("EDU Eth Address:", ethAddress);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// const logout = async () => {
//   const authSdk = new OCAuthSandbox(opts);
//   await authSdk.logout();

//   store.setOcid("");
//   store.setOcConnected(false);
//   store.setOcAccessToken("");
// };

onMounted(async () => {
  await fetchOCID();
});
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.ocid-container {
  width: 100%;
  display: flex;
  flex-direction: row nowrap;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
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
  font-weight: 500;
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
    margin-right: 8px;
  }

  .bolder {
    font-size: 14px;
    font-weight: 600;
  }
}

.ocid-wallet-small-button {
  width: auto;
  height: 35px;
  display: flex nowrap;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: $white;
  background-color: $black;
  font-size: 14px;
  font-weight: 500;
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
    margin-right: 6px;
  }

  .bolder {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
