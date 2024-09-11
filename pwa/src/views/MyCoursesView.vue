<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">My Courses</div>
          <div class="title-actions">
            <button class="create-button" @click="showHideModal()">Create Course</button>
            <!-- <button class="back-button">Back</button> -->
          </div>
        </div>
        <p>Create new course or view a list of all your courses.</p>
      </div>
      <div class="main">
        <CourseSearch />
        <CoursesList :courses="courses" />
        <CoursesPagination
          :pagination="pagination"
          :total="total"
          :last-page="lastPage"
        />
      </div>
    </div>
    <CourseModal :showModal="showModal" @close="showHideModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, provide, watch } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { courseObject } from "src/models/course";

/* Components */
import SidebarView from "@/components/SidebarView.vue";
import CourseSearch from "@/components/CoursesComponents/CourseSearch.vue";
import CoursesList from "@/components/CoursesComponents/CoursesList.vue";
import CoursesPagination from "@/components/CoursesComponents/CoursesPagination.vue";
import CourseModal from "@/components/CoursesComponents/CourseModal.vue";

/* All Posts stored in a JSON */
import testCourses from "../data/courses.json";

const store = useStore();
const { courses, pagination, filter } = storeToRefs(store);

const showModal = ref(false);
const lastPage = ref(1);
const lastSearchTerm = ref("");

const newSearchTerm = computed(() => {
  return filter.value.search_term;
});

const shouldGetData = computed(() => {
  return newSearchTerm.value !== lastSearchTerm.value;
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

const total = computed(() => {
  return courses.value ? courses.value.length : 0;
});

const showHideModal = () => {
  showModal.value = !showModal.value;
};

async function fetchCourses() {
  if (filter.value.search_term !== "") {
    let filteredCourses = testCourses.data.filter((course) => {
      return course.title.toLowerCase().includes(filter.value.search_term.toLowerCase());
    });
    store.setCourses((filteredCourses as unknown) as courseObject[]);
  } else {
    store.setCourses((testCourses.data as unknown) as courseObject[]);
  }
}

watch(shouldGetData, async (newValue) => {
  if (newValue) {
    await fetchCourses();
  }
  lastSearchTerm.value = newSearchTerm.value as string;
});

onBeforeMount(async () => {
  await fetchCourses();
});
</script>
