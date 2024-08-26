<template>
  <section id="courses">
    <div class="main">
      <CoursesBanner />
      <CourseSearch />
      <CoursesList :courses="courses" />
      <CoursesPagination
        :pagination="pagination"
        :total="total"
        :last-page="lastPage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, watch } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { courseObject } from "src/models/course";

/* Components */
import CoursesBanner from "@/components/CoursesComponents/CoursesBanner.vue";
import CourseSearch from "@/components/CoursesComponents/CourseSearch.vue";
import CoursesList from "@/components/CoursesComponents/CoursesList.vue";
import CoursesPagination from "@/components/CoursesComponents/CoursesPagination.vue";

/* All Posts stored in a JSON */
import testCourses from "../data/courses.json";

const store = useStore();
const { courses, pagination, filter } = storeToRefs(store);

const lastPage = ref(1);
const lastSearchTerm = ref("");

const newSearchTerm = computed(() => {
  return filter.value.search_term;
});

const shouldGetData = computed(() => {
  return newSearchTerm.value !== lastSearchTerm.value;
});

const total = computed(() => {
  return courses.value ? courses.value.length : 0;
});

async function fetchCourses() {
  if(filter.value.search_term !== '') {
    let filteredCourses = testCourses.data.filter((course) => {
      return course.title.toLowerCase().includes(filter.value.search_term.toLowerCase());
    });
    store.setCourses((filteredCourses as unknown) as courseObject[]);
  } else {
    store.setCourses((testCourses.data as unknown) as courseObject[]);
  }
}

watch(shouldGetData, (newValue) => {
  if (newValue) {
    fetchCourses();
  }
  lastSearchTerm.value = newSearchTerm.value as string;
});

onBeforeMount(async () => {
  await fetchCourses();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#courses {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $cream;

  .main {
    max-width: $max-width;
    width: 100%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 0;

    h1 {
      color: $grasp-blue;
      font-size: 34px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      margin: 0 0 10px 10px;

      img {
        width: 40px;
        margin-right: 8px;
        @include breakpoint($break-sm) {
          width: 40px;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .courses {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
