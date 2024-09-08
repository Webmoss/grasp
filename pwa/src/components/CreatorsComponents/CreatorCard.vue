<template>
  <!-- Creator List View -->
  <div v-if="creator && gridView === 'list'" class="creator-list-item">
    <div class="creator-image">
      <img :src="creator.image ? creator.image : 'rectangle.svg'" />
    </div>
    <div class="creator-copy">
      <div class="creator-name">
        {{ creator.name ? creator.name : "" }}
      </div>
      <div class="creator-title">
        {{ creator.title ? creator.title : "" }}
      </div>
      <div class="creator-description">
        {{ creator.description ? creator.description : "" }}
      </div>
    </div>
    <div class="creator-list-buttons">
      <div class="creator-socials">
        <a
          v-if="creator.website"
          :href="creator.website"
          alt="Website"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/website.svg" alt="Website"
        /></a>
        <a
          v-if="creator.twitter"
          :href="creator.twitter"
          alt="Twitter"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/twitter.svg" alt="Twitter"
        /></a>
        <a
          v-if="creator.facebook"
          :href="creator.facebook"
          alt="Facebook"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/facebook.svg" alt="Facebook"
        /></a>
        <a
          v-if="creator.linkedin"
          :href="creator.linkedin"
          alt="LinkedIn"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/linkedin.svg" alt="LinkedIn"
        /></a>
        <a
          v-if="creator.instagram"
          :href="creator.instagram"
          alt="Instagram"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/instagram.svg" alt="Instagram"
        /></a>
      </div>
      <div class="creator-category">
        <template v-for="(category, i) in creator.categories" :key="i">
          <span class="category-indicator">{{ category.name ? category.name : "" }}</span>
        </template>
      </div>
      <div class="button-row">
        <ViewCreatorButton :btn-size="'small'" :color="'blue'" :creatorId="creator.id" />
      </div>
    </div>
  </div>
  <!-- END Creator List View -->
  <!-- Creator Card View -->
  <div v-else class="creator">
    <div class="creator-image">
      <img :src="creator.image ? creator.image : 'rectangle.svg'" />
    </div>
    <div class="creator-column">
      <div class="creator-name">
        {{ creator.name ? creator.name : "" }}
      </div>
      <div class="creator-title">
        {{ creator.title ? creator.title : "" }}
      </div>
      <div class="creator-description">
        {{ creator.description ? creator.description : "" }}
      </div>
      <div class="creator-socials">
        <a
          v-if="creator.website"
          :href="creator.website"
          alt="Website"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/website.svg" alt="Website"
        /></a>
        <a
          v-if="creator.twitter"
          :href="creator.twitter"
          alt="Twitter"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/twitter.svg" alt="Twitter"
        /></a>
        <a
          v-if="creator.facebook"
          :href="creator.facebook"
          alt="Facebook"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/facebook.svg" alt="Facebook"
        /></a>
        <a
          v-if="creator.linkedin"
          :href="creator.linkedin"
          alt="LinkedIn"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/linkedin.svg" alt="LinkedIn"
        /></a>
        <a
          v-if="creator.instagram"
          :href="creator.instagram"
          alt="Instagram"
          target="_blank"
          rel="noopener"
          ><img src="../../assets/svgs/socials/instagram.svg" alt="Instagram"
        /></a>
      </div>
    </div>
    <div class="creator-card-row">
      <div class="creator-category">
        <template v-for="(category, i) in creator.categories" :key="i">
          <span class="category-indicator">{{ category.name ? category.name : "" }}</span>
        </template>
      </div>
      <div class="button-column">
        <ViewCreatorButton :btn-size="'small'" :color="'blue'" :creatorId="creator.id" />
      </div>
    </div>
  </div>
  <!-- END Creator Card View -->
</template>

<script lang="ts" setup>
import { creatorObject } from "src/models/creator";
import ViewCreatorButton from "../Buttons/ViewCreatorButton.vue";

defineProps<{ creator: creatorObject; gridView: string }>();
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.creator-card-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: flex-end;
}
.creator-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  padding: 4px 8px;
}
.creator-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: flex-end;
  padding: 0;
}

.creator {
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

  .creator-name {
    font-family: "Poppins", sans-serif;
    color: $grasp-blue;
    width: 100%;
    font-size: 24px;
    font-weight: 600;
    text-align: left;
    margin: 0 0 5px 0;
  }

  .creator-title {
    width: 100%;
    font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: $grey-90;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
    margin: 0 0 8px 0;
  }

  .creator-description {
    width: 100%;
    min-height: 16px;
    color: $black;
    font-size: 13px;
    font-weight: normal;
    text-align: left;
    margin: 0 0 16px;
  }

  .creator-socials {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    margin: 0 0 8px 0;

    a {
      color: $grasp-blue;
      text-decoration: none;
      margin: 0 12px 0 0;

      img,
      svg {
        width: 16px;
        @include breakpoint($break-sm) {
          width: 16px;
        }
      }
    }
  }

  .creator-category {
    width: 300px;
    height: 40px;
    display: block;
    float: left;
    color: $black;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;

    .category-indicator {
      float: left;
      width: auto;
      outline: transparent solid 2px;
      outline-offset: 2px;
      border-radius: 9999px;
      transition: background-color 0.2s ease-out 0s;
      background: $grasp-cyan;
      font-size: 12px;
      text-align: center;
      text-wrap: nowrap;
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
      margin: 0 4px 4px 0;
    }
  }
  .button-column {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }
}

.creator-list-item {
  width: 99%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0;
  padding: 0;
  transition: all 0.5s linear;

  .creator-image {
    width: auto;
    position: relative;
    margin: 0;
    padding: 6px 6px 2px 6px;
    background: transparent;

    img,
    svg {
      width: 140px;
      height: 140px;
      object-fit: contain;
      overflow: hidden;
      background: transparent;
    }
  }

  .creator-copy {
    width: 96%;
    height: 100%;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    padding: 0 1%;

    .creator-name {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;

      font-family: "Poppins", sans-serif;
      color: $grasp-blue;
      width: 100%;
      font-size: 22px;
      font-weight: 600;
      text-align: left;
      margin: 0;
    }

    .creator-title {
      width: 100%;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $grey-90;
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      margin: 0 0 4px 0;
    }

    .creator-description {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;

      width: 100%;
      color: $black;
      font-size: 13px;
      font-weight: normal;
      text-align: left;
      margin: 0;
    }
  }

  .creator-list-buttons {
    height: 100%;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: flex-end;
    padding: 0 1%;

    .creator-socials {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-content: center;
      align-items: center;
      margin: 0 0 16px 0;

      a {
        color: $grasp-blue !important;
        text-decoration: none;
        margin: 0 12px 0 0;

        img,
        svg {
          width: 16px;
          @include breakpoint($break-sm) {
            width: 16px;
          }
        }
      }
    }

    .creator-category {
      width: 300px;
      height: 40px;
      display: block;
      float: left;
      color: $black;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      margin: 0;

      .category-indicator {
        float: right;
        width: auto;
        outline: transparent solid 2px;
        outline-offset: 2px;
        border-radius: 9999px;
        transition: background-color 0.2s ease-out 0s;
        background: $grasp-cyan;
        font-size: 12px;
        text-align: center;
        text-wrap: nowrap;
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
        margin: 0 4px 4px 0;
      }
    }
    .button-row {
      width: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
