<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            Terms &amp; Conditions
          </div>
          <div class="title-actions">
            <!-- <button class="back-button">Back</button> -->
            <!-- <button class="create-button">Create</button> -->
          </div>
        </div>
        <p>Terms &amp; Conditions of Usage</p>
      </div>
      <div class="row">
        <h2>More coming soon so stay tuned...</h2>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { provide } from "vue";
import { Notyf } from "notyf";

/* Components */
import SidebarView from "@/components/SidebarView.vue";

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
</script>
<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";
</style>
