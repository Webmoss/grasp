<template>
  <div class="sidebar">
    <div class="profile">
      <img
        v-if="user.profileImage"
        :src="user.profileImage"
        :alt="user.name ? user.name : ''"
      />
      <img v-else src="Grasp-Icon.png" alt="Grasp Academy" />
      <h3>{{ user.name }}</h3>
      <h3>{{ balance }}</h3>
      <code class="account-address">{{ account }}</code>
    </div>
    <ul>
      <li>
        <router-link :to="{ name: 'dashboard' }" active-class="active" exact>
          <span class="item">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'my-courses' }" active-class="active" exact>
          <span class="item">Courses</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'my-lessons' }" active-class="active" exact>
          <span class="item">Lessons</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'my-pnfts' }" active-class="active" exact>
          <span class="item">NFTS</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'terms' }" active-class="active" exact>
          <span class="item">Terms</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../store";

const store = useStore();
const { account, balance, user } = storeToRefs(store);
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.sidebar {
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  color: $white;
  background: $grasp-blue;
  padding: 10px 0 0 0;
  overflow: hidden;
  transition: all 0.5s ease;

  .profile {
    width: 75%;
    text-align: center;

    img {
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 6px;
      margin: 0;
    }
    h3 {
      color: $white;
      font-size: 16px;
      margin: 0 0 5px 0;
      text-align: left;
    }

    .account-address {
      width: 100%;
      color: $white;
      font-size: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  ul {
    width: 100%;
    list-style: none;
    text-decoration: none;
    margin-block-start: 10px;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    border-top: 0.25px solid $white;
    border-bottom: 0.25px solid $white;
    li {
      width: 100%;
      margin: 0;
      padding: 0;
      a {
        display: block;
        position: relative;
        padding: 14px 30px 14px 20px;
        color: $white;
        font-size: 16px;
        text-decoration: none;

        &:hover {
          color: $grasp-cyan;
        }

        .icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background-position: bottom;
          background-size: contain;
          cursor: pointer;

          &.no-pointer {
            cursor: default;
          }

          svg {
            margin-bottom: -2px;
          }
        }
        .item {
          margin-top: -5px;
        }
      }
      a.router-link-active,
      a.router-link-exact-active {
        color: $grasp-cyan;
      }
    }
  }
}
</style>
