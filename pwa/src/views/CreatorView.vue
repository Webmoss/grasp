<template>
  <section id="creator">
    <div class="main">
      <CreatorHeader :creator="creator" />
      <section id="page">
        <div class="creator-details-row">
          <h1 class="creator-title">
            {{ creator.name ? creator.name : "" }}
          </h1>
          <div class="creator-socials">
            <a
              v-if="creator.website"
              :href="creator.website"
              alt="Website"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/website.svg" alt="Website"
            /></a>
            <a
              v-if="creator.twitter"
              :href="creator.twitter"
              alt="Twitter"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/twitter.svg" alt="Twitter"
            /></a>
            <a
              v-if="creator.facebook"
              :href="creator.facebook"
              alt="Facebook"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/facebook.svg" alt="Facebook"
            /></a>
            <a
              v-if="creator.linkedin"
              :href="creator.linkedin"
              alt="LinkedIn"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/linkedin.svg" alt="LinkedIn"
            /></a>
            <a
              v-if="creator.instagram"
              :href="creator.instagram"
              alt="Instagram"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/instagram.svg" alt="Instagram"
            /></a>
          </div>
        </div>

        <div class="creator-details-row">
          <div class="creator-date">
            <span class="creator-date-label">Joined</span>
            {{ creator.created_date ? creator.created_date : "" }}
          </div>
        </div>

        <div class="creator-description">
          {{
            creator.description
              ? creator.description
              : ""
          }}
        </div>

        <div class="line-divider"></div>
        <h2>Creators Courses</h2>
        
        <div class="creator-course-list">
          <template v-for="(course, i) in testCourses" :key="i">
            <div class="course">
              <div class="course-image">
                <img :src="course.image ? course.image : 'rectangle.svg'" />
              </div>
              <div class="course-column">
                <div class="course-title">
                  {{ course.title ? course.title : "" }}
                </div>
                <div class="course-excerpt">
                  {{ course.excerpt ? course.excerpt : "" }}
                </div>
              </div>
              <div class="course-card-row">
                <div class="course-category">
                  <div class="course-date">
                    {{ course.created_date ? course.created_date : "" }}
                  </div>
                  <div class="category-indicator">
                    {{ course.category ? course.category : "" }}
                  </div>
                </div>
                <div class="button-column">
                  <BuyButton
                    :btn-size="'small'"
                    :color="'blue'"
                    :course-id="course.id"
                    :price="course.price"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store";
// import { storeToRefs } from "pinia";
import CreatorHeader from "../components/CreatorsComponents/CreatorHeader.vue";
import BuyButton from "../components/Buttons/BuyButton.vue";

const store = useStore();
// const { creator } = storeToRefs(store);

const creator = ref({
  id: 1,
  banner: "Grasp-Banner.png",
  image: "WebMoss.jpg",
  username: "WebMoss",
  name: "Craig Moss",
  description: "A Software Engineer who thrives on creating beautiful web applications. I have fulfilled various roles throughout my career in the Information Technology arena and enjoy new challenges and problem solving... no task is too great or small, if you just take it one byte at a time. I look forward to my next web3 challenge as it will allow me to discover new and exciting technologies that will shape our future.",
  email: "example@gmail.com",
  mobile: "012 567 8901",
  title: "Developer",
  city: "Cape Town",
  country: "South Africa",
  twitter: "https://twitter.com/WebMoss",
  linkedin: "https://www.linkedin.com/in/craig-moss-21822628/",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  website: "https://www.website.com/",
  followers: 1400,
  following: 100,
  courses: [],
  lessons: [],
  projects: [],
  categories: ["educhain"],
  isLive: true,
  created_date: "30/03/2023",
  updated_at: "",
});

