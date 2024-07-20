<template>
  <section id="creators">
    <div class="main">
      <CreatorsBanner />
      <CreatorsSearch />
      <CreatorsList :creators="creators" />
      <CreatorsPagination
        :pagination="pagination"
        :total="creatorsTotal"
        :last-page="lastPage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { creatorObject } from "src/models/creator";
import CreatorsBanner from "../components/CreatorsComponents/CreatorsBanner.vue";
import CreatorsSearch from "../components/CreatorsComponents/CreatorsSearch.vue";
import CreatorsList from "../components/CreatorsComponents/CreatorsList.vue";
import CreatorsPagination from "../components/CreatorsComponents/CreatorsPagination.vue";

const store = useStore();

const { creators, pagination } = storeToRefs(store);

const creatorsTotal = ref(0);
const lastPage = ref(0);

const testCreators = [
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
  {
    banner: "",
    image: "",
    name: "Joe Blog",
    description: "A creative genius with over 15 years of experience.",
    email: "example@gmail.com",
    mobile: "123 456 7890",
    title: "Web Developer",
    city: "Montreal",
    country: "Canada",
    twitter: "@tweets",
    linkedin: "article",
    facebook: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    website: "www.graspacademy.com",
    followers: 1000,
    following: 1000,
    courses: [],
    lessons: [],
    projects: [],
    categories: ['Web3','Design','Develop','Solidity','UI/UX'],
    isLive: true,
    created_date: "30/03/2023",
  },
];

async function fetchCreators() {
  store.setCreators((testCreators as unknown) as creatorObject[]);
}

onBeforeMount(async () => {
  await fetchCreators();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#creators {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $white;

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
  .creators {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
