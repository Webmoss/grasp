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
      v-else-if="ocid && ocConnected"
      @click="logout()"
      :class="btnSize === 'large' ? 'ocid-wallet-button' : 'ocid-wallet-small-button'"
    >
      <img src="../../assets/svgs/Open-Campus-Icon.svg" /> Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { provide, onMounted, computed } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { Notyf } from "notyf";
import { OCAuthSandbox } from "@opencampus/ocid-connect-js";

defineProps({
  btnSize: {
    type: String,
    default: "large",
    required: false,
  },
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

const store = useStore();
const { loading, ocConnected, ocid } = storeToRefs(store);

const opts = {
  redirectUri: process.env.VUE_APP_AUTH_REDIRECT_URI
    ? process.env.VUE_APP_AUTH_REDIRECT_URI
    : "https://grasp.academy/dashboard",
  // referralCode: "GRASP",
  // clientId: process.env.VUE_APP_OCID_CLIENT_ID,
  // scope: "openid profile email",
};

console.log("OCID Opts:", opts);

const authSdk = computed(() => new OCAuthSandbox(opts));

const connect = async () => {
  console.log("Connect OCID");
  store.setLoading(true);

  try {
    // await authSdk.value.signInWithRedirect({ state: "opencampus" });
    await authSdk.value.handleLoginRedirect({ state: "opencampus" });

    await handleAuthState();
  } catch (error) {
    console.error("Connection error:", error);
    NotfyProvider.error("Error connecting Open Campus ID");
  } finally {
    store.setLoading(false);
  }
};

const handleAuthState = async () => {
  const authState = await authSdk.value.getAuthState();
  console.log("Auth State:", authState);

  if (authState.isAuthenticated) {
    store.setOcid(authState.idToken);
    store.setOcAccessToken(authState.accessToken);
    store.setOcConnected(true);
    await fetchUserInfo();
  } else {
    clearOCIDState();
  }
};

const fetchUserInfo = async () => {
  const authInfo = await authSdk.value.getAuthInfo();
  console.log("OC authInfo:", authInfo);

  store.setEduUsername(authInfo.edu_username);
  store.setEduEthAddress(authInfo.eth_address);
};

const fetchOCID = async () => {
  console.log("Fetch OCID");
  try {
    await handleAuthState();
  } catch (error) {
    console.error("Fetch OCID error:", error);
    NotfyProvider.error("Error fetching Open Campus ID information");
  }
};

const logout = async () => {
  console.log("Logout OCID");
  try {
    await authSdk.value.logout();
    clearOCIDState();
    NotfyProvider.success("Successfully logged out from Open Campus ID");
  } catch (error) {
    console.error("Logout error:", error);
    NotfyProvider.error("Error logging out from Open Campus ID");
  }
};

const clearOCIDState = () => {
  store.setOcid("");
  store.setOcConnected(false);
  store.setOcAccessToken("");
  store.setEduUsername("");
  store.setEduEthAddress("");
};

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
