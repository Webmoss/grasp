<template>
  <header id="header">
    <div class="header-title">
      <img src="../assets/svgs/owl-white.svg" width="35" class="header-logo" />
      <router-link :to="{ name: 'home' }" active-class="active" exact
        ><h1>Grasp</h1>
      </router-link>
      <div class="mobile-connect">
        <ConnectWalletButton btnSize="small" />
      </div>
    </div>
    <div class="header-menu">
      <nav class="header-navbar">
        <div class="menu-button-row">
          <!-- <router-link
            :to="{ name: 'home' }"
            class-active="active"
            class="link-button"
            exact
            >Home</router-link
          >
          <router-link
            :to="{ name: 'courses' }"
            class-active="active"
            class="link-button"
            exact
            >Courses</router-link
          >
          <router-link
            :to="{ path: '/#goplus' }"
            class-active="active"
            class="link-button"
            exact
            >Plus</router-link
          > -->
          <ul>
            <li
              v-if="homeLinks"
              class="menu-link"
              @click="navigateAndScroll('home')"
            >
              Home
            </li>
            <li v-else>
              <router-link
                :to="{ name: 'home' }"
                class="menu-link"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'courses' }"
                class="menu-link"
                >Courses</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'creators' }"
                class="menu-link"
                >Creators</router-link
              >
            </li>
            <li
              v-if="homeLinks"
              class="menu-link"
              @click="navigateAndScroll('goplus')"
            >
              Plus
            </li>
            <li v-else>
              <router-link
                :to="{ path: '/#goplus' }"
                class="menu-link"
                >Plus</router-link
              >
            </li>
          </ul>
        </div>
        <div class="right">
          <ConnectWalletButton btnSize="small" />
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ConnectWalletButton from "../components/ConnectWalletButton.vue";

const route = useRoute();

const homeLinks = computed(() => {
  return route.name === "home" ? true : false;
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
      width: 65%;
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
          margin-block-end: 4px;
        }

        .menu-link,
        a.menu-link {
          font-family: "Poppins", sans-serif;
          color: $white !important;
          font-size: 17px !important;
          margin-right: 20px;
          padding-bottom: 1px;
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: 0.6s;
          cursor: pointer;

          @include breakpoint($break-sm) {
            font-size: 16px !important;
            margin-right: 8px;
          }

          &:hover,
          &:active,
          &:focus,
          &:focus-visible {
            border-bottom: 1.2px solid $grasp-cyan;
          }
        }
      }

     

      @include breakpoint($break-sm) {
        > a {
          font-size: 0.8em;
          margin-right: 15px;

          flex: row;
          display: flex;
          justify-content: center;

          &.active {
            font-weight: bold;
          }
        }

        .right {
          @include breakpoint($break-sm) {
            display: none;
          }

          @include breakpoint($break-sm) {
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
