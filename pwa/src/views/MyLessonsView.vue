<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            <h1>My Lessons</h1>
          </div>
          <div class="title-actions">
            <button class="create-button">Create Lesson</button>
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
          :total="lessonsTotal"
          :last-page="lastPage"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, provide } from "vue";
import { Notyf } from "notyf";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { lessonObject } from "src/models/lesson";
import SidebarView from "@/components/SidebarView.vue";
import LessonSearch from "../components/LessonsComponents/LessonSearch.vue";
import LessonsList from "../components/LessonsComponents/LessonsList.vue";
import LessonsPagination from "../components/LessonsComponents/LessonsPagination.vue";

const store = useStore();
const { lessons, pagination } = storeToRefs(store);

const lessonsTotal = ref(0);
const lastPage = ref(0);

const testLessons = [
  {
    name: "introduction",
    type: "article",
    category: "educhain",
    title: "Introduction",
    excerpt:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
    description:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
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
    description:
      "EDU Chain links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain. EDU Chain is the first L3 Blockchain built for Education.",
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

async function fetchLessons() {
  store.setLessons((testLessons as unknown) as lessonObject[]);
}

onBeforeMount(async () => {
  await fetchLessons();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";
</style>
