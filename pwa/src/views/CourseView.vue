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
              :discount="course.discount"
            />
          </div>
        </div>

        <div class="course-details-row">
          <div class="course-category">
            <template v-for="(category, index) in course.categories" :key="index">
              <span class="category-indicator">{{
                category.name ? category.name : ""
              }}</span>
            </template>
          </div>
          <div v-if="course.discount" class="course-discount">
            <span class="course-discount-label">Discount </span>
            {{ course.discount + "%" }}
          </div>
        </div>

        <div class="course-location-row">
          <div class="course-date">
            <span class="course-date-label">Created </span>
            {{ course.created_date ? course.created_date : "" }}
          </div>
          <div class="course-sales">
            <span class="course-sales-icon">
              <img src="../assets/svgs/EduCoin.svg" />
            </span>
            Sales {{ course.sales ? course.sales : "" }}
          </div>
        </div>

        <div class="course-excerpt">
          {{ course.excerpt ? course.excerpt : "" }}
        </div>

        <div class="line-divider"></div>

        <div class="course-lessons-row">
          <div class="course-image">
            <img :src="`../${lesson.image ? lesson.image : course.image}`" />
          </div>
          <div class="course-lesson-checklist">
            <template v-for="(lesson, index) in lessons" :key="index">
              <div class="course-lesson-list-link" :class="lesson.step === active ? 'active' : ''" @click="loadLesson(lesson.id)">
                <div class="course-lesson-list-title">{{ lesson.title ? lesson.title : "" }}</div>
                <div class="course-lesson-list-button">
                  <img src="@/assets/svgs/Play.svg" width="24" />
                </div>
              </div>
          </template>
          </div>
        </div>

        <div v-if="!lesson.content" class="course-description">
          {{ course.description ? course.description : "" }}
        </div>

        <div v-if="lesson.content" class="line-divider"></div>
        <div v-if="lesson.content" class="lesson-content" v-html="lesson.content"></div>

        <div class="line-divider"></div>
        <h2>Course Lessons</h2>
        <div class="course-lesson-list">
          <template v-for="(lesson, i) in lessons" :key="i">
            <div class="course-lesson">
              <div class="lesson-title">{{ lesson.title ? lesson.title : "" }}</div>
              <div class="lesson-description">
                {{ lesson.description ? lesson.description : "" }}
              </div>
              <div class="lesson-category">
                <div class="category-indicator">DAO</div>
                <div class="category-indicator">ApeCoin</div>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { lessonObject } from "src/models/lesson";

/* Components */
import CourseHeader from "@/components/CoursesComponents/CourseHeader.vue";
import BuyButton from "@/components/Buttons/BuyButton.vue";

/* All Posts stored in a JSON */
import testCourses from "../data/courses.json";
import testLessons from "../data/lessons.json";

const store = useStore();
const route = useRoute();
const { course, lesson, lessons } = storeToRefs(store);

const active = ref(0);

async function loadLesson(id: string) {
  let filteredLesson = testLessons.data.filter((lesson) => {
    return lesson.id === id;
  });
  store.setLesson(filteredLesson[0] as any);
  active.value = lesson.value.step;
  console.log("active", active.value);
}

async function fetchLessons() {
  store.setLessons((testLessons.data as unknown) as lessonObject[]);
}

async function fetchCourse() {
  let filteredCourse = testCourses.data.filter((course) => {
    return course.id === route.params.id;
  });
  store.setCourse(filteredCourse[0] as any);
}

onBeforeMount(async () => {
  await fetchCourse();
  await fetchLessons();
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
        font-size: 34px;
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

      .course-discount {
        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grasp-orange;
        font-size: 15px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        margin: 0 0 4px 0;

        .course-discount-label {
          color: $grasp-orange;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          text-transform: capitalize;
        }

        @include breakpoint($break-sm) {
          width: 50%;
        }
      }
    }

    .course-location-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
      margin: 0 0 8px 0;

      .course-date {
        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grey-90;
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        margin: 0;

        .course-date-label {
          color: $grey-90;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          text-transform: capitalize;
        }

        @include breakpoint($break-sm) {
          width: 50%;
        }
      }

      .course-sales {
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-content: center;
        align-items: center;
        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grey-90;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        text-transform: uppercase;
        text-align: right;
        margin: -8px 8px 0 0;

        .course-sales-icon {
          img,
          svg {
            width: 20px;
            margin: 0 4px;
          }
        }
      }
    }

    .course-lessons-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: flex-start;
      background: $grey-20;
      border-radius: 12px;
      margin: 0 0 8px 0;
      overflow: hidden;

      .course-image {
        width: 100%;
        position: relative;
        width: auto;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: transparent;

        img,
        svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          overflow: hidden;
          background: transparent;
        }
      }

      .course-lesson-checklist {
        width: 420px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        margin: 0 0 8px 0;

        .course-lesson-list-link {
          width: 100%;
          height: 60px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          align-items: center;
          padding: 0;
          border-bottom: 2px solid $grey-30;
          transition: 0.6s all linear;
          cursor: pointer;

          @include breakpoint($break-sm) {
            font-size: 16px
          }

          &:hover,
          &:active,
          &:focus,
          &:focus-visible {
            border-bottom: 2px solid $grasp-cyan;
          }

          .course-lesson-list-title {
            width: 100%;
            height: inherit;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            font-family: "Poppins", sans-serif;
            color: $grasp-blue;
            font-size: 22px;
            font-weight: 600;
            line-height: normal;
            text-align: left;
            margin: 0;
            padding: 0 0 0 10px
          }

          .course-lesson-list-button {
            width: 50px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
            align-items: center;
            margin: 0;

            img,
            svg {
              width: 24px;
              margin: 0 4px;
            }
          }
        }

        .course-lesson-list-link.active {
          background: $grasp-blue;
          border-bottom: 2px solid $grasp-cyan;

          .course-lesson-list-title {
            color: $white;
          }
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

    .lesson-content {
      width: 100%;
      color: $black;
      font-size: 15px;
      font-weight: normal;
      text-align: left;
      margin: 0;
    }

    .course-category {
      width: 50%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;

      color: $black;
      font-size: 14px;
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
        font-size: 13px;
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
        margin-right: 8px;
      }
    }

    .line-divider {
      width: 98%;
      margin: 16px auto;
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
