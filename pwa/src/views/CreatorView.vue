<template>
  <section id="creator">
    <div class="main">
      <CreatorHeader :creator="creator" />
      <section id="page">
        <div class="creator-details-row">
          <h1 class="creator-title">Creator {{ creator.title ? creator.title : "Joe Soap" }}</h1>
          <div class="button-column">
            <ViewCreatorButton :btn-size="'large'" :color="'blue'" :creatorId="creator.id" />
          </div>
        </div>

        <div class="creator-details-row">
          <div class="creator-date">
            <span class="creator-date-label">Date:</span>
            {{ creator.created_date ? creator.created_date : "01/06/2024" }}
          </div>
        </div>

        <div class="creator-description">
          {{
            creator.description
              ? creator.description
              : "Open Campus ID is Open Campus' blockchain protocol that issues Decentralized Identifiers (DIDs) in the form of Soulbound Tokens (SBTs), non-transferable NFTs that are virtual representations of learners' online personas. The primary benefit for learners is they have control over what information is associated with their OC IDs. They can decide which pieces of information they want to share and when they want to share them, including their learning profile."
          }}
        </div>

        <div class="creator-course-list">
          <div class="creator-course">
            <div class="course-title">
              Course One
            </div>
            <div class="course-description">
              Course description goes here, using some dummy copy for the front-end buidl.
            </div>
            <div class="course-category">
              <div class="category-indicator">DAO</div>
              <div class="category-indicator">ApeCoin</div>
            </div>
          </div>

          <div class="creator-course">
            <div class="course-title">
              Course Two
            </div>
            <div class="course-description">
              Course description goes here, using some dummy copy for the front-end buidl.
            </div>
            <div class="course-category">
              <div class="category-indicator">Community</div>
              <div class="category-indicator">Web3</div>
            </div>
          </div>

          <div class="creator-course">
            <div class="course-title">
              Course Three
            </div>
            <div class="course-description">
              Course description goes here, using some dummy copy for the front-end buidl.
            </div>
            <div class="course-category">
              <div class="category-indicator">OpenCampus</div>
              <div class="category-indicator">EduChain</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import CreatorHeader from "../components/CreatorsComponents/CreatorHeader.vue";
import ViewCreatorButton from "../components/Buttons/ViewCreatorButton.vue";

const store = useStore();
const { creator } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#creator {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $white;

  .main {
    max-width: $max-width;
    width: 100%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 0 0 30px 0;

    .creator-image {
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

        img {
          width: 40px;
          margin-right: 8px;
          @include breakpoint($break-sm) {
            width: 40px;
          }
        }
      }

      .creator-date {
        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grey-70;
        font-size: 15px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        margin: 0 0 4px 0;

        .creator-date-label {
          color: $grey-90;
          font-size: 16px;
          font-weight: 600;
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
      margin: 0 0 16px;
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

    .creator-course-list {
      width: 100%;
      max-width: $max-width;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      align-content: center;
      justify-content: center;
      align-items: flex-start;
      margin: 10px auto;

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

      .creator-course {
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
          font-size: 20px;
          font-weight: 600;
          line-height: normal;
          text-align: left;
          margin: 0 0 5px 0;
        }

        .course-description {
          width: 100%;
          color: $black;
          font-size: 12px;
          font-weight: normal;
          text-align: left;
          margin: 0 0 30px;
        }

        .course-category {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-content: center;
          align-items: center;

          color: $black;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          margin: 0;

          .category-indicator {
            width: auto;
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
            margin: 0 8px 8px 0;
          }
        }
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
