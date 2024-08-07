<template>
  <div v-if="lesson && gridView === 'list'" class="lesson-list-item">
    <div class="lesson-image">
      <img :src="lesson.image ? lesson.image : 'rectangle.svg'" />
    </div>
    <div class="lesson-copy">
      <div class="lesson-title">
        {{ lesson.title ? lesson.title : "" }}
      </div>
      <div class="lesson-description">
        {{ lesson.description ? lesson.description : "" }}
      </div>
    </div>
    <div class="lesson-list-buttons">
      <div class="lesson-category">
        <div class="lesson-date">
          {{ lesson.created_date ? lesson.created_date : "" }}
        </div>
        <!-- <span class="category-indicator">{{ lesson.category ? lesson.category : "" }}</span> -->
      </div>
      <div class="button-row">
        <BuyButton
          :btn-size="'small'"
          :color="'blue'"
          :lesson-id="lesson.id"
          :price="lesson.price"
        />
      </div>
    </div>
  </div>

  <div v-else class="lesson">
    <div class="lesson-image">
      <img :src="lesson.image ? lesson.image : 'rectangle.svg'" />
    </div>
    <div class="lesson-column">
      <div class="lesson-title">
        {{ lesson.title ? lesson.title : "" }}
      </div>
      <div class="lesson-description">
        {{ lesson.description ? lesson.description : "" }}
      </div>
    </div>
    <div class="lesson-card-row">
      <div class="lesson-category">
        <div class="lesson-date">
          {{ lesson.created_date ? lesson.created_date : "" }}
        </div>
        <!-- <div class="category-indicator">{{ lesson.category ? lesson.category : "" }}</div> -->
      </div>
      <div class="button-column">
        <BuyButton
          :btn-size="'small'"
          :color="'blue'"
          :lesson-id="lesson.id"
          :price="lesson.price"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { lessonObject } from "src/models/lesson";
import BuyButton from "../Buttons/BuyButton.vue";

defineProps<{ lesson: lessonObject; gridView: string }>();
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.lesson-card-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: flex-end;
}
.lesson-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  padding: 4px 8px;
}
.lesson-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: flex-end;
  padding: 0;
}

.lesson {
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

  .lesson-image {
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

  .lesson-title {
    font-family: "Poppins", sans-serif;
    color: $grasp-blue;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    margin: 0 0 5px 0;
  }

  .lesson-description {
    width: 100%;
    min-height: 77.5px;
    color: $black;
    font-size: 13px;
    font-weight: normal;
    text-align: left;
    margin: 0 0 16px;
  }

  .lesson-category {
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

    .lesson-date {
      font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
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

.lesson-list-item {
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

  .lesson-image {
    width: auto;
    position: relative;
    margin: 0;
    padding: 6px 6px 2px 6px;
    background: transparent;

    img,
    svg {
      width: 180px;
      height: inherit;
      object-fit: contain;
      overflow: hidden;
      background: transparent;
    }
  }

  .lesson-copy {
    width: 96%;
    height: 100%;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    padding: 0 1%;

    .lesson-title {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;

      font-family: "Poppins", sans-serif;
      color: $grasp-blue;
      width: 100%;
      font-size: 16px;
      font-weight: 600;
      text-align: left;
      margin: 0 0 5px 0;
    }

    .lesson-description {
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

  .lesson-list-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: flex-end;
    padding: 0 8px;

    .lesson-category {
      width: 100%;
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

      .lesson-date {
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grey-60;
        font-size: 12px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        margin: 0 0 4px 0;
      }

      .category-indicator {
        width: 70%;
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
      margin: 8px auto 0;
    }
  }
}
</style>
