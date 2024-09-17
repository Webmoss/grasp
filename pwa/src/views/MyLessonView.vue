<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            {{ lesson.title ? lesson.title : "" }}
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
import { ref, provide, onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { Notyf } from "notyf";

/* Components */
import SidebarView from "@/components/SidebarView.vue";

/* All Posts stored in a JSON */
import testLessons from "../data/lessons.json";

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

const store = useStore();
const route = useRoute();
const { lesson } = storeToRefs(store);

async function fetchLesson() {
  let filteredCourse = testLessons.data.filter((lesson) => {
    return lesson.id === route.params.id;
  });
  store.setLesson(filteredCourse[0] as any);
}

onBeforeMount(async () => {
  await fetchLesson();
});
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
  width: 98%;
  margin: 16px auto;
  border-bottom: 1px solid $grey-30;
}
</style>
