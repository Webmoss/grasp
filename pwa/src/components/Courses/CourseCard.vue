<template>
  <div v-if="course && gridView === 'list'" class="course-list-item">
    <div class="course-image">
      <img :src="course.image ? course.image : 'rectangle.svg'" />
    </div>
    <div class="course-copy">
      <div class="course-title">
        {{ course.title ? course.title : "" }}
      </div>
      <div class="course-excerpt">
        {{ course.excerpt ? course.excerpt : "" }}
      </div>
      <div v-if="course.discount" class="course-discount">
        <span class="course-discount-label">Discount&nbsp;</span>
        {{ course.discount + "%" }}
      </div>
    </div>
    <div class="course-list-buttons">
      <div v-if="course && course.category" class="course-category">
        <div class="course-date">
          {{ course.created_date ? course.created_date : "" }}
        </div>
        <span class="category-indicator">{{
          course.category ? course.category : ""
        }}</span>
      </div>
      <div class="button-row">
        <BuyButton
          :btn-size="'small'"
          :color="'blue'"
          :course-id="course.id"
          :price="course.price"
          :discount="course.discount"
        />
      </div>
    </div>
  </div>

  <div v-else class="course">
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
        <div class="category-indicator">{{ course.category ? course.category : "" }}</div>
      </div>
      <div class="button-column">
        <div v-if="course.discount" class="course-discount">
          <span class="course-discount-label">Discount&nbsp;</span>
          {{ course.discount + "%" }}
        </div>
        <BuyButton
          :btn-size="'small'"
          :color="'blue'"
          :course-id="course.id"
          :price="course.price"
          :discount="course.discount"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { courseObject } from "src/models/course";
import BuyButton from "../Buttons/BuyButton.vue";

defineProps<{ course: courseObject; gridView: string }>();
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.course-card-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: flex-end;
}
.course-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  padding: 4px 8px;
}
.course-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: flex-end;
  padding: 0;
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
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    padding: 0;
    margin: 0;

    .course-discount {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;

      font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $grasp-orange;
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      margin: 8px 0 4px 0;

      .course-discount-label {
        color: $grasp-orange;
        font-size: 13px;
        font-weight: 500;
        text-decoration: none;
        text-transform: capitalize;
      }
    }
  }
}

.course-list-item {
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

  .course-image {
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

  .course-copy {
    width: 96%;
    height: 100%;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    padding: 0 1%;

    .course-title {
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

    .course-excerpt {
      width: 100%;
      min-height: 30px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: flex-start;

      width: 100%;
      color: $black;
      font-size: 13px;
      font-weight: normal;
      text-align: left;
      margin: 0;
    }

    .course-discount {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-content: center;
      align-items: center;

      font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $grasp-orange;
      font-size: 15px;
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      margin: 8px 0 0 0;

      .course-discount-label {
        color: $grasp-orange;
        font-size: 15px;
        font-weight: 500;
        text-decoration: none;
        text-transform: capitalize;
      }
    }
  }

  .course-list-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: flex-end;
    padding: 0 8px;

    .course-category {
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

      .course-date {
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
