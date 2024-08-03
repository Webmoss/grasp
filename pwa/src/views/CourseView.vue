<template>
  <section id="course">
    <div class="main">
      <CourseHeader :course="course" />
      <section id="page">
        <div class="course-details-row">
          <h1 class="course-title">{{ course.title ? course.title : "" }}</h1>
          <div class="button-column">
            <BuyButton
              :btn-size="'large'"
              :color="'blue'"
              :course-id="course.id"
              :price="course.price"
            />
          </div>
        </div>

        <div class="course-details-row">
          <div class="course-date">
            <span class="course-date-label">Date:</span>
            {{ course.created_date ? course.created_date : "" }}
          </div>
        </div>

        <div class="course-excerpt">
          {{ course.excerpt ? course.excerpt : "" }}
        </div>

        <div class="course-description">
          {{ course.description ? course.description : "" }}
        </div>

        <div class="line-divider"></div>
        <h2>Course Lessons</h2>

        <div class="course-lesson-list">
          <div class="course-lesson">
            <div class="lesson-title">Lesson One</div>
            <div class="lesson-description">
              Lesson description goes here, using some dummy copy for the front-end buidl.
            </div>
            <div class="lesson-category">
              <div class="category-indicator">DAO</div>
              <div class="category-indicator">ApeCoin</div>
            </div>
          </div>

          <div class="course-lesson">
            <div class="lesson-title">Lesson Two</div>
            <div class="lesson-description">
              Lesson description goes here, using some dummy copy for the front-end buidl.
            </div>
            <div class="lesson-category">
              <div class="category-indicator">Community</div>
              <div class="category-indicator">Web3</div>
            </div>
          </div>

          <div class="course-lesson">
            <div class="lesson-title">Lesson Three</div>
            <div class="lesson-description">
              Lesson description goes here, using some dummy copy for the front-end buidl.
            </div>
            <div class="lesson-category">
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
import { onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

/* Components */
import CourseHeader from "@/components/CoursesComponents/CourseHeader.vue";
import BuyButton from "@/components/Buttons/BuyButton.vue";

/* All Posts stored in a JSON */
import testCourses from "../data/courses.json";

const store = useStore();
const route = useRoute();
const { course } = storeToRefs(store);

const courseId = route.params.id;

async function fetchCourse() {
  let filteredCourse = testCourses.data.filter((course) => {
    return course.id === Number.parseInt(courseId as string);
  });
  store.setCourse(filteredCourse[0] as any);
}

onBeforeMount(async () => {
  await fetchCourse();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#course {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $white;

  #page {
    padding-bottom: 30px;

    @include breakpoint($break-sm) {
      width: 94%;
      padding: 0 3%;
    }
  }

  .main {
    max-width: $max-width;
    width: 100%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 0 0 30px 0;

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

    .course-details-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
      margin: 0 0 8px 0;

      @include breakpoint($break-sm) {
        flex-direction: column;
        align-items: flex-start;
      }

      h1.course-title {
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

        @include breakpoint($break-sm) {
          font-size: 24px;
          line-height: 30px;
        }

        img {
          width: 40px;
          margin-right: 8px;
          @include breakpoint($break-sm) {
            width: 40px;
          }
        }
      }

      .course-date {
        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grey-70;
        font-size: 15px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        margin: 0 0 4px 0;

        .course-date-label {
          color: $grey-90;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          text-transform: capitalize;
        }
      }
    }

    .course-excerpt {
      width: 100%;
      color: $grey-100;
      font-size: 15px;
      font-weight: 500;
      text-align: left;
      margin: 0 0 16px;
    }

    .course-description {
      width: 100%;
      color: $black;
      font-size: 15px;
      font-weight: normal;
      text-align: left;
      margin: 0;
    }

    .course-category {
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

    .course-lesson-list {
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

      .course-lesson {
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
          font-size: 20px;
          font-weight: 600;
          line-height: normal;
          text-align: left;
          margin: 0 0 5px 0;
        }

        .lesson-description {
          width: 100%;
          color: $black;
          font-size: 12px;
          font-weight: normal;
          text-align: left;
          margin: 0 0 30px;
        }

        .lesson-category {
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
  .course {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