const testCourses = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#creator {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $white;

  #page {
    padding-bottom: 30px;
  }

  .main {
    max-width: $max-width;
    width: 100%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 0 0 30px 0;

    .creator-details-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
      margin: 0 0 8px 0;

      h1.creator-title {
        width: 100%;
        font-family: "Poppins", sans-serif;
        color: $grasp-blue;
        font-size: 38px;
        font-weight: 600;
        line-height: 40px;
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: flex-end;
        align-items: flex-end;
        margin: 0;
      }

      .creator-socials {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-content: center;
        align-items: center;
        margin: 0 0 8px 0;

        a {
          color: $grasp-blue;
          text-decoration: none;
          margin: 0 12px 0 0;

          img,
          svg {
            width: 20px;
            @include breakpoint($break-sm) {
              width: 20px;
            }
          }
        }
      }

      .creator-date {
        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $black;
        font-size: 15px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        margin: 0 0 4px 0;

        .creator-date-label {
          color: $black;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          text-transform: capitalize;
        }
      }
    }

    .creator-description {
      width: 100%;
      color: $black;
      font-size: 15px;
      font-weight: normal;
      text-align: left;
      margin: 0;
    }

    .creator-category {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;

      color: $black;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      margin: 0;

      .category-indicator {
        width: 80%;
        outline: transparent solid 2px;
        outline-offset: 2px;
        border-radius: 9999px;
        transition: background-color 0.2s ease-out 0s;
        background: $grasp-cyan;
        font-size: 13px;
        text-align: center;
        padding-inline: 8px;
        padding-top: 1px;
        padding-bottom: 1px;
        --badge-color: $grey-40;
        color: $grey-90;
        box-shadow: none;
        border-width: 1.5px;
        border-style: solid;
        border-image: initial;
        border-color: #4d5358;
      }
    }

    .line-divider {
      width: 96%;
      margin: 16px auto 32px;
      border-bottom: 1px solid $grey-30;
    }

    h2 {
      width: 100%;
      font-family: "Poppins", sans-serif;
      color: $grasp-blue;
      font-size: 30px;
      font-weight: 600;
      line-height: 32px;
      text-align: left;
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin: 0 0 16px 0;
    }

    .creator-course-list {
      width: 100%;
      max-width: $max-width;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      align-content: center;
      justify-content: center;
      align-items: flex-start;
      margin: 10px auto 0;

      @include breakpoint($break-lg) {
        grid-template-columns: repeat(3, 1fr);
      }
      @include breakpoint($break-md) {
        grid-template-columns: repeat(2, 1fr);
      }
      @include breakpoint($break-sm) {
        grid-template-columns: repeat(1, 1fr);
      }
      @include breakpoint($break-xs) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    .course-card-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
    }
    .course {
        display: inline;
        float: left;
        box-sizing: border-box;
        width: 100%;
        background: $cream;
        border: 0.5px solid $grey-50;
        border-radius: 8px;
        box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
        margin: 0 auto;
        padding: 16px;
        transition: all 0.5s linear;
        overflow: hidden;

        .course-image {
          position: relative;
          width: 100%;
          margin: 0 auto;
          padding: 0;
          overflow: hidden;
          background: transparent;

          img,
          svg {
            width: 100%;
            height: 100%;
            object-fit: contain;
            overflow: hidden;
            background: transparent;
          }
        }

        .course-title {
          font-family: "Poppins", sans-serif;
          color: $grasp-blue;
          width: 100%;
          font-size: 16px;
          font-weight: 600;
          text-align: left;
          margin: 0 0 5px 0;
        }

        .course-excerpt {
          width: 100%;
          min-height: 77.5px;
          color: $black;
          font-size: 13px;
          font-weight: normal;
          text-align: left;
          margin: 0 0 16px;
        }

        .course-category {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          align-items: center;

          color: $black;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          margin: 0;

          .course-date {
            font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
              sans-serif;
            color: $grey-60;
            font-size: 12px;
            font-weight: 500;
            text-decoration: none;
            text-transform: uppercase;
            margin: 0 0 4px 0;
          }

          .category-indicator {
            width: 80%;
            outline: transparent solid 2px;
            outline-offset: 2px;
            border-radius: 9999px;
            transition: background-color 0.2s ease-out 0s;
            background: $grasp-cyan;
            font-size: 12px;
            text-align: center;
            padding-inline: 8px;
            padding-top: 1px;
            padding-bottom: 1px;
            --badge-color: $grey-40;
            color: $grey-90;
            box-shadow: none;
            border-width: 1.5px;
            border-style: solid;
            border-image: initial;
            border-color: #4d5358;
          }
        }
        .button-column {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-content: center;
          align-items: center;
          padding: 0;
          margin: 0;
        }
      }
  }
}

@media (min-width: 1024px) {
  .creator {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
