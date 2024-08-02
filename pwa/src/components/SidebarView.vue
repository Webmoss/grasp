<template>
  <div class="sidebar">
    <!-- <div class="profile">
      <img
        v-if="user.profileImage"
        :src="user.profileImage"
        :alt="user.name ? user.name : ''"
      />
      <img v-else src="Grasp-Icon.png" alt="Grasp Academy" />
      <h3 v-if="user.name">{{ user.name }}</h3>
    </div> -->
    <ul>
      <li>
        <router-link :to="{ name: 'dashboard' }" active-class="active" exact>
          <img src="../assets/svgs/dashboard-icon.svg" class="icon" />
          <span class="item">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'my-courses' }" active-class="active" exact>
          <img src="../assets/svgs/courses-icon.svg" class="icon" />
          <span class="item">Courses</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'my-lessons' }" active-class="active" exact>
          <img src="../assets/svgs/lessons-icon.svg" class="icon" />
          <span class="item">Lessons</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'my-nfts' }" active-class="active" exact>
          <img src="../assets/svgs/nfts-icon.svg" class="icon" />
          <span class="item">Edu NFTS</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'terms' }" active-class="active" exact>
          <img src="../assets/svgs/terms-icon.svg" class="icon" />
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
const { user } = storeToRefs(store);
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
  padding: 4px 0 0 0;
  overflow: hidden;
  transition: all 0.5s ease;

  .profile {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: flex-start;

    img {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 6px;
      margin: 0;
    }
    h3 {
      color: $white;
      font-size: 16px;
      margin: 0 0 5px 0;
      text-align: left;
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
    padding: 10px 0;
    border-top: 0.25px solid $white;
    border-bottom: 0.25px solid $white;
    li {
      width: 100%;
      margin: 0;
      padding: 0;
      a {
        display: block;
        position: relative;
        color: $white;
        font-size: 17px;
        text-decoration: none;
        padding: 12px 30px 12px 20px;

        &:hover {
          color: $grasp-cyan;
        }

        .icon {
          width: 22px;
          height: 22px;
          margin: 0 8px -4px 0;
          display: inline-block;
          background-position: bottom;
          background-size: contain;
          cursor: pointer;

          &.no-pointer {
            cursor: default;
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
