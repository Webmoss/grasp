<template>
  <section id="courses">
    <div class="main">
      <!-- <CoursesBanner /> -->
      <CourseSearch />
      <CoursesList :courses="courses" />
      <CoursesPagination :pagination="pagination"
            :tokens-total="coursesTotal"
            :last-page="lastPage" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import { courseObject } from "src/models/course";
// import CoursesBanner from "../components/CoursesComponents/CoursesBanner.vue";
import CourseSearch from "../components/CoursesComponents/CourseSearch.vue";
import CoursesList from "../components/CoursesComponents/CoursesList.vue";

const store = useStore();

const { courses, loading, showFilter, filter, pagination } = storeToRefs(store);

/* All Posts stored in a JSON */
// import courses from "src/data/courses.json";
const coursesTotal = ref();
const lastPage = ref();

const testCourses = [
  {
    name: "introduction",
    type: "article",
    category: "apecoin",
    title: "Introduction",
    excerpt:
      "The Ape Inn began at the EthGlobal Scaling Ethereum Hackathon in March 2023 and won 2nd place awards from ApeCoin for Best Integration & Best Contribution.At the Ape Inn you will find all the great Yuga Apes and more. Visit our showcase of all the BAYC & MAYC Apes and their unique attributes and traits.",
    description:
      "At the Ape Inn you will find all the great Yuga Apes and more. Visit our showcase of all the BAYC & MAYC Apes and their unique attributes and traits. Let's ape in now and stop monkeying around!Stake, claim or swap your $APE tokens and BAYC, MAYC and BAKC NFTs all in one slick interface. Our Apecoin $APE liquidity pools are no monkey business with APY's that will drive you bananas, it's where all the big Apes come to play.Visit the ApeSwap to access new Apecoin pairings and more liquidity pools coming soon.The Ape Inn aims to offer the Apecoin community dashboards, analytics, DAO tooling, and so much more, make sure to check out our merch section for some more monkey business.",
    banner: "banana.png",
    image: "",
    created_date: "30/03/2023",
    updated_at: "",
  },
  {
    name: "hv-mtl",
    type: "article",
    category: "hvmtl",
    title: "HV-MTL",
    excerpt: "Yuga Labs launches 1st season of Web3 crafting game, the HV-MTL Forge.",
    description:
      "HV-MTL Forge is a game that starts as a casual world builder and pet game and ends as a competitive dungeon crawler. Originally summoned as mysterious little cubes called Power Sources, the HVs of the HV-MTL collection are now in their Evo1 state. Your HV is relying on you to earn up to 6 powerful upgrades for its Evo2 form.At least 3 of these powerful upgrades known as AMPs will be needed for your HV to reach its Evo2 state, and any HV that participates in a season (regardless of rank) will earn an AMP.Daily voting by other HV holders will determine your seasonal leaderboard ranking. The seasonal ranking will ultimately decide the rarity of the AMP you earn. HV-MTL Forge will last for 6 seasons giving players 6 chances at upgrades.Once the 3rd season comes to a close, HV’s with the required energy will be able to enter The Rift.Before you ape into the Forge, make sure to review the Game Guide and FAQ released earlier this week for all the details on how to best care for and build with your HV.",
    banner: "HVMTLPost.avif",
    image: "HVMTLPost.avif",
    created_date: "29/06/2023",
    updated_at: "",
    links: [
      { url: "https://hv-mtl.com/forge-game-guide", title: "Forge Game Guide" },
      { url: "https://garage.hv-mtl.com/", title: "HV-MTL Garage" },
      { url: "https://forge.hv-mtl.com/", title: "Play forge" },
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
    banner: "SoftwareSaying.png",
    image: "SoftwareSaying.png",
    created_date: "06/07/2023",
    updated_at: "",
  },
  {
    name: "tweet",
    type: "tweet",
    category: "metaverse",
    title: "Tweet Example",
    excerpt:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    description:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    banner: "banana.png",
    image: "intro.jpeg",
    created_date: "10/01/2023",
    updated_at: "20/02/2023",
  },
  {
    name: "link",
    type: "link",
    category: "gaming",
    title: "Link Example",
    excerpt:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    description:
      "Read the latest news and reviews from the ApeCoin community and frens. We keep you updated on all the latest events, launches, AIP's and more.",
    banner: "banana.png",
    image: "intro.jpeg",
    created_date: "10/05/2023",
    updated_at: "20/05/2023",
  },
];

async function fetchCollections() {
  store.setCourses(testCourses as unknown as courseObject[]);
}

onBeforeMount(async () => {
  await fetchCollections();
  });
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#courses {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $grey-20;

  .main {
    max-width: $max-width;
    width: 100%;
    height: 100%;
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
