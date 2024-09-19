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
          :class="tab === 'users' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('users')"
        >
          Users
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
        <div class="box-header">Analytics</div>

        <div class="box">
          <div class="box-value">
            <span class="box-label">Date</span>
            {{ user?.created_date ? user.created_date : "" }}
          </div>
        </div>
        <div class="line-divider"></div>

        <!--
        <div class="user-excerpt">
          {{ user?.name ? user.name : "" }}
        </div>
        <div class="line-divider"></div>
        <div class="user-description">
          {{ user?.description ? user.description : "" }}
        </div> -->
      </div>
      <!-- END Analytics Tab -->

      <!-- Sales Tab -->
      <div v-if="tab === 'sales'" class="tab-box">
        <div class="box-header">Sales</div>
        <div class="box">
          <div class="box-value">
            <span class="box-label">Date</span>
            {{ user?.created_date ? user.created_date : "" }}
          </div>
        </div>
        <div class="line-divider"></div>
      </div>
      <!-- END Sales Tab -->

      <!-- Users Tab -->
      <div v-if="tab === 'users'" class="tab-box">
        <div class="box-header">Users</div>
        <div class="box">
          <div class="box-value">
            <span class="box-label">Date</span>
            {{ user?.created_date ? user.created_date : "" }}
          </div>
        </div>
        <div class="line-divider"></div>
        <template v-for="(user, index) in testUsers.data" :key="index">
          <div class="list-item">
            <div class="list-item-box">
              <div class="list-item-title">
                <span class="list-item-index">{{ index + 1 }}.</span>
                {{ user.title ? user.title : "" }}
              </div>
            </div>
            <div class="list-item-box">
              <div class="list-item-title">
                {{ user.name ? user.name : "" }}
              </div>
            </div>
            <div class="list-item-box">
              <div class="list-item-title">
                {{ user.orgId ? user.orgId : "" }}
              </div>
            </div>
            <div class="list-item-box">
              <div class="list-item-title">
                {{ user.campusId ? user.campusId : "" }}
              </div>
            </div>
            <div class="list-item-sales">
              <div v-if="user && user.type" class="list-item-category">
                <span class="category-indicator">{{ user.type ? user.type : "" }}</span>
              </div>
            </div>
            <div class="list-item-sales">
              <div class="sales">
                <span class="list-item-index">Sales: </span>
                <img src="../assets/svgs/EduCoin.svg" /><span class="sales-amount">
                  {{ sales ? sales : "0.00" }}</span
                >
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- END Users Tab -->

      <!-- Reporting Tab -->
      <div v-if="tab === 'reporting'" class="tab-box">
        <div class="box-header">Reporting</div>
        <div class="box">
          <div class="box-value">
            <span class="box-label">Date</span>
            {{ user?.created_date ? user.created_date : "" }}
          </div>
        </div>
        <div class="line-divider"></div>
      </div>
      <!-- END Reporting Tab -->
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
const sales = ref();

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

.box-header {
  font-family: "Poppins", sans-serif;
  color: $grey-80;
  width: 99%;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  margin: 0 0 4px 8px;
}
.box {
  width: 99%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0 0 24px 0;
  padding: 12px 0 4px 12px;
}

.box-value {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 14px;
  font-weight: 500;
  // text-decoration: none;
  // text-transform: uppercase;
  margin: 0 0 8px 0;

  .box-label {
    width: 140px;
    display: inline-block;
    color: $grey-100;
    font-size: 14px;
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
  padding: 6px 0;
  transition: all 0.5s linear;

  .list-item-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;
    align-items: flex-start;
    padding: 0;

    .list-item-index {
      color: $black;
      font-size: 12px;
      font-weight: 600;
      padding: 0 12px;
    }

    .list-item-title {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;

      font-family: "Poppins", sans-serif;
      color: $grey-90;
      width: 100%;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      margin: 0;
    }
  }

  .list-item-sales {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 0 8px;

    .list-item-category {
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
    .list-item-index {
      color: $black;
      font-weight: 500;
      padding: 0 12px;
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
        font-size: 14px;
        font-weight: 500;
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
</style>
