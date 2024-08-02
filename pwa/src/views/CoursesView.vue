<template>
  <section id="courses">
    <div class="main">
      <CoursesBanner />
      <CourseSearch />
      <CoursesList :courses="courses" />
      <CoursesPagination
        :pagination="pagination"
        :total="coursesTotal"
        :last-page="lastPage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { courseObject } from "src/models/course";
import CoursesBanner from "../components/CoursesComponents/CoursesBanner.vue";
import CourseSearch from "../components/CoursesComponents/CourseSearch.vue";
import CoursesList from "../components/CoursesComponents/CoursesList.vue";
import CoursesPagination from "../components/CoursesComponents/CoursesPagination.vue";

const store = useStore();

const { courses, pagination } = storeToRefs(store);

/* All Posts stored in a JSON */
// import courses from "src/data/courses.json";
const coursesTotal = ref(0);
const lastPage = ref(0);

const testCourses = [
  {
    name: "introduction",
    type: "article",
    category: "educhain",
    title: "Introduction",
    excerpt:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    description: "",
    banner: "",
    image: "",
    created_date: "30/03/2023",
    updated_date: "",
    price: 10,
  },
  {
    name: "open-campus-id",
    type: "article",
    category: "educhain",
    title: "What is Open Campus ID",
    excerpt:
      "Open Campus ID is a Soulbound Token, a non-transferable NFT that are virtual representations of learners' online personas.",
    description:
      "Open Campus ID is Open Campus' blockchain protocol that issues Decentralized Identifiers (DIDs) in the form of Soulbound Tokens (SBTs), non-transferable NFTs that are virtual representations of learners' online personas. The primary benefit for learners is they have control over what information is associated with their OC IDs. They can decide which pieces of information they want to share and when they want to share them, including their learning profile.",
    banner: "",
    image: "",
    created_date: "01/06/2024",
    updated_date: "",
    price: 10,
    links: [
      { url: "https://id.opencampus.xyz/", title: "open Campus ID" },
      { url: "https://x.com/opencampus_xyz", title: "Twitter" },
    ],
  },
  {
    name: "quote",
    type: "quote",
    category: "collections",
    title: "Time and Energy",
    excerpt:
      "Software is like a pebble in a river...it only get's smoother with time and energy",
    description:
      "Software is like a pebble in a river...it only get's smoother with time and energy",
    banner: "",
    image: "",
    created_date: "06/07/2023",
    updated_date: "",
    price: 10,
  },
  {
    name: "tweet",
    type: "tweet",
    category: "learners",
    title: "Tweet Example",
    excerpt:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    description:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    banner: "",
    image: "",
    created_date: "10/01/2023",
    updated_date: "20/02/2023",
    price: 10,
  },
  {
    name: "link",
    type: "link",
    category: "daos",
    title: "Link Example",
    excerpt:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    description:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    banner: "",
    image: "",
    created_date: "10/05/2023",
    updated_date: "20/05/2023",
    price: 10,
  },
  {
    name: "introduction",
    type: "article",
    category: "educhain",
    title: "Introduction",
    excerpt:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    description: "",
    banner: "",
    image: "",
    created_date: "30/03/2023",
    updated_date: "",
    price: 10,
  },
  {
    name: "open-campus-id",
    type: "article",
    category: "educhain",
    title: "What is Open Campus ID",
    excerpt:
      "Open Campus ID is a Soulbound Token, a non-transferable NFT that are virtual representations of learners' online personas.",
    description:
      "Open Campus ID is Open Campus' blockchain protocol that issues Decentralized Identifiers (DIDs) in the form of Soulbound Tokens (SBTs), non-transferable NFTs that are virtual representations of learners' online personas. The primary benefit for learners is they have control over what information is associated with their OC IDs. They can decide which pieces of information they want to share and when they want to share them, including their learning profile.",
    banner: "",
    image: "",
    created_date: "01/06/2024",
    updated_date: "",
    price: 10,
    links: [
      { url: "https://id.opencampus.xyz/", title: "open Campus ID" },
      { url: "https://x.com/opencampus_xyz", title: "Twitter" },
    ],
  },
  {
    name: "quote",
    type: "quote",
    category: "collections",
    title: "Time and Energy",
    excerpt:
      "Software is like a pebble in a river...it only get's smoother with time and energy",
    description:
      "Software is like a pebble in a river...it only get's smoother with time and energy",
    banner: "",
    image: "",
    created_date: "06/07/2023",
    updated_date: "",
    price: 10,
  },
  {
    name: "tweet",
    type: "tweet",
    category: "learners",
    title: "Tweet Example",
    excerpt:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    description:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    banner: "",
    image: "",
    created_date: "10/01/2023",
    updated_date: "20/02/2023",
    price: 10,
  },
  {
    name: "link",
    type: "link",
    category: "daos",
    title: "Link Example",
    excerpt:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    description:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    banner: "",
    image: "",
    created_date: "10/05/2023",
    updated_date: "20/05/2023",
    price: 10,
  },
];

async function fetchCourses() {
  store.setCourses((testCourses as unknown) as courseObject[]);
}

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
      font-size: 38px;
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
