<template>
  <section id="courses">
    <div class="main">
      <CoursesBanner />
      <CourseSearch />
      <CoursesList :courses="paginatedCourses" />
      <Pagination
        :current-page="pagination.page"
        :last-page="lastPage"
        @page-changed="handlePageChange"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { courseObject } from "@/models/course";
import { initialPagination } from "@/models/initialPagination";

/* Components */
import CoursesBanner from "@/components/Courses/CoursesBanner.vue";
import CourseSearch from "@/components/Courses/CourseSearch.vue";
import CoursesList from "@/components/Courses/CoursesList.vue";
import Pagination from "@/components/Filters/Pagination.vue";

/* All Posts stored in a JSON */
import testCourses from "../data/courses.json";

const store = useStore();
const { pagination, filter } = storeToRefs(store);

const courses = ref((testCourses.data as unknown) as courseObject[]);

// Initialize pagination if not already set
if (!pagination.value.page) {
  pagination.value = initialPagination();
}

const filteredCourses = computed(() => {
  let result = courses.value;

  if (filter.value.search_term && filter.value.search_term !== "") {
    console.log("Search term", filter.value.search_term);
    result = result.filter((course) =>
      course.title?.toLowerCase().includes(filter.value.search_term.toLowerCase())
    );
  }

  if (filter.value.search_categories && filter.value.search_categories.length > 0) {
    console.log("Search categories", filter.value.search_categories);
    result = result.filter((course) =>
      filter.value.search_categories.includes(course.category)
    );
  }

  if (filter.value.time_frame) {
    switch (filter.value.time_frame) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
        );
        break;
      case "top-rated":
        result.sort((a, b) => b.sales - a.sales);
        break;
      // 'all' case doesn't need sorting
    }
  }
  console.log("Result", result);
  return result;
});

const lastPage = computed(() => Math.ceil(total.value / pagination.value.pageSize));
const total = computed(() => filteredCourses.value.length);

const paginatedCourses = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return filteredCourses.value.slice(start, end);
});

function handlePageChange(page: number) {
  pagination.value.page = page;
}

watch(
  [filter, pagination],
  () => {
    pagination.value.page = 1;
  },
  { deep: true }
);

onMounted(() => {
  store.setCourses(courses.value);
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
