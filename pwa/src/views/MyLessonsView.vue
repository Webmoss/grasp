<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">My Lessons</div>
          <div class="title-actions">
            <button class="create-button" @click="showHideModal()">Create Lesson</button>
            <!-- <button class="back-button">Back</button> -->
          </div>
        </div>
        <p>Create new lesson or view a list of all your lessons.</p>
      </div>
      <div class="main">
        <LessonSearch />
        <LessonsList :lessons="lessons" />
        <LessonsPagination
          :pagination="pagination"
          :total="total"
          :last-page="lastPage"
        />
      </div>
    </div>
    <LessonModal :showModal="showModal" :lesson="{}" @close="showHideModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, provide, watch } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { lessonObject } from "src/models/lesson";

/* Components */
import SidebarView from "@/components/SidebarView.vue";
import LessonSearch from "@/components/LessonsComponents/LessonSearch.vue";
import LessonsList from "@/components/LessonsComponents/LessonsList.vue";
import LessonsPagination from "@/components/LessonsComponents/LessonsPagination.vue";
import LessonModal from "@/components/LessonsComponents/LessonModal.vue";

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
const { lessons, pagination, filter } = storeToRefs(store);

const showModal = ref(false);
const lastPage = ref(1);
const lastSearchTerm = ref("");

const newSearchTerm = computed(() => {
  return filter.value.search_term;
});

const shouldGetData = computed(() => {
  return newSearchTerm.value !== lastSearchTerm.value;
});

const total = computed(() => {
  return lessons.value ? lessons.value.length : 0;
});

const showHideModal = () => {
  showModal.value = !showModal.value;
};

async function fetchLessons() {
  if(filter.value.search_term !== '') {
    let filteredLessons = testLessons.data.filter((course) => {
      return course.title.toLowerCase().includes(filter.value.search_term.toLowerCase());
    });
    store.setLessons((filteredLessons as unknown) as lessonObject[]);
  } else {
    store.setLessons((testLessons.data as unknown) as lessonObject[]);
  }
}

watch(shouldGetData, (newValue) => {
  if (newValue) {
    fetchLessons();
  }
  lastSearchTerm.value = newSearchTerm.value as string;
});

onBeforeMount(async () => {
  await fetchLessons();
});
</script>
