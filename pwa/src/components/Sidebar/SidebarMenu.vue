<template>
  <div class="menu-button-row">
    <router-link
      :to="{ name: 'home' }"
      class-active="active"
      class="link-button"
      >Home</router-link
    >
    <router-link
      :to="{ name: 'stake' }"
      class-active="active"
      class="link-button"
      >Stake</router-link
    >
    <router-link
      :to="{ name: 'swap' }"
      class-active="active"
      class="link-button"
      >Swap</router-link
    >
  </div>
  <div class="menu-button-row">
    <router-link
      :to="{ name: 'search' }"
      class-active="active"
      class="link-button"
      >Search</router-link
    >
    <router-link
      :to="{ name: 'shop' }"
      class-active="active"
      class="link-button"
      >Shop</router-link
    >
    <router-link
      :to="{ name: 'apecoin' }"
      class-active="active"
      class="link-button"
      >DAO</router-link
    >
  </div>
</template>
<style lang="scss" scoped>
  .menu-button-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    padding: 0;
    margin: 15px auto 0;
  }
</style>
