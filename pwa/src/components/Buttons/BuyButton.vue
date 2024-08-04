<template>
  <button
    :class="btnSize === 'large' ? `${color}-buy-button` : `${color}-small-buy-button`"
    @click="goToCourse()"
  >
    Buy
    <div class="course-price-amount-icon">
      <img src="../../assets/svgs/EduCoin.svg" />
    </div>
    <span class="course-price">{{ price ? price.toFixed(2) : 0.0 }}</span>
  </button>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

export interface Props {
  btnSize?: string;
  color?: string;
  courseId?: string;
  price?: number;
}

const props = defineProps({
  btnSize: {
    type: String,
    default: "large",
    required: false,
  },
  color: {
    type: String,
    default: "blue",
    required: false,
  },
  courseId: {
    type: String,
    default: null,
    required: false,
  },
  price: {
    type: Number,
    default: 0,
    required: false,
  },
});

const router = useRouter();

function goToCourse() {
  router.push({ name: "course", params: { id: props.courseId } });
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.blue-buy-button {
  width: auto;
  height: 40px;
  display: flex;
  flex-direction: row nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: $white;
  background-color: $grasp-blue;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid $grasp-blue;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  transition: all 0.5s linear;
  cursor: pointer;

  &:hover,
  &:focus {
    color: $grasp-cyan;
    // border: 1px solid $grasp-cyan;
  }
  @include breakpoint($break-sm) {
    margin: 15px auto;
  }

  span.course-price {
    color: $white !important;
  }
}

.blue-small-buy-button {
  width: auto;
  height: 35px;
  display: flex;
  flex-direction: row nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: $white;
  background-color: $grasp-blue;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid $grasp-blue;
  border-radius: 30px;
  padding-left: 14px;
  padding-right: 14px;
  transition: all 0.5s linear;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus,
  &:focus-visible {
    color: $grasp-cyan;
    // border: 1px solid $grasp-cyan;
  }
  img,
  svg {
    color: #ffffff;
    width: 22px;
    margin-left: -6px;
    margin-right: 4px;
  }
  span.course-price {
    color: $white !important;
  }
}

.course-price-amount-icon {
  width: 24px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;

  img,
  svg {
    width: 22px;
    height: 22px;
    background: transparent;
    object-fit: contain;
    overflow: hidden;
    margin-left: 4px;
    margin-right: 0;
    margin-bottom: -1px;
  }
}
</style>
