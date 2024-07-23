<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            Lesson Title: {{ lesson.title ? lesson.title : "" }}
          </div>
          <div class="title-actions">
            <button class="back-button">Back</button>
            <button class="create-button">Edit</button>
          </div>
        </div>
        <p>Update your lessons content, details and settings.</p>
      </div>
      <div class="line-divider"></div>
      <div class="lesson-date">
        <span class="lesson-date-label">Date:</span>
        {{ lesson.created_date ? lesson.created_date : "" }}
      </div>
      <div class="lesson-excerpt">
        {{ lesson.excerpt ? lesson.excerpt : "" }}
      </div>
      <div class="lesson-description">
        {{ lesson.description ? lesson.description : "" }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { useStore } from "@/store";
import { Notyf } from "notyf";
import SidebarView from "@/components/SidebarView.vue";

const store = useStore();
// const { lesson } = storeToRefs(store);

const lesson = ref({
  id: 1,
  name: "Introduction",
  type: "article",
  category: "EduChain",
  title: "Introduction",
  excerpt:
    "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
  description:
    "Open Campus ID is Open Campus' blockchain protocol that issues Decentralized Identifiers (DIDs) in the form of Soulbound Tokens (SBTs), non-transferable NFTs that are virtual representations of learners' online personas. The primary benefit for learners is they have control over what information is associated with their OC IDs. They can decide which pieces of information they want to share and when they want to share them, including their learning profile.",
  banner: "Grasp-Banner.png",
  image: "Grasp-Icon.png",
  created_date: "30/03/2023",
  updated_at: "",
  price: 10,
});

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
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.lesson-date {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  margin: 0 0 16px 0;

  .lesson-date-label {
    color: $grey-90;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
  }
}

.lesson-excerpt {
  width: 100%;
  color: $grey-100;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  margin: 0 0 16px;
}

.lesson-description {
  width: 100%;
  color: $black;
  font-size: 15px;
  font-weight: normal;
  text-align: left;
  margin: 0;
}

.line-divider {
  width: 99%;
  margin: 16px auto;
  border-bottom: 1px solid $grey-30;
}
</style>
