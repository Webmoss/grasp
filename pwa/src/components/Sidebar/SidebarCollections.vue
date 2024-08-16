<template>
  <ul class="collection-list">
    <li>
      <router-link
        :to="{ name: 'collection', params: { name: 'grasp' } }"
        class-active="active"
        class="list-button"
        ><img
          src="@/assets/images/Grasp-Icon.png"
          class="list-logo"
        />Grasp EDU Courses</router-link
      >
    </li>
    <li>
      <router-link
        :to="{ name: 'collection', params: { name: 'tinytap' } }"
        class-active="active"
        class="list-button"
        ><img
          src="@/assets/svgs/TinyTap.svg"
          class="list-logo"
        />TinyTap</router-link
      >
    </li>
    <li>
      <router-link
        :to="{ name: 'collection', params: { name: 'publisher' } }"
        class-active="active"
        class="list-button"
        ><img
          src="@/assets/svgs/PublisherNFT.svg"
          class="list-logo"
        />Open Campus Publisher</router-link
      >
    </li>
  </ul>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .collection-list {
    min-width: 240px;
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    background: $black;
    border: 1px solid rgb(69, 73, 77, 0.4);
    border-radius: 12px;
    padding: 8px 8px 4px;
    margin: 0 auto 5px;

    li {
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;
      border: 1px solid transparent;
      background-color: transparent;
      border-radius: 12px;
      margin-bottom: 4px;
      padding: 1px 8px;
      cursor: pointer;
      transition: border-color 0.6s linear;

      &:hover {
        border-color: rgb(69, 73, 77);
      }
      &:focus,
      &:focus-visible {
        outline: 2px auto -webkit-focus-ring-color;
      }

      .list-button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
        color: $white;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
      }
      .link-active {
        border-color: rgb(69, 73, 77);
      }

      img.list-logo {
        width: 34px;
        height: 34px;
        object-fit: contain;
        border-radius: 50%;
        display: flex;
        align-items: center;
        text-align: center;
        margin: 2px 5px 2px 0;
        overflow: hidden;
        @include breakpoint($break-sm) {
          width: 24px;
          height: 24px;
          margin: 1px 5px -5px 0;
        }
      }
    }
  }
</style>
