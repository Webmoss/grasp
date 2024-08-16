<template>
  <header id="header">
    <div class="header-title">
      <img src="../assets/svgs/owl-white.svg" width="35" class="header-logo" />
      <router-link :to="{ name: 'home' }" active-class="active" exact
        ><h1>Grasp</h1>
      </router-link>
      <div class="mobile-connect">
        <ConnectButton btnSize="small" />
      </div>
    </div>
    <div class="header-menu">
      <nav class="header-navbar">
        <div class="menu-button-row">
          <ul>
            <li
              v-if="homeLink"
              class="menu-link active"
              @click="navigateAndScroll('home')"
            >
              Home
            </li>
            <li v-else>
              <router-link
                :to="{ name: 'home' }"
                class="menu-link"
                class-active="active"
                exact
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'courses' }"
                class="menu-link"
                class-active="active"
                exact
                >Courses</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'creators' }"
                class="menu-link"
                class-active="active"
                exact
                >Creators</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'marketplace', params: { name: 'tinytap' } }"
                class="menu-link"
                class-active="active"
                exact
                >Market</router-link
              >
            </li>
            <li v-if="loggedIn">
              <router-link
                :to="{ name: 'dashboard' }"
                class="menu-link"
                class-active="active"
                exact
                >Dashboard</router-link
              >
            </li>
          </ul>
        </div>
        <div class="right">
          <ConnectButton btnSize="small" />
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import ConnectButton from "@/components/Buttons/ConnectButton.vue";

const route = useRoute();
const store = useStore();
const { loggedIn } = storeToRefs(store);

const homeLink = computed(() => {
  return route.name === "home"
    ? true
    : false;
});

function scrollPageToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

function scrolltoId(to: any) {
  var access = document.getElementById(to);
  if (access) {
    access.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function navigateAndScroll(to: any) {
  if (route.name === to) {
    scrollPageToTop();
  } else {
    scrolltoId(to);
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: $grasp-blue;

  @include breakpoint($break-sm) {
    padding: 0;
    flex-direction: column;
  }

  .header-logo {
    margin: 0 8px 4px 16px;
  }

  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      color: $white;
      text-decoration: none;
    }

    @include breakpoint($break-md) {
      width: 98%;
      justify-content: flex-start;
      align-items: center;
      padding-left: 2%;
    }
    @include breakpoint($break-sm) {
      width: 99%;
      justify-content: flex-start;
      align-items: center;
      padding-left: 1%;
    }

    h1 {
      color: $white;
      font-size: 2em;
      margin-block-start: 0.3em;
      margin-block-end: 0.3em;
    }

    .mobile-connect {
      display: none;

      @include breakpoint($break-sm) {
        display: inline;
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }

      @include breakpoint($break-sm) {
        display: inline;
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .header-menu {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-end;
    align-items: center;

    @include breakpoint($break-sm) {
      width: 100%;
      height: auto;
      flex-direction: row wrap;
    }

    nav {
      width: 70%;
      display: flex;
      flex-direction: row;
      align-content: flex-end;
      justify-content: space-between;
      align-items: center;

      @include breakpoint($break-sm) {
        width: 100%;
        align-content: center;
      }

      @include breakpoint($break-sm) {
        text-align: left;
        padding: 0;
        height: auto;
        justify-content: center;
        align-items: center;
      }

      .menu-button-row {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        padding: 0;

        @include breakpoint($break-sm) {
          width: 98%;
          justify-content: space-evenly;
          margin: 0 auto;
        }

        ul {
          margin-block-start: 0;
          margin-block-end: 0;
          height: 26px;
        }

        .menu-link,
        a.menu-link {
          font-family: "Poppins", sans-serif;
          color: $white !important;
          font-size: 17px !important;
          font-weight: 500;
          line-height: 20px;
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: 0.6s all linear;
          cursor: pointer;

          @include breakpoint($break-sm) {
            font-size: 16px !important;
          }

          &:hover,
          &:active,
          &:focus,
          &:focus-visible {
            font-weight: 500;
            border-bottom: 2px solid $grasp-cyan;
          }
        }
        .menu-link.active {
          padding-bottom: 2px;
          font-weight: 500;
          border-bottom: 2px solid $grasp-cyan;
        }

        .router-link-active,
        .router-link-exact-active {
          color: $white;

          .item {
            color: $white;
            font-weight: 500;
            border-bottom: 2px solid $grasp-cyan;
          }
        }

        .menu-icon {
          margin: 0 0 -2px 0;
        }
      }

      @include breakpoint($break-sm) {
        > a {
          font-size: 16px;
          flex: row;
          display: flex;
          justify-content: center;
        }

        .right {
          @include breakpoint($break-sm) {
            display: none;
          }

          @include breakpoint($break-xs) {
            display: none;
          }
        }

        > i {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
