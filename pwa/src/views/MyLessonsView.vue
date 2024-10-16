<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">My Lessons</div>
          <div class="title-actions">
            <button class="create-button" @click="showHideModal()">Create Lesson</button>
          </div>
        </div>
        <p>Create a new lesson or view a list of all your lessons.</p>
      </div>
      <div class="main">
        <LessonSearch />
        <LessonsList :lessons="paginatedLessons" />
        <Pagination
          :current-page="pagination.page"
          :last-page="lastPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
    <LessonModal :showModal="showModal" :lesson="{}" @close="showHideModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, provide } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { lessonObject } from "@/models/lesson";
import { initialPagination } from "@/models/initialPagination";

/* Components */
import SidebarView from "@/components/SidebarView.vue";
import LessonSearch from "@/components/Lessons/LessonSearch.vue";
import LessonsList from "@/components/Lessons/LessonsList.vue";
import Pagination from "@/components/Filters/Pagination.vue";
import LessonModal from "@/components/Lessons/LessonModal.vue";

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
const { pagination, filter } = storeToRefs(store);

const lessons = ref(testLessons.data as unknown as lessonObject[]);
const showModal = ref(false);

const showHideModal = () => {
  showModal.value = !showModal.value;
};

// Initialize pagination if not already set
if (!pagination.value.page) {
  pagination.value = initialPagination();
}

const filteredLessons = computed(() => {
  let result = lessons.value;

  if (filter.value.search_term && filter.value.search_term !== '') {
    result = result.filter((lesson) =>
      lesson.title?.toLowerCase().includes(filter.value.search_term.toLowerCase())
    );
  }

  if (filter.value.search_categories && filter.value.search_categories.length > 0) {
    console.log("Search categories", filter.value.search_categories);
    result = result.filter((lesson) =>
      filter.value.search_categories.includes(lesson.category)
    );
  }

  if (filter.value.time_frame) {
    console.log("Time frame", filter.value.time_frame);
    switch (filter.value.time_frame) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime());
        break;
      case 'top-rated':
        result.sort((a, b) => b.sales - a.sales);
        break;
      // 'all' case doesn't need sorting
    }
  }
  console.log("Result", result);

  return result;
});

const lastPage = computed(() => Math.ceil(total.value / pagination.value.pageSize));
const total = computed(() => filteredLessons.value.length);

const paginatedLessons = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return filteredLessons.value.slice(start, end);
});

function handlePageChange(page: number) {
  pagination.value.page = page;
}

watch([filter, pagination], () => {
  pagination.value.page = 1;
}, { deep: true });

onMounted(() => {
  store.setLessons(lessons.value);
});
</script>
