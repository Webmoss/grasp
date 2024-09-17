<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">Profile</div>
          <div class="title-actions">
            <!-- <button class="back-button">Back</button> -->
            <!-- <button class="create-button">Add Members</button> -->
          </div>
        </div>
        <p></p>
      </div>

      <div class="tab-switcher">
        <div
          :class="tab === 'details' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('details')"
        >
          Details
        </div>
        <div
          :class="tab === 'activity' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('activity')"
        >
          Activity
        </div>
      </div>

      <!-- Details Tab  -->
      <div v-if="tab === 'details'" class="tab-box">
        <div class="user-header">
          <button class="edit-link-button" @click="editLink('banner')">
            <img src="../assets/svgs/edit-square-white.svg" alt="Edit" />
          </button>
          <div class="user-banner">
            <img v-if="user.banner" :src="`../${user.banner}`" />
            <div v-if="user.type" class="type-indicator">
              {{ user.type }}
            </div>
          </div>
        </div>

        <div class="user-header-details">
          <div class="profile">
            <button class="edit-link-button" @click="editLink('profile')">
              <img src="../assets/svgs/edit-square-white.svg" alt="Edit" />
            </button>
            <img
              v-if="user.profileImage"
              :src="`${user.profileImage}`"
              :alt="user.name ? user.name : ''"
            />
            <img
              v-else-if="user.image"
              :src="`${user.image}`"
              :alt="user.name ? user.name : ''"
            />
          </div>
          <div class="user-header-detail">
            <button class="edit-link-button" @click="editLink('details')">
              <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
            </button>
            <div class="user-title">
              {{ user?.title ? user.title : "" }} {{ user?.name ? user.name : "" }}
            </div>
            <div class="user-description">
              {{ user?.description ? user.description : "" }}
            </div>
          </div>
        </div>

        <div class="user-box-header">Contact Details</div>
        <div class="user-box">
          <button class="edit-link-button" @click="editLink('contacts')">
            <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
          </button>
          <div class="user-box-value">
            <span class="user-box-label">Username</span>
            {{ user?.username ? user.username : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Email</span>
            {{ user?.email ? user.email : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Phone</span>
            {{ user?.phone ? user.phone : "" }}
          </div>
        </div>

        <div class="user-box-header">Social Details</div>
        <div class="user-box">
          <button class="edit-link-button" @click="editLink('socials')">
            <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
          </button>
          <div class="user-box-value">
            <span class="user-box-label">Website</span>
            {{ user?.website ? user.website : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Twitter</span>
            {{ user?.twitter ? user.twitter : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Discord</span>
            {{ user?.discord ? user.discord : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Telegram</span>
            {{ user?.telegram ? user.telegram : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">LinkedIn</span>
            {{ user?.linkedin ? user.linkedin : "" }}
          </div>
        </div>

        <div class="user-box-header">Location</div>
        <div class="user-box">
          <button class="edit-link-button" @click="editLink('location')">
            <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
          </button>
          <div class="user-box-value">
            <span class="user-box-label">City:</span>
            {{ user?.city ? user.city : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Country:</span>
            {{ user?.country ? user.country : "" }}
          </div>
        </div>

        <div class="user-box-header">Settings</div>
        <div class="user-box">
          <button class="edit-link-button" @click="editLink('settings')">
            <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
          </button>
          <div class="user-box-value">
            <span class="user-box-label">Enabled </span>
            {{ user?.enabled ? user.enabled : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Verified</span>
            {{ user?.verified ? user.verified : "False" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Blocked</span>
            {{ user?.blocked ? user.blocked : "False" }}
          </div>
        </div>
      </div>
      <!-- END Details Tab  -->

      <!-- Activity Tab  -->
      <div v-if="tab === 'activity'" class="tab-box">
        <div class="user-box-header">Activity</div>
        <div class="user-box">
          <div class="user-box-value">
            <span class="user-box-label">Date</span>
            {{ user?.created_date ? user.created_date : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Last Updated</span>
            {{ user?.updated_date ? user.updated_date : "" }}
          </div>
        </div>
      </div>
      <!-- END Activity Tab  -->
      <!-- <div class="line-divider"></div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, provide, onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
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

const route = useRoute();
const store = useStore();
const { user } = storeToRefs(store);

const tab = ref("details");

function editLink(value: string) {
  console.log("Edit", value);
}

const loadTab = (value: string) => {
  tab.value = value;
};

async function fetchUser() {
  let filteredUser = testUsers.data.filter((user) => {
    // return user.id === (route.params.id as string);
    return user.id === "1";
  });
  store.setUser(filteredUser[0] as any);
}

onBeforeMount(async () => {
  await fetchUser();
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

.edit-link-button {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 26px;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 0;
  z-index: 999;
  cursor: pointer;
}

.user-header {
  width: 100%;
  height: 220px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: $grey-30;
  border: 0.5px solid $grey-40;
  border-radius: 8px;
  margin: 0 0 20px;
  padding: 0;
  overflow: hidden;

  .user-banner {
    width: 100%;
    height: 220px;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      object-position: center;
      margin: 0;
      padding: 0;
    }
  }

  .type-indicator {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: auto;
    outline: transparent solid 2px;
    outline-offset: 2px;
    border-radius: 9999px;
    transition: background-color 0.2s ease-out 0s;
    background: $white;
    font-size: 20px;
    text-align: center;
    text-wrap: nowrap;
    padding-inline: 16px;
    padding-top: 2px;
    padding-bottom: 2px;
    --badge-color: $grey-40;
    color: $black;
    box-shadow: none;
    border-width: 1.5px;
    border-style: solid;
    border-image: initial;
    border-color: #4d5358;
    z-index: 999999;
  }
}

.user-header-details {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;

  .profile {
    position: relative;
    width: 140px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    background: $grey-30;
    border: 0.5px solid $grey-40;
    border-radius: 8px;
    margin: 0 24px 24px 0;
    border-radius: 6px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }

  .user-header-detail {
    width: 90%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .user-title {
    font-family: "Poppins", sans-serif;
    color: $grasp-blue;
    font-size: 28px;
    font-weight: 600;
    line-height: 35px;
    text-align: left;
    margin: 0;
  }

  .user-description {
    width: 100%;
    color: $black;
    font-size: 15px;
    font-weight: normal;
    text-align: left;
    margin: 0 0 20px 0;
  }
}

.user-box-header {
  font-family: "Poppins", sans-serif;
  color: $grey-80;
  width: 99%;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  margin: 0 0 4px 8px;
}
.user-box {
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

.user-box-value {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 14px;
  font-weight: 500;
  // text-decoration: none;
  // text-transform: uppercase;
  margin: 0 0 8px 0;

  .user-box-label {
    width: 120px;
    display: inline-block;
    color: $grey-90;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
  }
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

.line-divider {
  width: 98%;
  margin: 16px auto;
  border-bottom: 1px solid $grey-30;
}
</style>
