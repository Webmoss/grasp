<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">Organisation</div>
          <div class="title-actions">
            <button class="back-button">Back</button>
            <button class="create-button">Add Members</button>
          </div>
        </div>
        <p>Update your Organisation details and settings.</p>
      </div>

      <div class="line-divider"></div>

      <div class="organisation-header">
        <button class="edit-link-button" @click="editLink('banner')">
          <img src="../assets/svgs/edit-square-white.svg" alt="Edit" />
        </button>
        <div class="organisation-banner">
          <img v-if="organisation.banner" :src="`../${organisation.banner}`" />
          <div v-if="organisation.category" class="category-indicator">
            {{ organisation.category }}
          </div>
        </div>
      </div>

      <div class="organisation-header-details">
        <div class="profile">
          <button class="edit-link-button" @click="editLink('profile')">
            <img src="../assets/svgs/edit-square-white.svg" alt="Edit" />
          </button>
          <img
            v-if="organisation.image"
            :src="organisation.image"
            :alt="organisation.title ? organisation.title : ''"
          />
        </div>
        <div class="organisation-header-detail">
          <button class="edit-link-button" @click="editLink('details')">
            <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
          </button>
          <div class="organisation-title">
            {{ organisation?.title ? organisation.title : "" }}
          </div>
          <div class="organisation-description">
            {{ organisation?.description ? organisation.description : "" }}
          </div>
        </div>
      </div>

      <div class="organisation-box-header">Contact Details</div>
      <div class="organisation-box">
        <button class="edit-link-button" @click="editLink('contacts')">
          <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
        </button>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Contact</span>
          {{ organisation?.contact ? organisation.contact : "" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Email</span>
          {{ organisation?.email ? organisation.email : "" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Phone</span>
          {{ organisation?.phone ? organisation.phone : "" }}
        </div>
      </div>

      <div class="organisation-box-header">Social Details</div>
      <div class="organisation-box">
        <button class="edit-link-button" @click="editLink('socials')">
          <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
        </button>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Website</span>
          {{ organisation?.website ? organisation.website : "" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Twitter</span>
          {{ organisation?.twitter ? organisation.twitter : "" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Discord</span>
          {{ organisation?.discord ? organisation.discord : "" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Telegram</span>
          {{ organisation?.telegram ? organisation.telegram : "" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">LinkedIn</span>
          {{ organisation?.linkedin ? organisation.linkedin : "" }}
        </div>
      </div>

      <div class="organisation-box-header">Location</div>
      <div class="organisation-box">
        <button class="edit-link-button" @click="editLink('location')">
          <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
        </button>
        <div class="organisation-box-value">
          <span class="organisation-box-label">City:</span>
          {{ organisation?.city ? organisation.city : "" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Country:</span>
          {{ organisation?.country ? organisation.country : "" }}
        </div>
      </div>

      <div class="organisation-box-header">Settings</div>
      <div class="organisation-box">
        <button class="edit-link-button" @click="editLink('settings')">
          <img src="../assets/svgs/edit-square-grey-40.svg" alt="Edit" />
        </button>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Enabled </span>
          {{ organisation?.enabled ? organisation.enabled : "" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Verified</span>
          {{ organisation?.verified ? organisation.verified : "False" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Blocked</span>
          {{ organisation?.blocked ? organisation.blocked : "False" }}
        </div>
      </div>

      <div class="organisation-box-header">Activity</div>
      <div class="organisation-box">
        <div class="organisation-box-value">
          <span class="organisation-box-label">Date</span>
          {{ organisation?.created_date ? organisation.created_date : "" }}
        </div>
        <div class="organisation-box-value">
          <span class="organisation-box-label">Last Updated</span>
          {{ organisation?.updated_date ? organisation.updated_date : "" }}
        </div>
      </div>

      <div class="line-divider"></div>

      <div class="title-bar">
        <div class="row">
          <div class="title-name">Members</div>
          <div class="title-actions">
            <button class="create-button">Add</button>
          </div>
        </div>
        <p>Add members to your Organisation.</p>
      </div>
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
import testOrganisation from "../data/organisations.json";

const store = useStore();
const route = useRoute();
const { organisation } = storeToRefs(store);

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

function editLink(value: string) {
  console.log("Edit", value);
}

async function fetchOrganisation() {
  let filteredOrganisation = testOrganisation.data.filter((organisation) => {
    // return organisation.id === route.params.id;
    return organisation.id === "1";
  });
  console.log("Organisation", filteredOrganisation[0]);
  store.setOrganisation(filteredOrganisation[0] as any);
}

onBeforeMount(async () => {
  await fetchOrganisation();
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
  z-index: 999;
  cursor: pointer;
}

.organisation-header {
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

  .organisation-banner {
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

  .category-indicator {
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

.organisation-header-details {
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

  .organisation-header-detail {
    width: 90%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .organisation-title {
    font-family: "Poppins", sans-serif;
    color: $grasp-blue;
    font-size: 28px;
    font-weight: 600;
    line-height: 35px;
    text-align: left;
    margin: 0;
  }

  .organisation-description {
    width: 100%;
    color: $black;
    font-size: 15px;
    font-weight: normal;
    text-align: left;
    margin: 0 0 20px 0;
  }
}

.organisation-box-header {
  font-family: "Poppins", sans-serif;
  color: $grey-80;
  width: 99%;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  margin: 0 0 4px 8px;
}
.organisation-box {
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

.organisation-box-value {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 14px;
  font-weight: 500;
  // text-decoration: none;
  // text-transform: uppercase;
  margin: 0 0 8px 0;

  .organisation-box-label {
    width: 120px;
    display: inline-block;
    color: $grey-90;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
  }
}

.organisation-date {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  margin: 0 0 16px 0;

  .organisation-date-label {
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
