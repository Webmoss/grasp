<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            {{ user?.title ? user.title : "" }}
          </div>
          <div class="title-actions">
            <button class="back-button">Back</button>
            <button class="create-button">Edit</button>
          </div>
        </div>
        <p>Update your User Profile details and settings.</p>
      </div>
      <div class="line-divider"></div>
      <div class="user-date">
        <span class="user-date-label">Date:</span>
        {{ user?.created_date ? user.created_date : "" }}
      </div>
      <div class="user-excerpt">
        {{ user?.contact ? user.contact : "" }}
      </div>
      <div class="user-description">
        {{ user?.description ? user.description : "" }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { provide, onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
// import { useRoute } from "vue-router";
import { Notyf } from "notyf";

/* Components */
import SidebarView from "@/components/SidebarView.vue";

/* All Posts stored in a JSON */
import testUsers from "../data/users.json";

const store = useStore();
// const route = useRoute();
const { user } = storeToRefs(store);

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

async function fetchUser() {
  let filteredUser = testUsers.data.filter((user) => {
    // return user.id === route.params.id;
    return user.id === '1';
  });
  console.log("User Profile", filteredUser[0]);
  store.setUser(filteredUser[0] as any);
}

onBeforeMount(async () => {
  await fetchUser();
});
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

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
