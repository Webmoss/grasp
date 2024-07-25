<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            <h1>My Courses</h1>
          </div>
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
          :total="coursesTotal"
          :last-page="lastPage"
        />
      </div>
    </div>
    <CourseModal :showModal="showModal" :course="{}" @close="showHideModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, provide } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { courseObject } from "src/models/course";
import SidebarView from "../components/SidebarView.vue";
import CourseSearch from "../components/CoursesComponents/CourseSearch.vue";
import CoursesList from "../components/CoursesComponents/CoursesList.vue";
import CoursesPagination from "../components/CoursesComponents/CoursesPagination.vue";
import CourseModal from "../components/CoursesComponents/CourseModal.vue";

const store = useStore();
const { courses, pagination } = storeToRefs(store);

const showModal = ref(false);
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
    updated_at: "",
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
    updated_at: "",
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
    updated_at: "",
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
    updated_at: "20/02/2023",
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
    updated_at: "20/05/2023",
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
    updated_at: "",
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
    updated_at: "",
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
    updated_at: "",
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
    updated_at: "20/02/2023",
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
    updated_at: "20/05/2023",
    price: 10,
  },
];

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

const showHideModal = () => {
  showModal.value = !showModal.value;
};

async function fetchCourses() {
  store.setCourses((testCourses as unknown) as courseObject[]);
}

onBeforeMount(async () => {
  await fetchCourses();
});
</script>
