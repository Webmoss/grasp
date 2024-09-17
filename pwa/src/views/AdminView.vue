<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">Admin Panel</div>
          <div class="title-actions">
            <button class="back-button">Back</button>
            <button class="create-button">Edit</button>
          </div>
        </div>
        <p></p>
      </div>

      <div class="tab-switcher">
        <div
          :class="tab === 'analytics' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('analytics')"
        >
          Analytics
        </div>
        <div
          :class="tab === 'sales' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('sales')"
        >
          Sales
        </div>
        <div
          :class="tab === 'reporting' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('reporting')"
        >
          Reporting
        </div>
      </div>

      <!-- Analytics Tab -->
      <div v-if="tab === 'analytics'" class="tab-box">
        <div class="line-divider"></div>
        <div class="user-date">
          <span class="user-date-label">Date:</span>
          {{ user?.created_date ? user.created_date : "" }}
        </div>
        <div class="user-excerpt">
          {{ user?.name ? user.name : "" }}
        </div>
        <div class="user-description">
          {{ user?.description ? user.description : "" }}
        </div>
      </div>
      <!-- END Analytics Tab -->
      <!-- Analytics Tab -->
      <div v-if="tab === 'sales'" class="tab-box"></div>
      <!-- END Analytics Tab -->
      <!-- Analytics Tab -->
      <div v-if="tab === 'reporting'" class="tab-box"></div>
      <!-- END Analytics Tab -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, provide, onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
// import { useRoute } from "vue-router";
import { Notyf } from "notyf";

/* Components */
import SidebarView from "@/components/SidebarView.vue";

/* All Posts stored in a JSON */
import testUsers from "../data/users.json";

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
const { user } = storeToRefs(store);

const tab = ref("analytics");

const loadTab = (value: string) => {
  tab.value = value;
};

async function fetchAdmin() {
  let filteredUser = testUsers.data.filter((user) => {
    return (
      user.id === "1" && user.wallet === "0xA1FCD7B2F6f36e6C14EbF77413bbE65DCEe97792"
    );
  });
  console.log("Admin Profile", filteredUser[0]);
  store.setUser(filteredUser[0] as any);
}

onBeforeMount(async () => {
  await fetchAdmin();
});
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

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
  width: 100%;
  margin: 0;
}

.user-date {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  margin: 0 0 16px 0;

  .user-date-label {
    color: $grey-90;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
  }
}

.user-excerpt {
  width: 100%;
  color: $grey-100;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  margin: 0 0 16px;
}

.user-description {
  width: 100%;
  color: $black;
  font-size: 15px;
  font-weight: normal;
  text-align: left;
  margin: 0;
}

.line-divider {
  width: 98%;
  margin: 16px auto;
  border-bottom: 1px solid $grey-30;
}
</style>
