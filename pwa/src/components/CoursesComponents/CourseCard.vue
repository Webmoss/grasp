<template>
  <div
    v-if="course && gridView === 'list'"
    class="course-list-item"
    @click="loadCourse(course)"
  >
    <div class="course-image">
      <img :src="course.image ? course.image : 'rectangle.svg'" />
    </div>
    <div class="course-title">
      {{ course.title ? course.title : "" }}
    </div>
    <div v-if="course && course.category" class="course-category">
      <span class="grey-label">Category</span>
      <span class="price-indicator">{{ course.category ? course.category : "" }}</span>
    </div>
    <div class="course-excerpt">
      {{ course.excerpt ? course.excerpt : "" }}
    </div>
    <div v-if="course && course.price" class="course-floor">
      <div class="course-price-amount">
        {{ course.price.toFixed(2) }}
        <div class="course-price-amount-icon">
          <img src="src/assets/svgs/EduCoin.svg" />
        </div>
      </div>
    </div>
    <div class="button-row">
      <ViewButton :btn-size="'small'" :color="'blue'" :course-id="course.id" />
    </div>
  </div>

  <div v-else class="course" @click="loadCourse(course)">
    <div v-if="course && course.image" class="course-image">
      <img :src="course.image" />
    </div>
    <div class="course-column">
      <div v-if="course && course.title" class="course-title">
        {{ course.title }}
      </div>
      <div class="course-excerpt">
        {{ course.excerpt ? course.excerpt : "" }}
      </div>
      <div v-if="course && course.price" class="course-price">
        <div class="course-price-amount">
          {{ course.price.toFixed(2) }}
          <div class="course-price-amount-icon">
            <img src="src/assets/svgs/EduCoin.svg" width="10" />
          </div>
        </div>
      </div>
    </div>
    <div class="course-card-row">
      <div class="button-column">
        <ViewButton :btn-size="'small'" :color="'blue'" :course-id="course.id" />
      </div>
      <div class="course-column">
        <div v-if="course && course.category" class="course-category">
          <span class="grey-label">Category</span>
          <span class="price-indicator">{{ course.category }}</span>
        </div>
        <div v-if="course && course.price" class="course-price">
          <span class="grey-label">Rarity</span>
          <span class="price-indicator">{{ course.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { courseObject } from "src/models/course";
import ViewButton from "../Buttons/ViewButton.vue";

const route = useRoute();
const router = useRouter();

defineProps<{ course: courseObject; gridView: string }>();

const loadCourse = async (course: courseObject) => {
  router.push({
    name: "course",
    params: { course: course.id },
  });
};
</script>
<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.course-card-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 4px 8px;
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
  background: #f4f4f4;
  border: 2px solid $grasp-blue;
  border-radius: 12px;
  margin: 0 auto;
  padding: 0 0 4px 0;
  transition: all 0.5s linear;
  cursor: pointer;
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
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: $black;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    margin: 0;
  }

  .course-excerpt {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    color: $black;
    font-size: 12px;
    font-weight: normal;
    text-align: center;
    margin: 0;
  }

  .course-price {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;
    align-items: center;

    color: $black;
    width: 100%;
    font-size: 16px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0;

    .grey-label {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $black;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      margin-right: 8px;
    }

    .price-indicator {
      outline: transparent solid 2px;
      outline-offset: 2px;
      border-radius: 9999px;
      transition: background-color 0.2s ease-out 0s;
      background: transparent;
      font-size: 14px;
      padding-inline: 8px;
      padding-top: 1px;
      padding-bottom: 1px;
      --badge-color: $grey-40;
      color: $black;
      box-shadow: none;
      border-width: 1.5px;
      border-style: solid;
      border-image: initial;
      border-color: #4d5358;
    }
  }

  .course-category {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;
    align-items: center;

    color: $black;
    font-size: 16px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0 0 6px 0;

    .grey-label {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $black;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      margin-right: 8px;
    }

    .price-indicator {
      outline: transparent solid 2px;
      outline-offset: 2px;
      border-radius: 9999px;
      transition: background-color 0.2s ease-out 0s;
      background: transparent;
      font-size: 14px;
      padding-inline: 8px;
      padding-top: 1px;
      padding-bottom: 1px;
      --badge-color: $grey-40;
      color: $black;
      box-shadow: none;
      border-width: 1.5px;
      border-style: solid;
      border-image: initial;
      border-color: #4d5358;
    }
  }

  .course-price {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    .course-price-amount {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-content: center;
      align-items: center;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $black;
      font-size: 18px;
      font-weight: 600;

      .course-price-amount-icon {
        width: 18px;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin-left: 2px;
        img,
        svg {
          background: transparent;
          object-fit: contain;
          overflow: hidden;
          margin-bottom: -1px;
        }
      }
    }
  }
  .button-column {
    width: 50%;
    height: 51px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: flex-end;
    padding: 0;
    margin: 0;
  }
}

.course-list-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  background: $white;
  border-radius: 12px;
  margin: 0;
  padding: 0;
  transition: all 0.5s linear;
  cursor: pointer;

  .course-image {
    position: relative;
    margin: 0;
    padding: 0;
    background: transparent;

    img,
    svg {
      width: 120px;
      height: inherit;
      object-fit: contain;
      overflow: hidden;
      background: transparent;
    }
  }

  .course-title {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;

    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: $grasp-blue;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
  }

  .course-excerpt {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    color: $black;
    font-size: 12px;
    font-weight: normal;
    text-align: center;
    margin: 0;
  }

  .course-price {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    color: $black;
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0;

    .grey-label {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $grey-50;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      margin-right: 8px;
    }

    .price-indicator {
      outline: transparent solid 2px;
      outline-offset: 2px;
      border-radius: 9999px;
      transition: background-color 0.2s ease-out 0s;
      background: transparent;
      font-size: 14px;
      padding-inline: 8px;
      padding-top: 1px;
      padding-bottom: 1px;
      --badge-color: $grey-40;
      color: $white;
      box-shadow: none;
      border-width: 1.5px;
      border-style: solid;
      border-image: initial;
      border-color: #4d5358;
    }
  }

  .course-category {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    color: $grasp-cyan;
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0;

    .grey-label {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $grey-50;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      margin-right: 8px;
    }

    .price-indicator {
      outline: transparent solid 2px;
      outline-offset: 2px;
      border-radius: 9999px;
      transition: background-color 0.2s ease-out 0s;
      background: transparent;
      font-size: 14px;
      padding-inline: 8px;
      padding-top: 1px;
      padding-bottom: 1px;
      --badge-color: $grey-40;
      color: $white;
      box-shadow: none;
      border-width: 1.5px;
      border-style: solid;
      border-image: initial;
      border-color: #4d5358;
    }
  }

  .course-price {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    .course-price-amount {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: $white;
      font-size: 18px;
      font-weight: 600;
      text-decoration: none;

      .course-price-amount-icon {
        width: 16px;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin-left: 2px;
        img,
        svg {
          background: transparent;
          object-fit: contain;
          overflow: hidden;
          margin-bottom: -1px;
        }
      }
    }
  }
  .button-row {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 0 0 0 10px;
    margin: 0 auto;
  }
}
</style>
