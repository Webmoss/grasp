<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">My Profile</div>
          <div class="title-actions">
            <button class="create-button" @click="showHideModal()">
              Add Organisation
            </button>
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
            <img v-if="user.banner" :src="`../../${user.banner}`" />
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
              :src="`../${user.profileImage}`"
              :alt="user.name ? user.name : ''"
            />
            <img
              v-else-if="user.image"
              :src="`../${user.image}`"
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
            <div class="user-joined">
              Joined {{ user?.created_date ? user.created_date : "" }}
            </div>
            <div class="user-description">
              {{ user?.description ? user.description : "" }}
            </div>
          </div>
        </div>

        <div v-if="user?.role && organisation?.title" class="user-box-header">
          Organisation
          <div class="role-indicator">
            {{ prettyName(user.role) }}
          </div>
        </div>
        <div v-if="user?.role && organisation?.title" class="user-box">
          <button class="edit-link-button" @click="editLink('organisation')">
            <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
          </button>
          <div class="user-box-value">
            <span class="user-box-label">Title</span>
            {{ organisation?.title ? organisation.title : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Description</span>
          </div>
          <div class="user-box-value">
            {{ organisation?.description ? organisation.description : "" }}
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

        <div class="user-box-header">Social Details</div>
        <div class="user-box">
          <button class="edit-link-button" @click="editLink('socials')">
            <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
          </button>
          <div class="user-box-value">
            <span class="user-box-label">Website</span>
            {{ user?.website?.title ? user.website.title : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Twitter</span>
            {{ user?.twitter?.title ? user.twitter.title : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Discord</span>
            {{ user?.discord?.title ? user.discord.title : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">Telegram</span>
            {{ user?.telegram?.title ? user.telegram.title : "" }}
          </div>
          <div class="user-box-value">
            <span class="user-box-label">LinkedIn</span>
            {{ user?.linkedin?.title ? user.linkedin.title : "" }}
          </div>
        </div>
        <template v-if="user.role === 'admin'">
          <div class="user-box-header">Admin Settings</div>
          <div class="user-checkbox">
            <button class="edit-link-button" @click="editLink('settings')">
              <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
            </button>
            <div class="user-checkbox-value">
              <span class="user-checkbox-label">Enabled </span>
              <img
                v-if="!user.enabled"
                src="../assets/svgs/CheckBoxOutline.svg"
                height="22"
              />
              <img v-if="user.enabled" src="../assets/svgs/CheckBox.svg" height="22" />
            </div>
            <div class="user-checkbox-value">
              <span class="user-checkbox-label">Verified</span>
              <img
                v-if="!user.verified"
                src="../assets/svgs/CheckBoxOutline.svg"
                height="22"
              />
              <img v-if="user.verified" src="../assets/svgs/CheckBox.svg" height="22" />
            </div>
            <div class="user-checkbox-value">
              <span class="user-checkbox-label">Blocked</span>
              <img
                v-if="!user.blocked"
                src="../assets/svgs/CheckBoxOutline.svg"
                height="22"
              />
              <img v-if="user.blocked" src="../assets/svgs/CheckBox.svg" height="22" />
            </div>
          </div>
        </template>
      </div>
      <!-- END Details Tab  -->

      <ActivityList v-if="tab === 'activity'" :label="'Profile'" :userId="user.id" />
    </div>
    <OrganisationModal :showModal="showModal" @close="showHideModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, provide, onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { userObject } from "src/models/user";
import { organisationObject } from "src/models/organisation";
import { prettyName } from "@/services/prettyName";
import { Notyf } from "notyf";

/* Components */
import SidebarView from "@/components/SidebarView.vue";
import ActivityList from "@/components/Admin/ActivityList.vue";
import OrganisationModal from "@/components/OrganisationComponents/OrganisationModal.vue";

/* All Posts stored in a JSON */
import testUsers from "../data/users.json";
import testOrganisation from "../data/organisations.json";

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
const { user, organisation } = storeToRefs(store);

const tab = ref("details");
const showModal = ref(false);

const editLink = (value: string) => {
  console.log("Edit", value);
};

const loadTab = (value: string) => {
  tab.value = value;
};

const showHideModal = () => {
  showModal.value = !showModal.value;
};

async function fetchUser() {
  const userId = (route.params.id as string) || "1"; // DEV NOTE: Default to 1 for now
  const filteredUser = testUsers.data.find((user) => user.id === userId);

  if (filteredUser) {
    store.setUser((filteredUser as unknown) as userObject);

    const filteredOrganisation = testOrganisation.data.find(
      (org) => org.id === filteredUser.orgId
    );
    if (filteredOrganisation) {
      store.setOrganisation((filteredOrganisation as unknown) as organisationObject);
    }
  }
}

onBeforeMount(async () => {
  await fetchUser();
});
</script>

<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

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
    font-size: 18px;
    text-transform: capitalize;
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
    border-radius: 6px;
    margin: 0 24px 24px 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
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
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
    text-align: left;
    margin: 0;
  }

  .user-joined {
    color: $grey-60;
    font-size: 15px;
    font-weight: normal;
    text-align: left;
    margin: 0 0 4px 0;
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
  width: 99%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  color: $grey-90;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  margin: 0 0 4px 8px;

  .role-indicator {
    width: auto;
    outline: transparent solid 1px;
    outline-offset: 1px;
    border-radius: 9999px;
    transition: background-color 0.2s ease-out 0s;
    background: $grasp-cyan;
    font-size: 12px;
    text-align: center;
    text-wrap: nowrap;
    padding-inline: 12px;
    padding-top: 2px;
    padding-bottom: 2px;
    --badge-color: $grey-40;
    color: $black;
    box-shadow: none;
    border-width: 1.5px;
    border-style: solid;
    border-image: initial;
    border-color: #4d5358;
    margin-left: 26px;
  }
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
  width: 98%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;
  padding: 0 1% 0 0;

  .user-box-label {
    width: 140px;
    display: inline-block;
    color: $grey-90;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
  }
}

.user-checkbox {
  width: 99%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0 0 24px 0;
  padding: 12px 0 12px 12px;

  .user-checkbox-value {
    font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: $grey-90;
    font-size: 14px;
    font-weight: 600;
    margin: 0 48px 0 0;
    padding: 0;

    .user-checkbox-label {
      color: $grey-90;
      font-size: 15px;
      font-weight: 600;
      line-height: 20px;
      text-wrap: nowrap;
      font-style: normal;
      text-transform: capitalize;
      margin: 0 24px 0 0;
    }

    img,
    svg {
      width: 20px;
      margin-bottom: -6px;
    }
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
